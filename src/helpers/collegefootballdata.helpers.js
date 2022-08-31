const axios = require('axios');
const Game = require('../models/game.model');

async function callCollegeFootballDataApi(year, week) {
	const startTime = new Date();
	const apiKey = process.env.COLLEGE_FOOTBAL_DATA_API_KEY;

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
	let gamesUpdated = 0;

	for (var i = 0; i < games.length; i++) {
		const game = games[i];
		const apiId = game.id;

		const existingGame = await Game.findOne({ apiId: apiId });
		if (existingGame) {
			existingGame.homeTeamScore = game.away_points;
			existingGame.awayTeamScore = game.away_points;

			if (game.home_points > game.away_points) {
				existingGame.winningTeamId = game.home_id;
				existingGame.winningTeam = game.home_team;
			} else if (game.away_points < game.home_points) {
				existingGame.winningTeamId = game.away_id;
				existingGame.winningTeam = game.away_team;
			}

			await existingGame.save();
			gamesUpdated += 1;
			continue;
		}

		const newGame = {
			apiId: game.id,
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
		} else if (game.away_points < game.home_points) {
			newGame.winningTeamId = game.away_id;
			newGame.winningTeam = game.away_team;
		}

		await Game.create(newGame);

		gamesCreated += 1;
	}

	const endTime = new Date();
	return { startTime, endTime, gamesFound, gamesCreated, gamesUpdated };
}

module.exports = {
	callCollegeFootballDataApi,
};
