const sequelize = require('../database.js')
const Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    const Posseder = sequelize.define('Posseder', {
    idPosseder: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Role', 
            key: 'idRole',      
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
    
return Posseder;
};
