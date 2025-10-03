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
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        direcao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sinopse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Data_lanc:{
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
