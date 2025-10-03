const { DataTypes } = require('sequelize');
const db = require('../database/db');
const { FORCE } = require('sequelize/lib/index-hints');

const User = db.sequelize.define(
    'user',
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
        }

    }    
);

User.sync({FORCE: true});
module.exports = User;
