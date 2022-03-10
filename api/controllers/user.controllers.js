const db = require('../models/sequelize.models');

const User = db.user;
const Op = db.Sequelize.Op;

exports.getAllUsers = (req, res) => {
    User.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};