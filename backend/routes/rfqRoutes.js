const express = require('express');
const {
  getAllRFQs,
  getRFQById,
  createRFQ,
  updateRFQ,
  deleteRFQ,
  getRFQStats,
} = require('../controllers/rfqController');
const { validate, schemas } = require('../middleware/validation');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/rfqs
// @desc    Get all RFQs with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllRFQs);

// @route   GET /api/rfqs/stats
// @desc    Get RFQ statistics
// @access  Private
router.get('/stats', auth, getRFQStats);

// @route   GET /api/rfqs/:id
// @desc    Get RFQ by ID
// @access  Private
router.get('/:id', auth, getRFQById);

// @route   POST /api/rfqs
// @desc    Create new RFQ
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), validate(schemas.rfq), createRFQ);

// @route   PUT /api/rfqs/:id
// @desc    Update RFQ
// @access  Private (Admin, ProjectManager)
router.put('/:id', auth, authorize('Admin', 'ProjectManager'), validate(schemas.rfq), updateRFQ);

// @route   DELETE /api/rfqs/:id
// @desc    Delete RFQ
// @access  Private (Admin)
router.delete('/:id', auth, authorize('Admin'), deleteRFQ);

module.exports = router;