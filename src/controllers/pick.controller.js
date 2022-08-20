const asyncHandler = require('express-async-handler');
const Pick = require('../models/pick.model');
const axios = require('axios');

const getPicks = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const picks = await Pick.find({ userId });
	res.send(picks);
	return;
});

const addPick = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { gameId, teamId } = req.body;

	const existingPick = await Pick.findOne({ gameId });
	if (existingPick) {
		existingPick.teamId = teamId;

		await existingPick.save();
		res.send('Pick updated successfully.');
		return;
	}

	await Pick.create({
		userId,
		gameId,
		teamId,
	});

	res.send('Pick added successfully.');
	return;
});

module.exports = {
	getPicks,
	addPick,
};
