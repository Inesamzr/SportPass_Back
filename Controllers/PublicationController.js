const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PublicationFunction = require('../Modeles/Publication.js');
const Publication = PublicationFunction(sequelize, Sequelize);
const UserFunction = require('../Modeles/User.js');
const User = UserFunction(sequelize, Sequelize);

// Create a new Publication
const createPublication = async (req, res) => {
  try {
    const publication = await Publication.create({
      contenu: req.body.contenu,
      likes: req.body.likes || 0, // Default to 0 if not provided
      idUser: req.body.idUser // Assuming the request includes idUser to associate with a User
    });
    res.status(201).send(publication);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Publications
const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.findAll({
      include: [User] // Include associated User details
    });
    res.status(200).send(publications);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a Publication by id
const getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id, {
      include: [User] // Include associated User details
    });
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Publication by id
const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) {
      return res.status(404).send();
    }
    await publication.update(req.body);
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Publication by id
const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) {
      return res.status(404).send();
    }
    await publication.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication
};
