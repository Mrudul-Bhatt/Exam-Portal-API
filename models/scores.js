const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	score: { type: Number, default: 0 },
	start: { type: String },
	end: { type: String },
});

module.exports = mongoose.model('Score', scoreSchema);
