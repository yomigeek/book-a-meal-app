module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('userOrders', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: DataTypes.DATE,

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    formattedDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {});

  return orders;
};

