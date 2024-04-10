const sequelize = require('../database.js')
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Pass = sequelize.define('Pass', {
    idPass: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    valide: {
        type: DataTypes.BOOLEAN,
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
    
return Pass;
};
