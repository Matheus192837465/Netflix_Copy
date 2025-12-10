const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Movie = db.sequelize.define('movie', {
  id_movie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  age_rating: {
    type: DataTypes.STRING,
    allowNull: false
  },
  film_direction: {
    type: DataTypes.STRING,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  launch_year: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Movie;