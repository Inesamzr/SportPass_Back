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
      const followerId = req.params.followerId;
      const followingId = req.params.followingId;

      const abonne = await Abonnes.create({
            followerId: followerId,
            followingId: followingId
        });
      res.status(201).send(abonne);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const isFollowing = async (req, res) => {
    console.log(req.params);
    try {
      console.log(req.params);
      const followerId = req.params.followerId;
      const followingId = req.params.followingId;

        const subscription = await Abonnes.findOne({
            where: {
                followerId: followerId,
                followingId: followingId
            }
        });

        console.log(subscription)
        let isFollowing = false;

        if (subscription) {
          isFollowing = true;
        } else {
          isFollowing= false;
        }
        console.log(isFollowing)
        res.status(200).send(isFollowing);
    } catch (error) {
        console.error('Error checking following status:', error);
        res.status(400).send({ message: 'Error checking if following', error: error.message });
    }
};


const deleteAbonnes = async (req, res) => {
    try {
        const followerId = req.params.followerId;
        const followingId = req.params.followingId;

      const abonnes = await Abonnes.findOne({
        where: {
          followerId: followerId,
          followingId: followingId
        }
      });
      if (!abonnes) {
        return res.status(404).send({ message: 'Subscription not found.' });
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
        attributes: ['followerId'] 
      });

      const followerIds = followers.map(f => f.followerId);

      const users = await User.findAll({
        where: {
          idUser: followerIds 
        }
      });

      res.json(users);
    } catch (error) {
      console.error('Error fetching followers:', error);
      res.status(400).send(error.message);
    }
};

  
const getFollowingByFollowerId = async (req, res) => {
    try {
      const followings = await Abonnes.findAll({
        where: { followerId: req.params.followerId },
        attributes: ['followingId'] 
      });

      const followingIds = followings.map(f => f.followingId);

      const users = await User.findAll({
        where: {
          idUser: followingIds 
        }
      });

      res.json(users);
    } catch (error) {
      console.error('Error fetching followers:', error);
      res.status(400).send(error.message);
    }
};

module.exports = {
  createAbonnes,
  deleteAbonnes,
  getFollowersByFollowingId,
  getFollowingByFollowerId,
  isFollowing
};
