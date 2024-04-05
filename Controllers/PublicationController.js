const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PublicationFunction = require('../Modeles/Publication.js');
const Publication = PublicationFunction(sequelize, Sequelize);
const UserFunction = require('../Modeles/User.js');
const User = UserFunction(sequelize, Sequelize);
const LikePublicationFunction = require('../Modeles/LikePublication.js');
const LikePublication = LikePublicationFunction(sequelize, Sequelize);

const createPublication = async (req, res) => {
  try {
    const publication = await Publication.create({
      contenu: req.body.contenu,
      likes: req.body.likes || 0, 
      idUser: req.body.idUser 
    });
    res.status(201).send(publication);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.findAll({
      include: [
        { model: User },
        { model: LikePublication, as: 'Likes' }
      ]
    });
    res.status(200).send(publications);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id, {
      include: [
        { model: User }, 
        { model: LikePublication, as: 'Likes' } 
      ]
    });
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) {
      return res.status(404).send();
    }
    await publication.update(req.body);
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) {
      return res.status(404).send();
    }
    await publication.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationsByUserId = async (req, res) => {
  try {
    const userId = req.params.idUser;
    const publications = await Publication.findAll({
      where: { idUser: userId },
      include: [
        { model: User }, 
        { model: LikePublication, as: 'Likes' } 
      ]
    });
    if (publications.length > 0) {
      res.status(200).send(publications);
    } else {
      res.status(404).send({ message: "Aucune publication trouvée pour cet utilisateur." });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};


module.exports = {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
  getPublicationsByUserId
};
