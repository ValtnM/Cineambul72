'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      texte: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accueil: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      circuit: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      royal: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      mulsanne: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      evenements: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};