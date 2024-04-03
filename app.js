const express = require('express');

// cross origin resource sharing pour recevoir des requête de la même machine
const cors = require('cors');

// postparser
const postparser = require("./Middleware/postparser");

// database connection
const sequelize = require('./database.js'); 

// create express app
const app = express();

const jwt = require('jsonwebtoken');

// middleware
app.use(cors()); 
app.use(express.json());
app.use(postparser);


// Test de la connexion à la base de données
(async () => {
    try {
        await sequelize.authenticate();
        console.log('La connexion à la base de données a été établie avec succès.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
})();

const models = require('./Modeles/Relations.js');

const routes = require('./Routes/routes.js');

app.use("/api", routes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});


module.exports = app;