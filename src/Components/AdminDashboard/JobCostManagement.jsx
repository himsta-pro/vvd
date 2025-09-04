import React, { useState } from 'react';
import {
  BsCurrencyDollar,
  BsCalculator,
  BsArrowUp,
  BsCheckCircle,
  BsSearch,
  BsFilter,
  BsEye,
  BsPencil,
  BsX,
} from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobCostManagement = () => {
  // Modal States
  const [showNewJob, setShowNewJob] = useState(false);
  const [showEditJob, setShowEditJob] = useState(false);
  const [showViewJob, setShowViewJob] = useState(false);
  const [showPriceDatabase, setShowPriceDatabase] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Handle Modals
  const handleShowNewJob = () => setShowNewJob(true);
  const handleCloseNewJob = () => setShowNewJob(false);

  const handleShowEditJob = (job) => {
    setSelectedJob(job);
    setShowEditJob(true);
  };
  const handleCloseEditJob = () => setShowEditJob(false);

  const handleShowViewJob = (job) => {
    setSelectedJob(job);
    setShowViewJob(true);
  };
  const handleCloseViewJob = () => setShowViewJob(false);

  const handleShowPriceDatabase = () => setShowPriceDatabase(true);
  const handleClosePriceDatabase = () => setShowPriceDatabase(false);

  // Mock Data
  const jobCosts = [
    {
      id: 'JC-001',
      project: 'Swimming Pool Construction',
      task: 'Excavation',
      resource: 'Ahmed Al-Rashid',
      projectCode: 'CON-001',
      estimatedCost: '$15,000',
      labor: '$8,000',
      material: '$6,000',
      overhead: '$2,200',
      actualCost: '$16,200',
      variance: '$1,200',
      varianceType: 'under',
      status: 'Completed',
    },
    {
      id: 'JC-002',
      project: 'Swimming Pool Construction',
      task: 'Pool Shell Construction',
      resource: 'Construction Team A',
      projectCode: 'CON-001',
      estimatedCost: '$45,000',
      labor: '$25,000',
      material: '$15,000',
      overhead: '$2,500',
      actualCost: '$42,500',
      variance: '$2,500',
      varianceType: 'over',
      status: 'In Progress',
    },
    {
      id: 'JC-003',
      project: 'Landscape Design',
      task: 'Site Preparation',
      resource: 'Landscape Team',
      projectCode: 'CON-002',
      estimatedCost: '$12,000',
      labor: '$7,000',
      material: '$4,000',
      overhead: '$1,000',
      actualCost: '-',
      variance: '-',
      varianceType: null,
      status: 'Estimated',
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="h3 mb-1 fw-bold">Job Cost Management</h1>
          <p className="text-muted mb-0">
            Track project costs, manage budgets, and analyze cost variances.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-outline-secondary px-3 py-2 rounded d-flex align-items-center"
            onClick={handleShowPriceDatabase}
          >
            <BsCalculator size={16} className="me-1" />
            <span>Price Database</span>
          </button>
          <button
            className="btn btn-primary px-3 py-2 rounded d-flex align-items-center"
            onClick={handleShowNewJob}
          >
            <span className="me-1 fw-bold">+</span>
            <span>New Job Cost</span>
          </button>
        </div>
      </div>


      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {/* Total Estimated */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 p-3 h-100 hover-shadow bg-primary bg-opacity-10 text-primary">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <BsCurrencyDollar size={22} className="text-primary" />
                </div>
              </div>
              <div>
                <small className="text-primary">Total Estimated</small>
                <div className="fs-5 fw-bold text-primary">$72,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Actual */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 p-3 h-100 hover-shadow bg-success bg-opacity-10 text-success">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <BsCalculator size={22} className="text-success" />
                </div>
              </div>
              <div>
                <small className="text-success">Total Actual</small>
                <div className="fs-5 fw-bold text-success">$58,700</div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Variance */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 p-3 h-100 hover-shadow bg-info bg-opacity-10 text-info">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <BsArrowUp size={22} className="text-info" />
                </div>
              </div>
              <div>
                <small className="text-info">Total Variance</small>
                <div className="fs-5 fw-bold text-info">$13,300 Under</div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 p-3 h-100 hover-shadow bg-warning bg-opacity-10 text-warning">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-flex align-items-center justify-content-center">
                  <BsCheckCircle size={22} className="text-warning" />
                </div>
              </div>
              <div>
                <small className="text-warning">Completed Jobs</small>
                <div className="fs-5 fw-bold text-warning">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="card shadow-sm mb-4 border">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <label className="form-label mb-1 small">Search Job Costs</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <BsSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by project, task, or resource..."
                />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label mb-1 small">Status Filter</label>
              <div className="input-group">
                <select className="form-select">
                  <option>All Statuses</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Estimated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle text-nowrap">
            <thead className="bg-light">
              <tr>
                <th>JOB ID</th>
                <th>PROJECT & TASK</th>
                <th>RESOURCE</th>
                <th>ESTIMATED COST</th>
                <th>ACTUAL COST</th>
                <th>VARIANCE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {jobCosts.map((job) => (
                <tr key={job.id}>
                  <td className="text-primary fw-bold">{job.id}</td>
                  <td>
                    <div className="fw-medium">{job.project}</div>
                    <small className="text-muted">{job.task}</small>
                    <div className="text-muted small">Project: {job.projectCode}</div>
                  </td>
                  <td>{job.resource}</td>
                  <td>
                    <div className="fw-bold">{job.estimatedCost}</div>
                    <small className="text-muted">
                      L: {job.labor} | M: {job.material} | O: {job.overhead}
                    </small>
                  </td>
                  <td>
                    <div className="fw-bold">{job.actualCost}</div>
                  </td>
                  <td>
                    <div
                      className={`fw-bold ${job.varianceType === "over" ? "text-danger" : "text-success"
                        }`}
                    >
                      {job.variance}
                    </div>
                    {job.varianceType && (
                      <div className="text-muted small">
                        <span
                          className={
                            job.varianceType === "over"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {job.varianceType === "over" ? "↑" : "↓"}
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill px-2 py-1 text-xs ${job.status === "Completed"
                          ? "bg-warning text-dark"
                          : job.status === "In Progress"
                            ? "bg-info text-white"
                            : "bg-secondary text-white"
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn text-primary btn-sm me-1"
                      onClick={() => handleShowViewJob(job)}
                    >
                      <BsEye size={14} />
                    </button>
                    <button
                      className="btn text-success btn-sm"
                      onClick={() => handleShowEditJob(job)}
                    >
                      <BsPencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Price Database Modal */}
      <div
        className={`modal fade ${showPriceDatabase ? 'show' : ''}`}
        style={{ display: showPriceDatabase ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Material & Labour Price Database</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClosePriceDatabase}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-4">
                {/* Material Prices */}
                <div className="col-md-6">
                  <h6 className="mb-3">Material Prices</h6>
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>ITEM</th>
                          <th>PRICE (AED)</th>
                          <th>CATEGORY</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Concrete (m³)</td>
                          <td className="fw-bold">350</td>
                          <td className="text-muted">Construction</td>
                        </tr>
                        <tr>
                          <td>Steel Rebar (ton)</td>
                          <td className="fw-bold">2800</td>
                          <td className="text-muted">Construction</td>
                        </tr>
                        <tr>
                          <td>Pool Tiles (m³)</td>
                          <td className="fw-bold">85</td>
                          <td className="text-muted">Finishing</td>
                        </tr>
                        <tr>
                          <td>Pool Equipment Set</td>
                          <td className="fw-bold">15000</td>
                          <td className="text-muted">Equipment</td>
                        </tr>
                        <tr>
                          <td>Landscape Plants</td>
                          <td className="fw-bold">45</td>
                          <td className="text-muted">Landscaping</td>
                        </tr>
                        <tr>
                          <td>Irrigation System (m)</td>
                          <td className="fw-bold">25</td>
                          <td className="text-muted">Landscaping</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Labour Rates */}
                <div className="col-md-6">
                  <h6 className="mb-3">Labour Rates</h6>
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>ROLE</th>
                          <th>RATE (AED)</th>
                          <th>UNIT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Site Supervisor</td>
                          <td className="fw-bold">150</td>
                          <td className="text-muted">per day</td>
                        </tr>
                        <tr>
                          <td>Skilled Worker</td>
                          <td className="fw-bold">120</td>
                          <td className="text-muted">per day</td>
                        </tr>
                        <tr>
                          <td>General Laborer</td>
                          <td className="fw-bold">80</td>
                          <td className="text-muted">per day</td>
                        </tr>
                        <tr>
                          <td>Equipment Operator</td>
                          <td className="fw-bold">180</td>
                          <td className="text-muted">per day</td>
                        </tr>
                        <tr>
                          <td>Specialist Technician</td>
                          <td className="fw-bold">200</td>
                          <td className="text-muted">per day</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClosePriceDatabase}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Job Cost Modal */}
      <div
        className={`modal fade ${showNewJob ? 'show' : ''}`}
        style={{ display: showNewJob ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Job Cost</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseNewJob}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Task</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Resource</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Project Code</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Estimated Labor Cost</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Estimated Material Cost</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Overhead Cost</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select">
                    <option>Estimated</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseNewJob}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseNewJob}
              >
                Create Job Cost
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Job Cost Modal */}
      <div
        className={`modal fade ${showEditJob ? 'show' : ''}`}
        style={{ display: showEditJob ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Job Cost - {selectedJob?.id}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseEditJob}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <input type="text" className="form-control" defaultValue={selectedJob?.project} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Task</label>
                    <input type="text" className="form-control" defaultValue={selectedJob?.task} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Resource</label>
                    <input type="text" className="form-control" defaultValue={selectedJob?.resource} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Project Code</label>
                    <input type="text" className="form-control" defaultValue={selectedJob?.projectCode} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Actual Labor Cost</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Actual Material Cost</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Actual Overhead Cost</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" defaultValue={selectedJob?.status}>
                    <option>Estimated</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseEditJob}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseEditJob}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Job Cost Modal */}
      <div
        className={`modal fade ${showViewJob ? 'show' : ''}`}
        style={{ display: showViewJob ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Job Cost Details - {selectedJob?.id}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseViewJob}
              ></button>
            </div>
            <div className="modal-body">
              {selectedJob && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Project</h6>
                    <p>{selectedJob.project}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Task</h6>
                    <p>{selectedJob.task}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Resource</h6>
                    <p>{selectedJob.resource}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Project Code</h6>
                    <p>{selectedJob.projectCode}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Estimated Cost</h6>
                    <p>{selectedJob.estimatedCost}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Actual Cost</h6>
                    <p>{selectedJob.actualCost}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Variance</h6>
                    <p className={selectedJob.varianceType === 'over' ? 'text-danger' : 'text-success'}>
                      {selectedJob.variance}
                    </p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6 className="text-muted">Status</h6>
                    <span
                      className={`badge rounded-pill px-2 py-1 text-xs ${selectedJob.status === 'Completed'
                        ? 'bg-warning text-dark'
                        : selectedJob.status === 'In Progress'
                          ? 'bg-info text-white'
                          : 'bg-secondary text-white'
                        }`}
                    >
                      {selectedJob.status}
                    </span>
                  </div>
                  <div className="col-12 mt-4">
                    <h6 className="border-bottom pb-2">Cost Breakdown</h6>
                    <div className="row">
                      <div className="col-md-4">
                        <p className="mb-1">Labor: {selectedJob.labor}</p>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-1">Material: {selectedJob.material}</p>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-1">Overhead: {selectedJob.overhead}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseViewJob}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {(showNewJob || showEditJob || showViewJob || showPriceDatabase) && (
        <div
          className="modal-backdrop show"
          style={{ display: 'block' }}
        ></div>
      )}
    </div>
  );
};

export default JobCostManagement;