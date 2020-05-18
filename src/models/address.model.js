module.exports = (sequelize, Sequelize) => {
  const addressModel = sequelize.define('Address', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    strett: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  return addressModel;
};