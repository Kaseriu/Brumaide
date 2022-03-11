const db = require('../models/sequelize.models');
const Message = db.messages;
const Op = db.Sequelize.Op;

const include = {
    include: [{
        model: db.users,
        as: 'receiver',
        foreignKey: 'receiverId'
    },
    {
        model: db.users,
        as: 'sender',
        foreignKey: 'senderId'
    }]
};

exports.findAll = (req, res) => {
    Message.findAll({include: include.include}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Messages."
        });
    });
};

exports.insertOneMessage = (req, res) => {
    console.log(req.body);
    const message = {
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        message: req.body.message,
    };

    message.createdAt = Date.now();

    Message.create(message).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Message."
        });
    });
};


exports.findConversationByReceiverAndSender = (req, res) => {
    const receiverId = req.params.receiverId;
    const senderId = req.params.senderId;

    if (!receiverId || !senderId) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Message.findAll({
        where: {
            [Op.or]: [
                {
                    receiverId: receiverId,
                    senderId: senderId
                },
                {
                    receiverId: senderId,
                    senderId: receiverId
                }
            ]
        },
        include: include.include
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Messages."
        });
    });
};




exports.updateMessage = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Message.update(req.body, {
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Message was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Message with id=${id}. Maybe Message was not found or body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Message with id=" + id
        });
    });
};

exports.findMessageByReceiverAndSender = (req, res) => {
    Message.findAll({
        where: {
            receiverId: req.params.receiverId,
            senderId: req.params.senderId
        },
        include: include.include
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Message."
        });
    });
};

exports.deleteAllMessagesByReceiverAndSender = (req, res) => {
    Message.destroy({
        where: {
            receiverId: req.params.receiverId,
            senderId: req.params.senderId
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Message was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Message with receiverId=${req.params.receiverId} and senderId=${req.params.senderId}. Maybe Message was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error deleting Message with receiverId=" + req.params.receiverId + " and senderId=" + req.params.senderId
        });
    });
};

