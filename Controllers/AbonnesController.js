const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../database.js');
const UserFunction = require('../Modeles/User.js');
const User = UserFunction(sequelize, Sequelize);
const AbonnesFunction = require('../Modeles/Abonnes.js');
const Abonnes = AbonnesFunction(sequelize, Sequelize);

const createAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.create({
      followerId: req.body.followerId,
      followingId: req.body.followingId
    });
    res.status(201).send(abonnes);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllAbonnes = async (req, res) => {
    try {
      const abonnes = await Abonnes.findAll({
        include: [
          { model: User, as: 'FollowerUser', foreignKey: 'followerId' }, 
          { model: User, as: 'FollowingUser', foreignKey: 'followingId' } 
        ]
      });
      res.status(200).send(abonnes);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

const updateAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.findByPk(req.params.id);
    if (!abonnes) {
      return res.status(404).send();
    }
    await abonnes.update(req.body);
    res.status(200).send(abonnes);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAbonnes = async (req, res) => {
  try {
    const abonnes = await Abonnes.findByPk(req.params.id);
    if (!abonnes) {
      return res.status(404).send();
    }
    await abonnes.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const getFollowersByFollowingId = async (req, res) => {
    try {
      const followers = await Abonnes.findAll({
        where: { followingId: req.params.followingId },
        include: [User]
      });
      res.status(200).send(followers);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  const getFollowingByFollowerId = async (req, res) => {
    try {
      const following = await Abonnes.findAll({
        where: { followerId: req.params.followerId },
        include: [User]
      });
      res.status(200).send(following);
    } catch (error) {
      res.status(400).send(error);
    }
  };

module.exports = {
  createAbonnes,
  getAllAbonnes,
  updateAbonnes,
  deleteAbonnes,
  getFollowersByFollowingId,
  getFollowingByFollowerId
};
