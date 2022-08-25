require('dotenv').config()

import express from 'express'
import path from 'path'
import routes from './routes/routes'

// Database
import './database'

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        )

        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server
