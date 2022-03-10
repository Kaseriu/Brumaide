const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const Message = sequelize.define('messages', {
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
    //Message.sync({ force: true });
    return Message;
}