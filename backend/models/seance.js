'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Seance.belongsTo(models.Film);

      models.Seance.belongsTo(models.Commune);
    }
  }
  Seance.init({
    FILM_id: DataTypes.INTEGER,
    COMMUNES_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    heure: DataTypes.TIME,
    special: DataTypes.BOOLEAN,
    salle: DataTypes.STRING,
    infoComplementaire: DataTypes.STRING,
    lieu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seance',
  });
  return Seance;
};