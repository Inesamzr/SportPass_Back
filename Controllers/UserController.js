const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction  = require('../Modeles/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = UserFunction(sequelize, Sequelize)
const express = require('express');
const PalierFunction = require('../Modeles/Palier.js');
const Palier = PalierFunction(sequelize, Sequelize);

// Create a new User
const createUser = async (req, res) => {
  try {
    const user = await User.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      pseudo: req.body.pseudo,
      mail: req.body.mail,
      password: req.body.password, // Remember to hash passwords in a real application
      numTel: req.body.numTel,
      adresse: req.body.adresse,
      biographie: req.body.biographie,
      idPalier: req.body.idPalier
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Palier] // Include associated Palier details
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a User by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Palier] // Include associated Palier details
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a User by id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    await user.update(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a User by id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const register = async (req, res) => {
  const userData = req.body;

  try {
    // Check if the password is provided
    if (!userData.password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Save the new benevole to the database
    const newUser = await User.create({
      prenom: userData.prenom,
      nom: userData.nom,
      mail: userData.mail,
      password: hashedPassword,
      numTel: userData.numTel,
      adresse: userData.adresse
    });

    const token = jwt.sign(
      { idU: newUser.idU, mail: newUser.mail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'This email or username is already in use.' });
    } else {
      res.status(500).json({ message: 'An internal server error occurred. Please try again later.' });
    }
  }
};

const login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    if (!mail || !password) {
      res.status(400).json({ message: 'Les champs mail et password sont obligatoires.' });
      return;
    }

    const user = await User.findOne({ where: { mail } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: 'Identifiants invalides. Veuillez réessayer.' });
      return;
    }

    const token = jwt.sign(
      { mail: user.mail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur interne du serveur s\'est produite. Veuillez réessayer plus tard.' });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login
};


