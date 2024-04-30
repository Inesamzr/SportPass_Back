const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const MatchsFunction = require('./Matchs.js');
const Matchs = MatchsFunction(sequelize, Sequelize)
const PlaceFunction = require('./Place.js');
const Place = PlaceFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const Billet = sequelize.define('Billet', {
    idBillet: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    reservee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false 
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    urlPDF: {
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

Billet.User = Billet.belongsTo(User, {  foreignKey: 'idUser', allowNull: true, onDelete: 'CASCADE' });
Billet.Matchs = Billet.belongsTo(Matchs, {  foreignKey: 'idMatch' });
Billet.Place = Billet.belongsTo(Place, {  foreignKey: 'idPlace' });

    
return Billet;
};
