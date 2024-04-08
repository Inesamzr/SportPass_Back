const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const LikeCommentairePartenaireFunction = require('../Modeles/LikeCommentairePartenaire.js'); 
const LikeCommentairePartenaire = LikeCommentairePartenaireFunction(sequelize, Sequelize);

const createLike = async (req, res) => {
  try {
    const { idUser, idCommentaire } = req.body; 
    const like = await LikeCommentairePartenaire.create({ idUser, idCommentaire });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByCommentId = async (req, res) => {
  try {
    const idCommentaire = req.params.id;
    const likes = await LikeCommentairePartenaire.findAll({ where: { idCommentaire } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const likes = await LikeCommentairePartenaire.findAll({ where: { idUser } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const idLikeCom = req.params.id; 
    const result = await LikeCommentairePartenaire.destroy({ where: { idLikeCom } });
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
