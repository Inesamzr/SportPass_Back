const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const CommentaireUserFunction = require('./CommentaireUser.js');
const CommentaireUser = CommentaireUserFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const LikeCommentaireUser = sequelize.define('LikeCommentaireUser', {
        idLikeCom: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        idCommentaire: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CommentaireUser', 
                key: 'idCommentaire',      
            }
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'idUser',        
            }
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


return LikeCommentaireUser;
};
