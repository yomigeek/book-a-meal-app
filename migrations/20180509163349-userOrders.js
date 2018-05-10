module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userOrders', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: Sequelize.INTEGER,
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

    adminId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: Sequelize.DATE,

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    formattedDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userOrders'),
};
