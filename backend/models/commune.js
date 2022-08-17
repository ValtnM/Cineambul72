'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commune extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Commune.hasMany(models.Seance, {
        foreignKey: 'CommuneId'
      });

      models.Commune.hasMany(models.Photo, {
        foreignKey: 'CommuneId'
      });


      // models.Commune.belongsToMany(models.Film; {
      //   through: 
      // })

    }
  }
  Commune.init({
    nom: DataTypes.STRING,
    salleNom: DataTypes.STRING,
    salleRue: DataTypes.STRING,
    salleCommune: DataTypes.STRING,
    salleContact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commune',
  });
  return Commune;
};