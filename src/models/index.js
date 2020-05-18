const { Sequelize, DataTypes } = require('sequelize');
const userModelFn = require('./user.model');
const addressModelFn = require('./address.model');

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

const userModel = userModelFn(sequelize, DataTypes);
const addressModel = addressModelFn(sequelize, DataTypes);
userModel.hasMany(addressModel);
addressModel.belongsTo(userModel);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  userModel: userModel,
  addressModel: addressModel
};

module.exports = db;