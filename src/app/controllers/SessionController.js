import jwt from 'jsonwebtoken'
import User from '../models/User'


class SessionController {
    async store(req, res) {
        const { email, password } = req.body
        
        // Verifying if the email exists
        const user = await User.findOne({ where: email})

        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe'})
        }

        return res.json({ok: true})
    }
}

export default new SessionController()