
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('userMenu', {
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

    userCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: DataTypes.DATE,

  }, {});

  return menu;
};
