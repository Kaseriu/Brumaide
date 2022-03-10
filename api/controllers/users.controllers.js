const db = require('../models/sequelize.models');
const geolib = require('geolib');
const User = db.users;
const Op = db.Sequelize.Op;


const include = {
    include: [{
        model: db.roles,
        as: 'role',
        foreignKey: 'roleId'

    }]
};

exports.getAllUsers = (req, res) => {
    User.findAll({include: include.include}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.insertUser = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        postalCode: req.body.postalCode,
        city: req.body.city,
        country: req.body.country,
        roleId: req.body.roleId
    };

    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.findOneUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    User.findByPk(id, {include: include.include}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
    });
};


exports.updateUser = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id },
        returning: true,
        attributes:
            {
                exclude: ['password']
            }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
        });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the User."
        });
    });
};