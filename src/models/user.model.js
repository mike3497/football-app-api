const Sequelize = require('sequelize');
const db = require('../config/db.config');
const Pick = require('./pick.model');

const User = db.define(
	'user',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ underscored: true }
);

User.hasMany(Pick);
Pick.belongsTo(User);

module.exports = User;
