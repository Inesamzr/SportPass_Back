const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const PassFunction = require('../Modeles/Pass.js'); 
const Pass = PassFunction(sequelize, Sequelize);

const createPass = async (req, res) => {
  try {
    const { nom, duree, montantMin, valide } = req.body;
    const newPass = await Pass.create({
      nom,
      duree,
      montantMin,
      valide
    });
    res.status(201).send(newPass);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getAllPasses = async (req, res) => {
  try {
    const passes = await Pass.findAll();
    res.status(200).send(passes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getPassById = async (req, res) => {
  try {
    const { idPass } = req.params;
    const pass = await Pass.findByPk(idPass);
    if (!pass) {
      return res.status(404).send({ message: 'Pass not found' });
    }
    res.status(200).send(pass);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updatePass = async (req, res) => {
  try {
    const { idPass } = req.params;
    const { nom, duree, montantMin, valide } = req.body;
    const updated = await Pass.update({
      nom,
      duree,
      montantMin,
      valide
    }, {
      where: { idPass }
    });

    if (updated[0] === 0) {
      return res.status(404).send({ message: 'Pass not found' });
    }
    res.status(200).send({ message: 'Pass updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deletePass = async (req, res) => {
  try {
    const { idPass } = req.params;
    const deleted = await Pass.destroy({
      where: { idPass }
    });

    if (deleted === 0) {
      return res.status(404).send({ message: 'Pass not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  createPass,
  getAllPasses,
  getPassById,
  updatePass,
  deletePass,
};
