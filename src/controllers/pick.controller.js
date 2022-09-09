const asyncHandler = require('express-async-handler');
const hours = process.env.PICK_HOURS;

const Pick = require('../models/pick.model');
const User = require('../models/user.model');
const Game = require('../models/game.model');

const getPicks = asyncHandler(async (req, res) => {
	const userId = req.query.userId;
	const week = req.query.week;

	const query = {
		userId,
	};

	if (week) {
		query['$game.week$'] = week;
	}

	let picks = [];

	picks = await Pick.findAll({
		where: query,
		include: [
			{
				model: User,
				required: true,
				attributes: { exclude: ['password'] },
			},
			{
				model: Game,
				required: true,
			},
		],
		order: [
			[Game, 'date', 'ASC'],
			[Game, 'homeTeam', 'ASC'],
		],
	});

	res.send(picks);
	return;
});

const addPick = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const { gameId, teamId } = req.body;

	const game = await Game.findOne({
		where: {
			id: gameId,
		},
	});

	if (!game) {
		res.status(500);
		throw new Error(`Game with Id: ${gameId} not found.`);
	}

	const gameDate = game.date;
	const currentDate = new Date();
	if (currentDate > subtractHours(gameDate, hours)) {
		res.status(500);
		throw new Error(
			`Pick must be made within ${hours} hours of scheduled game time.`
		);
	}

	const existingPick = await Pick.findOne({
		where: {
			userId: userId,
			gameId: gameId,
		},
	});

	if (existingPick) {
		existingPick.teamId = teamId;

		await existingPick.save();
		res.send('Pick updated successfully.');
		return;
	}

	await Pick.create({
		userId: userId,
		gameId: gameId,
		teamId,
	});

	res.send('Pick added successfully.');
	return;
});

function subtractHours(date, hours) {
	date.setHours(date.getHours() - hours);
	return date;
}

module.exports = {
	getPicks,
	addPick,
};
