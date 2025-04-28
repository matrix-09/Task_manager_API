const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');

// Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({ name, email, password });

  // Generate JWT
  const token = generateToken(user._id, user.role);

  res.status(201).json({ token });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = generateToken(user._id, user.role);

  res.json({ token });
};