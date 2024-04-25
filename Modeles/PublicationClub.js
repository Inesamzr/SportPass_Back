const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const EquipeFunction = require('./Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const PublicationClub = sequelize.define('PublicationClub', {
    idPublication: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contenu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aLaUne: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },  
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    date: {
        type: DataTypes.DATE,
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

PublicationClub.Equipe = PublicationClub.belongsTo(Equipe, {  foreignKey: 'idEquipe', onDelete: 'CASCADE' });
    
return PublicationClub;
};
