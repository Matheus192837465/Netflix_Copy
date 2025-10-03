const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const User = require('./user');

const Movie = sequelize.define('movie', {
    id_movie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age_rating: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    film_direction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    launch_year: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 1900,
          max: 2100
        }
      },
      
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'movies'
});

Movie.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Movie, { foreignKey: 'user_id' });

module.exports = Movie;
