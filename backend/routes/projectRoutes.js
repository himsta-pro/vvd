const express = require('express');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats,
} = require('../controllers/projectController');
const { validate, schemas } = require('../middleware/validation');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllProjects);

// @route   GET /api/projects/stats
// @desc    Get project statistics
// @access  Private
router.get('/stats', auth, getProjectStats);

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, getProjectById);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), validate(schemas.project), createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin, ProjectManager)
router.put('/:id', auth, authorize('Admin', 'ProjectManager'), validate(schemas.project), updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/:id', auth, authorize('Admin'), deleteProject);

module.exports = router;