const sequelize = require('../database.js')
const Sequelize = require('sequelize');

const UserFunction = require('./User.js');
const User = UserFunction(sequelize, Sequelize)
const ConcoursFunction = require('./Concours.js');
const Concours = ConcoursFunction(sequelize, Sequelize)
const ParticiperJeuFunction = require('./ParticiperJeu.js');
const ParticiperJeu = ParticiperJeuFunction(sequelize, Sequelize)
const BilletFunction = require('./Billet.js');
const Billet = BilletFunction(sequelize, Sequelize)
const CashBackCommercantFunction = require('./CashBackCommercant.js');
const CashBackCommercant = CashBackCommercantFunction(sequelize, Sequelize)
const CommentaireFunction = require('./Commentaire.js');
const Commentaire = CommentaireFunction(sequelize, Sequelize)
const CommercantFunction = require('./Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize)
const EquipeFunction = require('./Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize)
const MatchsFunction = require('./Matchs.js');
const Matchs = MatchsFunction(sequelize, Sequelize)
const PalierFunction = require('./Palier.js');
const Palier = PalierFunction(sequelize, Sequelize)
const PartenaireFunction = require('./Partenaire.js');
const Partenaire = PartenaireFunction(sequelize, Sequelize)
const PlaceFunction = require('./Place.js');
const Place = PlaceFunction(sequelize, Sequelize)
const PromotionFunction = require('./Promotion.js');
const Promotion = PromotionFunction(sequelize, Sequelize)
const PublicationFunction = require('./Publication.js');
const Publication = PublicationFunction(sequelize, Sequelize)
const RangeeFunction = require('./Rangee.js');
const Rangee = RangeeFunction(sequelize, Sequelize)
const RoleFunction = require('./Role.js');
const Role = RoleFunction(sequelize, Sequelize)
const StadeFunction = require('./Stade.js');
const Stade = StadeFunction(sequelize, Sequelize)
const TribuneFunction = require('./Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize)
const TypeCommercantFunction = require('./TypeCommercant.js');
const TypeCommercant = TypeCommercantFunction(sequelize, Sequelize)
const TypePlaceFunction = require('./TypePlace.js');
const TypePlace = TypePlaceFunction(sequelize, Sequelize)
const PossederRoleFunction = require('./PossederRole.js');
const PossederRole = PossederRoleFunction(sequelize, Sequelize)
const AbonnesFunction = require('./Abonnes.js');
const Abonnes = AbonnesFunction(sequelize, Sequelize)
const LikeCommentaireFunction = require('./LikeCommentaire.js');
const LikeCommentaire = LikeCommentaireFunction(sequelize, Sequelize)
const LikePublicationFunction = require('./LikePublication.js');
const LikePublication = LikePublicationFunction(sequelize, Sequelize)
const PassFunction = require('./Pass.js');
const Pass = PassFunction(sequelize, Sequelize)
const PossederPassFunction = require('./PossederPass.js');
const PossederPass = PossederPassFunction(sequelize, Sequelize)
const AppartientPassFunction = require('./AppartientPass.js');
const AppartientPass = AppartientPassFunction(sequelize, Sequelize)


User.Concours = User.belongsToMany(Concours, { through: ParticiperJeu, foreignKey: 'idUser', onDelete: 'CASCADE' });
Concours.User = Concours.belongsToMany(User, { through: ParticiperJeu, foreignKey: 'idConcours' });

User.Role = User.belongsToMany(Role, { through: PossederRole, foreignKey: 'idUser', onDelete: 'CASCADE' });
Role.User = Role.belongsToMany(User, { through: PossederRole, foreignKey: 'idRole' });

User.User = User.belongsToMany(User, { through: Abonnes, as: 'Followers', foreignKey: 'followingId', otherKey: 'followerId' });
User.User = User.belongsToMany(User, { through: Abonnes, as: 'Followings', foreignKey: 'followerId', otherKey: 'followingId' });

User.Pass = User.belongsToMany(Pass, { through: PossederPass, foreignKey: 'idUser', onDelete: 'CASCADE' });
Pass.User = Pass.belongsToMany(User, { through: PossederPass, foreignKey: 'idPass', onDelete: 'CASCADE' });

Billet.Pass = Billet.belongsToMany(Pass, { through: AppartientPass, foreignKey: 'idBillet', onDelete: 'CASCADE' });
Pass.Billet = Pass.belongsToMany(Billet, { through: AppartientPass, foreignKey: 'idPass', onDelete: 'CASCADE' });

(async () => {
    try {
        await sequelize.sync({ alter: true, force: true }); /* si je met force: true, ça supprime la base 
        de données et la recrée à chaque fois que je lance le serveur et si je met alter: true, 
        ça modifie la base de données en fonction des modèles (si j'ajoute un champ dans un modèle, 
        il sera ajouté à la base de données) et si je met des données dans la BD et que je veux les garder, 
        je met force: false*/
        console.log('Les modèles ont été synchronisés avec la base de données !');
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la synchronisation des modèles avec la base de données : ', error);
    }
})();

module.exports = { User, Concours, ParticiperJeu, Billet, CashBackCommercant, Commentaire, Commercant, Equipe, Matchs, Palier, Partenaire, Place, Promotion, Publication, Rangee, Role, Stade, Tribune, TypeCommercant, TypePlace, LikePublication, LikeCommentaire, Pass, PossederPass, AppartientPass, PossederRole}