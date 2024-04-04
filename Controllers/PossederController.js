const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PossederFunction = require('../Modeles/Posseder.js');
const Posseder = PossederFunction(sequelize, Sequelize);

const createPosseder = async (req, res) => {
  try {
    const posseder = await Posseder.create({
      idRole: req.body.idRole,
      idUser: req.body.idUser
    });
    res.status(201).send(posseder);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPosseder = async (req, res) => {
  try {
    const posseders = await Posseder.findAll();
    res.status(200).send(posseders);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPossederById = async (req, res) => {
  try {
    const posseder = await Posseder.findByPk(req.params.id);
    if (!posseder) {
      return res.status(404).send();
    }
    res.status(200).send(posseder);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePosseder = async (req, res) => {
  try {
    const posseder = await Posseder.findByPk(req.params.id);
    if (!posseder) {
      return res.status(404).send();
    }
    await posseder.update({
      idRole: req.body.idRole,
      idUser: req.body.idUser
    });
    res.status(200).send(posseder);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePosseder = async (req, res) => {
  try {
    const posseder = await Posseder.findByPk(req.params.id);
    if (!posseder) {
      return res.status(404).send();
    }
    await posseder.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPosseder,
  getAllPosseder,
  getPossederById,
  updatePosseder,
  deletePosseder
};
