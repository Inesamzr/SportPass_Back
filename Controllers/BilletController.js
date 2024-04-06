const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js'); 
const BilletFunction  = require('../Modeles/Billet.js');
const Billet = BilletFunction(sequelize, Sequelize);

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
    const billet = await Billet.findByPk(req.params.id);
    if (!billet) {
      return res.status(404).send();
    }
    res.status(200).send(billet);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getBilletByUserId = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const billets = await Billet.findAll(
      { where: { idUser : id}}
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

module.exports = {deleteBillet, createBillet, updateBillet, getAllBillets, getBilletById, getBilletByUserId};
