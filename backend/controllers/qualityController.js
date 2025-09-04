const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllInspections = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'date', 'inspector', 'status', 'hse_issues', 'created_at']);
    const filters = getFilterParams(req, ['status', 'hse_issues', 'task_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['q.inspection_id', 'q.inspector', 'q.snags', 't.title']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM quality_inspections q
      LEFT JOIN tasks t ON q.task_id = t.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get inspections with pagination
    const query = `
      SELECT q.*, t.title as task_title, p.name as project_name
      FROM quality_inspections q
      LEFT JOIN tasks t ON q.task_id = t.id
      LEFT JOIN projects p ON t.project_id = p.id
      ${whereClause}
      ORDER BY q.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [inspections] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, inspections, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Quality inspections retrieved successfully');

  } catch (error) {
    console.error('Get inspections error:', error);
    errorResponse(res, 'Failed to retrieve inspections', 500);
  }
};

const getInspectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [inspections] = await connection.execute(
      `SELECT q.*, t.title as task_title, p.name as project_name
       FROM quality_inspections q
       LEFT JOIN tasks t ON q.task_id = t.id
       LEFT JOIN projects p ON t.project_id = p.id
       WHERE q.id = ?`,
      [id]
    );

    if (inspections.length === 0) {
      return errorResponse(res, 'Inspection not found', 404);
    }

    successResponse(res, inspections[0], 'Inspection retrieved successfully');

  } catch (error) {
    console.error('Get inspection error:', error);
    errorResponse(res, 'Failed to retrieve inspection', 500);
  }
};

const createInspection = async (req, res) => {
  try {
    const {
      task_id,
      date,
      inspector,
      snags,
      status = 'Open',
      hse_issues,
      project,
      description,
      severity,
      photo_url
    } = req.body;

    const connection = getConnection();

    // Generate inspection ID
    const [lastInspection] = await connection.execute(
      'SELECT id FROM quality_inspections ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastInspection.length > 0 ? lastInspection[0].id + 1 : 1;
    const inspection_id = `INSP-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO quality_inspections (inspection_id, task_id, date, inspector, snags, status, hse_issues, 
                                       project, description, severity, photo_url, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [inspection_id, task_id, date, inspector, snags, status, hse_issues, project, description, severity, photo_url]
    );

    // Get created inspection
    const [inspections] = await connection.execute(
      `SELECT q.*, t.title as task_title
       FROM quality_inspections q
       LEFT JOIN tasks t ON q.task_id = t.id
       WHERE q.id = ?`,
      [result.insertId]
    );

    successResponse(res, inspections[0], 'Quality inspection created successfully', 201);

  } catch (error) {
    console.error('Create inspection error:', error);
    errorResponse(res, 'Failed to create inspection', 500);
  }
};

const updateInspection = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      task_id,
      date,
      inspector,
      snags,
      status,
      hse_issues,
      project,
      description,
      severity,
      photo_url
    } = req.body;

    const connection = getConnection();

    // Check if inspection exists
    const [existingInspections] = await connection.execute(
      'SELECT id FROM quality_inspections WHERE id = ?',
      [id]
    );

    if (existingInspections.length === 0) {
      return errorResponse(res, 'Inspection not found', 404);
    }

    await connection.execute(
      `UPDATE quality_inspections 
       SET task_id = ?, date = ?, inspector = ?, snags = ?, status = ?, hse_issues = ?, 
           project = ?, description = ?, severity = ?, photo_url = ?, updated_at = NOW()
       WHERE id = ?`,
      [task_id, date, inspector, snags, status, hse_issues, project, description, severity, photo_url, id]
    );

    // Get updated inspection
    const [inspections] = await connection.execute(
      `SELECT q.*, t.title as task_title
       FROM quality_inspections q
       LEFT JOIN tasks t ON q.task_id = t.id
       WHERE q.id = ?`,
      [id]
    );

    successResponse(res, inspections[0], 'Inspection updated successfully');

  } catch (error) {
    console.error('Update inspection error:', error);
    errorResponse(res, 'Failed to update inspection', 500);
  }
};

const deleteInspection = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if inspection exists
    const [existingInspections] = await connection.execute(
      'SELECT id FROM quality_inspections WHERE id = ?',
      [id]
    );

    if (existingInspections.length === 0) {
      return errorResponse(res, 'Inspection not found', 404);
    }

    await connection.execute('DELETE FROM quality_inspections WHERE id = ?', [id]);

    successResponse(res, null, 'Inspection deleted successfully');

  } catch (error) {
    console.error('Delete inspection error:', error);
    errorResponse(res, 'Failed to delete inspection', 500);
  }
};

const getQualityStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_inspections,
        SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open_inspections,
        SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) as closed_inspections,
        SUM(CASE WHEN hse_issues = 'Critical' THEN 1 ELSE 0 END) as critical_issues,
        SUM(CASE WHEN hse_issues = 'High' THEN 1 ELSE 0 END) as high_issues,
        SUM(CASE WHEN hse_issues = 'Medium' THEN 1 ELSE 0 END) as medium_issues,
        SUM(CASE WHEN hse_issues = 'Low' THEN 1 ELSE 0 END) as low_issues
      FROM quality_inspections
    `);

    successResponse(res, stats[0], 'Quality statistics retrieved successfully');

  } catch (error) {
    console.error('Get quality stats error:', error);
    errorResponse(res, 'Failed to retrieve quality statistics', 500);
  }
};

module.exports = {
  getAllInspections,
  getInspectionById,
  createInspection,
  updateInspection,
  deleteInspection,
  getQualityStats,
};