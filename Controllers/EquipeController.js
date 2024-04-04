const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const EquipeFunction = require('../Modeles/Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize);

// Create a new Equipe
const createEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.create({
      nom: req.body.nom,
      logo: req.body.logo,
      ville: req.body.ville,
      pays: req.body.pays
    });
    res.status(201).send(equipe);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Equipes
const getAllEquipes = async (req, res) => {
  try {
    const equipes = await Equipe.findAll();
    res.status(200).send(equipes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get an Equipe by id
const getEquipeById = async (req, res) => {
  try {
    const equipe = await Equipe.findByPk(req.params.id);
    if (!equipe) {
      return res.status(404).send();
    }
    res.status(200).send(equipe);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update an Equipe by id
const updateEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findByPk(req.params.id);
    if (!equipe) {
      return res.status(404).send();
    }
    await equipe.update(req.body);
    res.status(200).send(equipe);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an Equipe by id
const deleteEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findByPk(req.params.id);
    if (!equipe) {
      return res.status(404).send();
    }
    await equipe.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createEquipe,
  getAllEquipes,
  getEquipeById,
  updateEquipe,
  deleteEquipe
};
