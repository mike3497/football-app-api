const Sequelize = require('sequelize');
const sequelize = new Sequelize('football_app', 'root', 'N@$c@r3497', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
});

module.exports = sequelize;
