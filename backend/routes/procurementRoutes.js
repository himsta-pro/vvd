const express = require('express');
const {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  generatePO,
  generateGRN,
  getProcurementStats,
} = require('../controllers/procurementController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Material routes
router.get('/materials', auth, getAllMaterials);
router.get('/materials/stats', auth, getProcurementStats);
router.get('/materials/:id', auth, getMaterialById);
router.post('/materials', auth, authorize('Admin', 'ProjectManager', 'ProcurementOfficer'), createMaterial);
router.put('/materials/:id', auth, authorize('Admin', 'ProjectManager', 'ProcurementOfficer'), updateMaterial);
router.delete('/materials/:id', auth, authorize('Admin', 'ProcurementOfficer'), deleteMaterial);

// Purchase Order routes
router.get('/materials/:id/po', auth, generatePO);

// GRN routes
router.post('/grn', auth, authorize('Admin', 'ProjectManager', 'ProcurementOfficer'), generateGRN);

module.exports = router;