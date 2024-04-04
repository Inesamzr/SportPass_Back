const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const TypeCommercantFunction = require('./TypeCommercant.js');
const TypeCommercant = TypeCommercantFunction(sequelize, Sequelize)
const CashBackCommercantFunction = require('./CashBackCommercant.js');
const CashBackCommercant = CashBackCommercantFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Commercant = sequelize.define('Commercant', {
    idCommercant: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
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

Commercant.CashBackCommercant = Commercant.belongsTo(CashBackCommercant, {  foreignKey: 'idCashbacCommercant' });
Commercant.TypeCommercant = Commercant.belongsTo(TypeCommercant, {  foreignKey: 'idTypeCommercant' });

return Commercant;
};
