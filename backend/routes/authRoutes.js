const express = require('express');
const { register, login, forgotPassword, getProfile } = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validation');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(schemas.register), register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(schemas.login), login);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, getProfile);

module.exports = router;