const { DataTypes } = require('sequelize');
const db = require('../database/db');
const { FORCE } = require('sequelize/lib/index-hints');

const Movie = db.sequelize.define(
    'movie',
    {
        id_movie: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            alloowNull: false
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
            type: DataTypes.INTEGER,
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
        launch_year:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }

    }    
);

Movie.sync({FORCE: true});
module.exports = Movie;
