const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const StadeFunction = require('../Modeles/Stade.js');
const Stade = StadeFunction(sequelize, Sequelize);

// Create a new Stade
const createStade = async (req, res) => {
  try {
    const stade = await Stade.create({
      nom: req.body.nom,
      emplacement: req.body.emplacement,
      ville: req.body.ville,
      capacite: req.body.capacite
    });
    res.status(201).send(stade);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Stades
const getAllStades = async (req, res) => {
  try {
    const stades = await Stade.findAll();
    res.status(200).send(stades);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Stade by id
const getStadeById = async (req, res) => {
  try {
    const stade = await Stade.findByPk(req.params.id);
    if (!stade) {
      return res.status(404).send();
    }
    res.status(200).send(stade);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Stade by id
const updateStade = async (req, res) => {
  try {
    const stade = await Stade.findByPk(req.params.id);
    if (!stade) {
      return res.status(404).send();
    }
    await stade.update(req.body);
    res.status(200).send(stade);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Stade by id
const deleteStade = async (req, res) => {
  try {
    const stade = await Stade.findByPk(req.params.id);
    if (!stade) {
      return res.status(404).send();
    }
    await stade.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createStade,
  getAllStades,
  getStadeById,
  updateStade,
  deleteStade
};
