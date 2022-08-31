const mongoose = require('mongoose');

const pickSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		game: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game',
			required: true,
		},
		teamId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Pick', pickSchema);
