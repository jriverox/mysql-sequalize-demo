module.exports = (sequelize, DataTypes) => {
  const addressModel = sequelize.define('Address', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  return addressModel;
};