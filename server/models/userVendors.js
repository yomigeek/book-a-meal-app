export default function (sequelize, DataTypes) {
  const userVendors = sequelize.define('userVendors', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    vendorId: DataTypes.STRING,
    businessname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  userVendors.associate = function (models) {
    // associations can be defined here
  };
  return userVendors;
}
