import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
} from '../config.js'

export default {
    dialect: 'postgres',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
