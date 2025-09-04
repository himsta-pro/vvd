const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllContracts = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'client', 'signed_date', 'start_date', 'end_date', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['client', 'project_name', 'manager']);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM contracts ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get contracts with pagination
    const query = `
      SELECT c.*, p.name as project_name
      FROM contracts c
      LEFT JOIN projects p ON c.project_id = p.id
      ${whereClause}
      ORDER BY c.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [contracts] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, contracts, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Contracts retrieved successfully');

  } catch (error) {
    console.error('Get contracts error:', error);
    errorResponse(res, 'Failed to retrieve contracts', 500);
  }
};

const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [contracts] = await connection.execute(
      `SELECT c.*, p.name as project_name
       FROM contracts c
       LEFT JOIN projects p ON c.project_id = p.id
       WHERE c.id = ?`,
      [id]
    );

    if (contracts.length === 0) {
      return errorResponse(res, 'Contract not found', 404);
    }

    successResponse(res, contracts[0], 'Contract retrieved successfully');

  } catch (error) {
    console.error('Get contract error:', error);
    errorResponse(res, 'Failed to retrieve contract', 500);
  }
};

const createContract = async (req, res) => {
  try {
    const {
      project_id,
      client,
      project_name,
      value,
      signed_date,
      start_date,
      end_date,
      manager,
      client_rep,
      payment_terms,
      status = 'Active'
    } = req.body;

    const connection = getConnection();

    // Generate contract ID
    const [lastContract] = await connection.execute(
      'SELECT id FROM contracts ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastContract.length > 0 ? lastContract[0].id + 1 : 1;
    const contract_id = `CON-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO contracts (contract_id, project_id, client, project_name, value, signed_date, 
                             start_date, end_date, manager, client_rep, payment_terms, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [contract_id, project_id, client, project_name, value, signed_date, 
       start_date, end_date, manager, client_rep, payment_terms, status]
    );

    // Get created contract
    const [contracts] = await connection.execute(
      `SELECT c.*, p.name as project_name
       FROM contracts c
       LEFT JOIN projects p ON c.project_id = p.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    successResponse(res, contracts[0], 'Contract created successfully', 201);

  } catch (error) {
    console.error('Create contract error:', error);
    errorResponse(res, 'Failed to create contract', 500);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      client,
      project_name,
      value,
      signed_date,
      start_date,
      end_date,
      manager,
      client_rep,
      payment_terms,
      status
    } = req.body;

    const connection = getConnection();

    // Check if contract exists
    const [existingContracts] = await connection.execute(
      'SELECT id FROM contracts WHERE id = ?',
      [id]
    );

    if (existingContracts.length === 0) {
      return errorResponse(res, 'Contract not found', 404);
    }

    await connection.execute(
      `UPDATE contracts 
       SET project_id = ?, client = ?, project_name = ?, value = ?, signed_date = ?, 
           start_date = ?, end_date = ?, manager = ?, client_rep = ?, payment_terms = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [project_id, client, project_name, value, signed_date, start_date, end_date, 
       manager, client_rep, payment_terms, status, id]
    );

    // Get updated contract
    const [contracts] = await connection.execute(
      `SELECT c.*, p.name as project_name
       FROM contracts c
       LEFT JOIN projects p ON c.project_id = p.id
       WHERE c.id = ?`,
      [id]
    );

    successResponse(res, contracts[0], 'Contract updated successfully');

  } catch (error) {
    console.error('Update contract error:', error);
    errorResponse(res, 'Failed to update contract', 500);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if contract exists
    const [existingContracts] = await connection.execute(
      'SELECT id FROM contracts WHERE id = ?',
      [id]
    );

    if (existingContracts.length === 0) {
      return errorResponse(res, 'Contract not found', 404);
    }

    await connection.execute('DELETE FROM contracts WHERE id = ?', [id]);

    successResponse(res, null, 'Contract deleted successfully');

  } catch (error) {
    console.error('Delete contract error:', error);
    errorResponse(res, 'Failed to delete contract', 500);
  }
};

const getContractStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_contracts,
        SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active_contracts,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_contracts,
        SUM(CASE WHEN status = 'Terminated' THEN 1 ELSE 0 END) as terminated_contracts
      FROM contracts
    `);

    successResponse(res, stats[0], 'Contract statistics retrieved successfully');

  } catch (error) {
    console.error('Get contract stats error:', error);
    errorResponse(res, 'Failed to retrieve contract statistics', 500);
  }
};

module.exports = {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  getContractStats,
};