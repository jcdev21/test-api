const Sequelize = require('sequelize');
const db = require('../configs/db');

const User = db.define(
    "users",
    {
        first_name: { type: Sequelize.STRING(50) },
        last_name: { type: Sequelize.STRING(50) },
        email: { type: Sequelize.STRING(50) },
        password: { type: Sequelize.STRING(100) }
    },
    {
        underscored: true
    }
);

module.exports = User;