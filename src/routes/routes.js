import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload.cjs'

import authMiddleware from '../app/middlewares/auth.js'

import UserController from '../app/controllers/UserController.js'
import SessionController from '../app/controllers/SessionController.js'
import PetController from '../app/controllers/PetController.js'
import Dashboard from '../app/controllers/DashboardController.js'
import AddressController from '../app/controllers/AddressController.js'

const routes = new Router()
const upload = multer(uploadConfig)

routes.get('/dashboard', Dashboard.show)

routes.post('/users', UserController.store)
routes.get('/users', UserController.index)
routes.post('/sessions', SessionController.store)

// All routes bellow this middleware need to be authenticated
routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.delete('/users', UserController.destroy)

routes.post('/pets', multer(upload).single('img'), PetController.store)
routes.put('/pets/:pet_id', multer(upload).single('img'), PetController.update)
routes.delete('/pets/:pet_id', PetController.destroy)

routes.get('/pets', PetController.index)

routes.post('/informations', AddressController.store)
routes.get('/informations', AddressController.index)
routes.put('/informations/:address_id', AddressController.update)
routes.delete('/informations/:address_id', AddressController.destroy)

export default routes;
