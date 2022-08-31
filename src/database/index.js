import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import User from '../app/models/User'
import Pet from '../app/models/Pet'

const models = [User, Pet]

class Database {
    constructor() {
        this.init()
    }

    async init() {
        this.connection = await new Sequelize(databaseConfig)

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))
    }
}

export default new Database()
