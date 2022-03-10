const db = require('../models/sequelize.models');

const Issue = db.issues;
const Status = db.status;
const Roles = db.roles;
const Op = db.Sequelize.Op;


const include = {
    include: [{
        model: db.users,
        as: 'user',
        foreignKey: 'ownerId'

    },
    {
        model: db.status,
        as: 'status',
        foreignKey: 'statusId'
    }]

};

exports.getAllIssues = (req, res) => {
    const search = req.query.search;
    let includes;
    if (search) {
        includes = {
            include: include.include,
            attributes: {
                exclude: ['user.password']
            },
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }
    }else {
        includes = include;
    }
    console.log(includes);
    Issue.findAll(includes).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Issues."
        });
    });
};

exports.getIssuesByUser = (req, res) => {

    Issue.findAll({
        where: {
            userId: req.params.id
        },
        include: [{
            model: Status,
            as: 'status',
            foreignKey: 'statusId'
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Issue."
        });
    });
};

exports.getOneIssue = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Issue.findByPk(id, {
        include: [{
            model: Status,
            as: 'status',
            foreignKey: 'statusId'
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Issues."
        });
    });
};

exports.insertIssue = (req, res) => {
    const issue = {
        title: req.body.title,
        description: req.body.description,
        statusId: req.body.statusId,
        priority: req.body.priority,
        ownerId: req.body.ownerId,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    };
    Issue.create(issue).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Issue."
        });
    });
};


exports.updateIssue = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Issue.update(req.body, {
        where: {
            id: id
        },
        returning: true,
        attributes:
            {
                exclude: ['password']
            }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Issues."
        });
    });
};

exports.searchIssues = (req, res) => {
    const search = req.query.search;

    Issue.findAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        },
        include: [{
            model: Status,
            as: 'status',
            foreignKey: 'statusId'
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Issues."
        });
    });
};


exports.deleteIssue = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id is required"
        });
    }

    Issue.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Issues."
        });
    });
};