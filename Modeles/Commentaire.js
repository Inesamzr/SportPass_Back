const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PublicationFunction = require('./Publication.js');
const Publication = PublicationFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Commentaire = sequelize.define('Commentaire', {
    idCom: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contenu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER
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

Commentaire.Publication = Commentaire.belongsTo(Publication, {  foreignKey: 'idPost' });
    
return Commentaire;
};
