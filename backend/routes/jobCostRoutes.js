const express = require('express');
const {
  getAllJobCosts,
  getJobCostById,
  createJobCost,
  updateJobCost,
  deleteJobCost,
  getJobCostStats,
} = require('../controllers/jobCostController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/job-costs
// @desc    Get all job costs with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllJobCosts);

// @route   GET /api/job-costs/stats
// @desc    Get job cost statistics and price database
// @access  Private
router.get('/stats', auth, getJobCostStats);

// @route   GET /api/job-costs/:id
// @desc    Get job cost by ID
// @access  Private
router.get('/:id', auth, getJobCostById);

// @route   POST /api/job-costs
// @desc    Create new job cost
// @access  Private (Admin, ProjectManager, Finance)
router.post('/', auth, authorize('Admin', 'ProjectManager', 'Finance'), createJobCost);

// @route   PUT /api/job-costs/:id
// @desc    Update job cost
// @access  Private (Admin, ProjectManager, Finance)
router.put('/:id', auth, authorize('Admin', 'ProjectManager', 'Finance'), updateJobCost);

// @route   DELETE /api/job-costs/:id
// @desc    Delete job cost
// @access  Private (Admin, Finance)
router.delete('/:id', auth, authorize('Admin', 'Finance'), deleteJobCost);

module.exports = router;