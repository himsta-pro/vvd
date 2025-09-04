import React, { useState, useEffect } from 'react';

const ProjectManagerRisks = () => {
  // Sample risk data
  const [risks, setRisks] = useState([
    {
      id: 1,
      riskId: 'RISK-001',
      project: 'Website Redesign',
      description: 'Potential delays in content delivery from client',
      probability: 'Medium',
      impact: 'High',
      status: 'Open',
      owner: 'John Smith',
      mitigation: 'Regular follow-ups with client and buffer time in schedule',
      createdDate: '2023-07-10',
      lastUpdated: '2023-07-15'
    },
    {
      id: 2,
      riskId: 'RISK-002',
      project: 'Mobile App Development',
      description: 'Third-party API dependencies may change during development',
      probability: 'Low',
      impact: 'High',
      status: 'Monitoring',
      owner: 'Sarah Johnson',
      mitigation: 'Identify alternative APIs and maintain flexible architecture',
      createdDate: '2023-07-12',
      lastUpdated: '2023-07-20'
    },
    {
      id: 3,
      riskId: 'RISK-003',
      project: 'Database Migration',
      description: 'Data integrity issues during migration process',
      probability: 'Medium',
      impact: 'Critical',
      status: 'Mitigated',
      owner: 'Mike Chen',
      mitigation: 'Implement comprehensive testing and validation procedures',
      createdDate: '2023-07-15',
      lastUpdated: '2023-07-25'
    },
    {
      id: 4,
      riskId: 'RISK-004',
      project: 'API Integration',
      description: 'Performance issues with legacy systems',
      probability: 'High',
      impact: 'Medium',
      status: 'Open',
      owner: 'Emma Wilson',
      mitigation: 'Plan for performance optimization and load testing',
      createdDate: '2023-07-18',
      lastUpdated: '2023-07-22'
    },
    {
      id: 5,
      riskId: 'RISK-005',
      project: 'UI/UX Research',
      description: 'Recruitment challenges for user testing participants',
      probability: 'High',
      impact: 'Low',
      status: 'Resolved',
      owner: 'Alex Brown',
      mitigation: 'Expand recruitment channels and offer better incentives',
      createdDate: '2023-07-20',
      lastUpdated: '2023-07-28'
    }
  ]);

  const [projects] = useState([
    'Website Redesign',
    'Mobile App Development',
    'Database Migration',
    'API Integration',
    'UI/UX Research'
  ]);

  const [probabilityLevels] = useState(['Low', 'Medium', 'High']);
  const [impactLevels] = useState(['Low', 'Medium', 'High', 'Critical']);
  const [statusOptions] = useState(['Open', 'Monitoring', 'Mitigated', 'Resolved', 'Closed']);
  const [teamMembers] = useState(['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'Alex Brown', 'David Miller']);

  const [filteredRisks, setFilteredRisks] = useState(risks);
  const [statusFilter, setStatusFilter] = useState('All');
  const [impactFilter, setImpactFilter] = useState('All');
  const [probabilityFilter, setProbabilityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRisk, setCurrentRisk] = useState(null);
  const [newRisk, setNewRisk] = useState({
    project: '',
    description: '',
    probability: 'Medium',
    impact: 'Medium',
    owner: '',
    mitigation: ''
  });

  // Apply filters whenever filters or risks change
  useEffect(() => {
    let result = risks;

    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(risk => risk.status === statusFilter);
    }

    // Apply impact filter
    if (impactFilter !== 'All') {
      result = result.filter(risk => risk.impact === impactFilter);
    }

    // Apply probability filter
    if (probabilityFilter !== 'All') {
      result = result.filter(risk => risk.probability === probabilityFilter);
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(risk =>
        risk.riskId.toLowerCase().includes(term) ||
        risk.project.toLowerCase().includes(term) ||
        risk.description.toLowerCase().includes(term) ||
        risk.owner.toLowerCase().includes(term)
      );
    }

    setFilteredRisks(result);
  }, [statusFilter, impactFilter, probabilityFilter, searchTerm, risks]);

  const handleView = (risk) => {
    setCurrentRisk(risk);
    setShowViewModal(true);
  };

  const handleEdit = (risk) => {
    setCurrentRisk(risk);
    setShowEditModal(true);
  };

  const handleDelete = (riskId) => {
    if (window.confirm('Are you sure you want to delete this risk?')) {
      const updatedRisks = risks.filter(risk => risk.id !== riskId);
      setRisks(updatedRisks);
    }
  };

  const handleAddRisk = () => {
    // Generate a new ID and risk ID
    const newId = risks.length > 0 ? Math.max(...risks.map(r => r.id)) + 1 : 1;
    const newRiskId = `RISK-${String(newId).padStart(3, '0')}`;

    const newRiskItem = {
      id: newId,
      riskId: newRiskId,
      project: newRisk.project,
      description: newRisk.description,
      probability: newRisk.probability,
      impact: newRisk.impact,
      status: 'Open',
      owner: newRisk.owner,
      mitigation: newRisk.mitigation,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setRisks([...risks, newRiskItem]);
    setShowAddRiskModal(false);
    resetNewRisk();
  };

  const handleSaveEdit = () => {
    if (currentRisk) {
      const updatedRisk = {
        ...currentRisk,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      const updatedRisks = risks.map(risk =>
        risk.id === updatedRisk.id ? updatedRisk : risk
      );
      setRisks(updatedRisks);
      setShowEditModal(false);
    }
  };

  const resetNewRisk = () => {
    setNewRisk({
      project: '',
      description: '',
      probability: 'Medium',
      impact: 'Medium',
      owner: '',
      mitigation: ''
    });
  };

  const getImpactBadge = (impact) => {
    let variant = 'secondary';
    if (impact === 'Critical') variant = 'danger';
    if (impact === 'High') variant = 'warning';
    if (impact === 'Medium') variant = 'info';
    if (impact === 'Low') variant = 'success';

    return <span className={`badge bg-${variant}`}>{impact}</span>;
  };

  const getProbabilityBadge = (probability) => {
    let variant = 'secondary';
    if (probability === 'High') variant = 'danger';
    if (probability === 'Medium') variant = 'warning';
    if (probability === 'Low') variant = 'success';

    return <span className={`badge bg-${variant}`}>{probability}</span>;
  };

  const getStatusBadge = (status) => {
    let variant = 'secondary';
    if (status === 'Open') variant = 'danger';
    if (status === 'Monitoring') variant = 'primary';
    if (status === 'Mitigated') variant = 'warning';
    if (status === 'Resolved') variant = 'success';
    if (status === 'Closed') variant = 'dark';

    return <span className={`badge bg-${variant}`}>{status}</span>;
  };

  const calculateRiskScore = (probability, impact) => {
    const probScore = probability === 'Low' ? 1 : probability === 'Medium' ? 2 : 3;
    const impactScore = impact === 'Low' ? 1 : impact === 'Medium' ? 2 : impact === 'High' ? 3 : 4;

    return probScore * impactScore;
  };

  const getRiskLevel = (score) => {
    if (score >= 9) return { level: 'Extreme', class: 'danger' };
    if (score >= 6) return { level: 'High', class: 'warning' };
    if (score >= 3) return { level: 'Medium', class: 'info' };
    return { level: 'Low', class: 'success' };
  };

  // Add Risk Modal
  const AddRiskModal = () => {
    return (
      <div className={`modal fade ${showAddRiskModal ? 'show' : ''}`} style={{ display: showAddRiskModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Risk</h5>
              <button type="button" className="btn-close" onClick={() => setShowAddRiskModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      value={newRisk.project}
                      onChange={(e) => setNewRisk({ ...newRisk, project: e.target.value })}
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
                    <label className="form-label">Owner</label>
                    <select
                      className="form-select"
                      value={newRisk.owner}
                      onChange={(e) => setNewRisk({ ...newRisk, owner: e.target.value })}
                      required
                    >
                      <option value="">Select Owner</option>
                      {teamMembers.map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Probability</label>
                    <select
                      className="form-select"
                      value={newRisk.probability}
                      onChange={(e) => setNewRisk({ ...newRisk, probability: e.target.value })}
                      required
                    >
                      {probabilityLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Impact</label>
                    <select
                      className="form-select"
                      value={newRisk.impact}
                      onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value })}
                      required
                    >
                      {impactLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {newRisk.probability && newRisk.impact && (
                <div className="row mb-3">
                  <div className="col-12">
                    <div className={`alert alert-${getRiskLevel(calculateRiskScore(newRisk.probability, newRisk.impact)).class}`}>
                      <strong>Risk Level: </strong>
                      {getRiskLevel(calculateRiskScore(newRisk.probability, newRisk.impact)).level}
                      <strong> (Score: {calculateRiskScore(newRisk.probability, newRisk.impact)})</strong>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      // value={newRisk.description}
                      // onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                      placeholder="Describe the risk in detail..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Mitigation Strategy</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      // value={newRisk.mitigation}
                      // onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
                      placeholder="Describe how this risk can be mitigated..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddRiskModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleAddRisk}>Add Risk</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // View Modal
  const ViewModal = () => {
    if (!currentRisk) return null;

    const riskScore = calculateRiskScore(currentRisk.probability, currentRisk.impact);
    const riskLevel = getRiskLevel(riskScore);

    return (
      <div className={`modal fade ${showViewModal ? 'show' : ''}`} style={{ display: showViewModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Risk Details: {currentRisk.riskId}</h5>
              <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className={`alert alert-${riskLevel.class} mb-4`}>
                <h5 className="alert-heading">Risk Level: {riskLevel.level} (Score: {riskScore})</h5>
                <p className="mb-0">Probability: {currentRisk.probability} | Impact: {currentRisk.impact}</p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h6>Risk Information</h6>
                  <p><strong>Risk ID:</strong> {currentRisk.riskId}</p>
                  <p><strong>Project:</strong> {currentRisk.project}</p>
                  <p><strong>Status:</strong> {getStatusBadge(currentRisk.status)}</p>
                  <p><strong>Owner:</strong> {currentRisk.owner}</p>
                </div>
                <div className="col-md-6">
                  <h6>Timeline</h6>
                  <p><strong>Created Date:</strong> {currentRisk.createdDate}</p>
                  <p><strong>Last Updated:</strong> {currentRisk.lastUpdated}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <h6>Description</h6>
                  <div className="border p-3 bg-light">
                    {currentRisk.description}
                  </div>
                </div>
              </div>
              {currentRisk.mitigation && (
                <div className="row mt-3">
                  <div className="col-12">
                    <h6>Mitigation Strategy</h6>
                    <div className="border p-3 bg-light">
                      {currentRisk.mitigation}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(currentRisk); }}>Edit Risk</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal
  const EditModal = () => {
    if (!currentRisk) return null;

    const riskScore = calculateRiskScore(currentRisk.probability, currentRisk.impact);
    const riskLevel = getRiskLevel(riskScore);

    return (
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Risk: {currentRisk.riskId}</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className={`alert alert-${riskLevel.class} mb-4`}>
                <h5 className="alert-heading">Risk Level: {riskLevel.level} (Score: {riskScore})</h5>
                <p className="mb-0">Probability: {currentRisk.probability} | Impact: {currentRisk.impact}</p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      value={currentRisk.project}
                      onChange={(e) => setCurrentRisk({ ...currentRisk, project: e.target.value })}
                    >
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Owner</label>
                    <select
                      className="form-select"
                      value={currentRisk.owner}
                      onChange={(e) => setCurrentRisk({ ...currentRisk, owner: e.target.value })}
                    >
                      {teamMembers.map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Probability</label>
                    <select
                      className="form-select"
                      value={currentRisk.probability}
                      onChange={(e) => setCurrentRisk({ ...currentRisk, probability: e.target.value })}
                    >
                      {probabilityLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Impact</label>
                    <select
                      className="form-select"
                      value={currentRisk.impact}
                      onChange={(e) => setCurrentRisk({ ...currentRisk, impact: e.target.value })}
                    >
                      {impactLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={currentRisk.status}
                      onChange={(e) => setCurrentRisk({ ...currentRisk, status: e.target.value })}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      // value={currentRisk.description}
                      // onChange={(e) => setCurrentRisk({ ...currentRisk, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Mitigation Strategy</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      // value={currentRisk.mitigation}
                      // onChange={(e) => setCurrentRisk({ ...currentRisk, mitigation: e.target.value })}
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
      <div className={`modal-backdrop fade ${showAddRiskModal || showViewModal || showEditModal ? 'show' : ''}`}
        style={{ display: showAddRiskModal || showViewModal || showEditModal ? 'block' : 'none' }}></div>

      <div className="row align-items-center mb-4">
        {/* Heading */}
        <div className="col-12 col-md-6">
          <h2 className="mb-3 mb-md-0">Risk Management</h2>
        </div>

        {/* Button */}
        <div className="col-12 col-md-6 text-md-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddRiskModal(true)}
          >
            <i className="bi bi-plus-circle"></i> Add Risk
          </button>
        </div>
      </div>

      {/* Action buttons and filters */}
      <div className="row mb-4">

        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search risks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-2">
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
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={impactFilter}
            onChange={(e) => setImpactFilter(e.target.value)}
          >
            <option value="All">All Impacts</option>
            {impactLevels.map(impact => (
              <option key={impact} value={impact}>{impact}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={probabilityFilter}
            onChange={(e) => setProbabilityFilter(e.target.value)}
          >
            <option value="All">All Probabilities</option>
            {probabilityLevels.map(probability => (
              <option key={probability} value={probability}>{probability}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Risks Table */}
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Risk ID</th>
                  <th>Project</th>
                  <th style={{ minWidth: "200px" }}>Description</th>
                  <th>Probability</th>
                  <th>Impact</th>
                  <th>Risk Level</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th style={{ minWidth: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRisks.length > 0 ? (
                  filteredRisks.map((risk) => {
                    const score = calculateRiskScore(risk.probability, risk.impact);
                    const level = getRiskLevel(score);

                    return (
                      <tr key={risk.id}>
                        <td className="fw-bold">{risk.riskId}</td>
                        <td>{risk.project}</td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                          title={risk.description}
                        >
                          {risk.description}
                        </td>
                        <td>{getProbabilityBadge(risk.probability)}</td>
                        <td>{getImpactBadge(risk.impact)}</td>
                        <td>
                          <span className={`badge bg-${level.class}`}>
                            {level.level} ({score})
                          </span>
                        </td>
                        <td>{getStatusBadge(risk.status)}</td>
                        <td>{risk.owner}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            <button
                              className="btn btn-sm text-primary"
                              onClick={() => handleView(risk)}
                              title="View Risk"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm text-success"
                              onClick={() => handleEdit(risk)}
                              title="Edit Risk"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm text-danger"
                              onClick={() => handleDelete(risk.id)}
                              title="Delete Risk"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No risks found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/* Risk Matrix Visualization */}
   <div className="row mt-3">
  <div className="col">
    <h4 className="mb-3">Risk Matrix</h4>
    <div className="card">
      <div className="card-body">
        <div className="risk-matrix table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th
                  scope="col"
                  style={{ minWidth: "150px" }}
                  className="fw-bold"
                >
                  Probability / Impact
                </th>
                {impactLevels.map((impact) => (
                  <th
                    key={impact}
                    scope="col"
                    style={{ minWidth: "120px" }}
                    className="fw-bold"
                  >
                    {impact}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {probabilityLevels.map((probability) => (
                <tr key={probability}>
                  <th scope="row" className="fw-semibold">
                    {probability}
                  </th>
                  {impactLevels.map((impact) => {
                    const score = calculateRiskScore(probability, impact);
                    const level = getRiskLevel(score);
                    const count = risks.filter(
                      (r) => r.probability === probability && r.impact === impact
                    ).length;

                    return (
                      <td
                        key={`${probability}-${impact}`}
                        className={`bg-${level.class}-subtle p-2`}
                        style={{ minWidth: "140px" }}
                      >
                        <div className="fw-bold">{level.level}</div>
                        <div className="small">Score: {score}</div>
                        {count > 0 && (
                          <span className="badge bg-dark mt-1">
                            {count} risk(s)
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Modals */}
      <AddRiskModal />
      <ViewModal />
      <EditModal />
    </div>
  );
};

export default ProjectManagerRisks;