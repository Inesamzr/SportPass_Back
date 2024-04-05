const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const PublicationFunction = require('./Publication.js');
const Publication = PublicationFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const LikePublication = sequelize.define('LikePublication',  {
        idLikePost: {
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

LikePublication.User = LikePublication.belongsTo(User, {  foreignKey: 'idUser' });
LikePublication.Publication = LikePublication.belongsTo(Publication, {  foreignKey: 'idPost' });


return LikePublication;
};
