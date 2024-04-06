const express = require('express');
const authentification = require('../Middleware/auth');

const userController = require('../Controllers/UserController.js');
const billetController =  require('../Controllers/BilletController.js');
const cashBackCommercantController =  require('../Controllers/CashBackCommercantController.js');
const CommentaireUserController =  require('../Controllers/CommentaireUserController.js');
const CommentaireCommercantController =  require('../Controllers/CommentaireCommercantController.js');
const commercantController =  require('../Controllers/CommercantController.js');
const concoursController =  require('../Controllers/ConcoursController.js');
const equipeController =  require('../Controllers/EquipeController.js');
const matchsController =  require('../Controllers/MatchsController.js');
const palierController =  require('../Controllers/PalierController.js');
const partenaireController =  require('../Controllers/PartenaireController.js');
const ParticiperJeuController =  require('../Controllers/ParticiperJeuController.js');
const placeController =  require('../Controllers/PlaceController.js');
const possederRoleController =  require('../Controllers/PossederRoleController.js');
const promotionController =  require('../Controllers/PromotionController.js');
const PublicationUserController =  require('../Controllers/PublicationUserController.js');
const rangeeController =  require('../Controllers/RangeeController.js');
const roleController =  require('../Controllers/RoleController.js');
const stadeController =  require('../Controllers/StadeController.js');
const tribuneController =  require('../Controllers/TribuneController.js');
const typeCommercantController =  require('../Controllers/TypeCommercantController.js');
const typePlaceController =  require('../Controllers/TypePlaceController.js');
const abonnesController =  require('../Controllers/AbonnesController.js');
const LikeCommentaireUserController =  require('../Controllers/LikeCommentaireUserController.js');
const LikePublicationUserController =  require('../Controllers/LikePublicationUserController.js');
const LikeCommentaireCommercantController =  require('../Controllers/LikeCommentaireCommercantController.js');
const LikePublicationCommercantController =  require('../Controllers/LikePublicationCommercantController.js');
const passController =  require('../Controllers/PassController.js');
const possederPassController =  require('../Controllers/PossederPassController.js');
const appartientPassController =  require('../Controllers/AppartientPassController.js');
const avoirFavorisController =  require('../Controllers/AvoirFavorisController.js');
const PublicationCommercantController =  require('../Controllers/PublicationCommercantController.js');

const app = require('../app.js');



const router = express.Router();

//routes user
router.post('/registration', userController.register);
router.post('/login', userController.login);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:idUser', userController.deleteUser);

//routes abonnes
router.post('/abonnes/:followerId/:followingId', abonnesController.createAbonnes);
router.delete('/abonnes/:followerId/:followingId', abonnesController.deleteAbonnes);
router.get('/abonnes/followers/:followingId', abonnesController.getFollowersByFollowingId);
router.get('/abonnes/following/:followerId', abonnesController.getFollowingByFollowerId);

//routes appartientPass
router.get('/appartientPass', appartientPassController.getAllAppartenance);
router.post('/appartientPass',appartientPassController.createAppartenance);
router.get('/appartientPass/billet/:id', appartientPassController.getAppartenanceByIdBillet);
router.get('/appartientPass/pass/:id', appartientPassController.getAppartenanceByIdPass);
router.delete('/appartientPass/:id', appartientPassController.deleteAppartenance);

//routes avoirFavoris
router.get('/avoirFavoris', avoirFavorisController.getAllFavoris);
router.post('/avoirFavoris',avoirFavorisController.createFavoris);
router.get('/avoirFavoris/user/:id', avoirFavorisController.getFavorisByIdUser);
router.get('/avoirFavoris/commercant/:id', avoirFavorisController.getFavorisByIdCommercant);
router.delete('/avoirFavoris/:id', avoirFavorisController.deleteFavoris);

//routes billet
router.get('/billet', billetController.getAllBillets);
router.post('/billet', billetController.createBillet);
router.get('/billet/:id', billetController.getBilletById);
router.put('/billet/:id', billetController.updateBillet);
router.delete('/billet/:id', billetController.deleteBillet);

//routes cashBackCommercant
router.get('/cashBackCommercant', cashBackCommercantController.getAllCashBackCommercants);
router.post('/cashBackCommercant', cashBackCommercantController.createCashBackCommercant);
router.get('/cashBackCommercant/:id', cashBackCommercantController.getCashBackCommercantById);
router.put('/cashBackCommercant/:id', cashBackCommercantController.updateCashBackCommercant);
router.delete('/cashBackCommercant/:id', cashBackCommercantController.deleteCashBackCommercant);

//routes commentaireUser
router.get('/commentaireUser', CommentaireUserController.getAllCommentaireUsers);
router.post('/commentaireUser', CommentaireUserController.createCommentaireUser);
router.get('/commentaireUser/user/:id', CommentaireUserController.getCommentaireByIdUser);
router.get('/commentaireUser/publication/:id', CommentaireUserController.getCommentaireByPublicationId);
router.put('/commentaireUser/:id', CommentaireUserController.updateCommentaireUser);
router.delete('/commentaireUser/:id', CommentaireUserController.deleteCommentaireUser);

//routes commentaireCommercant
router.get('/commentaireCommercant', CommentaireCommercantController.getAllCommentaireCommercants);
router.post('/commentaireCommercant', CommentaireCommercantController.createCommentaireCommercant);
router.get('/commentaireCommercant/user/:id', CommentaireCommercantController.getCommentaireByIdUser);
router.get('/commentaireCommercant/publication/:id', CommentaireCommercantController.getCommentaireByPublicationId);
router.put('/commentaireCommercant/:id', CommentaireCommercantController.updateCommentaireCommercant);
router.delete('/commentaireCommercant/:id', CommentaireCommercantController.deleteCommentaireCommercant);

//routes commercant
router.get('/commercant', commercantController.getAllCommercants);
router.post('/commercant', commercantController.createCommercant);
router.get('/commercant/:id', commercantController.getCommercantById);
router.put('/commercant/:id', commercantController.updateCommercant);
router.delete('/commercant/:id', commercantController.deleteCommercant);

//routes concours
router.get('/concours', concoursController.getAllConcours);
router.post('/concours',concoursController.createConcours);
router.get('/concours/:id', concoursController.getConcoursById);
router.put('/concours/:id', concoursController.updateConcours);
router.delete('/concours/:id', concoursController.deleteConcours);

//routes equipe
router.get('/equipe', equipeController.getAllEquipes);
router.post('/equipe',equipeController.createEquipe);
router.get('/equipe/:id', equipeController.getEquipeById);
router.put('/equipe/:id', equipeController.updateEquipe);
router.delete('/equipe/:id', equipeController.deleteEquipe);

//routes LikeCommentaireUser
router.post('/likeCommentaireUser',LikeCommentaireUserController.createLike);
router.get('/likeCommentaireUser/commentaireUser/:id', LikeCommentaireUserController.getLikesByCommentId);
router.get('/likeCommentaireUser/user/:id', LikeCommentaireUserController.getLikesByUserId);
router.delete('/likeCommentaireUser/:id', LikeCommentaireUserController.deleteLike);

//routes likePublicationUser
router.post('/likePublicationUser',LikePublicationUserController.createLike);
router.get('/likePublicationUser/publicationUser/:id', LikePublicationUserController.getLikesByPostId);
router.get('/likePublicationUser/user/:id', LikePublicationUserController.getLikesByUserId);
router.delete('/likePublicationUser/:id', LikePublicationUserController.deleteLike);

//routes likeCommentaireCommercant
router.post('/likeCommentaireCommercant',LikeCommentaireCommercantController.createLike);
router.get('/likeCommentaireCommercant/commentaireCommercant/:id', LikeCommentaireCommercantController.getLikesByCommentId);
router.get('/likeCommentaireCommercant/user/:id', LikeCommentaireCommercantController.getLikesByUserId);
router.delete('/likeCommentaireCommercant/:id', LikeCommentaireCommercantController.deleteLike);

//routes likePublicationCommmercant
router.post('/likePublicationCommmercant',LikePublicationCommercantController.createLike);
router.get('/likePublicationCommmercant/publicationCommentaire/:id', LikePublicationCommercantController.getLikesByPostId);
router.get('/likePublicationCommmercant/user/:id', LikePublicationCommercantController.getLikesByUserId);
router.delete('/likePublicationCommmercant/:id', LikePublicationCommercantController.deleteLike);

//routes matchs
router.get('/matchs', matchsController.getAllMatches);
router.post('/matchs',matchsController.createMatch);
router.get('/matchs/:id', matchsController.getMatchById);
router.put('/matchs/:id', matchsController.updateMatch);
router.delete('/matchs/:id', matchsController.deleteMatch);

//routes palier
router.get('/palier', palierController.getAllPaliers);
router.post('/palier',palierController.createPalier);
router.get('/palier/:id', palierController.getPalierById);
router.put('/palier/:id', palierController.updatePalier);
router.delete('/palier/:id', palierController.deletePalier);

//routes partenaire
router.get('/partenaire', partenaireController.getAllPartenaires);
router.post('/partenaire',partenaireController.createPartenaire);
router.get('/partenaire/:id', partenaireController.getPartenaireById);
router.put('/partenaire/:id', partenaireController.updatePartenaire);
router.delete('/partenaire/:id', partenaireController.deletePartenaire);

//routes participerJeu
router.get('/participerJeu', ParticiperJeuController.getAllParticipations);
router.post('/participerJeu',ParticiperJeuController.createParticipation);
router.get('/participerJeu/:id', ParticiperJeuController.getParticipationById);
router.put('/participerJeu/:id', ParticiperJeuController.updateParticipation);
router.delete('/participerJeu/:id', ParticiperJeuController.deleteParticipation);

//routes passController
router.get('/pass', passController.getAllPasses);
router.post('/pass',passController.createPass);
router.get('/pass/:id', passController.getPassById);
router.put('/pass/:id', passController.updatePass);
router.delete('/pass/:id', passController.deletePass);

//routes place
router.get('/place', placeController.getAllPlaces);
router.post('/place',placeController.createPlace);
router.get('/place/:id', placeController.getPlaceById);
router.put('/place/:id', placeController.updatePlace);
router.delete('/place/:id', placeController.deletePlace);


//routes posseder
router.get('/possederRole', possederRoleController.getAllPossederRole);
router.post('/possederRole',possederRoleController.createPossederRole);
router.get('/possederRole/:id', possederRoleController.getPossederRoleById);
router.put('/possederRole/:id', possederRoleController.updatePossederRole);
router.delete('/possederRole/:id', possederRoleController.deletePossederRole);

//routes possederPass
router.get('/possederPass', possederPassController.getAllPossession);
router.post('/possederPass',possederPassController.createPossession);
router.get('/possederPass/user/:id', possederPassController.getPossessionByIDUser);
router.get('/possederPass/pass/:id', possederPassController.getPossessionByIdPass);
router.delete('/possederPass/:id', possederPassController.deletePossession);

//routes promotion
router.get('/promotion', promotionController.getAllPromotions);
router.post('/promotion',promotionController.createPromotion);
router.get('/promotion/:id', promotionController.getPromotionById);
router.put('/promotion/:id', promotionController.updatePromotion);
router.delete('/promotion/:id', promotionController.deletePromotion);


//routes PublicationUser
router.get('/publicationUser', PublicationUserController.getAllPublicationUsers);
router.post('/publicationUser',PublicationUserController.createPublicationUser);
router.get('/publicationUser/:id', PublicationUserController.getPublicationUserById);
router.put('/publicationUser/:id', PublicationUserController.updatePublicationUser);
router.delete('/publicationUser/:id', PublicationUserController.deletePublicationUser);
router.get('/publicationUser/user/:idUser', PublicationUserController.getPublicationUsersByUserId);

//routes PublicationCommercant
router.get('/publicationCommercant', PublicationCommercantController.getAllPublicationCommercants);
router.post('/publicationCommercant',PublicationCommercantController.createPublicationCommercant);
router.get('/publicationCommercant/:id', PublicationCommercantController.getPublicationCommercantById);
router.put('/publicationCommercant/:id', PublicationCommercantController.updatePublicationCommercant);
router.delete('/publicationCommercant/:id', PublicationCommercantController.deletePublicationCommercant);
router.get('/publicationCommercant/commercant/:id', PublicationCommercantController.getPublicationCommercantById);

//routes rangee
router.get('/rangee', rangeeController.getAllRangees);
router.post('/rangee',rangeeController.createRangee);
router.get('/rangee/:id', rangeeController.getRangeeById);
router.put('/rangee/:id', rangeeController.updateRangee);
router.delete('/rangee/:id', rangeeController.deleteRangee);

//routes role
router.get('/role', roleController.getAllRoles);
router.post('/role',roleController.createRole);
router.get('/role/:id', roleController.getRoleById);
router.put('/role/:id', roleController.updateRole);
router.delete('/role/:id', roleController.deleteRole);

//routes stade
router.get('/stade', stadeController.getAllStades);
router.post('/stade',stadeController.createStade);
router.get('/stade/:id', stadeController.getStadeById);
router.put('/stade/:id', stadeController.updateStade);
router.delete('/stade/:id', stadeController.deleteStade);

//routes tribune
router.get('/tribune', tribuneController.getAllTribunes);
router.post('/tribune',tribuneController.createTribune);
router.get('/tribune/:id', tribuneController.getTribuneById);
router.put('/tribune/:id', tribuneController.updateTribune);
router.delete('/tribune/:id', tribuneController.deleteTribune);

//routes typeCommercant
router.get('/typeCommercant', typeCommercantController.getAllTypeCommercants);
router.post('/typeCommercant',typeCommercantController.createTypeCommercant);
router.get('/typeCommercant/:id', typeCommercantController.getTypeCommercantById);
router.put('/typeCommercant/:id', typeCommercantController.updateTypeCommercant);
router.delete('/typeCommercant/:id', typeCommercantController.deleteTypeCommercant);

//routes typePlace
router.get('/typePlace', typePlaceController.getAllTypePlaces);
router.post('/typePlace', typePlaceController.createTypePlace);
router.get('/typePlace/:id', typePlaceController.getTypePlaceById);
router.put('/typePlace/:id', typePlaceController.updateTypePlace);
router.delete('/typePlace/:id', typePlaceController.deleteTypePlace);




module.exports = router;