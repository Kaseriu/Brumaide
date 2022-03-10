const Sequelize = require('sequelize');
const pg = require('pg');
const config = require('../config/db.config');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWD,
    {
        host: config.HOST,
        dialect: 'postgres',
        port: config.PORT,
        logging: false,
});

sequelize.authenticate().then(data => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.models')(sequelize, Sequelize);


module.exports = db;