const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const RoleFunction = require('../Modeles/Role.js');
const Role = RoleFunction(sequelize, Sequelize);

// Create a new Role
const createRole = async (req, res) => {
  try {
    const role = await Role.create({
      nom: req.body.nom
    });
    res.status(201).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).send(roles);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Role by id
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).send();
    }
    res.status(200).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Role by id
const updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).send();
    }
    await role.update(req.body);
    res.status(200).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Role by id
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).send();
    }
    await role.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
