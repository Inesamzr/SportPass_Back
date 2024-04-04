const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const TypePlaceFunction = require('../Modeles/TypePlace.js');
const TypePlace = TypePlaceFunction(sequelize, Sequelize);

// Create a new TypePlace
const createTypePlace = async (req, res) => {
  try {
    const typePlace = await TypePlace.create({
      nom: req.body.nom
    });
    res.status(201).send(typePlace);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all TypePlaces
const getAllTypePlaces = async (req, res) => {
  try {
    const typePlaces = await TypePlace.findAll();
    res.status(200).send(typePlaces);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a TypePlace by id
const getTypePlaceById = async (req, res) => {
  try {
    const typePlace = await TypePlace.findByPk(req.params.id);
    if (!typePlace) {
      return res.status(404).send();
    }
    res.status(200).send(typePlace);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a TypePlace by id
const updateTypePlace = async (req, res) => {
  try {
    const typePlace = await TypePlace.findByPk(req.params.id);
    if (!typePlace) {
      return res.status(404).send();
    }
    await typePlace.update(req.body);
    res.status(200).send(typePlace);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a TypePlace by id
const deleteTypePlace = async (req, res) => {
  try {
    const typePlace = await TypePlace.findByPk(req.params.id);
    if (!typePlace) {
      return res.status(404).send();
    }
    await typePlace.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createTypePlace,
  getAllTypePlaces,
  getTypePlaceById,
  updateTypePlace,
  deleteTypePlace
};
