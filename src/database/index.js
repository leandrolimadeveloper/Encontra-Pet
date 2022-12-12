import Sequelize from 'sequelize'
import databaseConfig from '../config/database.js'

import User from '../app/models/User.js'
import Pet from '../app/models/Pet.js'
import Address from '../app/models/Address.js'

const models = [User, Pet, Address]

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
