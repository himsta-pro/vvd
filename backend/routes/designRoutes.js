const express = require('express');
const {
  getAllDrawings,
  getDrawingById,
  uploadDrawing,
  updateDrawing,
  deleteDrawing,
  getDesignStats,
} = require('../controllers/designController');
const { auth, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/designs/drawings
// @desc    Get all drawings with pagination, filtering, and sorting
// @access  Private
router.get('/drawings', auth, getAllDrawings);

// @route   GET /api/designs/drawings/stats
// @desc    Get design statistics
// @access  Private
router.get('/drawings/stats', auth, getDesignStats);

// @route   GET /api/designs/drawings/:id
// @desc    Get drawing by ID
// @access  Private
router.get('/drawings/:id', auth, getDrawingById);

// @route   POST /api/designs/drawings
// @desc    Upload new drawing
// @access  Private (Admin, ProjectManager, Designer)
router.post('/drawings', auth, authorize('Admin', 'ProjectManager', 'Designer'), uploadSingle('drawing'), uploadDrawing);

// @route   PUT /api/designs/drawings/:id
// @desc    Update drawing
// @access  Private (Admin, ProjectManager, Designer)
router.put('/drawings/:id', auth, authorize('Admin', 'ProjectManager', 'Designer'), uploadSingle('drawing'), updateDrawing);

// @route   DELETE /api/designs/drawings/:id
// @desc    Delete drawing
// @access  Private (Admin, Designer)
router.delete('/drawings/:id', auth, authorize('Admin', 'Designer'), deleteDrawing);

module.exports = router;