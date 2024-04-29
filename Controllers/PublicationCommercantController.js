const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PublicationCommercantFunction = require('../Modeles/PublicationCommercant.js');
const PublicationCommercant = PublicationCommercantFunction(sequelize, Sequelize);
const CommercantFunction = require('../Modeles/Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize);
const LikePublicationCommercantFunction = require('../Modeles/LikePublicationCommercant.js');
const LikePublicationCommercant = LikePublicationCommercantFunction(sequelize, Sequelize);

const createPublicationCommercant = async (req, res) => {
  try {
    const publicationCommercant = await PublicationCommercant.create({
      contenu: req.body.contenu,
      date: req.body.date,
      idCommercant: req.body.idCommercant 
    });
    res.status(201).send(publicationCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPublicationCommercants = async (req, res) => {
  try {
    const PublicationCommercants = await PublicationCommercant.findAll({
      include: [
        { model: Commercant },
      ]
    });
    res.status(200).send(PublicationCommercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationCommercantById = async (req, res) => {
  try {
    const PublicationCommercant = await PublicationCommercant.findByPk(req.params.id, {
      include: [
        { model: Commercant }, 
      ]
    });
    if (!PublicationCommercant) {
      return res.status(404).send();
    }
    res.status(200).send(PublicationCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePublicationCommercant = async (req, res) => {
  try {
    const publicationCommercant = await PublicationCommercant.findByPk(req.params.id);
    if (!publicationCommercant) {
      return res.status(404).send();
    }
    await publicationCommercant.update(req.body);
    res.status(200).send(publicationCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePublicationCommercant = async (req, res) => {
  const transaction = await sequelize.transaction(); 
  try {
    await LikePublicationCommercant.destroy({
      where: {
        idPublication: req.params.id
      },
      transaction 
    });

    await PublicationCommercant.destroy({
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

const getPublicationCommercantsByCommercantId = async (req, res) => {
  try {
    const CommercantId = req.params.idCommercant;
    const PublicationCommercants = await PublicationCommercant.findAll({
      where: { idCommercant: CommercantId },
      include: [
        { model: Commercant }, 
      ]
    });
      res.status(200).send(PublicationCommercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationsByEquipeId = async (req, res) => {
  try {
    const publications = await PublicationCommercant.findAll({
      include: [{
        model: Commercant,
        where: { idEquipe: req.params.idEquipe }
      }]
    });
    res.status(200).send(publications);
  } catch (error) {
    console.error("Error fetching publications by team ID:", error);
    res.status(500).send(error);
  }
};


module.exports = {
  createPublicationCommercant,
  getAllPublicationCommercants,
  getPublicationCommercantById,
  updatePublicationCommercant,
  deletePublicationCommercant,
  getPublicationCommercantsByCommercantId,
  getPublicationsByEquipeId
};
