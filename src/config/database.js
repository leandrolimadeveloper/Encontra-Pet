

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

// const DB_HOST = require('../config')
// const DB_NAME = require('../config')
// const DB_PASSWORD = require('../config')
// const DB_USER = require('../config')

// module.exports = {
//     dialect: 'postgres',
//     host: DB_HOST,
//     username: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     define: {
//         timestamps: true,
//         underscored: true,
//         underscoredAll: true
//     }
// }

// require('dotenv').config()

// module.exports = {
//     dialect: 'postgres',
//     host: 'localhost',
//     username: 'postgres',
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     define: {
//         timestamps: true,
//         underscored: true,
//         underscoredAll: true
//     }
// }
