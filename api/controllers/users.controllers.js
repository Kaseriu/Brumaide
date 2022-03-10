const db = require('../models/sequelize.models');
const geolib = require('geolib');
const User = db.users;
const config = require('../config/default.config');
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

const include = {
    include: [{
        model: db.roles,
        as: 'role',
        foreignKey: 'roleId'

    }]
};


function checkEmailisValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkBirthdayIsOfAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= config.MIN_AGE;
}



exports.getAllUsers = (req, res) => {
    User.findAll({include: include.include}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.me = (req, res) => {
    const id = res.local?.id || 2;
    console.log(id);
    User.findByPk(id, {include: include.include}).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.login = (req, res) => {
    if (!req.body || !req.body.email || !req.body.password){
        return res.status(400).send({
            success: false,
            message: "body not found or not complete"
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email,
        }
    }).then(data => {
        if (!data || !bcrypt.compareSync(password, data.password)){
            return res.status(500).send({
                success: false,
                message: 'Username or password incorrect'
            });
        }
        const user = data;
        const accessToken = jwt.sign({id: user.id, email: user.email, role: user.user_role}, config.token, {expiresIn: '72h'});
        res.status(200).send({
            success: true,
            accessToken: accessToken
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Internal Error'
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
        roleId: req.body.roleId,
        birthday: req.body.birthday
    };

    if (!checkEmailisValid(user.email)) {
        return res.status(400).send({
            message: 'Email is not valid'
        });
    }

    if (checkBirthdayIsOfAge(user.birthday)) {
        return res.status(400).send({
            message: 'Birthday is not valid'
        });
    }

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

exports.getDistance = (req, res) => {
    let distances = [];
    const location = req.body;
    console.log(location);
    for (const to of location.to) {
        if (!to.latitude || !to.longitude) {
            return res.status(400).send({
                message: "Location is not valid"
            });
        }
    }


    for (const to of location.to) {

        const from = location.from;
        const distance = geolib.getDistance(from, to);
        const d = distance >= 1000 ? (distance / 1000).toFixed(2) + ' km' : distance + ' m';
        distances.push({
            id: to.id,
            distance: d
        });

    }

    res.send(distances);
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