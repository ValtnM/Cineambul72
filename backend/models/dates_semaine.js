'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DatesSemaine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DatesSemaine.init({
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DatesSemaine',
  });
  return DatesSemaine;
};