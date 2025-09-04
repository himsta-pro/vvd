const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users with pagination, filtering, and sorting
// @access  Private (Admin)
router.get('/', auth, authorize('Admin'), getAllUsers);

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private (Admin)
router.get('/stats', auth, authorize('Admin'), getUserStats);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private (Admin)
router.get('/:id', auth, authorize('Admin'), getUserById);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private (Admin)
router.put('/:id', auth, authorize('Admin'), updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private (Admin)
router.delete('/:id', auth, authorize('Admin'), deleteUser);

module.exports = router;