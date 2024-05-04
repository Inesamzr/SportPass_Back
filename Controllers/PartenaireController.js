const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PartenaireFunction = require('../Modeles/Partenaire.js');
const Partenaire = PartenaireFunction(sequelize, Sequelize);
const PromotionFunction = require('../Modeles/Promotion.js');
const Promotion = PromotionFunction(sequelize, Sequelize);

const createPartenaire = async (req, res) => {
  try {
    const partenaire = await Partenaire.create({
      nom: req.body.nom,
      site: req.body.site,
      idPromotion: req.body.idPromotion 
    });
    res.status(201).send(partenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPartenaires = async (req, res) => {
  try {
    const partenaires = await Partenaire.findAll({
      include: [Promotion] 
    });
    res.status(200).send(partenaires);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPartenaireById = async (req, res) => {
  try {
    const partenaire = await Partenaire.findByPk(req.params.id, {
      include: [Promotion] 
    });
    res.status(200).send(partenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePartenaire = async (req, res) => {
  try {
    const partenaire = await Partenaire.findByPk(req.params.id);
    if (!partenaire) {
      return res.status(404).send();
    }
    await partenaire.update(req.body);
    res.status(200).send(partenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePartenaire = async (req, res) => {
  try {
    const partenaire = await Partenaire.findByPk(req.params.id);
    if (!partenaire) {
      return res.status(404).send();
    }
    await partenaire.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPartenaire,
  getAllPartenaires,
  getPartenaireById,
  updatePartenaire,
  deletePartenaire
};
