const express = require('express');
const {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getResourceStats,
} = require('../controllers/resourceController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/resources
// @desc    Get all resources with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllResources);

// @route   GET /api/resources/stats
// @desc    Get resource statistics
// @access  Private
router.get('/stats', auth, getResourceStats);

// @route   GET /api/resources/:id
// @desc    Get resource by ID
// @access  Private
router.get('/:id', auth, getResourceById);

// @route   POST /api/resources
// @desc    Create new resource
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), createResource);

// @route   PUT /api/resources/:id
// @desc    Update resource
// @access  Private (Admin, ProjectManager)
router.put('/:id', auth, authorize('Admin', 'ProjectManager'), updateResource);

// @route   DELETE /api/resources/:id
// @desc    Delete resource
// @access  Private (Admin)
router.delete('/:id', auth, authorize('Admin'), deleteResource);

module.exports = router;