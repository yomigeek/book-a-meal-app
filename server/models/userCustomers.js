module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customerPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customerRole: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: DataTypes.DATE,

  }, {});

  return users;
};
