const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllMilestones = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'name', 'planned_date', 'actual_date', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status', 'project_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['m.name', 'p.name']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM milestones m
      LEFT JOIN projects p ON m.project_id = p.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get milestones with pagination
    const query = `
      SELECT m.*, p.name as project_name
      FROM milestones m
      LEFT JOIN projects p ON m.project_id = p.id
      ${whereClause}
      ORDER BY m.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [milestones] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, milestones, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Milestones retrieved successfully');

  } catch (error) {
    console.error('Get milestones error:', error);
    errorResponse(res, 'Failed to retrieve milestones', 500);
  }
};

const getMilestoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [milestones] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM milestones m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [id]
    );

    if (milestones.length === 0) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    successResponse(res, milestones[0], 'Milestone retrieved successfully');

  } catch (error) {
    console.error('Get milestone error:', error);
    errorResponse(res, 'Failed to retrieve milestone', 500);
  }
};

const createMilestone = async (req, res) => {
  try {
    const {
      project_id,
      name,
      planned_date,
      actual_date,
      status = 'Not Started'
    } = req.body;

    const connection = getConnection();

    const [result] = await connection.execute(
      `INSERT INTO milestones (project_id, name, planned_date, actual_date, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [project_id, name, planned_date, actual_date, status]
    );

    // Get created milestone
    const [milestones] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM milestones m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [result.insertId]
    );

    successResponse(res, milestones[0], 'Milestone created successfully', 201);

  } catch (error) {
    console.error('Create milestone error:', error);
    errorResponse(res, 'Failed to create milestone', 500);
  }
};

const updateMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      name,
      planned_date,
      actual_date,
      status
    } = req.body;

    const connection = getConnection();

    // Check if milestone exists
    const [existingMilestones] = await connection.execute(
      'SELECT id FROM milestones WHERE id = ?',
      [id]
    );

    if (existingMilestones.length === 0) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    await connection.execute(
      `UPDATE milestones 
       SET project_id = ?, name = ?, planned_date = ?, actual_date = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [project_id, name, planned_date, actual_date, status, id]
    );

    // Get updated milestone
    const [milestones] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM milestones m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [id]
    );

    successResponse(res, milestones[0], 'Milestone updated successfully');

  } catch (error) {
    console.error('Update milestone error:', error);
    errorResponse(res, 'Failed to update milestone', 500);
  }
};

const deleteMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if milestone exists
    const [existingMilestones] = await connection.execute(
      'SELECT id FROM milestones WHERE id = ?',
      [id]
    );

    if (existingMilestones.length === 0) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    await connection.execute('DELETE FROM milestones WHERE id = ?', [id]);

    successResponse(res, null, 'Milestone deleted successfully');

  } catch (error) {
    console.error('Delete milestone error:', error);
    errorResponse(res, 'Failed to delete milestone', 500);
  }
};

const getMilestoneStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_milestones,
        SUM(CASE WHEN status = 'Not Started' THEN 1 ELSE 0 END) as not_started_milestones,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress_milestones,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_milestones,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending_milestones,
        SUM(CASE WHEN status = 'Delayed' THEN 1 ELSE 0 END) as delayed_milestones
      FROM milestones
    `);

    successResponse(res, stats[0], 'Milestone statistics retrieved successfully');

  } catch (error) {
    console.error('Get milestone stats error:', error);
    errorResponse(res, 'Failed to retrieve milestone statistics', 500);
  }
};

module.exports = {
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  getMilestoneStats,
};