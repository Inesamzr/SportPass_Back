const sequelize = require('../database.js')
const Sequelize = require('sequelize');

//importation des modéles :
const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)

const FestivalFunction = require('./festival.js');
const Festival = FestivalFunction(sequelize, Sequelize)

const ParticiperFunction = require('./Participer.js');
const Participer = ParticiperFunction(sequelize, Sequelize)




User.Festival = User.belongsToMany(Festival, { through: Participer, foreignKey: 'benevolePseudo' });
Festival.User = Festival.belongsToMany(User, { through: Participer, foreignKey: 'festivalId' });


(async () => {
    try {
        await sequelize.sync({ alter: true, force: false }); /* si je met force: true, ça supprime la base 
        de données et la recrée à chaque fois que je lance le serveur et si je met alter: true, 
        ça modifie la base de données en fonction des modèles (si j'ajoute un champ dans un modèle, 
        il sera ajouté à la base de données) et si je met des données dans la BD et que je veux les garder, 
        je met force: false*/
        console.log('Les modèles ont été synchronisés avec la base de données !');
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la synchronisation des modèles avec la base de données : ', error);
    }
})();

module.exports = {
    User
}