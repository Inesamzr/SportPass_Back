const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PalierFunction = require('../Modeles/Palier.js');
const Palier = PalierFunction(sequelize, Sequelize);

const createPalier = async (req, res) => {
  try {
    const palier = await Palier.create({
      nom: req.body.nom,
      cashbackPalier: req.body.cashbackPalier,
      montantMin: req.body.montantMin
    });
    res.status(201).send(palier);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPaliers = async (req, res) => {
  try {
    const paliers = await Palier.findAll();
    res.status(200).send(paliers);
  } catch (error) {
    res.status(400).send(error);
  }
};

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
