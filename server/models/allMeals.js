
export default function (sequelize, DataTypes) {
  const allMeals = sequelize.define('allMeals', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mealName: DataTypes.STRING,
    mealPrice: DataTypes.INTEGER,
    mealImage: DataTypes.STRING,
    mealId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});

  allMeals.associate = (models) => {
    allMeals.belongsTo(models.userCustomers, { foreignKey: 'userId', targetKey: 'id' });
  };
  return allMeals;
}
