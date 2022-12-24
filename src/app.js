import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes/routes.js'
import pathInCommonJs from './pathCommonJs.cjs'

// Database
import './database/index.js'

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(cors())

        // this.server.use(
        //     '/files',
        //     express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        // )

        pathInCommonJs()

        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }))
        this.server.use(morgan('dev'))
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server
