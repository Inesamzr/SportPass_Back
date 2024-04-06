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
    const PublicationCommercant = await PublicationCommercant.create({
      contenu: req.body.contenu,
      likes: req.body.likes || 0, 
      idCommercant: req.body.idCommercant 
    });
    res.status(201).send(PublicationCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPublicationCommercants = async (req, res) => {
  try {
    const PublicationCommercants = await PublicationCommercant.findAll({
      include: [
        { model: Commercant },
        { model: LikePublicationCommercant, as: 'Likes' }
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
        { model: LikePublicationCommercant, as: 'Likes' } 
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
    const PublicationCommercant = await PublicationCommercant.findByPk(req.params.id);
    if (!PublicationCommercant) {
      return res.status(404).send();
    }
    await PublicationCommercant.update(req.body);
    res.status(200).send(PublicationCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePublicationCommercant = async (req, res) => {
  try {
    const PublicationCommercant = await PublicationCommercant.findByPk(req.params.id);
    if (!PublicationCommercant) {
      return res.status(404).send();
    }
    await PublicationCommercant.destroy();
    res.status(204).send();
  } catch (error) {
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
        { model: LikePublicationCommercant, as: 'Likes' } 
      ]
    });
    if (PublicationCommercants.length > 0) {
      res.status(200).send(PublicationCommercants);
    } else {
      res.status(404).send({ message: "Aucune PublicationCommercant trouvée pour cet utilisateur." });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};


module.exports = {
  createPublicationCommercant,
  getAllPublicationCommercants,
  getPublicationCommercantById,
  updatePublicationCommercant,
  deletePublicationCommercant,
  getPublicationCommercantsByCommercantId
};
