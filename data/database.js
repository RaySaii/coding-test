// eslint-disable-next-line import/no-extraneous-dependencies
const { Sequelize } = require('sequelize');
// eslint-disable-next-line import/no-extraneous-dependencies
const sqlite3 = require('sqlite3');

const sequelize = new Sequelize('user_db', 'user', 'pass', {
  dialect: 'sqlite',
  host: './data/db.sqlite',
  dialectModule: sqlite3,
});

module.exports = sequelize;
