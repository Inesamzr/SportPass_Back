const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommercantFunction = require('../Modeles/Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize);
const CashBackCommercantFunction = require('../Modeles/CashBackCommercant.js');
const CashBackCommercant = CashBackCommercantFunction(sequelize, Sequelize);
const TypeCommercantFunction = require('../Modeles/TypeCommercant.js');
const TypeCommercant = TypeCommercantFunction(sequelize, Sequelize);

const createCommercant = async (req, res) => {
  try {
    const commercant = await Commercant.create(req.body);
    res.status(201).send(commercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommercants = async (req, res) => {
  try {
    const commercants = await Commercant.findAll({
      include: [CashBackCommercant, TypeCommercant]
    });
    res.status(200).send(commercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommercantById = async (req, res) => {
  try {
    const commercant = await Commercant.findByPk(req.params.id, {
      include: [CashBackCommercant, TypeCommercant]
    });
    if (!commercant) {
      return res.status(404).send();
    }
    res.status(200).send(commercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCommercant = async (req, res) => {
  try {
    const commercant = await Commercant.findByPk(req.params.id);
    if (!commercant) {
      return res.status(404).send();
    }
    await commercant.update(req.body);
    res.status(200).send(commercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommercant = async (req, res) => {
  try {
    const commercant = await Commercant.findByPk(req.params.id);
    if (!commercant) {
      return res.status(404).send();
    }
    await commercant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createCommercant,
  getAllCommercants,
  getCommercantById,
  updateCommercant,
  deleteCommercant
};
