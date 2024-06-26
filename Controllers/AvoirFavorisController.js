const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const AvoirFavorisFunction = require('../Modeles/AvoirFavoris.js'); 
const CommercantFunction = require('../Modeles/Commercant.js');
const Commercant = CommercantFunction(sequelize, Sequelize);
const AvoirFavoris = AvoirFavorisFunction(sequelize, Sequelize);

const createFavoris = async (req, res) => {
  try {
    const favoris = await AvoirFavoris.create(req.body);
    res.status(201).json(favoris);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllFavoris = async (req, res) => {
  try {
    const favoris = await AvoirFavoris.findAll();
    res.status(200).json(favoris);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFavorisByIdCommercant = async (req, res) => {
  try {
    const { idCommercant } = req.params;
    const favoris = await AvoirFavoris.findAll({
      where: { idCommercant }
    });
    res.status(200).json(favoris);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFavorisByIdUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const favoris = await AvoirFavoris.findAll({
        where: { idUser },
      });
    
    const idCommercants = favoris.map(favori => favori.idCommercant);
    const commercants = await Commercant.findAll({
      where: {
        idCommercant: idCommercants
      }
    });
    res.status(200).json(commercants);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateFavoris = async (req, res) => {
  try {
    const { idAvoirFavoris } = req.params;
    const [updated] = await AvoirFavoris.update(req.body, {
      where: { idAvoirFavoris }
    });

    if (!updated)
      return res.status(404).json({ error: 'Favoris not found' });
    
    res.status(200).json({ message: 'Favoris updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFavoris = async (req, res) => {
  try {
    const idUser  = req.params.idUser;
    const idCommercant = req.params. idCommercant
    const deleted = await AvoirFavoris.destroy({
      where: { 
        idUser,
        idCommercant
       }
    });

    if (!deleted)
      return res.status(404).json({ error: 'Favoris not found' });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createFavoris,
  getAllFavoris,
  getFavorisByIdCommercant,
  getFavorisByIdUser,
  updateFavoris,
  deleteFavoris,
};
