const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommentaireFunction = require('../Modeles/Commentaire.js');
const Commentaire = CommentaireFunction(sequelize, Sequelize);
const PublicationFunction = require('../Modeles/Publication.js');
const Publication = PublicationFunction(sequelize, Sequelize);

const createCommentaire = async (req, res) => {
  try {
    const commentaire = await Commentaire.create({
      contenu: req.body.contenu,
      likes: req.body.likes,
      idPost: req.body.idPost
    });
    res.status(201).send(commentaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll({
      include: [Publication]
    });
    res.status(200).send(commentaires);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommentaireById = async (req, res) => {
  try {
    const commentaire = await Commentaire.findByPk(req.params.id, {
      include: [Publication]
    });
    if (!commentaire) {
      return res.status(404).send();
    }
    res.status(200).send(commentaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCommentaire = async (req, res) => {
  try {
    const commentaire = await Commentaire.findByPk(req.params.id);
    if (!commentaire) {
      return res.status(404).send();
    }
    await commentaire.update(req.body);
    res.status(200).send(commentaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommentaire = async (req, res) => {
  try {
    const commentaire = await Commentaire.findByPk(req.params.id);
    if (!commentaire) {
      return res.status(404).send();
    }
    await commentaire.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createCommentaire,
  getAllCommentaires,
  getCommentaireById,
  updateCommentaire,
  deleteCommentaire
};
