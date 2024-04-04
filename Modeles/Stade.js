const sequelize = require('../database.js')
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Stade = sequelize.define('Stade', {
    idStade: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    emplacement: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    ville: {
        type: DataTypes.STRING,
        allowNull: false
    },   
    capacite: {
        type: DataTypes.INTEGER,
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
    
return Stade;
};
