const db = require('../models/sequelize.models');

const Role = db.roles;
const Op = db.Sequelize.Op;


exports.getAllRoles = (req, res) => {
    Role.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Roles."
        });
    });
};

exports.insertRole = (req, res) => {
    const role = {
        name: req.body.name,
        description: req.body.description
    };

    Role.create(role).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Role."
        });
    });
};

exports.getOneRole = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Role.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Roles."
        });
    });
};

exports.updateRole = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Role.update(req.body, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Roles."
        });
    });
};

exports.deleteOneRole = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Role.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Roles."
        });
    });
};