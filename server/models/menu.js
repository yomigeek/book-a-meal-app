// Model for the meals menu
export default function (sequelize, DataTypes) {
  const weekdays = sequelize.define('weekdays', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mealId: DataTypes.STRING,
    dayOfWeek: DataTypes.INTEGER,
  }, {});
  weekdays.associate = function (models) {
    // associations can be defined here
  };
  return weekdays;
}
