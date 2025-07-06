import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongo from 'mongoose';
import User from '../Models/user.js';
import dotenv from 'dotenv';


const registerUser = async (req, res) => {

const { name, email ,password } = req.body;
if (!name || !email || !password) {
  console.error('All fields are required');
  return res.status(400).json({ message: 'All fields are required' });  
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    });
    await newUser.save();

    return res.status(201).json(
      { message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
const loginUser = async (req, res) => {

const { email, password } = req.body;

if (!email || !password) {
  console.error('Email and password are required');
  return res.status(400).json({ message: 'Email and password are required' });
}

try {
  const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({ message: 'User not found' });
}

if (!bcrypt.compareSync(password, user.password)) {
  return res.status(401).json({ message: 'Invalid password' });
}
// Generate JWT token
const token = jwt.sign(
  { userId: user._id },
   process.env.JWT_SECRET,
  { expiresIn: '2h' }
);

return res.status(200).json({
  message: 'Login successful',
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  },
  token : token
});

} catch (error) {
  console.error('Error logging in user:', error);
  return res.status(500).json({ message: 'Internal server error' });
}
}

export default {
  registerUser,
  loginUser
};