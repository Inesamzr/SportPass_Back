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

const createPlace = async (req, res) => {
  try {
    const place = await Place.create({
      numero: req.body.numero,
      idRangee: req.body.idRangee, 
      idType: req.body.idType
    });
    res.status(201).send(place);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.findAll({
      include: [Rangee, TypePlace] 
    });
    res.status(200).send(places);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findByPk(req.params.id, {
      include: [Rangee, TypePlace] 
    });
    res.status(200).send(place);
  } catch (error) {
    res.status(400).send(error);
  }
};

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

const getAllPlaceByRangeeId = async (req, res) => {
  try {
    const idRangee = req.params.id;

    const places = await Place.findAll({
      include: [{
        model: Rangee,
        where: { idRangee: idRangee } 
      }]
    });

    res.status(200).send(places);
  } catch (error) {
    console.error('Error fetching places by rangee ID:', error);
    res.status(500).send({ error: 'An error occurred while fetching places by rangee ID.' });
  }
};

module.exports = {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  getAllPlaceByRangeeId
};
