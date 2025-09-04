const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllResources = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'name', 'role', 'rate', 'availability', 'created_at']);
    const filters = getFilterParams(req, ['role', 'availability']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['name', 'role', 'subcontractor']);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM resources ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get resources with pagination
    const query = `
      SELECT * FROM resources
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [resources] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, resources, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Resources retrieved successfully');

  } catch (error) {
    console.error('Get resources error:', error);
    errorResponse(res, 'Failed to retrieve resources', 500);
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [resources] = await connection.execute(
      'SELECT * FROM resources WHERE id = ?',
      [id]
    );

    if (resources.length === 0) {
      return errorResponse(res, 'Resource not found', 404);
    }

    successResponse(res, resources[0], 'Resource retrieved successfully');

  } catch (error) {
    console.error('Get resource error:', error);
    errorResponse(res, 'Failed to retrieve resource', 500);
  }
};

const createResource = async (req, res) => {
  try {
    const {
      name,
      role,
      subcontractor,
      rate,
      availability,
      assigned_tasks = 0
    } = req.body;

    const connection = getConnection();

    const [result] = await connection.execute(
      `INSERT INTO resources (name, role, subcontractor, rate, availability, assigned_tasks, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, role, subcontractor, rate, availability, assigned_tasks]
    );

    // Get created resource
    const [resources] = await connection.execute(
      'SELECT * FROM resources WHERE id = ?',
      [result.insertId]
    );

    successResponse(res, resources[0], 'Resource created successfully', 201);

  } catch (error) {
    console.error('Create resource error:', error);
    errorResponse(res, 'Failed to create resource', 500);
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      role,
      subcontractor,
      rate,
      availability,
      assigned_tasks
    } = req.body;

    const connection = getConnection();

    // Check if resource exists
    const [existingResources] = await connection.execute(
      'SELECT id FROM resources WHERE id = ?',
      [id]
    );

    if (existingResources.length === 0) {
      return errorResponse(res, 'Resource not found', 404);
    }

    await connection.execute(
      `UPDATE resources 
       SET name = ?, role = ?, subcontractor = ?, rate = ?, availability = ?, assigned_tasks = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, role, subcontractor, rate, availability, assigned_tasks, id]
    );

    // Get updated resource
    const [resources] = await connection.execute(
      'SELECT * FROM resources WHERE id = ?',
      [id]
    );

    successResponse(res, resources[0], 'Resource updated successfully');

  } catch (error) {
    console.error('Update resource error:', error);
    errorResponse(res, 'Failed to update resource', 500);
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if resource exists
    const [existingResources] = await connection.execute(
      'SELECT id FROM resources WHERE id = ?',
      [id]
    );

    if (existingResources.length === 0) {
      return errorResponse(res, 'Resource not found', 404);
    }

    await connection.execute('DELETE FROM resources WHERE id = ?', [id]);

    successResponse(res, null, 'Resource deleted successfully');

  } catch (error) {
    console.error('Delete resource error:', error);
    errorResponse(res, 'Failed to delete resource', 500);
  }
};

const getResourceStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_resources,
        SUM(CASE WHEN availability = 'Full-time' THEN 1 ELSE 0 END) as full_time_resources,
        SUM(CASE WHEN availability = 'Part-time' THEN 1 ELSE 0 END) as part_time_resources,
        SUM(CASE WHEN availability = 'Contract' THEN 1 ELSE 0 END) as contract_resources,
        SUM(assigned_tasks) as total_assigned_tasks,
        AVG(assigned_tasks) as average_tasks_per_resource
      FROM resources
    `);

    successResponse(res, stats[0], 'Resource statistics retrieved successfully');

  } catch (error) {
    console.error('Get resource stats error:', error);
    errorResponse(res, 'Failed to retrieve resource statistics', 500);
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getResourceStats,
};