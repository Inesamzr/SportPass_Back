const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const CommercantFunction = require('./Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const PublicationCommercant = sequelize.define('PublicationCommercant', {
    idPublication: {
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

PublicationCommercant.Commercant = PublicationCommercant.belongsTo(Commercant, {  foreignKey: 'idCommercant', onDelete: 'CASCADE' });
    
return PublicationCommercant;
};
