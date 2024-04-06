const sequelize = require('../database.js')
const Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    const AvoirFavoris = sequelize.define('AvoirFavoris', {
    idAvoirFavoris: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idCommercant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Commercant', 
            key: 'idCommercant',      
        }
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', 
            key: 'idUser',        
        }
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
    
return AvoirFavoris;
};
