const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const Status = sequelize.define('statuses', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'statuses',
        timestamps: false,
        freezeTableName: true
    });

    Status.sync({ force: true });
    return Status;
};