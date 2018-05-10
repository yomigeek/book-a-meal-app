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
      allowNull: false,
    },
    mealPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mealImage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
