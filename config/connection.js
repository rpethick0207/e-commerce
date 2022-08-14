const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ?  new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: DB_HOST,
      username: DB_USER,
      password: DB_PW,
      database: DB,
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
