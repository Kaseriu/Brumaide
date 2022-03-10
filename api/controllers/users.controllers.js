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


exports.getAllUsersByRadius = (req, res) => {
    const radius = req.params.radius;
    const userId = req.params.userId;
    User.findByPk(userId, {include: include.include}).then(data => {
        if (!data){
            throw new Error('User not found');
        }
        const latitude = data.latitude;
        const longitude = data.longitude;
        console.log("long+lat", latitude, longitude);
        const bounds = geolib.getBoundsOfDistance({
            latitude: latitude,
            longitude: longitude
        }, radius);
        console.log("bounds", bounds[0].latitude, bounds[1].latitude);
        User.findAll({
            include: include.include,
            where: {
                latitude: {
                    [Op.in]: [bounds[0].latitude, bounds[1].latitude]
                },
                longitude: {
                    [Op.in]: [bounds[0].longitude, bounds[1].longitude]
                }
            }
        }).then(users => {
            res.send(users);
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving users."
            });
        });
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