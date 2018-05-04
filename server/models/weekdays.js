export default function (sequelize, DataTypes) {
  const weekdays = sequelize.define('weekdays', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dayName: DataTypes.STRING,
    dayValue: DataTypes.INTEGER,
  }, {});
  weekdays.associate = function (models) {
    // associations can be defined here
  };
  return weekdays;
}
