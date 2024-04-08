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
const CommentaireUserFunction = require('./CommentaireUser.js');
const CommentaireUser = CommentaireUserFunction(sequelize, Sequelize)
const CommentaireCommercantFunction = require('./CommentaireCommercant.js');
const CommentaireCommercant = CommentaireCommercantFunction(sequelize, Sequelize)
const CommentaireClubFunction = require('./CommentaireClub.js');
const CommentaireClub = CommentaireClubFunction(sequelize, Sequelize)
const CommentairePartenaireFunction = require('./CommentairePartenaire.js');
const CommentairePartenaire = CommentairePartenaireFunction(sequelize, Sequelize)
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
const PublicationUserFunction = require('./PublicationUser.js');
const PublicationUser = PublicationUserFunction(sequelize, Sequelize)
const PublicationCommercantFunction = require('./PublicationCommercant.js');
const PublicationCommercant = PublicationCommercantFunction(sequelize, Sequelize)
const PublicationClubFunction = require('./PublicationClub.js');
const PublicationClub = PublicationClubFunction(sequelize, Sequelize)
const PublicationPartenaireFunction = require('./PublicationPartenaire.js');
const PublicationPartenaire = PublicationPartenaireFunction(sequelize, Sequelize)
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
const LikeCommentaireUserFunction = require('./LikeCommentaireUser.js');
const LikeCommentaireUser = LikeCommentaireUserFunction(sequelize, Sequelize)
const LikePublicationUserFunction = require('./LikePublicationUser.js');
const LikePublicationUser = LikePublicationUserFunction(sequelize, Sequelize)
const LikeCommentaireCommercantFunction = require('./LikeCommentaireCommercant.js');
const LikeCommentaireCommercant = LikeCommentaireCommercantFunction(sequelize, Sequelize)
const LikePublicationCommercantFunction = require('./LikePublicationCommercant.js');
const LikePublicationCommercant = LikePublicationCommercantFunction(sequelize, Sequelize)
const LikeCommentaireClubFunction = require('./LikeCommentaireClub.js');
const LikeCommentaireClub = LikeCommentaireClubFunction(sequelize, Sequelize)
const LikePublicationClubFunction = require('./LikePublicationClub.js');
const LikePublicationClub = LikePublicationClubFunction(sequelize, Sequelize)
const LikeCommentairePartenaireFunction = require('./LikeCommentairePartenaire.js');
const LikeCommentairePartenaire = LikeCommentairePartenaireFunction(sequelize, Sequelize)
const LikePublicationPartenaireFunction = require('./LikePublicationPartenaire.js');
const LikePublicationPartenaire = LikePublicationPartenaireFunction(sequelize, Sequelize)
const PassFunction = require('./Pass.js');
const Pass = PassFunction(sequelize, Sequelize)
const PossederPassFunction = require('./PossederPass.js');
const PossederPass = PossederPassFunction(sequelize, Sequelize)
const AppartientPassFunction = require('./AppartientPass.js');
const AppartientPass = AppartientPassFunction(sequelize, Sequelize)
const AvoirFavorisFunction = require('./AvoirFavoris.js');
const AvoirFavoris = AvoirFavorisFunction(sequelize, Sequelize)

User.Concours = User.belongsToMany(Concours, { through: ParticiperJeu, foreignKey: 'idUser', onDelete: 'CASCADE' });
Concours.User = Concours.belongsToMany(User, { through: ParticiperJeu, foreignKey: 'idConcours' });

User.Role = User.belongsToMany(Role, { through: PossederRole, foreignKey: 'idUser', onDelete: 'CASCADE' });
Role.User = Role.belongsToMany(User, { through: PossederRole, foreignKey: 'idRole', onDelete: 'CASCADE' });

User.User = User.belongsToMany(User, { through: Abonnes, as: 'Followers', foreignKey: 'followingId', otherKey: 'followerId' });
User.User = User.belongsToMany(User, { through: Abonnes, as: 'Followings', foreignKey: 'followerId', otherKey: 'followingId' });

User.Pass = User.belongsToMany(Pass, { through: PossederPass, foreignKey: 'idUser', onDelete: 'CASCADE' });
Pass.User = Pass.belongsToMany(User, { through: PossederPass, foreignKey: 'idPass', onDelete: 'CASCADE' });

Billet.Pass = Billet.belongsToMany(Pass, { through: AppartientPass, foreignKey: 'idBillet', onDelete: 'CASCADE' });
Pass.Billet = Pass.belongsToMany(Billet, { through: AppartientPass, foreignKey: 'idPass', onDelete: 'CASCADE' });

User.Commercant = User.belongsToMany(Commercant, { through: AvoirFavoris, foreignKey: 'idUser', onDelete: 'CASCADE' });
Commercant.User = Commercant.belongsToMany(User, { through: AvoirFavoris, foreignKey: 'idCommercant', onDelete: 'CASCADE' });

User.PublicationUser = User.belongsToMany(PublicationUser, { through: LikePublicationUser, foreignKey: 'idUser', onDelete: 'CASCADE' });
PublicationUser.User = PublicationUser.belongsToMany(User, { through: LikePublicationUser, foreignKey: 'idPublication', onDelete: 'CASCADE' });

User.CommentaireUser = User.belongsToMany(CommentaireUser, { through: LikeCommentaireUser, foreignKey: 'idUser', onDelete: 'CASCADE' });
CommentaireUser.User = CommentaireUser.belongsToMany(User, { through: LikeCommentaireUser, foreignKey: 'idCommentaire', onDelete: 'CASCADE' });

User.PublicationCommercant = User.belongsToMany(PublicationCommercant, { through: LikePublicationCommercant, foreignKey: 'idUser', onDelete: 'CASCADE' });
PublicationCommercant.User = PublicationCommercant.belongsToMany(User, { through: LikePublicationCommercant, foreignKey: 'idPublication', onDelete: 'CASCADE' });

User.CommentaireCommercant = User.belongsToMany(CommentaireCommercant, { through: LikeCommentaireCommercant, foreignKey: 'idUser', onDelete: 'CASCADE' });
CommentaireCommercant.User = CommentaireCommercant.belongsToMany(User, { through: LikeCommentaireCommercant, foreignKey: 'idCommentaire', onDelete: 'CASCADE' });

User.PublicationPartenaire = User.belongsToMany(PublicationPartenaire, { through: LikePublicationPartenaire, foreignKey: 'idUser', onDelete: 'CASCADE' });
PublicationPartenaire.User = PublicationPartenaire.belongsToMany(User, { through: LikePublicationPartenaire, foreignKey: 'idPublication', onDelete: 'CASCADE' });

User.CommentairePartenaire = User.belongsToMany(CommentairePartenaire, { through: LikeCommentairePartenaire, foreignKey: 'idUser', onDelete: 'CASCADE' });
CommentairePartenaire.User = CommentairePartenaire.belongsToMany(User, { through: LikeCommentairePartenaire, foreignKey: 'idCommentaire', onDelete: 'CASCADE' });

User.PublicationClub = User.belongsToMany(PublicationClub, { through: LikePublicationClub, foreignKey: 'idUser', onDelete: 'CASCADE' });
PublicationClub.User = PublicationClub.belongsToMany(User, { through: LikePublicationClub, foreignKey: 'idPublication', onDelete: 'CASCADE' });

User.CommentaireClub = User.belongsToMany(CommentaireClub, { through: LikeCommentaireClub, foreignKey: 'idUser', onDelete: 'CASCADE' });
CommentaireClub.User = CommentaireClub.belongsToMany(User, { through: LikeCommentaireClub, foreignKey: 'idCommentaire', onDelete: 'CASCADE' });


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

module.exports = { User, Concours, ParticiperJeu, Billet, CashBackCommercant, CommentaireUser, Commercant, Equipe, Matchs, Palier, Partenaire, Place, Promotion, PublicationUser, Rangee, Role, Stade, Tribune, TypeCommercant, TypePlace, LikePublicationUser, LikeCommentaireUser, Pass, PossederPass, AppartientPass, PossederRole, AvoirFavoris, PublicationCommercant, CommentaireCommercant, LikeCommentaireCommercant, LikePublicationCommercant, LikeCommentairePartenaire, LikePublicationPartenaire, PublicationPartenaire, CommentairePartenaire  }