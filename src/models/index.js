const { Sequelize, DataTypes } = require('sequelize');
const userModelInitializer = require('./user.model');
const addressModelInitializer = require('./address.model');

const yenv = require('yenv');
const env = yenv();
const sequelize = new Sequelize(env.MYSQL.CONNECTION, {
  timestamps: false,
  logging: false,
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
  users: userModelInitializer(sequelize, DataTypes),
  addresses: addressModelInitializer(sequelize, DataTypes)
};

db.users.hasMany(db.addresses, { as:  'addresses'});
db.addresses.belongsTo(db.users, { foreignKey: 'userId', as: 'user'})

module.exports = db;