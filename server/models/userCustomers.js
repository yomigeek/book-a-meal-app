export default function (sequelize, DataTypes) {
  const userCustomers = sequelize.define('userCustomers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerId: DataTypes.STRING,
    customerPassword: DataTypes.STRING,
  }, {});
  userCustomers.associate = function (models) {
    // associations can be defined here
  };
  return userCustomers;
}
