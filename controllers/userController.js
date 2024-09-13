const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await createUser(name, email, passwordHash);
     // Generate a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user,token });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email },message: 'Login Successful' });
};

module.exports = { register, login };
