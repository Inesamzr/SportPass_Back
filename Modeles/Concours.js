const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const MatchsFunction = require('./Matchs.js');
const Matchs = MatchsFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const Concours = sequelize.define('Concours', {
    idConcours: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    prix: {
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

Concours.Matchs = Concours.belongsTo(Matchs, {  foreignKey: 'idMatch' });

return Concours;
};
