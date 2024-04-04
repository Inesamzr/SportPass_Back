const express = require('express');
const authentification = require('../Middleware/auth');

const userController = require('../Controllers/UserController.js');
const billetController =  require('../Controllers/BilletController.js');
const cashBackCommercantController =  require('../Controllers/CashBackCommercantController.js');
const commentaireController =  require('../Controllers/CommentaireController.js');
const commercantController =  require('../Controllers/CommercantController.js');
const concoursController =  require('../Controllers/ConcoursController.js');
const equipeController =  require('../Controllers/EquipeController.js');
const matchsController =  require('../Controllers/MatchsController.js');
const palierController =  require('../Controllers/PalierController.js');
const partenaireController =  require('../Controllers/PartenaireController.js');
const participerController =  require('../Controllers/ParticiperController.js');
const placeController =  require('../Controllers/PlaceController.js');
const possederController =  require('../Controllers/PossederController.js');
const promotionController =  require('../Controllers/PromotionController.js');
const publicationController =  require('../Controllers/PublicationController.js');
const rangeeController =  require('../Controllers/RangeeController.js');
const roleController =  require('../Controllers/RoleController.js');
const stadeController =  require('../Controllers/StadeController.js');
const tribuneController =  require('../Controllers/TribuneController.js');
const typeCommercantController =  require('../Controllers/TypeCommercantController.js');
const typePlaceController =  require('../Controllers/TypePlaceController.js');
const abonnesController =  require('../Controllers/AbonnesController.js');


const router = express.Router();

//routes user
router.post('/registration', userController.register);
router.post('/login', userController.login);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

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

//routes commenatire
router.get('/commentaire', commentaireController.getAllCommentaires);
router.post('/commentaire', commentaireController.createCommentaire);
router.get('/commentaire/:id', commentaireController.getCommentaireById);
router.put('/commentaire/:id', commentaireController.updateCommentaire);
router.delete('/commentaire/:id', commentaireController.deleteCommentaire);

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

//routes participer
router.get('/participer', participerController.getAllParticipations);
router.post('/participer',participerController.createParticipation);
router.get('/participer/:id', participerController.getParticipationById);
router.put('/participer/:id', participerController.updateParticipation);
router.delete('/participer/:id', participerController.deleteParticipation);

//routes place
router.get('/place', placeController.getAllPlaces);
router.post('/place',placeController.createPlace);
router.get('/place/:id', placeController.getPlaceById);
router.put('/place/:id', placeController.updatePlace);
router.delete('/place/:id', placeController.deletePlace);


//routes posseder
router.get('/posseder', possederController.getAllPosseder);
router.post('/posseder',possederController.createPosseder);
router.get('/posseder/:id', possederController.getPossederById);
router.put('/posseder/:id', possederController.updatePosseder);
router.delete('/posseder/:id', possederController.deletePosseder);

//routes promotion
router.get('/promotion', promotionController.getAllPromotions);
router.post('/promotion',promotionController.createPromotion);
router.get('/promotion/:id', promotionController.getPromotionById);
router.put('/promotion/:id', promotionController.updatePromotion);
router.delete('/promotion/:id', promotionController.deletePromotion);


//routes publication
router.get('/publication', publicationController.getAllPublications);
router.post('/publication',publicationController.createPublication);
router.get('/publication/:id', publicationController.getPublicationById);
router.put('/publication/:id', publicationController.updatePublication);
router.delete('/publication/:id', publicationController.deletePublication);


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

//routes abonnes
router.post('/abonnes/:followerId/:followingId', abonnesController.createAbonnes);
router.delete('/abonnes/:followerId/:followingId', abonnesController.deleteAbonnes);
router.get('/abonnes/followers/:followingId', abonnesController.getFollowersByFollowingId);
router.get('/abonnes/following/:followerId', abonnesController.getFollowingByFollowerId);


module.exports = router;