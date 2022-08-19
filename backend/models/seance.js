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
    FilmId: DataTypes.INTEGER,
    CommuneId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    heure: DataTypes.STRING,
    special: DataTypes.BOOLEAN,
    salle: DataTypes.STRING,
    infoComplementaire: DataTypes.STRING,
    lieu: DataTypes.STRING,
    langue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seance',
  });
  return Seance;
};