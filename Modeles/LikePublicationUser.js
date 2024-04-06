const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const PublicationUserFunction = require('./PublicationUser.js');
const PublicationUser = PublicationUserFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const LikePublicationUser = sequelize.define('LikePublicationUser',  {
        idLikePost: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        idPublication: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'PublicationUser', 
                key: 'idPublication',      
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

return LikePublicationUser;
};
