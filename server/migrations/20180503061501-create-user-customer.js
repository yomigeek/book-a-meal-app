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
      allowNull: false,
    },
    customerEmail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customerPassword: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    customerRole: {
      type: Sequelize.ENUM,
      values: ['user', 'admin'],
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
