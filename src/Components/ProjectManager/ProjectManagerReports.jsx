import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectManagerReports = () => {
  const [reportType, setReportType] = useState('project-summary');
  const [selectedProject, setSelectedProject] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  // Sample data - in a real app this would come from an API
  useEffect(() => {
    const sampleProjects = [
      {
        id: 1, name: 'Website Redesign', client: 'Acme Corp', status: 'completed',
        budget: 15000, spent: 14500, startDate: '2023-01-15', endDate: '2023-06-20'
      },
      {
        id: 2, name: 'Mobile App Development', client: 'Tech Solutions', status: 'in-progress',
        budget: 25000, spent: 18200, startDate: '2023-03-10', endDate: '2023-11-30'
      },
      {
        id: 3, name: 'E-commerce Platform', client: 'Global Retail', status: 'in-progress',
        budget: 35000, spent: 29500, startDate: '2023-02-01', endDate: '2023-12-15'
      },
      {
        id: 4, name: 'CRM Implementation', client: 'SalesPro', status: 'on-hold',
        budget: 12000, spent: 6500, startDate: '2023-05-05', endDate: '2023-10-10'
      }
    ];

    const sampleTasks = [
      {
        id: 1, projectId: 1, name: 'Design Homepage', assignee: 'John Doe',
        status: 'completed', progress: 100, dueDate: '2023-03-15'
      },
      {
        id: 2, projectId: 1, name: 'Develop Backend', assignee: 'Alice Smith',
        status: 'completed', progress: 100, dueDate: '2023-04-20'
      },
      {
        id: 3, projectId: 2, name: 'UI Design', assignee: 'Emma Wilson',
        status: 'in-progress', progress: 80, dueDate: '2023-07-15'
      },
      {
        id: 4, projectId: 2, name: 'API Integration', assignee: 'Michael Brown',
        status: 'in-progress', progress: 65, dueDate: '2023-08-30'
      },
      {
        id: 5, projectId: 3, name: 'Payment Gateway', assignee: 'Sarah Johnson',
        status: 'in-progress', progress: 90, dueDate: '2023-09-10'
      },
      {
        id: 6, projectId: 3, name: 'Product Catalog', assignee: 'David Lee',
        status: 'completed', progress: 100, dueDate: '2023-07-22'
      },
      {
        id: 7, projectId: 4, name: 'Requirements Analysis', assignee: 'Robert Taylor',
        status: 'completed', progress: 100, dueDate: '2023-06-10'
      },
      {
        id: 8, projectId: 4, name: 'System Configuration', assignee: 'Jessica White',
        status: 'on-hold', progress: 30, dueDate: '2023-08-15'
      }
    ];

    setProjects(sampleProjects);
    setTasks(sampleTasks);

    // Set default date range to last 30 days
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);

    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }, []);

  const handleGenerateReport = () => {
    // Filter tasks based on selected project and date range
    let filteredTasks = tasks;

    if (selectedProject !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.projectId.toString() === selectedProject);
    }

    if (startDate && endDate) {
      filteredTasks = filteredTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return taskDate >= start && taskDate <= end;
      });
    }

    // Filter projects if a specific one is selected
    let filteredProjects = projects;
    if (selectedProject !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.id.toString() === selectedProject);
    }

    // Generate report data based on report type
    let reportData;

    if (reportType === 'project-summary') {
      reportData = {
        type: 'Project Summary',
        projects: filteredProjects,
        generatedOn: new Date().toLocaleDateString(),
        dateRange: `${startDate} to ${endDate}`
      };
    } else {
      reportData = {
        type: 'Task Progress',
        tasks: filteredTasks,
        generatedOn: new Date().toLocaleDateString(),
        dateRange: `${startDate} to ${endDate}`
      };
    }

    setGeneratedReport(reportData);
    setShowReportModal(true);
  };

  const handleCloseModal = () => {
    setShowReportModal(false);
    setGeneratedReport(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'on-hold': return 'warning';
      default: return 'secondary';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getProgressBarVariant = (progress) => {
    if (progress >= 90) return 'success';
    if (progress >= 70) return 'primary';
    if (progress >= 50) return 'info';
    if (progress >= 30) return 'warning';
    return 'danger';
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <h3 className="fw-bold mb-2 mb-md-0">
              Reports Dashboard
            </h3>
            <button className="btn btn-outline-secondary">
              <i className="fas fa-history me-2"></i>Report History
            </button>
          </div>

          {/* Report Configuration Card */}
          <div className="card mb-4 shadow-sm border-0">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">
              Report Configuration
              </h5>
            </div>

            <div className="card-body">
              <div className="row g-3">
                {/* Report Type */}
                <div className="col-md-4">
                  <label htmlFor="reportType" className="form-label fw-semibold small">Report Type</label>
                  <select
                    id="reportType"
                    className="form-select"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="project-summary">Project Summary</option>
                    <option value="task-progress">Task Progress</option>
                  </select>
                </div>

                {/* Project */}
                <div className="col-md-4">
                  <label htmlFor="selectedProject" className="form-label fw-semibold small">Project</label>
                  <select
                    id="selectedProject"
                    className="form-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    <option value="all">All Projects</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Date Range</label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="input-group-text">to</span>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary px-4"
                  onClick={handleGenerateReport}
                >
                  <i className="fas fa-file-pdf me-2"></i>Generate Report
                </button>
              </div>
            </div>
          </div>


          {/* Quick Stats */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary bg-opacity-10 border-0 text-primary">
                <div className="card-body">
                  <h5 className="card-title">Total Projects</h5>
                  <h3 className="card-text">{projects.length}</h3>
                  <p className="card-text"><small>Active: {projects.filter(p => p.status === 'in-progress').length}</small></p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-success bg-opacity-10 border-0">
                <div className="card-body">
                  <h5 className="card-title">Completed Tasks</h5>
                  <h3 className="card-text">{tasks.filter(t => t.status === 'completed').length}</h3>
                  <p className="card-text"><small>Total: {tasks.length}</small></p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-info bg-opacity-10 border-0">
                <div className="card-body">
                  <h5 className="card-title">In Progress</h5>
                  <h3 className="card-text">{tasks.filter(t => t.status === 'in-progress').length}</h3>
                  <p className="card-text"><small>Tasks ongoing</small></p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-warning bg-opacity-10 border-0">
                <div className="card-body">
                  <h5 className="card-title">On Hold</h5>
                  <h3 className="card-text">{tasks.filter(t => t.status === 'on-hold').length}</h3>
                  <p className="card-text"><small>Needs attention</small></p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks Preview */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-tasks me-2"></i>
                Recent Tasks
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th>Task</th>
                      <th>Project</th>
                      <th>Assignee</th>
                      <th>Due Date</th>
                      <th>Progress</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.slice(0, 5).map(task => {
                      const project = projects.find(p => p.id === task.projectId);
                      return (
                        <tr key={task.id}>
                          <td>{task.name}</td>
                          <td>{project ? project.name : 'N/A'}</td>
                          <td>{task.assignee}</td>
                          <td>{task.dueDate}</td>
                          <td>
                            <div className="progress" style={{ height: '8px' }}>
                              <div
                                className={`progress-bar bg-${getProgressBarVariant(task.progress)}`}
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <small>{task.progress}%</small>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusBadge(task.status)}`}>
                              {task.status.replace('-', ' ')}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {generatedReport && (
        <div className={`modal fade ${showReportModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-file-alt me-2"></i>
                  {generatedReport.type} Report
                </h5>
                <button type="button" className="btn-close btn-close-dark" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p><strong>Generated on:</strong> {generatedReport.generatedOn}</p>
                    <p><strong>Date Range:</strong> {generatedReport.dateRange}</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <button className="btn btn-outline-primary me-2">
                      <i className="fas fa-print me-2"></i>Print
                    </button>
                    <button className="btn btn-outline-success">
                      <i className="fas fa-download me-2"></i>Export
                    </button>
                  </div>
                </div>

                <hr />

                {generatedReport.type === 'Project Summary' ? (
                  <div>
                    <h4 className="mb-4">Project Summary</h4>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Project Name</th>
                            <th>Client</th>
                            <th>Status</th>
                            <th>Budget</th>
                            <th>Spent</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedReport.projects.map(project => (
                            <tr key={project.id}>
                              <td>{project.name}</td>
                              <td>{project.client}</td>
                              <td>
                                <span className={`badge bg-${getStatusBadge(project.status)}`}>
                                  {project.status.replace('-', ' ')}
                                </span>
                              </td>
                              <td>{formatCurrency(project.budget)}</td>
                              <td>{formatCurrency(project.spent)}</td>
                              <td>{project.startDate}</td>
                              <td>{project.endDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h6>Budget Overview</h6>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Total Budget:</span>
                              <strong>{formatCurrency(generatedReport.projects.reduce((sum, p) => sum + p.budget, 0))}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Total Spent:</span>
                              <strong>{formatCurrency(generatedReport.projects.reduce((sum, p) => sum + p.spent, 0))}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Remaining:</span>
                              <strong>{formatCurrency(generatedReport.projects.reduce((sum, p) => sum + (p.budget - p.spent), 0))}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h6>Project Status Distribution</h6>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Completed:</span>
                              <strong>{generatedReport.projects.filter(p => p.status === 'completed').length}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>In Progress:</span>
                              <strong>{generatedReport.projects.filter(p => p.status === 'in-progress').length}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>On Hold:</span>
                              <strong>{generatedReport.projects.filter(p => p.status === 'on-hold').length}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="mb-4">Task Progress Report</h4>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Task</th>
                            <th>Project</th>
                            <th>Assignee</th>
                            <th>Due Date</th>
                            <th>Progress</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedReport.tasks.map(task => {
                            const project = projects.find(p => p.id === task.projectId);
                            return (
                              <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>{project ? project.name : 'N/A'}</td>
                                <td>{task.assignee}</td>
                                <td>{task.dueDate}</td>
                                <td>
                                  <div className="progress" style={{ height: '8px' }}>
                                    <div
                                      className={`progress-bar bg-${getProgressBarVariant(task.progress)}`}
                                      style={{ width: `${task.progress}%` }}
                                    ></div>
                                  </div>
                                  <small>{task.progress}%</small>
                                </td>
                                <td>
                                  <span className={`badge bg-${getStatusBadge(task.status)}`}>
                                    {task.status.replace('-', ' ')}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h6>Task Status Overview</h6>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Completed:</span>
                              <strong>{generatedReport.tasks.filter(t => t.status === 'completed').length}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>In Progress:</span>
                              <strong>{generatedReport.tasks.filter(t => t.status === 'in-progress').length}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>On Hold:</span>
                              <strong>{generatedReport.tasks.filter(t => t.status === 'on-hold').length}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h6>Progress Distribution</h6>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                              <span>90-100%:</span>
                              <strong>{generatedReport.tasks.filter(t => t.progress >= 90).length}</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>70-89%:</span>
                              <strong>{generatedReport.tasks.filter(t => t.progress >= 70 && t.progress < 90).length}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Below 70%:</span>
                              <strong>{generatedReport.tasks.filter(t => t.progress < 70).length}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary">Save Report</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagerReports;