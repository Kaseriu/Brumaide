const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('messages', {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        tableName: 'messages',
        timestamps: false,
        freezeTableName: true
    });
}