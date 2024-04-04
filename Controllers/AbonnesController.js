const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const UserFunction = require('../Modeles/User.js');
const User = UserFunction(sequelize, Sequelize);
const AbonnesFunction = require('../Modeles/Abonnes.js');
const Abonnes = AbonnesFunction(sequelize, Sequelize);

// Create a new Abonnes
const createAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.create({
      followerId: req.body.followerId,
      followingId: req.body.followingId
    });
    res.status(201).send(abonnes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Abonnes
const getAllAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.findAll();
    res.status(200).send(abonnes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get an Abonnes by id
const getAbonnesById = async (req, res) => {
  try {
    const abonnes = await Abonnes.findByPk(req.params.id);
    if (!abonnes) {
      return res.status(404).send();
    }
    res.status(200).send(abonnes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update an Abonnes by id
const updateAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.findByPk(req.params.id);
    if (!abonnes) {
      return res.status(404).send();
    }
    await abonnes.update(req.body);
    res.status(200).send(abonnes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an Abonnes by id
const deleteAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.findByPk(req.params.id);
    if (!abonnes) {
      return res.status(404).send();
    }
    await abonnes.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createAbonnes,
  getAllAbonnes,
  getAbonnesById,
  updateAbonnes,
  deleteAbonnes
};
