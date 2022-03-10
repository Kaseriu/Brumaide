const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const Issue = sequelize.define('issues', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'issues',
        timestamps: false,
        freezeTableName: true
    });

    //Issue.sync({ force: true });
    return Issue;
};