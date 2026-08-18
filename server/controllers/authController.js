const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, region, usertype = 'customer' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      username: username || email.split('@')[0],
      email,
      password: hashedPassword,
      region,
      usertype,
    });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        region: user.region,
        usertype: user.usertype,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        region: user.region,
        usertype: user.usertype,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = { signup, login };
