const asyncHandler = require('express-async-handler');
const Game = require('../models/game.model');
const {
	callCollegeFootballDataApi,
} = require('../helpers/collegefootballdata.helpers');

const getGames = asyncHandler(async (req, res) => {
	const week = Number(req.query.week);
	let games;

	games = await Game.find();

	if (week) {
		games = await Game.find({ week });
	}

	res.send(games);
});

const updateGames = asyncHandler(async (req, res) => {
	const { year, week } = req.body;
	const response = await callCollegeFootballDataApi(year, week);

	res.send(response);
});

module.exports = {
	getGames,
	updateGames,
};
