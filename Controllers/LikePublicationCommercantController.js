const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const LikePublicationCommercantFunction = require('../Modeles/LikePublicationCommercant.js'); 
const LikePublicationCommercant = LikePublicationCommercantFunction(sequelize, Sequelize);

const createLike = async (req, res) => {
  try {
    const { idUser, idPublication } = req.body;
    
    const existingLike = await LikePublicationCommercant.findOne({
      where: {
        idUser: idUser,
        idPublication: idPublication
      }
    });

    if (existingLike) {
      return res.status(409).send({ message: "Le like existe déjà." });
    }

    const like = await LikePublicationCommercant.create({ idUser, idPublication });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByPostId = async (req, res) => {
  try {
    const { idPublication } = req.params;
    const likes = await LikePublicationCommercant.findAll({ where: { idPublication } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const likes = await LikePublicationCommercant.findAll({ where: { idUser } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const idLikePost = req.params.id; 
    const result = await LikePublicationCommercant.destroy({ where: { idLikePost } });
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
