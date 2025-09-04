const express = require('express');
const {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  getContractStats,
} = require('../controllers/contractController');
const { validate, schemas } = require('../middleware/validation');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/contracts
// @desc    Get all contracts with pagination, filtering, and sorting
// @access  Private
router.get('/', auth, getAllContracts);

// @route   GET /api/contracts/stats
// @desc    Get contract statistics
// @access  Private
router.get('/stats', auth, getContractStats);

// @route   GET /api/contracts/:id
// @desc    Get contract by ID
// @access  Private
router.get('/:id', auth, getContractById);

// @route   POST /api/contracts
// @desc    Create new contract
// @access  Private (Admin, ProjectManager)
router.post('/', auth, authorize('Admin', 'ProjectManager'), validate(schemas.contract), createContract);

// @route   PUT /api/contracts/:id
// @desc    Update contract
// @access  Private (Admin, ProjectManager)
router.put('/:id', auth, authorize('Admin', 'ProjectManager'), validate(schemas.contract), updateContract);

// @route   DELETE /api/contracts/:id
// @desc    Delete contract
// @access  Private (Admin)
router.delete('/:id', auth, authorize('Admin'), deleteContract);

module.exports = router;