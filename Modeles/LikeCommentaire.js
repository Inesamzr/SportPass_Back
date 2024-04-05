const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const CommentaireFunction = require('./Commentaire.js');
const Commentaire = CommentaireFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const LikeCommentaire = sequelize.define('LikeCommentaire', {
        idLikeCom: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
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

LikeCommentaire.User = LikeCommentaire.belongsTo(User, {  foreignKey: 'idUser' });
LikeCommentaire.Commentaire = LikeCommentaire.belongsTo(Commentaire, {  foreignKey: 'idCom' });


return LikeCommentaire;
};
