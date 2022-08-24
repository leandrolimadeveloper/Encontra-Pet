import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import authMiddleware from '../app/middlewares/auth'

import UserController from '../app/controllers/UserController'
import SessionController from '../app/controllers/SessionController'
import PetController from '../app/controllers/PetController'

const routes = new Router()
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
    res.send('Home')
})

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// All routes bellow this middleware need to be authenticated
routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.post('/pets', upload.single('thumbnail'), PetController.store)
// routes.post('/pets', PetController.store)
// routes.put('/pets/:pet_id', upload.single('thumbnail'), PetController.update)
routes.put('/pets/:pet_id', PetController.update)
routes.delete('/pets', PetController.destroy)
routes.get('/pets', PetController.index)

export default routes;
