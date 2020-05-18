module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    // Other model options go here
  });
  return userModel;
};