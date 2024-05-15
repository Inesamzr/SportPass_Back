const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const PublicationClubFunction = require('../Modeles/PublicationClub.js');
const PublicationClub = PublicationClubFunction(sequelize, Sequelize);
const EquipeFunction = require('../Modeles/Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize);
const LikePublicationClubFunction = require('../Modeles/LikePublicationClub.js');
const LikePublicationClub = LikePublicationClubFunction(sequelize, Sequelize);

const createPublicationClub = async (req, res) => {
  try {
    const publicationClub = await PublicationClub.create({
      contenu: req.body.contenu,
      date: req.body.date,
      aLaUne: req.body.aLaUne,
      idEquipe: req.body.idEquipe,
      tag: req.body.tag,
      image: req.body.image

    });
    res.status(201).send(publicationClub);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPublicationClubs = async (req, res) => {
  try {
    const PublicationClubs = await PublicationClub.findAll({
      include: [
        { model: Equipe },
      ]
    });
    res.status(200).send(PublicationClubs);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationClubById = async (req, res) => {
  try {
    const PublicationClub = await PublicationClub.findByPk(req.params.id, {
      include: [
        { model: Equipe }, 
      ]
    });
    if (!PublicationClub) {
      return res.status(404).send();
    }
    res.status(200).send(PublicationClub);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePublicationClub = async (req, res) => {
  try {
    const publicationClub = await PublicationClub.findByPk(req.params.id);
    if (!publicationClub) {
      return res.status(404).send();
    }
    await publicationClub.update(req.body);
    res.status(200).send(publicationClub);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePublicationClub = async (req, res) => {
  const transaction = await sequelize.transaction(); 
  try {
    await LikePublicationClub.destroy({
      where: {
        idPublication: req.params.id
      },
      transaction 
    });

    await PublicationClub.destroy({
      where: { idPublication: req.params.id },
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

const getPublicationClubsByClubId = async (req, res) => {
  try {
    const ClubId = req.params.idEquipe;
    const PublicationClubs = await PublicationClub.findAll({
      where: { idEquipe: ClubId },
      include: [
        { model: Equipe }, 
      ]
    });
      res.status(200).send(PublicationClubs);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPublicationClubAlaUne = async (req, res) => {

    try {
      const publicationsAlaUne = await PublicationClub.findAll({
        where: {
          aLaUne: true 
        }
      });
        res.status(200).send(publicationsAlaUne); 
    } catch (error) {
        console.log(error)
      console.error("Error fetching publications à la une:", error); 
      res.status(500).send(error); 
    }
  };
  

  const getPublicationsByEquipeId = async (req, res) => {
    try {
      const publications = await PublicationUser.findAll({
          where: { idEquipe: req.params.idEquipe }
      });
  
      res.status(200).send(publications);
    } catch (error) {
      console.error("Error fetching publications by team ID:", error);
      res.status(500).send(error);
    }
  };

  const getPublicationClubsAlaUneByClubId = async (req, res) => {
    try {
      const publicationsAlaUne = await PublicationClub.findAll({
        where: { idEquipe : req.params.idEquipe, aLaUne: true },
      });
      res.status(200).send(publicationsAlaUne);
    } catch (error) {
      console.error("Error fetching publications à la une by club ID:", error);
      res.status(500).send(error);
    }
  };

module.exports = {
  createPublicationClub,
  getAllPublicationClubs,
  getPublicationClubById,
  updatePublicationClub,
  deletePublicationClub,
  getPublicationClubsByClubId,
  getPublicationsByEquipeId,
  getPublicationClubAlaUne,
  getPublicationClubsAlaUneByClubId,
};
