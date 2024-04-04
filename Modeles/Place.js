const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const TypePlaceFunction = require('./TypePlace.js');
const TypePlace = TypePlaceFunction(sequelize, Sequelize)
const RangeeFunction = require('./Rangee.js');
const Rangee = RangeeFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Place = sequelize.define('Place', {
    idPlace: {
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

Place.Rangee = Place.belongsTo(Rangee, {  foreignKey: 'idRangee' });
Place.TypePlace = Place.belongsTo(TypePlace, {  foreignKey: 'idType' });

 
return Place;
};
