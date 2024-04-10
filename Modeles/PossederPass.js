const sequelize = require('../database.js')
const Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    const PossederPass = sequelize.define('PossederPass', {
    idPossederPass: {
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
    
return PossederPass;
};
