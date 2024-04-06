const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PublicationUserFunction = require('./PublicationUser.js');
const PublicationUser = PublicationUserFunction(sequelize, Sequelize)
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const CommentaireUser = sequelize.define('CommentaireUser', {
    idCommentaire: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contenu: {
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

CommentaireUser.PublicationUser = CommentaireUser.belongsTo(PublicationUser, {  foreignKey: 'idPublication' });
CommentaireUser.User = CommentaireUser.belongsTo(User, {  foreignKey: 'idUser' });

    
return CommentaireUser;
};
