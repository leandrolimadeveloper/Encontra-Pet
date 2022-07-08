import { Router } from 'express'
import User from '../app/models/User'

const routes = new Router()

routes.get('/', (req, res) => {
    return res.json({ok: true})
})

routes.get('/teste', async (req, res) => {
    const user = await User.create({
        name: 'Leandro',
        email: 'leandrolima@gmail.com',
        password_hash: '1213123ab'
    })

    return res.json(user)
})

export default routes;
