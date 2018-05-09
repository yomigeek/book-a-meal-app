
module.exports = (sequelize, DataTypes) => {
  const allMeals = sequelize.define('allMeals', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mealPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mealImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mealId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: DataTypes.DATE,

  }, {});

  return allMeals;
};
