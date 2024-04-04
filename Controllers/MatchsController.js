const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const MatchsFunction = require('../Modeles/Matchs.js');
const Matchs = MatchsFunction(sequelize, Sequelize);
const StadeFunction = require('../Modeles/Stade.js');
const Stade = StadeFunction(sequelize, Sequelize);
const EquipeFunction = require('../Modeles/Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize);

// Create a new Match
const createMatch = async (req, res) => {
  try {
    const match = await Matchs.create({
      date: req.body.date,
      heure_debut: req.body.heure_debut,
      heure_fin: req.body.heure_fin,
      idStade: req.body.idStade,
      idEquipeDomicile: req.body.idEquipeDomicile,
      idEquipeExterieure: req.body.idEquipeExterieure
    });
    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Matchs.findAll({
      include: [Stade, {
        model: Equipe,
        as: 'EquipeDomicile'
      }, {
        model: Equipe,
        as: 'EquipeExterieure'
      }]
    });
    res.status(200).send(matches);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Match by id
const getMatchById = async (req, res) => {
  try {
    const match = await Matchs.findByPk(req.params.id, {
      include: [Stade, {
        model: Equipe,
        as: 'EquipeDomicile'
      }, {
        model: Equipe,
        as: 'EquipeExterieure'
      }]
    });
    if (!match) {
      return res.status(404).send();
    }
    res.status(200).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Match by id
const updateMatch = async (req, res) => {
  try {
    const match = await Matchs.findByPk(req.params.id);
    if (!match) {
      return res.status(404).send();
    }
    await match.update(req.body);
    res.status(200).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Match by id
const deleteMatch = async (req, res) => {
  try {
    const match = await Matchs.findByPk(req.params.id);
    if (!match) {
      return res.status(404).send();
    }
    await match.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
};
