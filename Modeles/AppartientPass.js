const sequelize = require('../database.js')
const Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    const AppartientPass = sequelize.define('AppartientPass', {
    idAppartientPass: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idPass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Pass', 
            key: 'idPass',      
        }
    },
    idBillet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Billet', 
            key: 'idBillet',        
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
    
return AppartientPass;
};