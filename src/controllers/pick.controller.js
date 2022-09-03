const asyncHandler = require('express-async-handler');
const Pick = require('../models/pick.model');
const Game = require('../models/game.model');
const axios = require('axios');
const hours = process.env.PICK_HOURS;

const getPicks = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const picks = await Pick.find({ user: userId });
	res.send(picks);
	return;
});

const addPick = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { gameId, teamId } = req.body;

	const game = await Game.findOne({ _id: gameId });
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

	const existingPick = await Pick.findOne({ 'game._id': gameId });
	if (existingPick) {
		existingPick.teamId = teamId;

		await existingPick.save();
		res.send('Pick updated successfully.');
		return;
	}

	await Pick.create({
		user: userId,
		game: gameId,
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
