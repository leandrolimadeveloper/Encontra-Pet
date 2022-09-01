import app from './app'

import database from './database'

if (database.init) {
    console.log('Database started')
    const port = 8686
    app.listen(port, err => {
        err ? console.log(err) : console.log(`Server running at: http://localhost:${port}`)
    })
}

