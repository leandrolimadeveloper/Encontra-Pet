import Address from '../models/Address.js'
import User from '../models/User.js'

class AddressController {
    async index(req, res) {
        const user_id = req.userId
        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        })

        return res.json(user)
    }

    async store(req, res) {
        const user_id = req.userId

        const { street, number, state, city, zipcode } = req.body

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const information = await Address.create({
            street,
            number,
            state,
            city,
            zipcode,
            user_id
        })

        return res.json(information)
    }

    async update(req, res) {
        const { address_id } = req.params
        const user_id = req.userId

        if (!user_id) {
            return res.status(404).json({ error: 'User not found' })
        }

        const userAddress = await Address.findOne({
            where: {
                id: address_id
            }
        })

        if (!userAddress) {
            return res.status(404).json({ error: 'Address not found' })
        }

        if (String(user_id) !== String(userAddress.user_id)) {
            return res.status(401).json({ error: 'Not authorized' })
        }

        const { street, number, state, city, zipcode } = req.body

        await userAddress.update({
            street,
            number,
            state,
            city,
            zipcode,
        })

        return res.json({
            error: false,
            message: 'Data successfully updated',
            userAddress
        })
    }

    async destroy(req, res) {
        const { address_id } = req.params
        const user_id = req.userId

        if (!user_id) {
            return res.status(404).json({ error: 'User not found' })
        }

        const userAddress = await Address.findOne({
            where: {
                id: address_id
            }
        })

        console.log(userAddress)

        if (!userAddress) {
            return res.status(404).json({ error: 'Address not found' })
        }

        if (String(user_id) !== String(userAddress.user_id)) {
            return res.status(401).json({ error: 'Not authorized' })
        }

        await Address.destroy({
            where: {
                id: address_id
            }
        })

        return res.json()
    }
}

export default new AddressController()
