import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import authMiddleware from '../app/middlewares/auth'

import UserController from '../app/controllers/UserController'
import SessionController from '../app/controllers/SessionController'
import PetController from '../app/controllers/PetController'
import Dashboard from '../app/controllers/DashboardController'
import AddressController from '../app/controllers/AddressController'

const routes = new Router()
const upload = multer(uploadConfig)

routes.get('/dashboard', Dashboard.show)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// All routes bellow this middleware need to be authenticated
routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.post('/pets', multer(upload).single('img'), PetController.store)
routes.put('/pets/:pet_id', multer(upload).single('img'), PetController.update)
routes.delete('/pets/:pet_id', PetController.destroy)

routes.get('/pets', PetController.index)

routes.post('/informations', AddressController.store)
routes.get('/informations', AddressController.index)

export default routes;
