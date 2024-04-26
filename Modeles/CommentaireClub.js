const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PublicationClubFunction = require('./PublicationClub.js');
const PublicationClub = PublicationClubFunction(sequelize, Sequelize)
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const CommentaireClub = sequelize.define('CommentaireClub', {
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

CommentaireClub.PublicationClub = CommentaireClub.belongsTo(PublicationClub, {  foreignKey: 'idPublication' });
CommentaireClub.User = CommentaireClub.belongsTo(User, {  foreignKey: 'idUser' });

    
return CommentaireClub;
};
