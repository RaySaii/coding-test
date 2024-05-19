// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes, Model } = require('sequelize');

const sequelize = require('./database');

class User extends Model {}

User.init(
  {
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    did: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Owner', 'Admin', 'Member', 'Guest', 'Other'],
      allowNull: true,
    },
  },
  { sequelize, modelName: 'user' }
);

module.exports = User;
