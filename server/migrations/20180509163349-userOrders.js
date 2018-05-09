module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userOrders', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
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

    adminId: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: Sequelize.DATE,
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userOrders'),
};
