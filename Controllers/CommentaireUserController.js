const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommentaireUserFunction = require('../Modeles/CommentaireUser.js');
const CommentaireUser = CommentaireUserFunction(sequelize, Sequelize);
const PublicationUserFunction = require('../Modeles/PublicationUser.js');
const LikeCommentaireUserFunction = require('../Modeles/LikeCommentaireUser.js');
const LikeCommentaireUser = LikeCommentaireUserFunction(sequelize, Sequelize);
const PublicationUser = PublicationUserFunction(sequelize, Sequelize);

const createCommentaireUser = async (req, res) => {
  try {
    const commentaireUser = await CommentaireUser.create({
      contenu: req.body.contenu,
      date: req.body.date,      
      idPublication: req.body.idPublication
    });
    res.status(201).send(commentaireUser);
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
    const commentaireUser = await CommentaireUser.findByPk(req.params.id);
    if (!commentaireUser) {
      return res.status(404).send();
    }
    await commentaireUser.update(req.body);
    res.status(200).send(commentaireUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommentaireUser = async (req, res) => {
  const transaction = await sequelize.transaction(); 
  try {
    await LikeCommentaireUser.destroy({
      where: {
        idCommentaire: req.params.id
      },
      transaction 
    });

    await CommentaireUser.destroy({
      where: { idCommentaire: req.params.id },
      transaction 
    });

    await transaction.commit(); 
    res.status(204).send();
  } catch (error) {
    await transaction.rollback(); 
    console.log(error)
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
