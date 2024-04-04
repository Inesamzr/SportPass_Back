const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const ParticiperFunction = require('../Modeles/Participer.js');
const Participer = ParticiperFunction(sequelize, Sequelize);

const createParticipation = async (req, res) => {
  try {
    const participation = await Participer.create({
      estPresent: req.body.estPresent,
      aGagner: req.body.aGagner,
      idConcours: req.body.idConcours,
      idUser: req.body.idUser
    });
    res.status(201).send(participation);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllParticipations = async (req, res) => {
  try {
    const participations = await Participer.findAll();
    res.status(200).send(participations);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getParticipationById = async (req, res) => {
  try {
    const participation = await Participer.findByPk(req.params.id);
    if (!participation) {
      return res.status(404).send();
    }
    res.status(200).send(participation);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateParticipation = async (req, res) => {
  try {
    const participation = await Participer.findByPk(req.params.id);
    if (!participation) {
      return res.status(404).send();
    }
    await participation.update(req.body);
    res.status(200).send(participation);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteParticipation = async (req, res) => {
  try {
    const participation = await Participer.findByPk(req.params.id);
    if (!participation) {
      return res.status(404).send();
    }
    await participation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation
};
