const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PalierFunction = require('../Modeles/Palier.js');
const Palier = PalierFunction(sequelize, Sequelize);

// Create a new Palier
const createPalier = async (req, res) => {
  try {
    const palier = await Palier.create({
      nom: req.body.nom,
      cashbackPalier: req.body.cashbackPalier
    });
    res.status(201).send(palier);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Paliers
const getAllPaliers = async (req, res) => {
  try {
    const paliers = await Palier.findAll();
    res.status(200).send(paliers);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Palier by id
const getPalierById = async (req, res) => {
  try {
    const palier = await Palier.findByPk(req.params.id);
    if (!palier) {
      return res.status(404).send();
    }
    res.status(200).send(palier);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Palier by id
const updatePalier = async (req, res) => {
  try {
    const palier = await Palier.findByPk(req.params.id);
    if (!palier) {
      return res.status(404).send();
    }
    await palier.update(req.body);
    res.status(200).send(palier);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Palier by id
const deletePalier = async (req, res) => {
  try {
    const palier = await Palier.findByPk(req.params.id);
    if (!palier) {
      return res.status(404).send();
    }
    await palier.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPalier,
  getAllPaliers,
  getPalierById,
  updatePalier,
  deletePalier
};
