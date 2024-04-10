const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const PossederPassFunction = require('../Modeles/PossederPass.js'); 
const PossederPass = PossederPassFunction(sequelize, Sequelize);
const PassFunction = require('../Modeles/Pass.js'); 
const Pass = PassFunction(sequelize, Sequelize);

const createPossession = async (req, res) => {
    try {
      const possession = await PossederPass.create(req.body);
      res.status(201).json(possession);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
   
  const getAllPossession = async (req, res) => {
    try {
      const possessions = await PossederPass.findAll();
      res.status(200).json(possessions);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getPossessionByIdPass = async (req, res) => {
    try {
      const { idPass } = req.params;
      const possessions = await PossederPass.findAll({
        where: { idPass }
      });
      res.status(200).json(possessions);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getPossessionByIDUser = async (req, res) => {
    try {
      const { id } = req.params;
      const possessions = await PossederPass.findAll({
        where: { idUser: id }
      });

      const idPasses = possessions.map(possession => possession.idPass);
      const passes = await Pass.findAll({
      where: {
        idPass: idPasses
      }
    });
      res.status(200).json(passes);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updatePossession = async (req, res) => {
    try {
      const { idPossederPass } = req.params;
      const [updated] = await PossederPass.update(req.body, {
        where: { idPossederPass }
      });
  
      if (!updated)
        return res.status(404).json({ error: 'Possession not found' });
      
      res.status(200).json({ message: 'Possession updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deletePossession = async (req, res) => {
    try {
      const { idPossederPass } = req.params;
      const deleted = await PossederPass.destroy({
        where: { idPossederPass }
      });
  
      if (!deleted)
        return res.status(404).json({ error: 'Possession not found' });
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createPossession,
    getAllPossession,
    getPossessionByIdPass,
    getPossessionByIDUser,
    updatePossession,
    deletePossession,
  };