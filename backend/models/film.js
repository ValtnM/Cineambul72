'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Film.hasMany(models.Seance, {
        onDelete: "CASCADE",
        foreignKey: "FilmId"
      })
    }
  }
  Film.init({
    codeTMDB: DataTypes.INTEGER,
    afficheUrl: DataTypes.STRING,
    titre: DataTypes.STRING,
    dateSortie: DataTypes.STRING,
    genre: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    trailerUrl: DataTypes.STRING,
    realisateur: DataTypes.STRING,
    casting: DataTypes.STRING,
    duree: DataTypes.STRING,
    special: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};