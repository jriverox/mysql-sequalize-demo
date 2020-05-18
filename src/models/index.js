const Sequelize = require('sequelize');
const userModel = require('./user.model');
const addressModel = require('./address.model');

const yenv = require('yenv');
const env = yenv();
const sequelize = new Sequelize(env.MYSQL.CONNECTION, {
  pool: {
    max: env.MYSQL.POOL_MAX,
    min: env.MYSQL.POOL_MIN,
    acquire: env.MYSQL.ACQUIRE,
    idle: env.MYSQL.IDLE
  }
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  userModel: userModel(sequelize, Sequelize),
  addressModel: addressModel(sequelize, Sequelize)
};

module.exports = db;