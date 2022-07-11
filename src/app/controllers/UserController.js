import User from '../models/User'

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email }
        })

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' })
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({
            id,
            name,
            email
        })
    }

    async update(req, res) {
        const { email, password, oldPassword } = req.body

        const user = await User.findByPk(req.userId)

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email }
            })

            if (userExists) {
                return res.status(400).json({ error: 'Usuário já existe' })
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            
            return res.status(401).json({ error: 'Senha atual incorreta' })
        }

        if (password === oldPassword) {
            return res.status(400).json({error: 'Nova senha e senha anterior são as mesmas'})
        }

        const { id, name } = await user.update(req.body)

        res.json({
            id,
            name,
            email,
        })
    }
}

export default new UserController()