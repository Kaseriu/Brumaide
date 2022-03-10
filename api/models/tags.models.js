const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const Tags = sequelize.define('tags', {
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
        tableName: 'tags',
        timestamps: false,
        freezeTableName: true
    });
    return Tags;

};