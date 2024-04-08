const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const CommentairePartenaireFunction = require('../Modeles/CommentairePartenaire.js');
const CommentairePartenaire = CommentairePartenaireFunction(sequelize, Sequelize);
const PublicationPartenaireFunction = require('../Modeles/PublicationPartenaire.js');
const LikeCommentairePartenaireFunction = require('../Modeles/LikeCommentairePartenaire.js');
const LikeCommentairePartenaire = LikeCommentairePartenaireFunction(sequelize, Sequelize);
const PublicationPartenaire = PublicationPartenaireFunction(sequelize, Sequelize);

const createCommentairePartenaire = async (req, res) => {
  try {
    const commentairePartenaire = await CommentairePartenaire.create({
      contenu: req.body.contenu,
      date: req.body.date,      
      idPublication: req.body.idPublication
    });
    res.status(201).send(commentairePartenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCommentairePartenaires = async (req, res) => {
  try {
    const CommentairePartenaires = await CommentairePartenaire.findAll({
      include: [PublicationPartenaire]
    });
    res.status(200).send(CommentairePartenaires);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCommentaireByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const commentaires = await CommentairePartenaire.findAll({
      where: { idUser }
    });
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCommentaireByPublicationId = async (req, res) => {
  try {
    const { idPublication } = req.params;
    const commentaires = await CommentairePartenaire.findAll({
      where: { idPublication }
    });
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCommentairePartenaire = async (req, res) => {
  try {
    const commentairePartenaire = await CommentairePartenaire.findByPk(req.params.id);
    if (!commentairePartenaire) {
      return res.status(404).send();
    }
    await commentairePartenaire.update(req.body);
    res.status(200).send(commentairePartenaire);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCommentairePartenaire = async (req, res) => {
    const transaction = await sequelize.transaction(); 
    try {
      await LikeCommentairePartenaire.destroy({
        where: {
          idCommentaire: req.params.id
        },
        transaction 
      });
  
      await CommentairePartenaire.destroy({
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
  createCommentairePartenaire,
  getAllCommentairePartenaires,
  getCommentaireByIdUser,
  getCommentaireByPublicationId,
  updateCommentairePartenaire,
  deleteCommentairePartenaire
};
