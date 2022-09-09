const asyncHandler = require('express-async-handler');
const Game = require('../models/game.model');
const {
	getNewGamesCFBAPI,
	updateGamesCFBAPI,
} = require('../helpers/collegefootballdata.helpers');

const getGames = asyncHandler(async (req, res) => {
	const query = req.query;

	const games = await Game.findAll({
		where: query,
		order: [
			['date', 'ASC'],
			['homeTeam', 'ASC'],
		],
	});

	res.send(games);
});

const getNewGames = asyncHandler(async (req, res) => {
	const { year, week } = req.body;
	const response = await getNewGamesCFBAPI(year, week);

	res.send(response);
});

const updateGames = asyncHandler(async (req, res) => {
	const { year, week } = req.body;
	const response = await updateGamesCFBAPI(year, week);

	res.send(response);
});

module.exports = {
	getGames,
	getNewGames,
	updateGames,
};
