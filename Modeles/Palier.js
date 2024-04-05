const sequelize = require('../database.js')
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Palier = sequelize.define('Palier', {
    idPalier: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cashbackPalier: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    montantMin: {
      type: DataTypes.FLOAT,
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
    
return Palier;
};
