const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const LikeCommentaireFunction = require('../Modeles/LikeCommentaire.js'); 
const LikeCommentaire = LikeCommentaireFunction(sequelize, Sequelize);

const createLike = async (req, res) => {
  try {
    const { idUser, idCom } = req.body; 
    const like = await LikeCommentaire.create({ idUser, idCom });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByCommentId = async (req, res) => {
  try {
    const { idCom } = req.params;
    const likes = await LikeCommentaire.findAll({ where: { idCom } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const likes = await LikeCommentaire.findAll({ where: { idUser } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const { idLikeCom } = req.params; 
    const result = await LikeCommentaire.destroy({ where: { idLikeCom } });
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
