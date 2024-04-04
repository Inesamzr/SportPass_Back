const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CashBackCommercantFunction = require('../Modeles/CashBackCommercant.js');
const CashBackCommercant = CashBackCommercantFunction(sequelize, Sequelize);

// Create a new CashBackCommercant
const createCashBackCommercant = async (req, res) => {
  try {
    const cashBackCommercant = await CashBackCommercant.create(req.body);
    res.status(201).send(cashBackCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all CashBackCommercants
const getAllCashBackCommercants = async (req, res) => {
  try {
    const cashBackCommercants = await CashBackCommercant.findAll();
    res.status(200).send(cashBackCommercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a CashBackCommercant by id
const getCashBackCommercantById = async (req, res) => {
  try {
    const cashBackCommercant = await CashBackCommercant.findByPk(req.params.id);
    if (!cashBackCommercant) {
      return res.status(404).send();
    }
    res.status(200).send(cashBackCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a CashBackCommercant by id
const updateCashBackCommercant = async (req, res) => {
  try {
    const cashBackCommercant = await CashBackCommercant.findByPk(req.params.id);
    if (!cashBackCommercant) {
      return res.status(404).send();
    }
    await cashBackCommercant.update(req.body);
    res.status(200).send(cashBackCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a CashBackCommercant by id
const deleteCashBackCommercant = async (req, res) => {
  try {
    const cashBackCommercant = await CashBackCommercant.findByPk(req.params.id);
    if (!cashBackCommercant) {
      return res.status(404).send();
    }
    await cashBackCommercant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createCashBackCommercant,
  getAllCashBackCommercants,
  getCashBackCommercantById,
  updateCashBackCommercant,
  deleteCashBackCommercant
};
