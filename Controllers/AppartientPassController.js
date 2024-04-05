const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const AppartientPassFunction = require('../Modeles/AppartientPass.js'); 
const AppartientPass = AppartientPassFunction(sequelize, Sequelize);

const createAppartenance = async (req, res) => {
    try {
      const Appartenance = await AppartientPass.create(req.body);
      res.status(201).json(Appartenance);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAllAppartenance = async (req, res) => {
    try {
      const Appartenances = await AppartientPass.findAll();
      res.status(200).json(Appartenances);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAppartenanceByIdPass = async (req, res) => {
    try {
      const { idPass } = req.params;
      const Appartenances = await AppartientPass.findAll({
        where: { idPass }
      });
      res.status(200).json(Appartenances);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getAppartenanceByIdBillet = async (req, res) => {
    try {
      const { IdBillet } = req.params;
      const Appartenances = await AppartientPass.findAll({
        where: { IdBillet }
      });
      res.status(200).json(Appartenances);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateAppartenance = async (req, res) => {
    try {
      const { idAppartientPass } = req.params;
      const [updated] = await AppartientPass.update(req.body, {
        where: { idAppartientPass }
      });
  
      if (!updated)
        return res.status(404).json({ error: 'Appartenance not found' });
      
      res.status(200).json({ message: 'Appartenance updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteAppartenance = async (req, res) => {
    try {
      const { idAppartientPass } = req.params;
      const deleted = await AppartientPass.destroy({
        where: { idAppartientPass }
      });
  
      if (!deleted)
        return res.status(404).json({ error: 'Appartenance not found' });
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createAppartenance,
    getAllAppartenance,
    getAppartenanceByIdPass,
    getAppartenanceByIdBillet,
    updateAppartenance,
    deleteAppartenance,
  };