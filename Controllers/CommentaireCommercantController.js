const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommentaireCommercantFunction = require('../Modeles/CommentaireCommercant.js');
const CommentaireCommercant = CommentaireCommercantFunction(sequelize, Sequelize);
const PublicationCommercantFunction = require('../Modeles/PublicationCommercant.js');
const PublicationCommercant = PublicationCommercantFunction(sequelize, Sequelize);
const LikeCommentaireCommercantFunction = require('../Modeles/LikeCommentaireCommercant.js');
const LikeCommentaireCommercant = LikeCommentaireCommercantFunction(sequelize, Sequelize);

const createCommentaireCommercant = async (req, res) => {
  try {
    const commentaireCommercant = await CommentaireCommercant.create({
      contenu: req.body.contenu,
      date: req.body.date,      
      idPublication: req.body.idPublication
    });
    res.status(201).send(commentaireCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommentaireCommercants = async (req, res) => {
  try {
    const CommentaireCommercants = await CommentaireCommercant.findAll({
      include: [PublicationCommercant]
    });
    res.status(200).send(CommentaireCommercants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommentaireByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const commentaires = await CommentaireCommercant.findAll({
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
    const commentaires = await CommentaireCommercant.findAll({
      where: { idPublication: id }
    });
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCommentaireCommercant = async (req, res) => {
  try {
    const commentaireCommercant = await CommentaireCommercant.findByPk(req.params.id);
    if (!commentaireCommercant) {
      return res.status(404).send();
    }
    await commentaireCommercant.update(req.body);
    res.status(200).send(commentaireCommercant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommentaireCommercant = async (req, res) => {
    const transaction = await sequelize.transaction(); 
    try {
      await LikeCommentaireCommercant.destroy({
        where: {
          idCommentaire: req.params.id
        },
        transaction 
      });
  
      await CommentaireCommercant.destroy({
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
  createCommentaireCommercant,
  getAllCommentaireCommercants,
  getCommentaireByIdUser,
  getCommentaireByPublicationId,
  updateCommentaireCommercant,
  deleteCommentaireCommercant
};
