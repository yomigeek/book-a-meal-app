

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('allMeals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    mealName: {
      type: Sequelize.STRING,
    },
    mealPrice: {
      type: Sequelize.INTEGER,
    },
    mealImage: {
      type: Sequelize.STRING,
    },
    mealId: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('allMeals'),
};
