const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PromotionFunction = require('../Modeles/Promotion.js');
const Promotion = PromotionFunction(sequelize, Sequelize);

// Create a new Promotion
const createPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.create({
      description: req.body.description
    });
    res.status(201).send(promotion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Promotions
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.status(200).send(promotions);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Promotion by id
const getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion) {
      return res.status(404).send();
    }
    res.status(200).send(promotion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Promotion by id
const updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion) {
      return res.status(404).send();
    }
    await promotion.update(req.body);
    res.status(200).send(promotion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Promotion by id
const deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (!promotion) {
      return res.status(404).send();
    }
    await promotion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion
};
