const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Game = require('../models/game.model');
const Pick = require('../models/pick.model');

const getLeaderboard = asyncHandler(async (req, res) => {
	const users = await User.find();
	let rows = [];

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		const picks = await Pick.find({ user: user._id })
			.populate('user')
			.populate('game');

		let correctPicks = 0;
		for (let i = 0; i < picks.length; i++) {
			const pick = picks[i];
			const pickedTeamId = pick.teamId;

			if (pick.game.winningTeamId === pickedTeamId) {
				correctPicks += 1;
			}
		}

		const row = {
			user,
			correctPicks,
			totalPicks: picks.length,
			correctPicksPercentage: Number(
				(correctPicks / picks.length) * 100
			).toFixed(2),
		};

		rows.push(row);
	}

	rows = rows.sort((a, b) =>
		a.correctPicksPercentage < b.correctPicksPercentage ? 1 : -1
	);

	res.send(rows);
});

module.exports = {
	getLeaderboard,
};
