

module.exports = (sequelize, DataTypes) => {
  let allMeals = sequelize.define('allMeals', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mealName: DataTypes.STRING,
    mealPrice: DataTypes.INTEGER,
    mealImage: DataTypes.STRING,
    mealId: DataTypes.STRING,
  }, {});
  allMeals.associate = function (models) {
    // associations can be defined here
  };
  return allMeals;
};
