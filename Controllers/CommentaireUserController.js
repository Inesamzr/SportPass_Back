const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommentaireUserFunction = require('../Modeles/CommentaireUser.js');
const CommentaireUser = CommentaireUserFunction(sequelize, Sequelize);
const PublicationUserFunction = require('../Modeles/PublicationUser.js');
const PublicationUser = PublicationUserFunction(sequelize, Sequelize);

const createCommentaireUser = async (req, res) => {
  try {
    const CommentaireUser = await CommentaireUser.create({
      contenu: req.body.contenu,
      likes: req.body.likes,
      idPublication: req.body.idPublication
    });
    res.status(201).send(CommentaireUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommentaireUsers = async (req, res) => {
  try {
    const CommentaireUsers = await CommentaireUser.findAll({
      include: [PublicationUser]
    });
    res.status(200).send(CommentaireUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommentaireByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const commentaires = await CommentaireUser.findAll({
      where: { idUser }
    });
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCommentaireByPublicationId = async (req, res) => {
  try {
    const { id } = req.params;
    const commentaires = await CommentaireUser.findAll({
      where: { idPublication: id }
    });
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCommentaireUser = async (req, res) => {
  try {
    const CommentaireUser = await CommentaireUser.findByPk(req.params.id);
    if (!CommentaireUser) {
      return res.status(404).send();
    }
    await CommentaireUser.update(req.body);
    res.status(200).send(CommentaireUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommentaireUser = async (req, res) => {
  try {
    const CommentaireUser = await CommentaireUser.findByPk(req.params.id);
    if (!CommentaireUser) {
      return res.status(404).send();
    }
    await CommentaireUser.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createCommentaireUser,
  getAllCommentaireUsers,
  getCommentaireByIdUser,
  getCommentaireByPublicationId,
  updateCommentaireUser,
  deleteCommentaireUser
};
