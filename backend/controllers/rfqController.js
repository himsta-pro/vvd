const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllRFQs = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'client', 'date', 'value', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['client', 'project', 'location']);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM rfqs ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get RFQs with pagination
    const query = `
      SELECT * FROM rfqs
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [rfqs] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, rfqs, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'RFQs retrieved successfully');

  } catch (error) {
    console.error('Get RFQs error:', error);
    errorResponse(res, 'Failed to retrieve RFQs', 500);
  }
};

const getRFQById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [rfqs] = await connection.execute(
      'SELECT * FROM rfqs WHERE id = ?',
      [id]
    );

    if (rfqs.length === 0) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    successResponse(res, rfqs[0], 'RFQ retrieved successfully');

  } catch (error) {
    console.error('Get RFQ error:', error);
    errorResponse(res, 'Failed to retrieve RFQ', 500);
  }
};

const createRFQ = async (req, res) => {
  try {
    const {
      client,
      project,
      date,
      location,
      value,
      scope_summary,
      contact_person,
      contact_email,
      contact_phone,
      deadline,
      notes,
      status = 'Submitted'
    } = req.body;

    const connection = getConnection();

    // Generate RFQ ID
    const [lastRfq] = await connection.execute(
      'SELECT id FROM rfqs ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastRfq.length > 0 ? lastRfq[0].id + 1 : 1;
    const rfq_id = `RFQ-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO rfqs (rfq_id, client, project, date, location, value, scope_summary, 
                        contact_person, contact_email, contact_phone, deadline, notes, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [rfq_id, client, project, date, location, value, scope_summary, 
       contact_person, contact_email, contact_phone, deadline, notes, status]
    );

    // Get created RFQ
    const [rfqs] = await connection.execute(
      'SELECT * FROM rfqs WHERE id = ?',
      [result.insertId]
    );

    successResponse(res, rfqs[0], 'RFQ created successfully', 201);

  } catch (error) {
    console.error('Create RFQ error:', error);
    errorResponse(res, 'Failed to create RFQ', 500);
  }
};

const updateRFQ = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      client,
      project,
      date,
      location,
      value,
      scope_summary,
      contact_person,
      contact_email,
      contact_phone,
      deadline,
      notes,
      status
    } = req.body;

    const connection = getConnection();

    // Check if RFQ exists
    const [existingRfqs] = await connection.execute(
      'SELECT id FROM rfqs WHERE id = ?',
      [id]
    );

    if (existingRfqs.length === 0) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    await connection.execute(
      `UPDATE rfqs 
       SET client = ?, project = ?, date = ?, location = ?, value = ?, scope_summary = ?,
           contact_person = ?, contact_email = ?, contact_phone = ?, deadline = ?, notes = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [client, project, date, location, value, scope_summary, 
       contact_person, contact_email, contact_phone, deadline, notes, status, id]
    );

    // Get updated RFQ
    const [rfqs] = await connection.execute(
      'SELECT * FROM rfqs WHERE id = ?',
      [id]
    );

    successResponse(res, rfqs[0], 'RFQ updated successfully');

  } catch (error) {
    console.error('Update RFQ error:', error);
    errorResponse(res, 'Failed to update RFQ', 500);
  }
};

const deleteRFQ = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if RFQ exists
    const [existingRfqs] = await connection.execute(
      'SELECT id FROM rfqs WHERE id = ?',
      [id]
    );

    if (existingRfqs.length === 0) {
      return errorResponse(res, 'RFQ not found', 404);
    }

    await connection.execute('DELETE FROM rfqs WHERE id = ?', [id]);

    successResponse(res, null, 'RFQ deleted successfully');

  } catch (error) {
    console.error('Delete RFQ error:', error);
    errorResponse(res, 'Failed to delete RFQ', 500);
  }
};

const getRFQStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_rfqs,
        SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) as submitted_rfqs,
        SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) as won_rfqs,
        SUM(CASE WHEN status = 'Lost' THEN 1 ELSE 0 END) as lost_rfqs
      FROM rfqs
    `);

    successResponse(res, stats[0], 'RFQ statistics retrieved successfully');

  } catch (error) {
    console.error('Get RFQ stats error:', error);
    errorResponse(res, 'Failed to retrieve RFQ statistics', 500);
  }
};

module.exports = {
  getAllRFQs,
  getRFQById,
  createRFQ,
  updateRFQ,
  deleteRFQ,
  getRFQStats,
};