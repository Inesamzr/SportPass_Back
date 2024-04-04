const sequelize = require('../database.js')
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const CashBackCommercant = sequelize.define('CashBackCommercant', {
    idCashBackCommercant: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    montant: {
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
    
return CashBackCommercant;
};
