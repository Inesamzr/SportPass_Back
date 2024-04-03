module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Festival', {
        idF: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        annee: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numEdition: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
    });
};
