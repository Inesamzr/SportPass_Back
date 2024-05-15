require('dotenv').config();
const Sequelize = require('sequelize');

// JAWSDB_URL=VotreCompleteDatabaseUrl
// var databaseUrl = process.env.JAWSDB_URL

var databaseUrl = "mysql://mysql:0929ffa29e460130@dokku-mysql-sportpass-bd:3306/sportpass_bd";


const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, { dialect: 'mysql' })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql'
        }
    );

module.exports = sequelize;
