const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const db = require('../models/sequelize.models');
const User = db.users;
const Role = db.roles;

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodeToken = jwt.verify(token, config.jwtSecret);

        if (!decodedToken.id || !decodedToken.email || !decodedToken.role){
            return res.status(401).send({success: false, message: 'Token not valid'});
        }

        const userId = decodeToken.userId;
        const email = decodeToken.email;
        const role = decodeToken.role;

        if (decodeToken.iat < Date.now()) {
            return res.status(401).send({success: false, message: 'Token expired'});
        }

        User.findOne({
            where: {
                id: userId,
            }
        }).then(user => {
            if (!user) {
                return res.status(401).send({success: false, message: 'User not found'});
            }

            if (user.email !== email || user.role !== role) {
                return res.status(401).send({success: false, message: 'Token not valid'});
            }

            res.local = {};
            Role.findOne({
                where: {
                    id: user.user_role
                }
            }).then(r => {
                res.local.admin = r.is_admin;
                res.local.id = data.id;
                next();
            }).catch(err => {
                console.log(err);
                res.local.admin = false;
                res.local.id = data.id;
                next();
            });
        }).catch(err => {
            console.log(err);
            res.status(401).send({success: false, message: 'You\'re not allowed '});
        })

    }catch{
        res.status(401).send({ success: false, message: 'Token malformed'});
    }
}