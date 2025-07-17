const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
  } = req.body;


  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Required fields are missing.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      _id: user._id,
      name: `${user.fullName}`,
      email: user.email,
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); // exclude password
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get user by ID
  const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password'); // exclude password
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Invalid user ID' });
    }
  };

  // Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

  
  module.exports = {
    signup,
    loginUser,
    getAllUsers,
    getUserById,
    deleteUserById
  };