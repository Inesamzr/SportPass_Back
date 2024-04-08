const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommercantFunction = require('../Modeles/Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize);
const CashBackCommercantFunction = require('../Modeles/CashBackCommercant.js');
const CashBackCommercant = CashBackCommercantFunction(sequelize, Sequelize);
const TypeCommercantFunction = require('../Modeles/TypeCommercant.js');
const TypeCommercant = TypeCommercantFunction(sequelize, Sequelize);
const EquipeFunction = require('../Modeles/Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize);

const createCommercant = async (req, res) => {
  try {
    const commercant = await Commercant.create(req.body);
    res.status(201).send(commercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommercants = async (req, res) => {
  try {
    const commercants = await Commercant.findAll({
      include: [CashBackCommercant, TypeCommercant]
    });
    res.status(200).send(commercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommercantById = async (req, res) => {
  try {
    const commercant = await Commercant.findByPk(req.params.id, {
      include: [CashBackCommercant, TypeCommercant]
    });
    if (!commercant) {
      return res.status(404).send();
    }
    res.status(200).send(commercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCommercant = async (req, res) => {
  try {
    const commercant = await Commercant.findByPk(req.params.id);
    if (!commercant) {
      return res.status(404).send();
    }
    await commercant.update(req.body);
    res.status(200).send(commercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommercant = async (req, res) => {
  try {
    const commercant = await Commercant.findByPk(req.params.id);
    if (!commercant) {
      return res.status(404).send();
    }
    await commercant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllVillesByidEquipe = async (req, res) => {
  try {
    const idEquipe = req.params.idEquipe;

    const villes = await Commercant.findAll({
      attributes: [
        [sequelize.col('Commercant.ville'), 'ville'] 
      ],
      include: [{
        model: Equipe,
        where: { idEquipe: idEquipe },
        attributes: []
      }],
      group: ['ville'], 
      order: [['ville', 'ASC']]
    });

    if (villes.length === 0) {
      return res.status(404).send({ message: 'No cities found for the given team ID.' });
    }

    res.status(200).send(villes.map(v => v.ville)); 
  } catch (error) {
    console.error('Error fetching cities by team ID:', error);
    res.status(500).send({ error: 'An error occurred while fetching cities by team ID.' });
  }
};


const getAllCommercantsByidEquipe = async (req, res) => {
  try {
    const idEquipe = req.params.idEquipe;

    const commercants = await Commercant.findAll({
      include: [{
        model: Equipe,
        where: { idEquipe: idEquipe } 
      }]
    });

    if (!commercants || commercants.length === 0) {
      return res.status(404).send({ message: 'No merchants found for the specified team.' });
    }

    res.status(200).send(commercants);
  } catch (error) {
    console.error('Error fetching merchants by team ID:', error);
    res.status(500).send({ error: 'An error occurred while fetching merchants by team ID.' });
  }
};

const getAllCommercantsByVille = async (req, res) => {
  try {
    const ville = req.params.ville; 
    const commercants = await Commercant.findAll({
      where: { ville: ville },
      include: [CashBackCommercant, TypeCommercant, Equipe] 
    });
    if (commercants.length === 0) {
      return res.status(404).send({ message: 'No merchants found for the specified city.' });
    }
    res.status(200).send(commercants);
  } catch (error) {
    console.error('Error fetching merchants by city:', error);
    res.status(500).send({ error: 'An error occurred while fetching merchants by city.' });
  }
};

const getAllCommercantsByType = async (req, res) => {
  try {
    const idTypeCommercant = req.params.idType; 
    const commercants = await Commercant.findAll({
      where: { idTypeCommercant: idTypeCommercant },
      include: [CashBackCommercant, TypeCommercant, Equipe] 
    });
    if (commercants.length === 0) {
      return res.status(404).send({ message: 'No merchants found for the specified type.' });
    }
    res.status(200).send(commercants);
  } catch (error) {
    console.error('Error fetching merchants by type:', error);
    res.status(500).send({ error: 'An error occurred while fetching merchants by type.' });
  }
};



module.exports = {
  createCommercant,
  getAllCommercantsByVille,
  getAllCommercantsByType,
  getAllCommercants,
  getCommercantById,
  updateCommercant,
  getAllVillesByidEquipe,
  getAllCommercantsByidEquipe,
  deleteCommercant
};
