const sequelize = require('../database.js')
const Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    const Participer = sequelize.define('Participer', {
    idPartciper: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    estPresent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    aGagner: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    idConcours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Concours', 
            key: 'idConcours',      
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
    
return Participer;
};
