'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Films', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codeTMDB: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      afficheUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateSortie: {
        allowNull: false,
        type: Sequelize.STRING
      },
      genre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trailerUrl: {
        type: Sequelize.STRING
      },
      realisateur: {
        allowNull: true,
        type: Sequelize.STRING
      },
      casting: {
        type: Sequelize.STRING
      },
      duree: {
        allowNull: false,
        type: Sequelize.STRING
      },
      special: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      avertissement: {
        allowNull: true,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Films');
  }
};