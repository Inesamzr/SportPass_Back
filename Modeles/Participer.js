module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Participer', {
        idParticiper : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        benevolePseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'mail',      
            }
        },
        festivalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Festival', 
                key: 'idF',        
            }
        },
    }, {
        freezeTableName: true, 
    });
};
