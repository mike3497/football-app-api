const axios = require('axios');
const Game = require('../models/game.model');
const apiKey = process.env.COLLEGE_FOOTBAL_DATA_API_KEY;

async function getNewGamesCFBAPI(year, week) {
	const startTime = new Date();

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

	for (var i = 0; i < games.length; i++) {
		const game = games[i];
		const apiId = game.id;

		const existingGame = await Game.findOne({
			where: {
				apiId: apiId,
			},
		});
		if (existingGame) {
			continue;
		}

		const newGame = {
			apiId: game.id,
			week: game.week,
			date: game.start_date,
			homeTeamId: game.home_id,
			homeTeam: game.home_team,
			awayTeamId: game.away_id,
			awayTeam: game.away_team,
			homeTeamScore: game.home_points,
			awayTeamScore: game.away_points,
		};

		if (game.home_points > game.away_points) {
			newGame.winningTeamId = game.home_id;
			newGame.winningTeam = game.home_team;
		} else if (game.away_points > game.home_points) {
			newGame.winningTeamId = game.away_id;
			newGame.winningTeam = game.away_team;
		}

		await Game.create(newGame);

		gamesCreated += 1;
	}

	const endTime = new Date();
	return { startTime, endTime, gamesFound, gamesCreated };
}

async function updateGamesCFBAPI(year, week) {
	const startTime = new Date();

	const config = {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	};

	const url = `https://api.collegefootballdata.com/games?year=${year}&week=${week}&division=fbs`;

	const result = await axios.get(url, config);
	const games = result.data;

	const gamesFound = games.length;
	let gamesUpdated = 0;

	for (var i = 0; i < games.length; i++) {
		const game = games[i];
		const apiId = game.id;

		const existingGame = await Game.findOne({
			where: {
				apiId: apiId,
			},
		});
		if (existingGame) {
			existingGame.homeTeamScore = game.home_points;
			existingGame.awayTeamScore = game.away_points;

			if (game.home_points > game.away_points) {
				existingGame.winningTeamId = game.home_id;
				existingGame.winningTeam = game.home_team;
			} else if (game.away_points > game.home_points) {
				existingGame.winningTeamId = game.away_id;
				existingGame.winningTeam = game.away_team;
			}

			const result = await existingGame.save();
			gamesUpdated += 1;
			continue;
		}
	}

	const endTime = new Date();
	return { startTime, endTime, gamesFound, gamesUpdated };
}

module.exports = {
	getNewGamesCFBAPI,
	updateGamesCFBAPI,
};
