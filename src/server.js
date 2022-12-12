import app from './app.js'
import { PORT } from './config.js'

import database from './database/index.js'

if (database.init) {
    console.log('Database started')

    app.listen(PORT, err => {
        err ? console.log(err) : console.log(`Server running at: http://localhost:${PORT}`)
    })
}

