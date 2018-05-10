
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('userMenus', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mealId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: DataTypes.DATE,

    formattedDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {});

  return menu;
};
