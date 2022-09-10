const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Game = require('../models/game.model');
const Pick = require('../models/pick.model');
const { Op } = require('sequelize');

const getLeaderboard = asyncHandler(async (req, res) => {
	const users = await User.findAll({ attributes: { exclude: ['password'] } });
	let rows = [];

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		const picks = await Pick.findAll({
			where: { userId: user.id },
			include: [
				{
					model: User,
					required: true,
				},
				{
					model: Game,
					required: true,
				},
			],
		});

		let correctPicks = 0;
		for (let i = 0; i < picks.length; i++) {
			const pick = picks[i];
			const pickedTeamId = pick.teamId;

			if (pick.game.winningTeamId === pickedTeamId) {
				correctPicks += 1;
			}
		}

		const games = await Game.findAll({
			where: {
				winningTeam: {
					[Op.not]: null,
				},
			},
		});

		const row = {
			user,
			correctPicks,
			totalPicks: picks.length,
			gamesPlayed: games.length,
			correctPicksPercentage: Number(
				(correctPicks / games.length) * 100
			).toFixed(2),
		};

		rows.push(row);
	}

	rows = rows.sort((a, b) =>
		a.correctPicksPercentage < b.correctPicksPercentage ? 1 : -1
	);

	let rankings = new Array(rows.length);
	rankings[0] = 1;
	rows[0].ranking = 1;

	for (let i = 1; i < rankings.length; i++) {
		rankings[i] =
			rows[i].correctPicksPercentage == rows[i - 1].correctPicksPercentage
				? rankings[i - 1]
				: i + 1;

		rows[i].ranking = rankings[i];
	}

	res.send(rows);
});

module.exports = {
	getLeaderboard,
};
