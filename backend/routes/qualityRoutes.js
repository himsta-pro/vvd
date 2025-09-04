const express = require('express');
const {
  getAllInspections,
  getInspectionById,
  createInspection,
  updateInspection,
  deleteInspection,
  getQualityStats,
} = require('../controllers/qualityController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/quality/inspections
// @desc    Get all quality inspections
// @access  Private
router.get('/inspections', auth, getAllInspections);

// @route   GET /api/quality/inspections/stats
// @desc    Get quality statistics
// @access  Private
router.get('/inspections/stats', auth, getQualityStats);

// @route   GET /api/quality/inspections/:id
// @desc    Get inspection by ID
// @access  Private
router.get('/inspections/:id', auth, getInspectionById);

// @route   POST /api/quality/inspections
// @desc    Create new inspection
// @access  Private (Admin, ProjectManager, Quality)
router.post('/inspections', auth, authorize('Admin', 'ProjectManager', 'Quality'), createInspection);

// @route   PUT /api/quality/inspections/:id
// @desc    Update inspection
// @access  Private (Admin, ProjectManager, Quality)
router.put('/inspections/:id', auth, authorize('Admin', 'ProjectManager', 'Quality'), updateInspection);

// @route   DELETE /api/quality/inspections/:id
// @desc    Delete inspection
// @access  Private (Admin, Quality)
router.delete('/inspections/:id', auth, authorize('Admin', 'Quality'), deleteInspection);

module.exports = router;