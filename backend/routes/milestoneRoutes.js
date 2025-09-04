const express = require('express');
const {
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getMilestoneStats,
} = require('../controllers/milestoneController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/milestones
// @desc    Get all milestones with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllMilestones);

// @route   GET /api/milestones/stats
// @desc    Get milestone statistics
// @access  Private
router.get('/stats', auth, getMilestoneStats);

// @route   GET /api/milestones/:id
// @desc    Get milestone by ID
// @access  Private
router.get('/:id', auth, getMilestoneById);

// @route   POST /api/milestones
// @desc    Create new milestone
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), createMilestone);

// @route   PUT /api/milestones/:id
// @desc    Update milestone
// @access  Private (Admin, ProjectManager)
router.put('/:id', auth, authorize('Admin', 'ProjectManager'), updateMilestone);

// @route   DELETE /api/milestones/:id
// @desc    Delete milestone
// @access  Private (Admin, ProjectManager)
router.delete('/:id', auth, authorize('Admin', 'ProjectManager'), deleteMilestone);

module.exports = router;