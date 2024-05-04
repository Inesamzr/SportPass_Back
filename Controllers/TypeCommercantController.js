const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const TypeCommercantFunction = require('../Modeles/TypeCommercant.js');
const TypeCommercant = TypeCommercantFunction(sequelize, Sequelize);

const createTypeCommercant = async (req, res) => {
  try {
    const typeCommercant = await TypeCommercant.create({
      nom: req.body.nom
    });
    res.status(201).send(typeCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllTypeCommercants = async (req, res) => {
  try {
    const typeCommercants = await TypeCommercant.findAll();
    res.status(200).send(typeCommercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTypeCommercantById = async (req, res) => {
  try {
    const typeCommercant = await TypeCommercant.findByPk(req.params.id);
    res.status(200).send(typeCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateTypeCommercant = async (req, res) => {
  try {
    const typeCommercant = await TypeCommercant.findByPk(req.params.id);
    if (!typeCommercant) {
      return res.status(404).send();
    }
    await typeCommercant.update(req.body);
    res.status(200).send(typeCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTypeCommercant = async (req, res) => {
  try {
    const typeCommercant = await TypeCommercant.findByPk(req.params.id);
    if (!typeCommercant) {
      return res.status(404).send();
    }
    await typeCommercant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createTypeCommercant,
  getAllTypeCommercants,
  getTypeCommercantById,
  updateTypeCommercant,
  deleteTypeCommercant
};
