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
    duree: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    montantMin: {
      type: DataTypes.FLOAT,
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
