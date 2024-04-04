const sequelize = require('../database.js')
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Equipe = sequelize.define('Equipe', {
    idEquipe: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    ville: {
        type: DataTypes.STRING,
        allowNull: false
    },   
    pays: {
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
    
return Equipe;
};
