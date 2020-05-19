module.exports = (sequelize, DataTypes) => {
  const addressModel = sequelize.define('address', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    timestamps: false,
  });
  return addressModel;
};