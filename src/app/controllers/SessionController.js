import jwt from 'jsonwebtoken'
import User from '../models/User.js'

import authConfig from '../../config/auth.js'

class SessionController {
    async store(req, res) {
        const { email, password } = req.body

        // Verifying if the email exists
        const user = await User.findOne({ where: {email: email} })

        if (!user) {
            return res.status(401).json({ error: "User doesn't exists"})
        }

        // Verifying if the passwords match
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'The password is incorrect' })
        }

        const {id, name } = user

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionController()
