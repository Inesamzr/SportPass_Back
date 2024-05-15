const sequelize = require('../database.js')
const Sequelize = require('sequelize');
const UserFunction  = require('../Modeles/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = UserFunction(sequelize, Sequelize)
const express = require('express');
const PalierFunction = require('../Modeles/Palier.js');
const Palier = PalierFunction(sequelize, Sequelize);
const AbonnesFunction = require('../Modeles/Abonnes.js');
const Abonnes = AbonnesFunction(sequelize, Sequelize);
const PossederRoleFunction = require('../Modeles/PossederRole.js');
const PossederRole = PossederRoleFunction(sequelize, Sequelize);
const EquipeFunction = require('../Modeles/Equipe.js');
const Equipe = EquipeFunction(sequelize, Sequelize);


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Palier] 
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Palier, Equipe]
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user  = req.body;
    const id = req.params.id;

    const updatedUser = await User.update(
      {
        prenom: user.prenom,
        nom: user.nom,
        mail: user.mail,
        tel: user.tel,
        pseudo: user.pseudo,
        biographie: user.biographie,
        adresse: user.adresse,
        somme: user.somme,
        idPalier: user.idPalier
      },
      {
        where: {
          idUser: id
        }
      }
    );

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const transaction = await sequelize.transaction(); 
  try {
    console.log(req.params.idUser);
   
    await Abonnes.destroy({
      where: {
        [Sequelize.Op.or]: [{followerId: req.params.idUser}, {followingId: req.params.idUser}]
      },
      transaction 
    });

    await PossederRole.destroy({
      where: {
        [Sequelize.Op.or]: [{idUser: req.params.idUser}]
      },
      transaction 
    });

    await User.destroy({
      where: { idUser: req.params.idUser },
      transaction 
    });

    await transaction.commit(); 
    res.status(204).send();
  } catch (error) {
    await transaction.rollback(); 
    res.status(400).send(error);
  }
};


const register = async (req, res) => {
  const userData = req.body;

  try {
    if (!userData.password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const randomNumber = Math.floor(Math.random() * 1000);
    const pseudo = `${userData.prenom}.${userData.nom[0]}.${randomNumber.toString().padStart(3, '0')}`;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const firstPalier = await Palier.findOne({
      order: [['idPalier', 'ASC']]
    });

    if (!firstPalier) {
      return res.status(500).json({ message: 'No palier found in the database.' });
    }

    const newUser = await User.create({
      prenom: userData.prenom,
      nom: userData.nom,
      mail: userData.mail,
      password: hashedPassword,
      pseudo: pseudo,
      somme: 0,
      idPalier: firstPalier.idPalier,
      idEquipe: userData.idEquipe
    });

    await PossederRole.create({
      idRole: 1, 
      idUser: newUser.idUser
    });

    const token = jwt.sign(
      { idU: newUser.idUser, mail: newUser.mail },
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

    const idUser =  user.idUser
    console.log(idUser)

    res.json({ token, idUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur interne du serveur s\'est produite. Veuillez réessayer plus tard.' });
  }
};

const getUsersByEquipeId = async (req, res) => {
  try {
    const equipeId = req.params.idEquipe; 
    const users = await User.findAll({
      where: {
        idEquipe: equipeId 
      },
    });


    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};



module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  getUsersByEquipeId  
};


