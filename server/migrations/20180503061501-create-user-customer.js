module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userCustomers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    customerName: {
      type: Sequelize.STRING,
    },
    customerEmail: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.STRING,
    },
    customerPassword: {
      type: Sequelize.STRING,
    },
    customerRole: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userCustomers'),
};
