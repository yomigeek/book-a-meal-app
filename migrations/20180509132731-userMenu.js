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

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: Sequelize.DATE,

    formattedDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userMenus'),
};
