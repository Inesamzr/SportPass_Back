const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const TribuneFunction = require('./Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const Rangee = sequelize.define('Rangee', {
    idRangee: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    numero: {
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

Rangee.Tribune = Rangee.belongsTo(Tribune, {  foreignKey: 'idTribune' });
    
return Rangee;
};
