const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema(
	{
		question: { type: String, required: true },
		options: [String],
		correct: { type: Number, required: true },
		section: { type: Number, required: true },
		mark: { type: Boolean, default: false },
		choice: { type: Number, default: null },
		visited: { type: Boolean, default: false },
		color: { type: String, default: 'nocolor' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Ques', questionSchema);
