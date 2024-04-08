const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const LikeCommentaireClubFunction = require('../Modeles/LikeCommentaireClub.js'); 
const LikeCommentaireClub = LikeCommentaireClubFunction(sequelize, Sequelize);

const createLike = async (req, res) => {
  try {
    const { idUser, idCommentaire } = req.body; 
    const like = await LikeCommentaireClub.create({ idUser, idCommentaire });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByCommentId = async (req, res) => {
  try {
    const idCommentaire = req.params.id;
    const likes = await LikeCommentaireClub.findAll({ where: { idCommentaire } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const likes = await LikeCommentaireClub.findAll({ where: { idUser } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const idLikeCom = req.params.id; 
    const result = await LikeCommentaireClub.destroy({ where: { idLikeCom } });
    if (result === 0) {
      return res.status(404).send({ message: 'Like not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  createLike,
  getLikesByCommentId,
  getLikesByUserId,
  deleteLike,
};
