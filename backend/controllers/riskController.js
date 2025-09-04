const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllRisks = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'description', 'level', 'impact', 'status', 'created_at']);
    const filters = getFilterParams(req, ['level', 'impact', 'status', 'project_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['r.description', 'r.mitigation_plan', 'r.owner', 'p.name']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM risks r
      LEFT JOIN projects p ON r.project_id = p.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get risks with pagination
    const query = `
      SELECT r.*, p.name as project_name
      FROM risks r
      LEFT JOIN projects p ON r.project_id = p.id
      ${whereClause}
      ORDER BY r.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [risks] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, risks, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Risks retrieved successfully');

  } catch (error) {
    console.error('Get risks error:', error);
    errorResponse(res, 'Failed to retrieve risks', 500);
  }
};

const getRiskById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [risks] = await connection.execute(
      `SELECT r.*, p.name as project_name
       FROM risks r
       LEFT JOIN projects p ON r.project_id = p.id
       WHERE r.id = ?`,
      [id]
    );

    if (risks.length === 0) {
      return errorResponse(res, 'Risk not found', 404);
    }

    successResponse(res, risks[0], 'Risk retrieved successfully');

  } catch (error) {
    console.error('Get risk error:', error);
    errorResponse(res, 'Failed to retrieve risk', 500);
  }
};

const createRisk = async (req, res) => {
  try {
    const {
      project_id,
      description,
      level,
      impact,
      mitigation_plan,
      owner,
      probability,
      status = 'Open'
    } = req.body;

    const connection = getConnection();

    // Generate risk ID
    const [lastRisk] = await connection.execute(
      'SELECT id FROM risks ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastRisk.length > 0 ? lastRisk[0].id + 1 : 1;
    const risk_id = `RISK-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO risks (risk_id, project_id, description, level, impact, mitigation_plan, owner, probability, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [risk_id, project_id, description, level, impact, mitigation_plan, owner, probability, status]
    );

    // Get created risk
    const [risks] = await connection.execute(
      `SELECT r.*, p.name as project_name
       FROM risks r
       LEFT JOIN projects p ON r.project_id = p.id
       WHERE r.id = ?`,
      [result.insertId]
    );

    successResponse(res, risks[0], 'Risk created successfully', 201);

  } catch (error) {
    console.error('Create risk error:', error);
    errorResponse(res, 'Failed to create risk', 500);
  }
};

const updateRisk = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      description,
      level,
      impact,
      mitigation_plan,
      owner,
      probability,
      status
    } = req.body;

    const connection = getConnection();

    // Check if risk exists
    const [existingRisks] = await connection.execute(
      'SELECT id FROM risks WHERE id = ?',
      [id]
    );

    if (existingRisks.length === 0) {
      return errorResponse(res, 'Risk not found', 404);
    }

    await connection.execute(
      `UPDATE risks 
       SET project_id = ?, description = ?, level = ?, impact = ?, mitigation_plan = ?, owner = ?, probability = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [project_id, description, level, impact, mitigation_plan, owner, probability, status, id]
    );

    // Get updated risk
    const [risks] = await connection.execute(
      `SELECT r.*, p.name as project_name
       FROM risks r
       LEFT JOIN projects p ON r.project_id = p.id
       WHERE r.id = ?`,
      [id]
    );

    successResponse(res, risks[0], 'Risk updated successfully');

  } catch (error) {
    console.error('Update risk error:', error);
    errorResponse(res, 'Failed to update risk', 500);
  }
};

const deleteRisk = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if risk exists
    const [existingRisks] = await connection.execute(
      'SELECT id FROM risks WHERE id = ?',
      [id]
    );

    if (existingRisks.length === 0) {
      return errorResponse(res, 'Risk not found', 404);
    }

    await connection.execute('DELETE FROM risks WHERE id = ?', [id]);

    successResponse(res, null, 'Risk deleted successfully');

  } catch (error) {
    console.error('Delete risk error:', error);
    errorResponse(res, 'Failed to delete risk', 500);
  }
};

const getRiskStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_risks,
        SUM(CASE WHEN level = 'Low' THEN 1 ELSE 0 END) as low_risks,
        SUM(CASE WHEN level = 'Medium' THEN 1 ELSE 0 END) as medium_risks,
        SUM(CASE WHEN level = 'High' THEN 1 ELSE 0 END) as high_risks,
        SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open_risks,
        SUM(CASE WHEN status = 'Monitoring' THEN 1 ELSE 0 END) as monitoring_risks,
        SUM(CASE WHEN status = 'Mitigated' THEN 1 ELSE 0 END) as mitigated_risks,
        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved_risks
      FROM risks
    `);

    successResponse(res, stats[0], 'Risk statistics retrieved successfully');

  } catch (error) {
    console.error('Get risk stats error:', error);
    errorResponse(res, 'Failed to retrieve risk statistics', 500);
  }
};

module.exports = {
  getAllRisks,
  getRiskById,
  createRisk,
  updateRisk,
  deleteRisk,
  getRiskStats,
};