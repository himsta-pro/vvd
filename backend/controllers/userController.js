const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllUsers = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'first_name', 'last_name', 'email', 'role', 'status', 'created_at']);
    const filters = getFilterParams(req, ['role', 'status']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['first_name', 'last_name', 'email']);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get users with pagination
    const query = `
      SELECT id, first_name, last_name, email, role, status, created_at, updated_at
      FROM users
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [users] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, users, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Users retrieved successfully');

  } catch (error) {
    console.error('Get users error:', error);
    errorResponse(res, 'Failed to retrieve users', 500);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [users] = await connection.execute(
      'SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, users[0], 'User retrieved successfully');

  } catch (error) {
    console.error('Get user error:', error);
    errorResponse(res, 'Failed to retrieve user', 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, role, status } = req.body;

    const connection = getConnection();

    // Check if user exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return errorResponse(res, 'User not found', 404);
    }

    await connection.execute(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ?, status = ?, updated_at = NOW() WHERE id = ?',
      [first_name, last_name, email, role, status, id]
    );

    // Get updated user
    const [users] = await connection.execute(
      'SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );

    successResponse(res, users[0], 'User updated successfully');

  } catch (error) {
    console.error('Update user error:', error);
    errorResponse(res, 'Failed to update user', 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if user exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return errorResponse(res, 'User not found', 404);
    }

    await connection.execute('DELETE FROM users WHERE id = ?', [id]);

    successResponse(res, null, 'User deleted successfully');

  } catch (error) {
    console.error('Delete user error:', error);
    errorResponse(res, 'Failed to delete user', 500);
  }
};

const getUserStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN role = 'Admin' THEN 1 ELSE 0 END) as admin_users,
        SUM(CASE WHEN role = 'ProjectManager' THEN 1 ELSE 0 END) as project_manager_users,
        SUM(CASE WHEN role = 'Designer' THEN 1 ELSE 0 END) as designer_users,
        SUM(CASE WHEN role = 'ProcurementOfficer' THEN 1 ELSE 0 END) as procurement_officer_users,
        SUM(CASE WHEN role = 'Finance' THEN 1 ELSE 0 END) as finance_users,
        SUM(CASE WHEN role = 'Quality' THEN 1 ELSE 0 END) as quality_users,
        SUM(CASE WHEN role = 'Client' THEN 1 ELSE 0 END) as client_users,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_users,
        SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_users
      FROM users
    `);

    successResponse(res, stats[0], 'User statistics retrieved successfully');

  } catch (error) {
    console.error('Get user stats error:', error);
    errorResponse(res, 'Failed to retrieve user statistics', 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
};