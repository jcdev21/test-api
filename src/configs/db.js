const Sequelize = require('sequelize');

let db;

if (process.env.NODE_ENV === "production") {
    db = new Sequelize(process.env.PROD_DATABASE, process.env.PROD_USER, process.env.PROD_PASSWORD, {
        dialect: process.env.PROD_DATABASE_DIALECT,
        host: process.env.PROD_HOST,
    });
} else {
    db = new Sequelize(process.env.DEV_DATABASE, process.env.DEV_USER, process.env.DEV_PASSWORD, {
        dialect: process.env.DATABASE_DIALECT
    });
}

db.sync();

module.exports = db;