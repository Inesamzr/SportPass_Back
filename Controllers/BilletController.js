const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js'); 
const BilletFunction  = require('../Modeles/Billet.js');
const Billet = BilletFunction(sequelize, Sequelize);
const PlaceFunction  = require('../Modeles/Place.js');
const Place = PlaceFunction(sequelize, Sequelize);
const TribuneFunction = require('../Modeles/Tribune.js');
const Tribune = TribuneFunction(sequelize, Sequelize);
const RangeeFunction  = require('../Modeles/Rangee.js');
const Rangee = RangeeFunction(sequelize, Sequelize);
const MatchsFunction  = require('../Modeles/Matchs.js');
const Matchs = MatchsFunction(sequelize, Sequelize);
const EquipeFunction  = require('../Modeles/Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize);
const StadeFunction  = require('../Modeles/Stade.js');
const Stade = StadeFunction(sequelize, Sequelize);
const TypePlaceFunction  = require('../Modeles/TypePlace.js');
const TypePlace = TypePlaceFunction(sequelize, Sequelize);


const createBillet = async (req, res) => {
  try {
    const billet = await Billet.create(req.body);
    res.status(201).send(billet);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllBillets = async (req, res) => {
  try {
    const billets = await Billet.findAll();
    res.status(200).send(billets);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getBilletById = async (req, res) => {
  try {
    const billet = await Billet.findByPk(req.params.id, {
      include: [{
        model: Place,
        include: [{
          model: Rangee,
          include: [{
            model: Tribune,
          }]
        }]
      }, {
        model: Matchs,
      }]
    });
    if (!billet) {
      return res.status(404).send();
    }
    res.status(200).send(billet);
  } catch (error) {
    console.error('Erreur lors de la récupération du billet:', error);
    res.status(400).send(error);
  }
};

const getBilletByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const billets = await Billet.findAll({
      where: { idUser: id },
      include: [{
        model: Place,
        include: [
          { model: Rangee, include: [{ model: Tribune }] },
          { model: TypePlace }
        ]
      }, {
        model: Matchs,
        include: [
          { model: Equipe, as: 'EquipeDomicile' },
          { model: Equipe, as: 'EquipeExterieure' },
          { model: Stade }
        ]
      }]
    });
    if (!billets.length) {
      return res.status(404).send();
    }
    res.status(200).json(billets);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};


const getBilletByPlaceId = async (req, res) => {
  try {
    const id = req.params.id
    const billets = await Billet.findAll(
      { where: { idPlace : id}}
    );
    if (!billets) {
      return res.status(404).send();
    }
    res.status(200).json(billets);
  } catch (error) {
    res.status(400).send(error);
  }
};


const updateBillet = async (req, res) => {
  try {
    const billet = await Billet.findByPk(req.params.id);
    if (!billet) {
      return res.status(404).send();
    }
    await billet.update(req.body);
    res.status(200).send(billet);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteBillet = async (req, res) => {
  try {
    const billet = await Billet.findByPk(req.params.id);
    if (!billet) {
      return res.status(404).send();
    }
    await billet.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {deleteBillet, getBilletByPlaceId, createBillet, updateBillet, getAllBillets, getBilletById, getBilletByUserId};
