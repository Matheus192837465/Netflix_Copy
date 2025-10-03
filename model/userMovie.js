const db = require('../database/db');

const User = require('./user');
const Movie = require('./movie');

User.belongsToMany(Movie, { through: 'user_movies', foreignKey: 'id_user' });
Movie.belongsToMany(User, { through: 'user_movies', foreignKey: 'id_movie' });

module.exports = { User, Movie };
