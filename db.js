const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(
    process.env.POSTGRES_DB_NAME,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_USER_PASSWORD,
    {
        host:process.env.POSTGRES_HOST,
        port:process.env.POSTGRES_PORT,
        dialect:'postgres'
    }
)


module.exports = sequelize;