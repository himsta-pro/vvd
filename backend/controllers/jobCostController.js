const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllJobCosts = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'project', 'task', 'estimated_cost', 'actual_cost', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status', 'project_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['jc.job_id', 'jc.project', 'jc.task', 'jc.resource']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM job_costs jc
      LEFT JOIN projects p ON jc.project_id = p.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get job costs with pagination
    const query = `
      SELECT jc.*, p.name as project_name
      FROM job_costs jc
      LEFT JOIN projects p ON jc.project_id = p.id
      ${whereClause}
      ORDER BY jc.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [jobCosts] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, jobCosts, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Job costs retrieved successfully');

  } catch (error) {
    console.error('Get job costs error:', error);
    errorResponse(res, 'Failed to retrieve job costs', 500);
  }
};

const getJobCostById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [jobCosts] = await connection.execute(
      `SELECT jc.*, p.name as project_name
       FROM job_costs jc
       LEFT JOIN projects p ON jc.project_id = p.id
       WHERE jc.id = ?`,
      [id]
    );

    if (jobCosts.length === 0) {
      return errorResponse(res, 'Job cost not found', 404);
    }

    successResponse(res, jobCosts[0], 'Job cost retrieved successfully');

  } catch (error) {
    console.error('Get job cost error:', error);
    errorResponse(res, 'Failed to retrieve job cost', 500);
  }
};

const createJobCost = async (req, res) => {
  try {
    const {
      project_id,
      project,
      task,
      resource,
      estimated_labor,
      estimated_material,
      overhead,
      actual_labor,
      actual_material,
      actual_overhead,
      status = 'Estimated'
    } = req.body;

    const connection = getConnection();

    // Generate job ID
    const [lastJob] = await connection.execute(
      'SELECT id FROM job_costs ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastJob.length > 0 ? lastJob[0].id + 1 : 1;
    const job_id = `JC-${String(nextId).padStart(3, '0')}`;

    // Calculate costs
    const estimated_cost = (estimated_labor || 0) + (estimated_material || 0) + (overhead || 0);
    const actual_cost = (actual_labor || 0) + (actual_material || 0) + (actual_overhead || 0);
    const variance = estimated_cost - actual_cost;

    const [result] = await connection.execute(
      `INSERT INTO job_costs (job_id, project_id, project, task, resource, estimated_labor, estimated_material, 
                             overhead, estimated_cost, actual_labor, actual_material, actual_overhead, actual_cost, 
                             variance, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [job_id, project_id, project, task, resource, estimated_labor, estimated_material, overhead, 
       estimated_cost, actual_labor, actual_material, actual_overhead, actual_cost, variance, status]
    );

    // Get created job cost
    const [jobCosts] = await connection.execute(
      `SELECT jc.*, p.name as project_name
       FROM job_costs jc
       LEFT JOIN projects p ON jc.project_id = p.id
       WHERE jc.id = ?`,
      [result.insertId]
    );

    successResponse(res, jobCosts[0], 'Job cost created successfully', 201);

  } catch (error) {
    console.error('Create job cost error:', error);
    errorResponse(res, 'Failed to create job cost', 500);
  }
};

const updateJobCost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      project,
      task,
      resource,
      estimated_labor,
      estimated_material,
      overhead,
      actual_labor,
      actual_material,
      actual_overhead,
      status
    } = req.body;

    const connection = getConnection();

    // Check if job cost exists
    const [existingJobCosts] = await connection.execute(
      'SELECT id FROM job_costs WHERE id = ?',
      [id]
    );

    if (existingJobCosts.length === 0) {
      return errorResponse(res, 'Job cost not found', 404);
    }

    // Calculate costs
    const estimated_cost = (estimated_labor || 0) + (estimated_material || 0) + (overhead || 0);
    const actual_cost = (actual_labor || 0) + (actual_material || 0) + (actual_overhead || 0);
    const variance = estimated_cost - actual_cost;

    await connection.execute(
      `UPDATE job_costs 
       SET project_id = ?, project = ?, task = ?, resource = ?, estimated_labor = ?, estimated_material = ?, 
           overhead = ?, estimated_cost = ?, actual_labor = ?, actual_material = ?, actual_overhead = ?, 
           actual_cost = ?, variance = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [project_id, project, task, resource, estimated_labor, estimated_material, overhead, estimated_cost, 
       actual_labor, actual_material, actual_overhead, actual_cost, variance, status, id]
    );

    // Get updated job cost
    const [jobCosts] = await connection.execute(
      `SELECT jc.*, p.name as project_name
       FROM job_costs jc
       LEFT JOIN projects p ON jc.project_id = p.id
       WHERE jc.id = ?`,
      [id]
    );

    successResponse(res, jobCosts[0], 'Job cost updated successfully');

  } catch (error) {
    console.error('Update job cost error:', error);
    errorResponse(res, 'Failed to update job cost', 500);
  }
};

const deleteJobCost = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if job cost exists
    const [existingJobCosts] = await connection.execute(
      'SELECT id FROM job_costs WHERE id = ?',
      [id]
    );

    if (existingJobCosts.length === 0) {
      return errorResponse(res, 'Job cost not found', 404);
    }

    await connection.execute('DELETE FROM job_costs WHERE id = ?', [id]);

    successResponse(res, null, 'Job cost deleted successfully');

  } catch (error) {
    console.error('Delete job cost error:', error);
    errorResponse(res, 'Failed to delete job cost', 500);
  }
};

const getJobCostStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_jobs,
        SUM(estimated_cost) as total_estimated,
        SUM(actual_cost) as total_actual,
        SUM(variance) as total_variance,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_jobs,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress_jobs,
        SUM(CASE WHEN status = 'Estimated' THEN 1 ELSE 0 END) as estimated_jobs
      FROM job_costs
    `);

    const [priceDatabase] = await connection.execute(`
      SELECT 
        'Material' as type,
        item_name as name,
        price,
        unit,
        category
      FROM material_prices
      UNION ALL
      SELECT 
        'Labor' as type,
        role_name as name,
        rate as price,
        unit,
        'Labor' as category
      FROM labor_rates
      ORDER BY type, name
    `);

    const result = {
      ...stats[0],
      price_database: priceDatabase
    };

    successResponse(res, result, 'Job cost statistics retrieved successfully');

  } catch (error) {
    console.error('Get job cost stats error:', error);
    errorResponse(res, 'Failed to retrieve job cost statistics', 500);
  }
};

module.exports = {
  getAllJobCosts,
  getJobCostById,
  createJobCost,
  updateJobCost,
  deleteJobCost,
  getJobCostStats,
};