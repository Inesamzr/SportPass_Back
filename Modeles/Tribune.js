const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const StadeFunction = require('./Stade.js');
const Stade = StadeFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Tribune = sequelize.define('Tribune', {
    idTribune: {
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

Tribune.Stade = Tribune.belongsTo(Stade, {  foreignKey: 'idStade' });

return Tribune;
};
