'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('uservendors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    businessname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    vendorId: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('uservendors'),
};
