
const {Sequelize} = require("sequelize");


const sequelize = new Sequelize('database', 'postgres', '123456', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
});


module.exports = sequelize;