const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllProjects = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'name', 'client', 'start_date', 'end_date', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status', 'priority', 'manager_id']);
    
    // Add search to filters
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['name', 'client', 'description']);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM projects ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get projects with pagination
    const query = `
      SELECT p.*, 
             CONCAT(u.first_name, ' ', u.last_name) as manager_name,
             u.email as manager_email
      FROM projects p
      LEFT JOIN users u ON p.manager_id = u.id
      ${whereClause}
      ORDER BY p.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [projects] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, projects, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Projects retrieved successfully');

  } catch (error) {
    console.error('Get projects error:', error);
    errorResponse(res, 'Failed to retrieve projects', 500);
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [projects] = await connection.execute(
      `SELECT p.*, 
              CONCAT(u.first_name, ' ', u.last_name) as manager_name,
              u.email as manager_email
       FROM projects p
       LEFT JOIN users u ON p.manager_id = u.id
       WHERE p.id = ?`,
      [id]
    );

    if (projects.length === 0) {
      return errorResponse(res, 'Project not found', 404);
    }

    successResponse(res, projects[0], 'Project retrieved successfully');

  } catch (error) {
    console.error('Get project error:', error);
    errorResponse(res, 'Failed to retrieve project', 500);
  }
};

const createProject = async (req, res) => {
  try {
    const {
      name,
      client,
      description,
      start_date,
      end_date,
      budget,
      status = 'Not Started',
      priority = 'Medium',
      manager_id
    } = req.body;

    const connection = getConnection();

    const [result] = await connection.execute(
      `INSERT INTO projects (name, client, description, start_date, end_date, budget, status, priority, manager_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, client, description, start_date, end_date, budget, status, priority, manager_id]
    );

    // Get created project
    const [projects] = await connection.execute(
      `SELECT p.*, 
              CONCAT(u.first_name, ' ', u.last_name) as manager_name
       FROM projects p
       LEFT JOIN users u ON p.manager_id = u.id
       WHERE p.id = ?`,
      [result.insertId]
    );

    successResponse(res, projects[0], 'Project created successfully', 201);

  } catch (error) {
    console.error('Create project error:', error);
    errorResponse(res, 'Failed to create project', 500);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      client,
      description,
      start_date,
      end_date,
      budget,
      status,
      priority,
      manager_id
    } = req.body;

    const connection = getConnection();

    // Check if project exists
    const [existingProjects] = await connection.execute(
      'SELECT id FROM projects WHERE id = ?',
      [id]
    );

    if (existingProjects.length === 0) {
      return errorResponse(res, 'Project not found', 404);
    }

    const [result] = await connection.execute(
      `UPDATE projects 
       SET name = ?, client = ?, description = ?, start_date = ?, end_date = ?, 
           budget = ?, status = ?, priority = ?, manager_id = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, client, description, start_date, end_date, budget, status, priority, manager_id, id]
    );

    // Get updated project
    const [projects] = await connection.execute(
      `SELECT p.*, 
              CONCAT(u.first_name, ' ', u.last_name) as manager_name
       FROM projects p
       LEFT JOIN users u ON p.manager_id = u.id
       WHERE p.id = ?`,
      [id]
    );

    successResponse(res, projects[0], 'Project updated successfully');

  } catch (error) {
    console.error('Update project error:', error);
    errorResponse(res, 'Failed to update project', 500);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if project exists
    const [existingProjects] = await connection.execute(
      'SELECT id FROM projects WHERE id = ?',
      [id]
    );

    if (existingProjects.length === 0) {
      return errorResponse(res, 'Project not found', 404);
    }

    await connection.execute('DELETE FROM projects WHERE id = ?', [id]);

    successResponse(res, null, 'Project deleted successfully');

  } catch (error) {
    console.error('Delete project error:', error);
    errorResponse(res, 'Failed to delete project', 500);
  }
};

const getProjectStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_projects,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as active_projects,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_projects,
        SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) as on_hold_projects,
        SUM(budget) as total_budget,
        AVG(budget) as average_budget
      FROM projects
    `);

    successResponse(res, stats[0], 'Project statistics retrieved successfully');

  } catch (error) {
    console.error('Get project stats error:', error);
    errorResponse(res, 'Failed to retrieve project statistics', 500);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats,
};