const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role = 'Client' } = req.body;

    const connection = getConnection();

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user
    const [result] = await connection.execute(
      `INSERT INTO users (first_name, last_name, email, password, role, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
      [first_name, last_name, email, hashedPassword, role]
    );

    // Get created user (without password)
    const [users] = await connection.execute(
      'SELECT id, first_name, last_name, email, role, status, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    const user = users[0];
    const token = generateToken(user.id);

    successResponse(res, {
      user,
      token,
    }, 'User registered successfully', 201);

  } catch (error) {
    console.error('Register error:', error);
    errorResponse(res, 'Registration failed', 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const connection = getConnection();

    // Get user with password
    const [users] = await connection.execute(
      'SELECT id, first_name, last_name, email, password, role, status FROM users WHERE email = ? AND role = ?',
      [email, role]
    );

    if (users.length === 0) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const user = users[0];

    if (user.status !== 'active') {
      return errorResponse(res, 'Account is not active', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Remove password from user object
    delete user.password;

    const token = generateToken(user.id);

    successResponse(res, {
      user,
      token,
    }, 'Login successful');

  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 'Login failed', 500);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const connection = getConnection();

    // Check if user exists
    const [users] = await connection.execute(
      'SELECT id, email FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return errorResponse(res, 'User not found with this email', 404);
    }

    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Save it to database with expiration
    // 3. Send email with reset link

    successResponse(res, null, 'Password reset link sent to your email');

  } catch (error) {
    console.error('Forgot password error:', error);
    errorResponse(res, 'Failed to process password reset', 500);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = getConnection();

    const [users] = await connection.execute(
      'SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, users[0], 'Profile retrieved successfully');

  } catch (error) {
    console.error('Get profile error:', error);
    errorResponse(res, 'Failed to get profile', 500);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  getProfile,
};