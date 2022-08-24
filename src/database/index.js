import express from 'express'
import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import User from '../app/models/User'
import Pet from '../app/models/Pet'

const models = [User, Pet]

class Database {
    constructor() {
        this.server = express()
        this.init()
    }

    async init() {
        this.connection = await new Sequelize(databaseConfig)

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))

        try {
            if (this.connection && models) {
                console.log('Database connected')
            }
        }
        catch(err) {
            console.log('Database error: ', err)
        }
    }

}

export default new Database()
