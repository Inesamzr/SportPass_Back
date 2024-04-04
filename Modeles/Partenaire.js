const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PromotionFunction = require('./Promotion.js');
const Promotion = PromotionFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Partenaire = sequelize.define('Partenaire', {
    idPartenaire: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    site: {
        type: DataTypes.STRING,
        allowNull: true
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

Partenaire.Promotion = Partenaire.belongsTo(Promotion, {  foreignKey: 'idPromotion' });
    
return Partenaire;
};
