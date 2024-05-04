const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const ConcoursFunction = require('../Modeles/Concours.js');
const Concours = ConcoursFunction(sequelize, Sequelize);
const MatchsFunction = require('../Modeles/Matchs.js');
const Matchs = MatchsFunction(sequelize, Sequelize);

const createConcours = async (req, res) => {
  try {
    const concours = await Concours.create({
      prix: req.body.prix,
      idMatch: req.body.idMatch 
    });
    res.status(201).send(concours);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllConcours = async (req, res) => {
  try {
    const concoursList = await Concours.findAll({
      include: [Matchs] 
    });
    res.status(200).send(concoursList);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getConcoursById = async (req, res) => {
  try {
    const concours = await Concours.findByPk(req.params.id, {
      include: [Matchs] 
    });
    res.status(200).send(concours);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateConcours = async (req, res) => {
  try {
    const concours = await Concours.findByPk(req.params.id);
    if (!concours) {
      return res.status(404).send();
    }
    await concours.update(req.body);
    res.status(200).send(concours);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteConcours = async (req, res) => {
  try {
    const concours = await Concours.findByPk(req.params.id);
    if (!concours) {
      return res.status(404).send();
    }
    await concours.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createConcours,
  getAllConcours,
  getConcoursById,
  updateConcours,
  deleteConcours
};
