const sequelize = require('../database.js')
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define('Role', {
    idRole: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
});
    
return Role;
};
