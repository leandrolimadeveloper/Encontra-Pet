module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
