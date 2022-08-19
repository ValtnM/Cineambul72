'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FilmId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Films',
          key: "id"
        }
      },
      CommuneId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Communes',
          key: "id"
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      heure: {
        allowNull: false,
        type: Sequelize.STRING
      },
      special: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      salle: {
        type: Sequelize.STRING
      },
      infoComplementaire: {
        type: Sequelize.STRING
      },
      lieu: {
        type: Sequelize.STRING
      },
      langue: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Seances');
  }
};