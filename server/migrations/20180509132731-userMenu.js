module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userMenus', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    menuId: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    mealId: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    userCustomerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: Sequelize.DATE,
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userMenus'),
};
