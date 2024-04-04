const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)

module.exports = function (sequelize, DataTypes) {
    const Abonnes = sequelize.define('Abonnes', {
    followerId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'idUser'
            }
    },
    followingId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'idUser'
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

return Abonnes;
};
