const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PublicationCommercantFunction = require('./PublicationCommercant.js');
const PublicationCommercant = PublicationCommercantFunction(sequelize, Sequelize)
const CommercantFunction = require('./Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const CommentaireCommercant = sequelize.define('CommentaireCommercant', {
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

CommentaireCommercant.PublicationCommercant = CommentaireCommercant.belongsTo(PublicationCommercant, {  foreignKey: 'idPublication' });
CommentaireCommercant.Commercant = CommentaireCommercant.belongsTo(Commercant, {  foreignKey: 'idCommercant' });

    
return CommentaireCommercant;
};
