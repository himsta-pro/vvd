const express = require('express');
const {
  generateProjectReport,
  getReportHistory,
  getDashboardStats,
} = require('../controllers/reportController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/reports/generate
// @desc    Generate project reports
// @access  Private
router.get('/generate', auth, generateProjectReport);

// @route   GET /api/reports/history
// @desc    Get report generation history
// @access  Private
router.get('/history', auth, getReportHistory);

// @route   GET /api/reports/dashboard-stats
// @desc    Get dashboard statistics based on user role
// @access  Private
router.get('/dashboard-stats', auth, getDashboardStats);

module.exports = router;