const db = require('../models/sequelize.models');

const Op = db.Sequelize.Op;
const Status = db.status;


exports.getAllStatus = (req, res) => {
    Status.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Status."
        });
    });
};

exports.getOneStatus = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Status.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Status."
        });
    });
};

exports.insertStatus = (req, res) => {
    const status = {
        name: req.body.name,
        description: req.body.description
    };

    Status.create(status).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Status."
        });
    });
};


exports.updateStatus = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Status.update(req.body, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating Status."
        });
    });
};

exports.deleteStatus = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Status.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.send({ message: "Status deleted successfully!" });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting Status."
        });
    });
};
