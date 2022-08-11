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
        foreignKey: "FILM_id"
      })
    }
  }
  Film.init({
    lienYoutube: DataTypes.STRING,
    langue: DataTypes.STRING,
    codeTMDB: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};