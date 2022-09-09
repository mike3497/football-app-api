const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	process.env.AWS_MYSQL_DATABASE,
	process.env.AWS_MYSQL_USERNAME,
	process.env.AWS_MYSQL_PASSWORD,
	{
		host: process.env.AWS_MYSQL_ENDPOINT,
		port: process.env.AWS_MYSQL_PORT,
		dialect: 'mysql',
	}
);

module.exports = sequelize;
