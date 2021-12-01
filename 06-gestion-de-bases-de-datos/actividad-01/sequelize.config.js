const SequelizeConfig = require('sequelize');

const sequelize = new SequelizeConfig(
  'sakila', // database
  'root', // user
  'pass', // password
  {
    port: 3306,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
);

module.exports = sequelize;
