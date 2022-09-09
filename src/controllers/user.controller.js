const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const signUp = asyncHandler(async (req, res) => {
	const { firstName, lastName, username, password } = req.body;

	if (!firstName || !lastName || !username || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	const userExists = await User.findAll({
		where: {
			username: username,
		},
	});

	if (userExists.length > 0) {
		res.status(400);
		throw new Error('Username already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		username,
		password: hashedPassword,
		firstName,
		lastName,
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			token: generateToken(user),
			expirationTime: generateExpirationTime(),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const signIn = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({
		where: {
			username: username,
		},
	});

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			token: generateToken(user),
			expirationTime: generateExpirationTime(),
		});
	} else {
		res.status(400);
		throw new Error('Invalid username / password');
	}
});

const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

const get = asyncHandler(async (req, res) => {
	const userId = req.params.userId;

	const user = await User.findOne({
		where: {
			id: userId,
		},
		attributes: { exclude: ['password'] },
	});

	res.status(200).json(user);
});

const generateToken = (user) => {
	const { id, username, firstName, lastName } = user;

	return jwt.sign(
		{ id, username, firstName, lastName },
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		}
	);
};

const generateExpirationTime = () => {
	let future = new Date();
	future.setDate(future.getDate() + 30);
	return future;
};

module.exports = {
	signUp,
	signIn,
	getMe,
	get,
};
