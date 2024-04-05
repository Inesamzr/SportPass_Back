const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PossederRoleFunction = require('../Modeles/PossederRole.js');
const PossederRole = PossederRoleFunction(sequelize, Sequelize);

const createPossederRole = async (req, res) => {
  try {
    const PossederRole = await PossederRole.create({
      idRole: req.body.idRole,
      idUser: req.body.idUser
    });
    res.status(201).send(PossederRole);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPossederRole = async (req, res) => {
  try {
    const PossederRoles = await PossederRole.findAll();
    res.status(200).send(PossederRoles);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPossederRoleById = async (req, res) => {
  try {
    const PossederRole = await PossederRole.findByPk(req.params.id);
    if (!PossederRole) {
      return res.status(404).send();
    }
    res.status(200).send(PossederRole);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePossederRole = async (req, res) => {
  try {
    const PossederRole = await PossederRole.findByPk(req.params.id);
    if (!PossederRole) {
      return res.status(404).send();
    }
    await PossederRole.update({
      idRole: req.body.idRole,
      idUser: req.body.idUser
    });
    res.status(200).send(PossederRole);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePossederRole = async (req, res) => {
  try {
    const PossederRole = await PossederRole.findByPk(req.params.id);
    if (!PossederRole) {
      return res.status(404).send();
    }
    await PossederRole.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPossederRole,
  getAllPossederRole,
  getPossederRoleById,
  updatePossederRole,
  deletePossederRole
};
