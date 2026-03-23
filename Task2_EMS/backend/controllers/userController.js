import User from '../models/user.js';
import cookieToken from '../utils/cookieToken.js';
import bcrypt from 'bcryptjs';

// Register/SignUp user
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required',
      });
    }

    // Check if user is already registered
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already registered!',
      });
    }

    user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    // Send token via cookie
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err.message,
    });
  }
};

// Login/SignIn user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    // We use .select('+password') because we likely set it to select: false in the model
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!',
      });
    }

    // Match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Email or password is incorrect!',
      });
    }

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err.message,
    });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required',
      });
    }

    let user = await User.findOne({ email });

    // If user doesn't exist, create one with a random password
    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
        role: 'user'
      });
    }

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err.message,
    });
  }
};

// Update user (Name or Password)
export const updateUserDetails = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (name) user.name = name;
    if (password) user.password = password;

    const updatedUser = await user.save();
    cookieToken(updatedUser, res);
  } catch (error) {
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

// Logout
export const logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};