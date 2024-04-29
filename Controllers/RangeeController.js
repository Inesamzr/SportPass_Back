const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const RangeeFunction = require('../Modeles/Rangee.js');
const Rangee = RangeeFunction(sequelize, Sequelize);
const TribuneFunction = require('../Modeles/Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize);

const createRangee = async (req, res) => {
  try {
    const rangee = await Rangee.create({
      numero: req.body.numero,
      idTribune: req.body.idTribune 
    });
    res.status(201).send(rangee);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllRangees = async (req, res) => {
  try {
    const rangees = await Rangee.findAll({
      include: [Tribune] 
    });
    res.status(200).send(rangees);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getRangeeById = async (req, res) => {
  try {
    const rangee = await Rangee.findByPk(req.params.id, {
      include: [Tribune] 
    });
    if (!rangee) {
      return res.status(404).send();
    }
    res.status(200).send(rangee);
  } catch (error) {
    res.status(400).send(error);
  }
};

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

const getRangeeByIdTribune = async (req, res) => {
  try {
    const idTribune = req.params.id;

    const rangees = await Rangee.findAll({
      include: [{
        model: Tribune,
        where: { idTribune: idTribune } 
      }]
    });

    res.status(200).send(rangees);
  } catch (error) {
    console.error('Error fetching rangees by tribune ID:', error);
    res.status(500).send({ error: 'An error occurred while fetching rangees by tribune ID.' });
  }
};


module.exports = {
  createRangee,
  getAllRangees,
  getRangeeById,
  updateRangee,
  deleteRangee,
  getRangeeByIdTribune
};
