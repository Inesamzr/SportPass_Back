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
    res.status(200).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
};

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

const getAllMatchsByidEquipe = async (req, res) => {
  try {
    const idEquipe = req.params.idEquipe;

    const matchsDomicile = await Matchs.findAll({
      where: { idEquipeDomicile: idEquipe }
    });

    const matchsExterieur = await Matchs.findAll({
      where: { idEquipeExterieure: idEquipe }
    });

    const matchs = [...matchsDomicile, ...matchsExterieur];

    res.status(200).send(matchs);
  } catch (error) {
    console.error('Error fetching matches by team ID:', error);
    res.status(500).send({ error: 'An error occurred while fetching matches by team ID.' });
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  getAllMatchsByidEquipe,
  deleteMatch
};
