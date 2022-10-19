import Address from '../models/Address'
import User from '../models/User'

class AddressController {
    // async index(req, res) {
    //     const user_id = req.userId

    // }

    async store(req, res) {
        const user_id  = req.userId
        const { street, number, state, city, zipcode} = req.body

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(404).json({error: 'User not found'})
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
}

export default new AddressController()
