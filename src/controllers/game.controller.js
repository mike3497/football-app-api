const asyncHandler = require('express-async-handler');
const Game = require('../models/game.model');
const axios = require('axios');

const getAll = asyncHandler(async (req, res) => {
	const games = await Game.find();

	res.send(games);
});

const getFromApi = asyncHandler(async (req, res) => {
	const { year, week } = req.body;

	const apiKey =
		'3vFD2IzWAUp/u+cvPYzMNcvA9Icvx2DGP8FB5Jk487d+OedTtEhKYz6uVvuCrWub';

	const config = {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	};

	const url = `https://api.collegefootballdata.com/games?year=${year}&week=${week}&division=fbs`;

	const result = await axios.get(url, config);
	const games = result.data;

	const gamesFound = games.length;
	let gamesCreated = 0;
	let gamesSkipped = 0;

	for (var i = 0; i < games.length; i++) {
		const game = games[i];
		const apiId = game.id;
		const gameExists = await Game.findOne({ apiId: apiId });
		if (gameExists) {
			gamesSkipped += 1;
			console.log(`Game with apiId: ${game.id} already exists.`);
			continue;
		}

		const newGame = await Game.create({
			apiId: game.id,
			date: game.start_date,
			homeTeamId: game.home_id,
			homeTeam: game.home_team,
			awayTeamId: game.away_id,
			awayTeam: game.away_team,
		});

		gamesCreated += 1;
		console.log('New Game created.');
	}

	res.send({ gamesFound, gamesCreated, gamesSkipped });
});

module.exports = {
	getAll,
	getFromApi,
};
