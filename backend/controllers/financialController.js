const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

// Invoice Controllers
const getAllInvoices = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'invoice_number', 'date', 'due_date', 'amount', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status', 'project_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['i.invoice_number', 'p.name', 'i.client']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM invoices i
      LEFT JOIN projects p ON i.project_id = p.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get invoices with pagination
    const query = `
      SELECT i.*, p.name as project_name
      FROM invoices i
      LEFT JOIN projects p ON i.project_id = p.id
      ${whereClause}
      ORDER BY i.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [invoices] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, invoices, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Invoices retrieved successfully');

  } catch (error) {
    console.error('Get invoices error:', error);
    errorResponse(res, 'Failed to retrieve invoices', 500);
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [invoices] = await connection.execute(
      `SELECT i.*, p.name as project_name
       FROM invoices i
       LEFT JOIN projects p ON i.project_id = p.id
       WHERE i.id = ?`,
      [id]
    );

    if (invoices.length === 0) {
      return errorResponse(res, 'Invoice not found', 404);
    }

    // Get invoice items
    const [items] = await connection.execute(
      'SELECT * FROM invoice_items WHERE invoice_id = ?',
      [id]
    );

    // Get payments
    const [payments] = await connection.execute(
      'SELECT * FROM payments WHERE invoice_id = ?',
      [id]
    );

    const invoice = {
      ...invoices[0],
      items,
      payments
    };

    successResponse(res, invoice, 'Invoice retrieved successfully');

  } catch (error) {
    console.error('Get invoice error:', error);
    errorResponse(res, 'Failed to retrieve invoice', 500);
  }
};

const createInvoice = async (req, res) => {
  try {
    const {
      project_id,
      client,
      date,
      due_date,
      grn_ref,
      items,
      notes
    } = req.body;

    const connection = getConnection();

    // Generate invoice number
    const [lastInvoice] = await connection.execute(
      'SELECT id FROM invoices ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastInvoice.length > 0 ? lastInvoice[0].id + 1 : 1;
    const invoice_number = `INV-${new Date().getFullYear()}-${String(nextId).padStart(3, '0')}`;

    // Calculate total amount
    const amount = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);

    // Start transaction
    await connection.beginTransaction();

    try {
      // Insert invoice
      const [result] = await connection.execute(
        `INSERT INTO invoices (invoice_number, project_id, client, date, due_date, amount, grn_ref, notes, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW())`,
        [invoice_number, project_id, client, date, due_date, amount, grn_ref, notes]
      );

      const invoiceId = result.insertId;

      // Insert invoice items
      for (const item of items) {
        await connection.execute(
          `INSERT INTO invoice_items (invoice_id, description, quantity, rate, amount, created_at)
           VALUES (?, ?, ?, ?, ?, NOW())`,
          [invoiceId, item.description, item.quantity, item.rate, item.quantity * item.rate]
        );
      }

      await connection.commit();

      // Get created invoice with items
      const [invoices] = await connection.execute(
        `SELECT i.*, p.name as project_name
         FROM invoices i
         LEFT JOIN projects p ON i.project_id = p.id
         WHERE i.id = ?`,
        [invoiceId]
      );

      const [invoiceItems] = await connection.execute(
        'SELECT * FROM invoice_items WHERE invoice_id = ?',
        [invoiceId]
      );

      const invoice = {
        ...invoices[0],
        items: invoiceItems
      };

      successResponse(res, invoice, 'Invoice created successfully', 201);

    } catch (error) {
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Create invoice error:', error);
    errorResponse(res, 'Failed to create invoice', 500);
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      client,
      date,
      due_date,
      grn_ref,
      items,
      notes,
      status
    } = req.body;

    const connection = getConnection();

    // Check if invoice exists
    const [existingInvoices] = await connection.execute(
      'SELECT id FROM invoices WHERE id = ?',
      [id]
    );

    if (existingInvoices.length === 0) {
      return errorResponse(res, 'Invoice not found', 404);
    }

    // Calculate total amount
    const amount = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);

    // Start transaction
    await connection.beginTransaction();

    try {
      // Update invoice
      await connection.execute(
        `UPDATE invoices 
         SET project_id = ?, client = ?, date = ?, due_date = ?, amount = ?, grn_ref = ?, notes = ?, status = ?, updated_at = NOW()
         WHERE id = ?`,
        [project_id, client, date, due_date, amount, grn_ref, notes, status, id]
      );

      // Delete existing items
      await connection.execute('DELETE FROM invoice_items WHERE invoice_id = ?', [id]);

      // Insert updated items
      for (const item of items) {
        await connection.execute(
          `INSERT INTO invoice_items (invoice_id, description, quantity, rate, amount, created_at)
           VALUES (?, ?, ?, ?, ?, NOW())`,
          [id, item.description, item.quantity, item.rate, item.quantity * item.rate]
        );
      }

      await connection.commit();

      // Get updated invoice
      const [invoices] = await connection.execute(
        `SELECT i.*, p.name as project_name
         FROM invoices i
         LEFT JOIN projects p ON i.project_id = p.id
         WHERE i.id = ?`,
        [id]
      );

      const [invoiceItems] = await connection.execute(
        'SELECT * FROM invoice_items WHERE invoice_id = ?',
        [id]
      );

      const invoice = {
        ...invoices[0],
        items: invoiceItems
      };

      successResponse(res, invoice, 'Invoice updated successfully');

    } catch (error) {
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Update invoice error:', error);
    errorResponse(res, 'Failed to update invoice', 500);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if invoice exists
    const [existingInvoices] = await connection.execute(
      'SELECT id FROM invoices WHERE id = ?',
      [id]
    );

    if (existingInvoices.length === 0) {
      return errorResponse(res, 'Invoice not found', 404);
    }

    // Start transaction
    await connection.beginTransaction();

    try {
      // Delete invoice items first
      await connection.execute('DELETE FROM invoice_items WHERE invoice_id = ?', [id]);
      
      // Delete payments
      await connection.execute('DELETE FROM payments WHERE invoice_id = ?', [id]);
      
      // Delete invoice
      await connection.execute('DELETE FROM invoices WHERE id = ?', [id]);

      await connection.commit();

      successResponse(res, null, 'Invoice deleted successfully');

    } catch (error) {
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Delete invoice error:', error);
    errorResponse(res, 'Failed to delete invoice', 500);
  }
};

// Payment Controllers
const getAllPayments = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'date', 'amount', 'method', 'created_at']);
    const filters = getFilterParams(req, ['method', 'invoice_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['p.reference', 'i.invoice_number']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM payments p
      LEFT JOIN invoices i ON p.invoice_id = i.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get payments with pagination
    const query = `
      SELECT p.*, i.invoice_number, i.client
      FROM payments p
      LEFT JOIN invoices i ON p.invoice_id = i.id
      ${whereClause}
      ORDER BY p.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [payments] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, payments, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Payments retrieved successfully');

  } catch (error) {
    console.error('Get payments error:', error);
    errorResponse(res, 'Failed to retrieve payments', 500);
  }
};

const createPayment = async (req, res) => {
  try {
    const {
      invoice_id,
      amount,
      date,
      method,
      reference,
      notes
    } = req.body;

    const connection = getConnection();

    // Check if invoice exists
    const [invoices] = await connection.execute(
      'SELECT id, amount, status FROM invoices WHERE id = ?',
      [invoice_id]
    );

    if (invoices.length === 0) {
      return errorResponse(res, 'Invoice not found', 404);
    }

    // Generate payment ID
    const [lastPayment] = await connection.execute(
      'SELECT id FROM payments ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastPayment.length > 0 ? lastPayment[0].id + 1 : 1;
    const payment_id = `PAY-${new Date().getFullYear()}-${String(nextId).padStart(3, '0')}`;

    // Start transaction
    await connection.beginTransaction();

    try {
      // Insert payment
      const [result] = await connection.execute(
        `INSERT INTO payments (payment_id, invoice_id, amount, date, method, reference, notes, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [payment_id, invoice_id, amount, date, method, reference, notes]
      );

      // Check if invoice is fully paid
      const [totalPayments] = await connection.execute(
        'SELECT SUM(amount) as total_paid FROM payments WHERE invoice_id = ?',
        [invoice_id]
      );

      const totalPaid = totalPayments[0].total_paid || 0;
      const invoiceAmount = invoices[0].amount;

      // Update invoice status if fully paid
      if (totalPaid >= invoiceAmount) {
        await connection.execute(
          'UPDATE invoices SET status = ? WHERE id = ?',
          ['Paid', invoice_id]
        );
      }

      await connection.commit();

      // Get created payment
      const [payments] = await connection.execute(
        `SELECT p.*, i.invoice_number
         FROM payments p
         LEFT JOIN invoices i ON p.invoice_id = i.id
         WHERE p.id = ?`,
        [result.insertId]
      );

      successResponse(res, payments[0], 'Payment recorded successfully', 201);

    } catch (error) {
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Create payment error:', error);
    errorResponse(res, 'Failed to record payment', 500);
  }
};

const getFinancialStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [invoiceStats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_invoices,
        SUM(amount) as total_invoice_amount,
        SUM(CASE WHEN status = 'Paid' THEN amount ELSE 0 END) as paid_amount,
        SUM(CASE WHEN status = 'Pending' THEN amount ELSE 0 END) as pending_amount,
        SUM(CASE WHEN status = 'Overdue' THEN amount ELSE 0 END) as overdue_amount
      FROM invoices
    `);

    const [paymentStats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_payments,
        SUM(amount) as total_payment_amount
      FROM payments
    `);

    const [projectFinancials] = await connection.execute(`
      SELECT 
        p.id,
        p.name,
        p.budget,
        COALESCE(SUM(jc.actual_cost), 0) as actual_cost,
        COALESCE(SUM(i.amount), 0) as invoices_raised,
        COALESCE(SUM(pay.amount), 0) as payments_received
      FROM projects p
      LEFT JOIN job_costs jc ON p.id = jc.project_id
      LEFT JOIN invoices i ON p.id = i.project_id
      LEFT JOIN payments pay ON i.id = pay.invoice_id
      GROUP BY p.id, p.name, p.budget
    `);

    const stats = {
      invoices: invoiceStats[0],
      payments: paymentStats[0],
      projects: projectFinancials
    };

    successResponse(res, stats, 'Financial statistics retrieved successfully');

  } catch (error) {
    console.error('Get financial stats error:', error);
    errorResponse(res, 'Failed to retrieve financial statistics', 500);
  }
};

const getProjectFinancials = async (req, res) => {
  try {
    const { projectId } = req.params;
    const connection = getConnection();

    // Get project details
    const [projects] = await connection.execute(
      'SELECT * FROM projects WHERE id = ?',
      [projectId]
    );

    if (projects.length === 0) {
      return errorResponse(res, 'Project not found', 404);
    }

    // Get invoices for project
    const [invoices] = await connection.execute(
      'SELECT * FROM invoices WHERE project_id = ? ORDER BY date DESC',
      [projectId]
    );

    // Get payments for project invoices
    const [payments] = await connection.execute(
      `SELECT p.*, i.invoice_number
       FROM payments p
       LEFT JOIN invoices i ON p.invoice_id = i.id
       WHERE i.project_id = ?
       ORDER BY p.date DESC`,
      [projectId]
    );

    // Get job costs for project
    const [jobCosts] = await connection.execute(
      'SELECT * FROM job_costs WHERE project_id = ?',
      [projectId]
    );

    const financials = {
      project: projects[0],
      invoices,
      payments,
      job_costs: jobCosts
    };

    successResponse(res, financials, 'Project financials retrieved successfully');

  } catch (error) {
    console.error('Get project financials error:', error);
    errorResponse(res, 'Failed to retrieve project financials', 500);
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice: updateInvoice,
  deleteInvoice,
  getAllPayments,
  createPayment,
  getFinancialStats,
  getProjectFinancials,
};