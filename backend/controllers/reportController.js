const { getConnection } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const generateProjectReport = async (req, res) => {
  try {
    const { projectId, reportType, startDate, endDate } = req.query;
    const connection = getConnection();

    let reportData = {};

    if (reportType === 'project-summary') {
      // Get project details
      const [projects] = await connection.execute(
        'SELECT * FROM projects WHERE id = ?',
        [projectId]
      );

      if (projects.length === 0) {
        return errorResponse(res, 'Project not found', 404);
      }

      // Get project tasks
      const [tasks] = await connection.execute(
        `SELECT t.*, CONCAT(u.first_name, ' ', u.last_name) as assignee_name
         FROM tasks t
         LEFT JOIN users u ON t.assignee_id = u.id
         WHERE t.project_id = ?`,
        [projectId]
      );

      // Get project financials
      const [financials] = await connection.execute(
        `SELECT 
           SUM(i.amount) as total_invoiced,
           SUM(p.amount) as total_paid,
           SUM(jc.estimated_cost) as total_estimated_cost,
           SUM(jc.actual_cost) as total_actual_cost
         FROM projects pr
         LEFT JOIN invoices i ON pr.id = i.project_id
         LEFT JOIN payments p ON i.id = p.invoice_id
         LEFT JOIN job_costs jc ON pr.id = jc.project_id
         WHERE pr.id = ?`,
        [projectId]
      );

      reportData = {
        type: 'Project Summary',
        project: projects[0],
        tasks,
        financials: financials[0],
        generatedOn: new Date().toISOString(),
        dateRange: `${startDate} to ${endDate}`
      };

    } else if (reportType === 'task-progress') {
      // Get tasks within date range
      let taskQuery = `
        SELECT t.*, p.name as project_name, CONCAT(u.first_name, ' ', u.last_name) as assignee_name
        FROM tasks t
        LEFT JOIN projects p ON t.project_id = p.id
        LEFT JOIN users u ON t.assignee_id = u.id
        WHERE 1=1
      `;
      let queryParams = [];

      if (projectId && projectId !== 'all') {
        taskQuery += ' AND t.project_id = ?';
        queryParams.push(projectId);
      }

      if (startDate && endDate) {
        taskQuery += ' AND t.due_date BETWEEN ? AND ?';
        queryParams.push(startDate, endDate);
      }

      taskQuery += ' ORDER BY t.due_date ASC';

      const [tasks] = await connection.execute(taskQuery, queryParams);

      reportData = {
        type: 'Task Progress',
        tasks,
        generatedOn: new Date().toISOString(),
        dateRange: `${startDate} to ${endDate}`
      };
    }

    successResponse(res, reportData, 'Report generated successfully');

  } catch (error) {
    console.error('Generate report error:', error);
    errorResponse(res, 'Failed to generate report', 500);
  }
};

const getReportHistory = async (req, res) => {
  try {
    const connection = getConnection();

    // Mock report history - in real app, you'd store generated reports
    const reportHistory = [
      {
        id: 1,
        name: 'Project Summary Report',
        type: 'project-summary',
        project: 'Website Redesign',
        generatedDate: '2023-07-15',
        generatedBy: 'John Smith',
        status: 'Generated'
      },
      {
        id: 2,
        name: 'Task Progress Report',
        type: 'task-progress',
        project: 'Mobile App Development',
        generatedDate: '2023-07-10',
        generatedBy: 'Sarah Johnson',
        status: 'Generated'
      },
      {
        id: 3,
        name: 'Financial Summary',
        type: 'financial',
        project: 'All Projects',
        generatedDate: '2023-07-05',
        generatedBy: 'Mike Chen',
        status: 'Generated'
      }
    ];

    successResponse(res, reportHistory, 'Report history retrieved successfully');

  } catch (error) {
    console.error('Get report history error:', error);
    errorResponse(res, 'Failed to retrieve report history', 500);
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const connection = getConnection();
    const { role } = req.user;

    let stats = {};

    // Common stats for all roles
    const [projectStats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_projects,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as active_projects,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_projects,
        SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) as on_hold_projects
      FROM projects
    `);

    const [taskStats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_tasks,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress_tasks,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_tasks,
        AVG(progress) as average_progress
      FROM tasks
    `);

    stats = {
      projects: projectStats[0],
      tasks: taskStats[0]
    };

    // Role-specific stats
    if (role === 'Admin' || role === 'ProjectManager') {
      const [rfqStats] = await connection.execute(`
        SELECT 
          COUNT(*) as total_rfqs,
          SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) as pending_rfqs,
          SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) as won_rfqs
        FROM rfqs
      `);

      const [contractStats] = await connection.execute(`
        SELECT 
          COUNT(*) as total_contracts,
          SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active_contracts
        FROM contracts
      `);

      stats.rfqs = rfqStats[0];
      stats.contracts = contractStats[0];
    }

    if (role === 'Admin' || role === 'Finance') {
      const [financialStats] = await connection.execute(`
        SELECT 
          SUM(amount) as total_invoices,
          SUM(CASE WHEN status = 'Pending' THEN amount ELSE 0 END) as invoices_due
        FROM invoices
      `);

      stats.financials = financialStats[0];
    }

    if (role === 'Admin' || role === 'Quality') {
      const [qualityStats] = await connection.execute(`
        SELECT 
          COUNT(*) as total_inspections,
          SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open_issues
        FROM quality_inspections
      `);

      stats.quality = qualityStats[0];
    }

    successResponse(res, stats, 'Dashboard statistics retrieved successfully');

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    errorResponse(res, 'Failed to retrieve dashboard statistics', 500);
  }
};

module.exports = {
  generateProjectReport,
  getReportHistory,
  getDashboardStats,
};