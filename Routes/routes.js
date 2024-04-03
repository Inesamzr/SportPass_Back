const express = require('express');
const authentification = require('../Middleware/auth');

const userController = require('../Controllers/UserController.js');


const router = express.Router();

//routes benevole
router.post('/registration', userController.register);
router.post('/login', userController.login);


module.exports = router;