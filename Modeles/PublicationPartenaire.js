const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PartenaireFunction = require('./Partenaire.js');
const Partenaire = PartenaireFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const PublicationPartenaire = sequelize.define('PublicationPartenaire', {
    idPublication: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    image: {
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

PublicationPartenaire.Partenaire = PublicationPartenaire.belongsTo(Partenaire, {  foreignKey: 'idPartenaire', onDelete: 'CASCADE' });
    
return PublicationPartenaire;
};
