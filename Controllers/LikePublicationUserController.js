const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const LikePublicationUserFunction = require('../Modeles/LikePublicationUser.js'); 
const PublicationUser = require('../Modeles/PublicationUser.js');
const LikePublicationUser = LikePublicationUserFunction(sequelize, Sequelize);
const User = require('../Modeles/User.js');

const createLike = async (req, res) => {
  try {
    const { idUser, idPublication } = req.body;
    
    const existingLike = await LikePublicationUser.findOne({
      where: {
        idUser: idUser,
        idPublication: idPublication
      }
    });

    if (existingLike) {
      return res.status(409).send({ message: "Le like existe déjà." });
    }

    const like = await LikePublicationUser.create({ idUser, idPublication });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


const getLikesByPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const likes = await LikePublicationUser.findAll({ where: { idPublication: id }
  });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLikesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const likes = await LikePublicationUser.findAll({ where: { idUser } });
    res.status(200).send(likes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const idLikePost = req.params.id; 
    const result = await LikePublicationUser.destroy({ where: { idLikePost } });
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
