const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		timeStarted: {
			type: String,
		},
		timeCompleted: {
			type: String,
		},
		result: {
			type: Object,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Task', taskSchema);
