const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PublicationPartenaireFunction = require('../Modeles/PublicationPartenaire.js');
const PublicationPartenaire = PublicationPartenaireFunction(sequelize, Sequelize);
const PartenaireFunction = require('../Modeles/Partenaire.js');
const Partenaire = PartenaireFunction(sequelize, Sequelize);
const LikePublicationPartenaireFunction = require('../Modeles/LikePublicationPartenaire.js');
const LikePublicationPartenaire = LikePublicationPartenaireFunction(sequelize, Sequelize);

const createPublicationPartenaire = async (req, res) => {
  try {
    const publicationPartenaire = await PublicationPartenaire.create({
      contenu: req.body.contenu,
      date: req.body.date,      
      idPartenaire: req.body.idPartenaire 
    });
    res.status(201).send(publicationPartenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPublicationPartenaires = async (req, res) => {
  try {
    const PublicationPartenaires = await PublicationPartenaire.findAll({
      include: [
        { model: Partenaire },
      ]
    });
    res.status(200).send(PublicationPartenaires);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationPartenaireById = async (req, res) => {
  try {
    const PublicationPartenaire = await PublicationPartenaire.findByPk(req.params.id, {
      include: [
        { model: Partenaire }, 
        { model: LikePublicationPartenaire, as: 'Likes' } 
      ]
    });
    if (!PublicationPartenaire) {
      return res.status(404).send();
    }
    res.status(200).send(PublicationPartenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePublicationPartenaire = async (req, res) => {
  try {
    const PublicationPartenaire = await PublicationPartenaire.findByPk(req.params.id);
    if (!PublicationPartenaire) {
      return res.status(404).send();
    }
    await PublicationPartenaire.update(req.body);
    res.status(200).send(PublicationPartenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePublicationPartenaire = async (req, res) => {
  try {
    const PublicationPartenaire = await PublicationPartenaire.findByPk(req.params.id);
    if (!PublicationPartenaire) {
      return res.status(404).send();
    }
    await PublicationPartenaire.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationPartenairesByPartenaireId = async (req, res) => {
  try {
    const PartenaireId = req.params.idPartenaire;
    const PublicationPartenaires = await PublicationPartenaire.findAll({
      where: { idPartenaire: PartenaireId },
      include: [
        { model: Partenaire }, 
        { model: LikePublicationPartenaire, as: 'Likes' } 
      ]
    });
    if (PublicationPartenaires.length > 0) {
      res.status(200).send(PublicationPartenaires);
    } else {
      res.status(404).send({ message: "Aucune PublicationPartenaire trouvée pour cet utilisateur." });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};


module.exports = {
  createPublicationPartenaire,
  getAllPublicationPartenaires,
  getPublicationPartenaireById,
  updatePublicationPartenaire,
  deletePublicationPartenaire,
  getPublicationPartenairesByPartenaireId
};
