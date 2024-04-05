const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const StadeFunction = require('./Stade.js');
const Stade = StadeFunction(sequelize, Sequelize)
const EquipeFunction = require('./Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Matchs = sequelize.define('Matchs', {
    idMatch: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    heure_debut: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heure_fin: {
        type: DataTypes.STRING,
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

Matchs.Stade = Matchs.belongsTo(Stade, {  foreignKey: 'idStade' });
Matchs.belongsTo(Equipe, { as: 'EquipeDomicile', foreignKey: 'idEquipeDomicile' });
Matchs.belongsTo(Equipe, { as: 'EquipeExterieure', foreignKey: 'idEquipeExterieure' });

 
return Matchs;
};
