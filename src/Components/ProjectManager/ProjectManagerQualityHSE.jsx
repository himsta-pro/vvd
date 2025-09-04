import React, { useState, useEffect } from 'react';

const ProjectManagerQualityHSE = () => {
  // Sample data
  const [issues, setIssues] = useState([
    {
      id: 1,
      issueId: 'QH-001',
      project: 'Website Redesign',
      description: 'Security vulnerability in login module',
      severity: 'High',
      reportedDate: '2023-07-10',
      reportedBy: 'John Smith',
      status: 'Open',
      resolution: '',
      assignedTo: 'Security Team'
    },
    {
      id: 2,
      issueId: 'QH-002',
      project: 'Mobile App Development',
      description: 'UI inconsistency across different screen sizes',
      severity: 'Medium',
      reportedDate: '2023-07-12',
      reportedBy: 'Sarah Johnson',
      status: 'In Progress',
      resolution: 'Being addressed by UI team',
      assignedTo: 'UI Team'
    },
    {
      id: 3,
      issueId: 'QH-003',
      project: 'Database Migration',
      description: 'Safety concern: server room temperature too high',
      severity: 'Critical',
      reportedDate: '2023-07-15',
      reportedBy: 'Mike Chen',
      status: 'Resolved',
      resolution: 'Additional cooling installed on 2023-07-18',
      assignedTo: 'Facilities Team'
    },
    {
      id: 4,
      issueId: 'QH-004',
      project: 'API Integration',
      description: 'Lack of proper error handling in API responses',
      severity: 'High',
      reportedDate: '2023-07-18',
      reportedBy: 'Emma Wilson',
      status: 'Open',
      resolution: '',
      assignedTo: 'Backend Team'
    },
    {
      id: 5,
      issueId: 'QH-005',
      project: 'UI/UX Research',
      description: 'Inadequate ventilation in testing lab',
      severity: 'Medium',
      reportedDate: '2023-07-20',
      reportedBy: 'Alex Brown',
      status: 'In Progress',
      resolution: 'Ventilation system upgrade scheduled',
      assignedTo: 'Facilities Team'
    }
  ]);

  const [projects] = useState([
    'Website Redesign',
    'Mobile App Development',
    'Database Migration',
    'API Integration',
    'UI/UX Research'
  ]);

  const [severityLevels] = useState(['Low', 'Medium', 'High', 'Critical']);
  const [statusOptions] = useState(['Open', 'In Progress', 'Resolved', 'Closed']);
  const [teams] = useState(['Development Team', 'UI Team', 'QA Team', 'Security Team', 'Facilities Team', 'Backend Team']);

  const [filteredIssues, setFilteredIssues] = useState(issues);
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogIssueModal, setShowLogIssueModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({
    project: '',
    description: "",
    severity: 'Medium',
    assignedTo: ''
  });

  // Apply filters whenever filters or issues change
  useEffect(() => {
    let result = issues;

    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(issue => issue.status === statusFilter);
    }

    // Apply severity filter
    if (severityFilter !== 'All') {
      result = result.filter(issue => issue.severity === severityFilter);
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(issue =>
        issue.issueId.toLowerCase().includes(term) ||
        issue.project.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term) ||
        issue.assignedTo.toLowerCase().includes(term)
      );
    }

    setFilteredIssues(result);
  }, [statusFilter, severityFilter, searchTerm, issues]);

  const handleView = (issue) => {
    setCurrentIssue(issue);
    setShowViewModal(true);
  };

  const handleEdit = (issue) => {
    setCurrentIssue(issue);
    setShowEditModal(true);
  };

  const handleDelete = (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      const updatedIssues = issues.filter(issue => issue.id !== issueId);
      setIssues(updatedIssues);
    }
  };

  const handleLogIssue = () => {
    // Generate a new ID and issue ID
    const newId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
    const newIssueId = `QH-${String(newId).padStart(3, '0')}`;

    const newIssueItem = {
      id: newId,
      issueId: newIssueId,
      project: newIssue.project,
      description: newIssue.description,
      severity: newIssue.severity,
      reportedDate: new Date().toISOString().split('T')[0],
      reportedBy: 'Current User', // In a real app, this would be the logged in user
      status: 'Open',
      resolution: '',
      assignedTo: newIssue.assignedTo
    };

    setIssues([...issues, newIssueItem]);
    setShowLogIssueModal(false);
    resetNewIssue();
  };

  const handleSaveEdit = () => {
    if (currentIssue) {
      const updatedIssues = issues.map(issue =>
        issue.id === currentIssue.id ? currentIssue : issue
      );
      setIssues(updatedIssues);
      setShowEditModal(false);
    }
  };

  const resetNewIssue = () => {
    setNewIssue({
      project: '',
      description: '',
      severity: 'Medium',
      assignedTo: ''
    });
  };

  const getSeverityBadge = (severity) => {
    let variant = 'secondary';
    if (severity === 'Critical') variant = 'danger';
    if (severity === 'High') variant = 'warning';
    if (severity === 'Medium') variant = 'info';
    if (severity === 'Low') variant = 'success';

    return <span className={`badge bg-${variant}`}>{severity}</span>;
  };

  const getStatusBadge = (status) => {
    let variant = 'secondary';
    if (status === 'Open') variant = 'danger';
    if (status === 'In Progress') variant = 'primary';
    if (status === 'Resolved') variant = 'success';
    if (status === 'Closed') variant = 'dark';

    return <span className={`badge bg-${variant}`}>{status}</span>;
  };

  // Log Issue Modal
  const LogIssueModal = () => {
    return (
      <div className={`modal fade ${showLogIssueModal ? 'show' : ''}`} style={{ display: showLogIssueModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log New Issue</h5>
              <button type="button" className="btn-close" onClick={() => setShowLogIssueModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      value={newIssue.project || ''}
                      onChange={(e) => setNewIssue({ ...newIssue, project: e.target.value })}
                      required
                    >
                      <option value="">Select Project</option>
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Severity</label>
                    <select
                      className="form-select"
                      value={newIssue.severity || ''}
                      onChange={(e) => setNewIssue({ ...newIssue, severity: e.target.value })}
                      required
                    >
                      {severityLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Assign To</label>
                    <select
                      className="form-select"
                      value={newIssue.assignedTo || ''}
                      onChange={(e) => setNewIssue({ ...newIssue, assignedTo: e.target.value })}
                      required
                    >
                      <option value="">Select Team</option>
                      {teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description text field - Fixed */}
              <div className="row">
                <div className="col-12">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowLogIssueModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleLogIssue}>Log Issue</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // View Modal
  const ViewModal = () => {
    if (!currentIssue) return null;

    return (
      <div className={`modal fade ${showViewModal ? 'show' : ''}`} style={{ display: showViewModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Issue Details: {currentIssue.issueId}</h5>
              <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Issue Information</h6>
                  <p><strong>Issue ID:</strong> {currentIssue.issueId}</p>
                  <p><strong>Project:</strong> {currentIssue.project}</p>
                  <p><strong>Severity:</strong> {getSeverityBadge(currentIssue.severity)}</p>
                  <p><strong>Status:</strong> {getStatusBadge(currentIssue.status)}</p>
                </div>
                <div className="col-md-6">
                  <h6>Assignment & Reporting</h6>
                  <p><strong>Reported By:</strong> {currentIssue.reportedBy}</p>
                  <p><strong>Reported Date:</strong> {currentIssue.reportedDate}</p>
                  <p><strong>Assigned To:</strong> {currentIssue.assignedTo}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <h6>Description</h6>
                  <div className="border p-3 bg-light">
                    {currentIssue.description}
                  </div>
                </div>
              </div>
              {currentIssue.resolution && (
                <div className="row mt-3">
                  <div className="col-12">
                    <h6>Resolution</h6>
                    <div className="border p-3 bg-light">
                      {currentIssue.resolution}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(currentIssue); }}>Edit Issue</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal
  const EditModal = () => {
    if (!currentIssue) return null;

    return (
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Issue: {currentIssue.issueId}</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      value={currentIssue.project}
                      onChange={(e) => setCurrentIssue({ ...currentIssue, project: e.target.value })}
                    >
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Severity</label>
                    <select
                      className="form-select"
                      value={currentIssue.severity}
                      onChange={(e) => setCurrentIssue({ ...currentIssue, severity: e.target.value })}
                    >
                      {severityLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={currentIssue.status}
                      onChange={(e) => setCurrentIssue({ ...currentIssue, status: e.target.value })}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Assign To</label>
                    <select
                      className="form-select"
                      value={currentIssue.assignedTo}
                      onChange={(e) => setCurrentIssue({ ...currentIssue, assignedTo: e.target.value })}
                    >
                      {teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      rows={4}
                    />

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Resolution</label>
                    <textarea
                      className="form-control"
                      rows="3"
                
                      placeholder="Describe how this issue was resolved..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {/* Backdrop for modals */}
      <div className={`modal-backdrop fade ${showLogIssueModal || showViewModal || showEditModal ? 'show' : ''}`}
        style={{ display: showLogIssueModal || showViewModal || showEditModal ? 'block' : 'none' }}></div>

      <div className="row align-items-center mb-4">
        {/* Heading (Full width on mobile, left on desktop) */}
        <div className="col-12 col-md">
          <h3 className="fw-bold mb-2 mb-md-0">Quality & HSE Management</h3>
        </div>

        {/* Button (Full width on mobile, right on desktop) */}
        <div className="col-12 col-md-auto text-md-end">
          <button
            className="btn btn-primary w-100 w-md-auto mt-1"
            onClick={() => setShowLogIssueModal(true)}
          >
            <i className="bi bi-plus-circle"></i> Log Issue
          </button>
        </div>
      </div>



      {/* Action buttons and filters */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All Severities</option>
            {severityLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Issues Table */}
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Issue ID</th>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Severity</th>
                  <th className="text-nowrap">Reported Date</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.length > 0 ? (
                  filteredIssues.map(issue => (
                    <tr key={issue.id}>
                      <td className="fw-bold">{issue.issueId}</td>
                      <td>{issue.project}</td>
                      {/* Truncate long descriptions */}
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "200px" }}
                        title={issue.description}
                      >
                        {issue.description}
                      </td>
                      <td>{getSeverityBadge(issue.severity)}</td>
                      <td className="text-nowrap">{issue.reportedDate}</td>
                      <td>{getStatusBadge(issue.status)}</td>
                      <td>{issue.assignedTo}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-sm text-primary me-1"
                            onClick={() => handleView(issue)}
                            title="View Issue"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm text-success me-1"
                            onClick={() => handleEdit(issue)}
                            title="Edit Issue"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm text-danger"
                            onClick={() => handleDelete(issue.id)}
                            title="Delete Issue"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No issues found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-primary bg-primary bg-opacity-10 border-0 mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Issues</h5>
              <p className="card-text display-6">{issues.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-danger bg-opacity-10 border-0 bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Open Issues</h5>
              <p className="card-text display-6">{issues.filter(i => i.status === 'Open').length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-warning bg-opacity-10 border-0 bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Critical Issues</h5>
              <p className="card-text display-6">{issues.filter(i => i.severity === 'Critical').length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-success bg-opacity-10 border-0 bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Resolved Issues</h5>
              <p className="card-text display-6">{issues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LogIssueModal />
      <ViewModal />
      <EditModal />
    </div>
  );
};

export default ProjectManagerQualityHSE;