const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PlaceFunction = require('../Modeles/Place.js');
const Place = PlaceFunction(sequelize, Sequelize);
const RangeeFunction = require('../Modeles/Rangee.js');
const Rangee = RangeeFunction(sequelize, Sequelize);
const TypePlaceFunction = require('../Modeles/TypePlace.js');
const TypePlace = TypePlaceFunction(sequelize, Sequelize);

// Create a new Place
const createPlace = async (req, res) => {
  try {
    const place = await Place.create({
      numero: req.body.numero,
      idRangee: req.body.idRangee, // Assuming the request includes idRangee to associate with a Rangee
      idType: req.body.idType // Assuming the request includes idType to associate with a TypePlace
    });
    res.status(201).send(place);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Places
const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.findAll({
      include: [Rangee, TypePlace] // Include associated Rangee and TypePlace details
    });
    res.status(200).send(places);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Place by id
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findByPk(req.params.id, {
      include: [Rangee, TypePlace] // Include associated Rangee and TypePlace details
    });
    if (!place) {
      return res.status(404).send();
    }
    res.status(200).send(place);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Place by id
const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByPk(req.params.id);
    if (!place) {
      return res.status(404).send();
    }
    await place.update(req.body);
    res.status(200).send(place);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Place by id
const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByPk(req.params.id);
    if (!place) {
      return res.status(404).send();
    }
    await place.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
};
