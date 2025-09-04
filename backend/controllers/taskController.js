const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllTasks = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'title', 'start_date', 'due_date', 'priority', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status', 'priority', 'project_id', 'assignee_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['t.title', 'p.name', 'CONCAT(u.first_name, " ", u.last_name)']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.assignee_id = u.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get tasks with pagination
    const query = `
      SELECT t.*, 
             p.name as project_name,
             p.client as project_client,
             CONCAT(u.first_name, ' ', u.last_name) as assignee_name,
             u.email as assignee_email
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.assignee_id = u.id
      ${whereClause}
      ORDER BY t.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [tasks] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, tasks, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Tasks retrieved successfully');

  } catch (error) {
    console.error('Get tasks error:', error);
    errorResponse(res, 'Failed to retrieve tasks', 500);
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [tasks] = await connection.execute(
      `SELECT t.*, 
              p.name as project_name,
              p.client as project_client,
              CONCAT(u.first_name, ' ', u.last_name) as assignee_name,
              u.email as assignee_email
       FROM tasks t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.assignee_id = u.id
       WHERE t.id = ?`,
      [id]
    );

    if (tasks.length === 0) {
      return errorResponse(res, 'Task not found', 404);
    }

    successResponse(res, tasks[0], 'Task retrieved successfully');

  } catch (error) {
    console.error('Get task error:', error);
    errorResponse(res, 'Failed to retrieve task', 500);
  }
};

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project_id,
      assignee_id,
      start_date,
      due_date,
      priority = 'Medium',
      status = 'Not Started',
      progress = 0
    } = req.body;

    const connection = getConnection();

    // Generate task ID
    const [lastTask] = await connection.execute(
      'SELECT id FROM tasks ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastTask.length > 0 ? lastTask[0].id + 1 : 1;
    const task_id = `TSK-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO tasks (task_id, title, description, project_id, assignee_id, start_date, 
                         due_date, priority, status, progress, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [task_id, title, description, project_id, assignee_id, start_date, due_date, priority, status, progress]
    );

    // Get created task
    const [tasks] = await connection.execute(
      `SELECT t.*, 
              p.name as project_name,
              CONCAT(u.first_name, ' ', u.last_name) as assignee_name
       FROM tasks t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.assignee_id = u.id
       WHERE t.id = ?`,
      [result.insertId]
    );

    successResponse(res, tasks[0], 'Task created successfully', 201);

  } catch (error) {
    console.error('Create task error:', error);
    errorResponse(res, 'Failed to create task', 500);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      project_id,
      assignee_id,
      start_date,
      due_date,
      priority,
      status,
      progress
    } = req.body;

    const connection = getConnection();

    // Check if task exists
    const [existingTasks] = await connection.execute(
      'SELECT id FROM tasks WHERE id = ?',
      [id]
    );

    if (existingTasks.length === 0) {
      return errorResponse(res, 'Task not found', 404);
    }

    await connection.execute(
      `UPDATE tasks 
       SET title = ?, description = ?, project_id = ?, assignee_id = ?, start_date = ?, 
           due_date = ?, priority = ?, status = ?, progress = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, description, project_id, assignee_id, start_date, due_date, priority, status, progress, id]
    );

    // Get updated task
    const [tasks] = await connection.execute(
      `SELECT t.*, 
              p.name as project_name,
              CONCAT(u.first_name, ' ', u.last_name) as assignee_name
       FROM tasks t
       LEFT JOIN projects p ON t.project_id = p.id
       LEFT JOIN users u ON t.assignee_id = u.id
       WHERE t.id = ?`,
      [id]
    );

    successResponse(res, tasks[0], 'Task updated successfully');

  } catch (error) {
    console.error('Update task error:', error);
    errorResponse(res, 'Failed to update task', 500);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if task exists
    const [existingTasks] = await connection.execute(
      'SELECT id FROM tasks WHERE id = ?',
      [id]
    );

    if (existingTasks.length === 0) {
      return errorResponse(res, 'Task not found', 404);
    }

    await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);

    successResponse(res, null, 'Task deleted successfully');

  } catch (error) {
    console.error('Delete task error:', error);
    errorResponse(res, 'Failed to delete task', 500);
  }
};

const getTaskStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_tasks,
        SUM(CASE WHEN status = 'Not Started' THEN 1 ELSE 0 END) as not_started_tasks,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress_tasks,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_tasks,
        SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) as on_hold_tasks,
        AVG(progress) as average_progress
      FROM tasks
    `);

    successResponse(res, stats[0], 'Task statistics retrieved successfully');

  } catch (error) {
    console.error('Get task stats error:', error);
    errorResponse(res, 'Failed to retrieve task statistics', 500);
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const connection = getConnection();

    const [tasks] = await connection.execute(
      `SELECT t.*, 
              CONCAT(u.first_name, ' ', u.last_name) as assignee_name
       FROM tasks t
       LEFT JOIN users u ON t.assignee_id = u.id
       WHERE t.project_id = ?
       ORDER BY t.created_at DESC`,
      [projectId]
    );

    successResponse(res, tasks, 'Project tasks retrieved successfully');

  } catch (error) {
    console.error('Get project tasks error:', error);
    errorResponse(res, 'Failed to retrieve project tasks', 500);
  }
};

const getTasksByAssignee = async (req, res) => {
  try {
    const { assigneeId } = req.params;
    const connection = getConnection();

    const [tasks] = await connection.execute(
      `SELECT t.*, 
              p.name as project_name,
              p.client as project_client
       FROM tasks t
       LEFT JOIN projects p ON t.project_id = p.id
       WHERE t.assignee_id = ?
       ORDER BY t.due_date ASC`,
      [assigneeId]
    );

    successResponse(res, tasks, 'Assignee tasks retrieved successfully');

  } catch (error) {
    console.error('Get assignee tasks error:', error);
    errorResponse(res, 'Failed to retrieve assignee tasks', 500);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  getTasksByProject,
  getTasksByAssignee,
};