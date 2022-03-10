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

sequelize.authenticate().then(_ => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users.models')(sequelize, Sequelize);
db.tags = require('../models/tags.models')(sequelize, Sequelize);
db.issues = require('../models/issues.models')(sequelize, Sequelize);
db.status = require('../models/status.models')(sequelize, Sequelize);
db.messages = require('../models/messages.models')(sequelize, Sequelize);
db.roles = require('../models/roles.models')(sequelize, Sequelize);

db.users.belongsTo(db.roles, {foreignKey: 'roleId', as: 'role'});

db.issues.belongsTo(db.users, {foreignKey: 'ownerId', as: 'user'});
db.issues.belongsTo(db.status, {foreignKey: 'statusId', as: 'status'});


db.messages.belongsTo(db.users, {foreignKey: 'senderId', as: 'sender'});
db.messages.belongsTo(db.users, {foreignKey: 'receiverId', as: 'receiver'});




module.exports = db;