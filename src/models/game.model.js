const Sequelize = require('sequelize');
const db = require('../config/db.config');
const Pick = require('./pick.model');

const Game = db.define(
	'game',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		apiId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		week: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		homeTeamId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		homeTeam: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		awayTeamId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		awayTeam: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		homeTeamScore: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		awayTeamScore: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		winningTeamId: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		winningTeam: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{ underscored: true }
);

Game.hasMany(Pick);
Pick.belongsTo(Game);

module.exports = Game;
