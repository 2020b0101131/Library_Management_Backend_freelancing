const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmailOrMobile } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, mobileNo, aadharNo, libraryAddress, password } = req.body;
 
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await createUser(name, email, mobileNo,aadharNo, libraryAddress, passwordHash);
     // Generate a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user,token });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await getUserByEmailOrMobile(identifier);
  console.log("user::",user)
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.owner_password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate a JWT token
  const token = jwt.sign({ id: user.library_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ success: true, token,user: {
    id: user.id,
    name: user.library_name, 
    email: user.owner_email
  },message: 'Login Successful' });
};

module.exports = { register, login };
