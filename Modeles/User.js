const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const RoleFunction = require('./Role.js');
const Role = RoleFunction(sequelize, Sequelize)
const PalierFunction = require('./Palier.js');
const Palier = PalierFunction(sequelize, Sequelize)


module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numTel: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 10]
            }
        },
        adresse: {
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

    User.Role = User.belongsTo(Role, {  foreignKey: 'idRole' });
    User.Palier = User.belongsTo(Palier, { foreignKey: 'idPalier' });

    return User;
};
