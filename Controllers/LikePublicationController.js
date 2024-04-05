const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const LikePublicationFunction = require('../Modeles/LikePublication.js'); 
const LikePublication = LikePublicationFunction(sequelize, Sequelize);

const createLike = async (req, res) => {
  try {
    const { idUser, idPost } = req.body; 
    const like = await LikePublication.create({ idUser, idPost });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByPostId = async (req, res) => {
  try {
    const { idPost } = req.params;
    const likes = await LikePublication.findAll({ where: { idPost } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const likes = await LikePublication.findAll({ where: { idUser } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const { idLikePost } = req.params; 
    const result = await LikePublication.destroy({ where: { idLikePost } });
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
  getLikesByPostId,
  getLikesByUserId,
  deleteLike,
};
