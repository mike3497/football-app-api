const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Pick = db.define(
	'pick',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		teamId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ underscored: true }
);

module.exports = Pick;
