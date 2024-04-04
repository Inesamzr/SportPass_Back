const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const RangeeFunction = require('../Modeles/Rangee.js');
const Rangee = RangeeFunction(sequelize, Sequelize);
const TribuneFunction = require('../Modeles/Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize);

// Create a new Rangee
const createRangee = async (req, res) => {
  try {
    const rangee = await Rangee.create({
      numero: req.body.numero,
      idTribune: req.body.idTribune // Assuming the request includes idTribune to associate with a Tribune
    });
    res.status(201).send(rangee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Rangees
const getAllRangees = async (req, res) => {
  try {
    const rangees = await Rangee.findAll({
      include: [Tribune] // Include associated Tribune details
    });
    res.status(200).send(rangees);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Rangee by id
const getRangeeById = async (req, res) => {
  try {
    const rangee = await Rangee.findByPk(req.params.id, {
      include: [Tribune] // Include associated Tribune details
    });
    if (!rangee) {
      return res.status(404).send();
    }
    res.status(200).send(rangee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Rangee by id
const updateRangee = async (req, res) => {
  try {
    const rangee = await Rangee.findByPk(req.params.id);
    if (!rangee) {
      return res.status(404).send();
    }
    await rangee.update(req.body);
    res.status(200).send(rangee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Rangee by id
const deleteRangee = async (req, res) => {
  try {
    const rangee = await Rangee.findByPk(req.params.id);
    if (!rangee) {
      return res.status(404).send();
    }
    await rangee.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createRangee,
  getAllRangees,
  getRangeeById,
  updateRangee,
  deleteRangee
};
