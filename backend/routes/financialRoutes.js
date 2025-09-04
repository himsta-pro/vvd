const express = require('express');
const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllPayments,
  createPayment,
  getFinancialStats,
  getProjectFinancials,
} = require('../controllers/financialController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Invoice routes
router.get('/invoices', auth, getAllInvoices);
router.get('/invoices/:id', auth, getInvoiceById);
router.post('/invoices', auth, authorize('Admin', 'ProjectManager', 'Finance'), createInvoice);
router.put('/invoices/:id', auth, authorize('Admin', 'ProjectManager', 'Finance'), updateInvoice);
router.delete('/invoices/:id', auth, authorize('Admin', 'Finance'), deleteInvoice);

// Payment routes
router.get('/payments', auth, getAllPayments);
router.post('/payments', auth, authorize('Admin', 'ProjectManager', 'Finance'), createPayment);

// Statistics routes
router.get('/stats', auth, getFinancialStats);
router.get('/projects/:projectId', auth, getProjectFinancials);

module.exports = router;