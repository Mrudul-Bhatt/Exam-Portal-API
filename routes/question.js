const express = require('express');
const Ques = require('../models/question');
const Score = require('../models/scores');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();

router.get('/allques', requireLogin, (req, res) => {
	Ques.find()
		.then((myques) => res.json({ myques }))
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Server is down, try again later' });
		});
});

router.delete('/deleteques', (req, res) => {
	Ques.findOne({ _id: req.body.quesId }).exec((err, ques) => {
		if (err || !ques) {
			return res.status(422).json({ error: err });
		}
		ques
			.remove()
			.then((result) => {
				res.json({ message: 'Question deleted', result });
			})
			.catch((error) => {
				res.status(500).json({ error: 'Server is down, try again later' });
				console.log(error);
			});
	});
});

router.get('/editques/:quesId', (req, res) => {
	Ques.findOne({ _id: req.params.quesId })
		.then((myques) => res.json({ myques }))
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Server is down, try again later' });
		});
});

router.put('/updateques', (req, res) => {
	// if (!title || !body) {
	// 	return res.status(422).json({ error: 'Please enter all fields' });
	// }

	const { question, options, correct, section } = req.body;

	Ques.findByIdAndUpdate(
		req.body.quesId,
		{
			question,
			options,
			correct,
			section,
		},
		{ new: true }
	)
		.then((data) => {
			res.json({ message: 'Question updated', data });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Server error' });
		});
});

router.post('/createques', (req, res) => {
	const { question, options, correct, section } = req.body;
	// if (!title || !body) {
	// 	return res.status(422).json({ error: 'Please enter all fields' });
	// }
	//baring from storing password in req.user
	// req.user.password = undefined;

	const newQues = new Ques({
		question,
		options,
		correct,
		section,
	});

	newQues
		.save()
		.then((createdQues) => {
			res.json({ createdQues, message: 'Question added' });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Server is down, try again later' });
		});
});

router.post('/submit', requireLogin, (req, res) => {
	const { name, email, score, start, end } = req.body;
	const newScore = new Score({
		name,
		email,
		score,
		start,
		end,
	});
	newScore
		.save()
		.then((value) => {
			res.json({ value, message: 'Score added' });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Server is down, try again later' });
		});
});

router.put('/favourite', requireLogin, (req, res) => {
	Note.findByIdAndUpdate(
		req.body.postId,
		{
			$set: { favourite: true },
		},
		{ new: true }
	)
		.populate('postedBy', '_id name')
		.then((data) => {
			res.json({ data });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Server error' });
		});
});

router.put('/unfavourite', requireLogin, (req, res) => {
	Note.findByIdAndUpdate(
		req.body.postId,
		{
			$set: { favourite: false },
		},
		{ new: true }
	)
		.populate('postedBy', '_id name')
		.then((data) => {
			res.json({ data });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Server error' });
		});
});

router.post('/searchnotes', requireLogin, (req, res) => {
	let notePattern = new RegExp('^' + req.body.query);
	Note.find({ title: { $regex: notePattern } })
		.populate('postedBy', '_id name')
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Server Error' });
		});
});

module.exports = router;
