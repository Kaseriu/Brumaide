const DataTypes = require('sequelize');

module.exports = (sequelize) => {
     return sequelize.define('roles', {
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
        tableName: 'roles',
        timestamps: false,
        freezeTableName: true
    });
}