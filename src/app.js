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
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server
