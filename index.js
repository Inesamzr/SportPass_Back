// Importation des modules nécessaires
const http = require('http');

// Définition de la fonction de gestion des requêtes HTTP
const requestHandler = (request, response) => {
  console.log(`Requête reçue : ${request.url}`);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!');
}

// Création d'un serveur HTTP et association de la fonction de gestion des requêtes
const server = http.createServer(requestHandler);

// Spécification du port sur lequel le serveur écoutera
const port = 3000;

// Démarrage du serveur sur le port spécifié
server.listen(port, (err) => {
  if (err) {
    return console.error(`Erreur lors du démarrage du serveur : ${err}`);
  }
  console.log(`Serveur démarré et écoutant sur le port ${port}`);
});
