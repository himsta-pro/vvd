const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  getTasksByProject,
  getTasksByAssignee,
} = require('../controllers/taskController');
const { validate, schemas } = require('../middleware/validation');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllTasks);

// @route   GET /api/tasks/stats
// @desc    Get task statistics
// @access  Private
router.get('/stats', auth, getTaskStats);

// @route   GET /api/tasks/project/:projectId
// @desc    Get tasks by project
// @access  Private
router.get('/project/:projectId', auth, getTasksByProject);

// @route   GET /api/tasks/assignee/:assigneeId
// @desc    Get tasks by assignee
// @access  Private
router.get('/assignee/:assigneeId', auth, getTasksByAssignee);

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', auth, getTaskById);

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), validate(schemas.task), createTask);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private (Admin, ProjectManager, assigned user)
router.put('/:id', auth, validate(schemas.task), updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private (Admin, ProjectManager)
router.delete('/:id', auth, authorize('Admin', 'ProjectManager'), deleteTask);

module.exports = router;