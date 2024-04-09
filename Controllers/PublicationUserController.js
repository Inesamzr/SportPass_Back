const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PublicationUserFunction = require('../Modeles/PublicationUser.js');
const PublicationUser = PublicationUserFunction(sequelize, Sequelize);
const UserFunction = require('../Modeles/User.js');
const User = UserFunction(sequelize, Sequelize);
const LikePublicationUserFunction = require('../Modeles/LikePublicationUser.js');
const LikePublicationUser = LikePublicationUserFunction(sequelize, Sequelize);

const createPublicationUser = async (req, res) => {
  try {
    console.log(req.body)
    const publicationUser = await PublicationUser.create({
      contenu: req.body.contenu,
      date: req.body.date,
      idUser: req.body.idUser 
    });
    res.status(201).send(publicationUser);
  } catch (error) {
    console.error("Error details:", error);
    res.status(400).send(error.message); // Send back a more specific error message
  }
};

const getAllPublicationUsers = async (req, res) => {
  try {
    const PublicationUsers = await PublicationUser.findAll({
      include: [
        { model: User },
      ]
    });
    res.status(200).send(PublicationUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationUserById = async (req, res) => {
  try {
    const publicationUser = await PublicationUser.findAll({
      where: { idUser: req.params.id }, 
      include: [
        {
          model: User 
        }
      ]
    });

    if (!publicationUser) {
      return res.status(404).send("Publication user not found.");
    }

    res.status(200).send(publicationUser);
  } catch (error) {
    console.error("Error fetching publication user by ID:", error);
    res.status(500).send(error);
  }
};



const updatePublicationUser = async (req, res) => {
  try {
    const publicationUser = await PublicationUser.findByPk(req.params.id);
    if (!publicationUser) {
      return res.status(404).send();
    }
    await publicationUser.update(req.body);
    res.status(200).send(publicationUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePublicationUser = async (req, res) => {
  const transaction = await sequelize.transaction(); 
  try {
    await LikePublicationUser.destroy({
      where: {
        idPublication: req.params.id
      },
      transaction 
    });

    await PublicationUser.destroy({
      where: { idPublication: req.params.id },
      transaction 
    });

    await transaction.commit(); 
    res.status(204).send();
  } catch (error) {
    await transaction.rollback(); 
    console.log(error)
    res.status(400).send(error);
  }
};

const getPublicationUsersByUserId = async (req, res) => {
  try {
    const userId = req.params.idUser;
    const PublicationUsers = await PublicationUser.findAll({
      where: { idUser: userId },
      include: [
        { model: User }, 
      ]
    });
    if (PublicationUsers.length > 0) {
      res.status(200).send(PublicationUsers);
    } else {
      res.status(404).send({ message: "Aucune PublicationUser trouvée pour cet utilisateur." });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationsByEquipeId = async (req, res) => {
  try {
    const publications = await PublicationUser.findAll({
      include: [{
        model: User,
        where: { idEquipe: req.params.idEquipe }
      }]
    });

    if (publications.length === 0) {
      return res.status(404).send({ message: "No publications found for the specified team." });
    }

    res.status(200).send(publications);
  } catch (error) {
    console.error("Error fetching publications by team ID:", error);
    res.status(500).send(error);
  }
};



module.exports = {
  createPublicationUser,
  getAllPublicationUsers,
  getPublicationUserById,
  updatePublicationUser,
  deletePublicationUser,
  getPublicationUsersByUserId,
  getPublicationsByEquipeId
};
