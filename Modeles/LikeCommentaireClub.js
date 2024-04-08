const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const CommentaireClubFunction = require('./CommentaireClub.js');
const CommentaireClub = CommentaireClubFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const LikeCommentaireClub = sequelize.define('LikeCommentaireClub', {
        idLikeCom: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        idCommentaire: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CommentaireClub', 
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


return LikeCommentaireClub;
};
