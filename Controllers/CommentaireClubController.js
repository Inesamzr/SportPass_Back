const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommentaireClubFunction = require('../Modeles/CommentaireClub.js');
const CommentaireClub = CommentaireClubFunction(sequelize, Sequelize);
const PublicationClubFunction = require('../Modeles/PublicationClub.js');
const PublicationClub = PublicationClubFunction(sequelize, Sequelize);
const LikeCommentaireClubFunction = require('../Modeles/LikeCommentaireClub.js');
const LikeCommentaireClub = LikeCommentaireClubFunction(sequelize, Sequelize);

const createCommentaireClub = async (req, res) => {
  try {
    const commentaireClub = await CommentaireClub.create({
      contenu: req.body.contenu,
      date: req.body.date,      
      idPublication: req.body.idPublication,
      idUser: req.body.idUser
    });
    res.status(201).send(commentaireClub);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommentaireClubs = async (req, res) => {
  try {
    const commentaireClubs = await CommentaireClub.findAll({
      include: [PublicationClub]
    });
    res.status(200).send(commentaireClubs);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommentaireByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const commentaires = await CommentaireClub.findAll({
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
    const commentaires = await CommentaireClub.findAll({
      where: { idPublication: id }
    });
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCommentaireClub = async (req, res) => {
  try {
    const commentaireClub = await CommentaireClub.findByPk(req.params.id);
    if (!commentaireClub) {
      return res.status(404).send();
    }
    await commentaireClub.update(req.body);
    res.status(200).send(commentaireClub);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommentaireClub = async (req, res) => {
    const transaction = await sequelize.transaction(); 
    try {
      await LikeCommentaireClub.destroy({
        where: {
          idCommentaire: req.params.id
        },
        transaction 
      });
  
      await CommentaireClub.destroy({
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
  createCommentaireClub,
  getAllCommentaireClubs,
  getCommentaireByIdUser,
  getCommentaireByPublicationId,
  updateCommentaireClub,
  deleteCommentaireClub
};
