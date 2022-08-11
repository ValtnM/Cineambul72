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
      FILM_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Films',
          key: "id"
        }
      },
      COMMUNES_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Communes',
          key: "id"
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      heure: {
        allowNull: false,
        type: Sequelize.TIME
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seances');
  }
};