import * as Yup from 'yup'
import User from '../models/User'

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .required()
                .email(),
            password: Yup.string()
                .required()
                .min(8)
        })

        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err.errors
            })
        }

        const userExists = await User.findOne({
            where: { email: req.body.email }
        })

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já existe' })
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({
            error: false,
            message: 'Dados cadastrados com sucesso', 
            id,
            name,
            email
        })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when('oldPassword', (oldPassword, field) => {
                    oldPassword ? field.required() : field
                }),
                confirmPassword: Yup.string().when('password', (password, field) => 
                    password ? field.required().oneOf([Yup.ref('password')]) : field
                )
        })

        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: err.errors
            })
        }
        
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
            error: false,
            message: 'Dados cadastrados com sucesso',
            id,
            name,
            email,
        })
    }
}

export default new UserController()