module.exports = (sequelize, DataTypes) => {
    let UserVendors = sequelize.define('UserVendors', {
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
        }},
      vendorId: DataTypes.STRING,
      businessname: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {});
    UserVendors.associate = function (models) {
      // associations can be defined here
    };
    return UserVendors;
  };
  