const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const TribuneFunction = require('../Modeles/Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize);

// Create a new Tribune
const createTribune = async (req, res) => {
  try {
    const tribune = await Tribune.create({
      numero: req.body.numero
    });
    res.status(201).send(tribune);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Tribunes
const getAllTribunes = async (req, res) => {
  try {
    const tribunes = await Tribune.findAll();
    res.status(200).send(tribunes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Tribune by id
const getTribuneById = async (req, res) => {
  try {
    const tribune = await Tribune.findByPk(req.params.id);
    if (!tribune) {
      return res.status(404).send();
    }
    res.status(200).send(tribune);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Tribune by id
const updateTribune = async (req, res) => {
  try {
    const tribune = await Tribune.findByPk(req.params.id);
    if (!tribune) {
      return res.status(404).send();
    }
    await tribune.update(req.body);
    res.status(200).send(tribune);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Tribune by id
const deleteTribune = async (req, res) => {
  try {
    const tribune = await Tribune.findByPk(req.params.id);
    if (!tribune) {
      return res.status(404).send();
    }
    await tribune.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createTribune,
  getAllTribunes,
  getTribuneById,
  updateTribune,
  deleteTribune
};
