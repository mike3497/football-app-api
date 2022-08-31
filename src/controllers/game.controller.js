const asyncHandler = require('express-async-handler');
const Game = require('../models/game.model');
const {
	callCollegeFootballDataApi,
} = require('../helpers/collegefootballdata.helpers');

const getAllGames = asyncHandler(async (req, res) => {
	const games = await Game.find();

	res.send(games);
});

const updateGames = asyncHandler(async (req, res) => {
	const { year, week } = req.body;
	const response = await callCollegeFootballDataApi(year, week);

	res.send(response);
});

module.exports = {
	getAllGames,
	updateGames,
};
