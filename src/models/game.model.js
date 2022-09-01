const mongoose = require('mongoose');

const gameSchema = mongoose.Schema(
	{
		apiId: {
			type: String,
			required: true,
		},
		week: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		homeTeamId: {
			type: String,
			required: true,
		},
		homeTeam: {
			type: String,
			required: true,
		},
		awayTeamId: {
			type: String,
			required: true,
		},
		awayTeam: {
			type: String,
			required: true,
		},
		homeTeamScore: {
			type: Number,
		},
		awayTeamScore: {
			type: Number,
		},
		winningTeamId: {
			type: String,
		},
		winningTeam: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Game', gameSchema);
