const express = require('express');
const {
  getAllRisks,
  getRiskById,
  createRisk,
  updateRisk,
  deleteRisk,
  getRiskStats,
} = require('../controllers/riskController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/risks
// @desc    Get all risks with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllRisks);

// @route   GET /api/risks/stats
// @desc    Get risk statistics
// @access  Private
router.get('/stats', auth, getRiskStats);

// @route   GET /api/risks/:id
// @desc    Get risk by ID
// @access  Private
router.get('/:id', auth, getRiskById);

// @route   POST /api/risks
// @desc    Create new risk
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), createRisk);

// @route   PUT /api/risks/:id
// @desc    Update risk
// @access  Private (Admin, ProjectManager)
router.put('/:id', auth, authorize('Admin', 'ProjectManager'), updateRisk);

// @route   DELETE /api/risks/:id
// @desc    Delete risk
// @access  Private (Admin, ProjectManager)
router.delete('/:id', auth, authorize('Admin', 'ProjectManager'), deleteRisk);

module.exports = router;