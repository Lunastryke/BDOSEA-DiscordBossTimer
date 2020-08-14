const { Sequelize } = require("sequelize/types");

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Guilds = sequelize.define('guilds', {
    id: {
        type: Sequelize.STRING,
        unique: true,
    },
    name: Sequelize.STRING,
    channel: Sequelize.STRING
})

module.exports.Guilds = Guilds