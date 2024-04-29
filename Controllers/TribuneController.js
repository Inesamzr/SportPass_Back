const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const TribuneFunction = require('../Modeles/Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize);
const StadeFunction = require('../Modeles/Stade.js');
const Stade = StadeFunction(sequelize, Sequelize);

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

const getAllTribunes = async (req, res) => {
  try {
    const tribunes = await Tribune.findAll();
    res.status(200).send(tribunes);
  } catch (error) {
    res.status(400).send(error);
  }
};

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

const getAllTribuneByIdStade = async (req, res) => {
  try {
    const idStade = req.params.id;

    const tribunes = await Tribune.findAll({
      include: [{
        model: Stade,
        where: { idStade: idStade } 
      }]
    });

    res.status(200).send(tribunes);
  } catch (error) {
    console.error('Error fetching tribunes by team ID:', error);
    res.status(500).send({ error: 'An error occurred while fetching tribunes by team ID.' });
  }
};

module.exports = {
  createTribune,
  getAllTribunes,
  getTribuneById,
  updateTribune,
  deleteTribune,
  getAllTribuneByIdStade
};
