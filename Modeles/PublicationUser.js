const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const PublicationUser = sequelize.define('PublicationUser', {
    idPublication: {
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

PublicationUser.User = PublicationUser.belongsTo(User, {  foreignKey: 'idUser', onDelete: 'CASCADE' });
    
return PublicationUser;
};
