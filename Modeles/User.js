const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const PalierFunction = require('./Palier.js');
const Palier = PalierFunction(sequelize, Sequelize)
const EquipeFunction = require('./Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize)


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
        pseudo: {
            type: DataTypes.STRING,
            unique: true,
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
        tel: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 10]
            }
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: true
        },
        biographie: {
            type: DataTypes.STRING,
            allowNull: true
        },
        somme: {
            type: DataTypes.FLOAT,
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

    User.Palier = User.belongsTo(Palier, { foreignKey: 'idPalier' });
    User.Equipe = User.belongsTo(Equipe, { foreignKey: 'idEquipe', allowNull: false });

    return User;
};
