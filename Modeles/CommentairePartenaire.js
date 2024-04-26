const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PublicationPartenaireFunction = require('./PublicationPartenaire.js');
const PublicationPartenaire = PublicationPartenaireFunction(sequelize, Sequelize)
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const CommentairePartenaire = sequelize.define('CommentairePartenaire', {
    idCommentaire: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contenu: {
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

CommentairePartenaire.PublicationPartenaire = CommentairePartenaire.belongsTo(PublicationPartenaire, {  foreignKey: 'idPublication' });
CommentairePartenaire.User = CommentairePartenaire.belongsTo(User, {  foreignKey: 'idUser' });

    
return CommentairePartenaire;
};
