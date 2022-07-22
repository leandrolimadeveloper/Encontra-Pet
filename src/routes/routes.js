import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'

import UserController from '../app/controllers/UserController'
import SessionController from '../app/controllers/SessionController'
import PetController from '../app/controllers/PetController'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// All routes bellow this middleware need to be authenticated
routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.post('/pets', PetController.store)

export default routes;
