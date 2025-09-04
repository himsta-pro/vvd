import React, { useState } from 'react';
import {
  FaFileContract,
  FaDollarSign,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaEye,
  FaEdit,
  FaTimes,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContractManagement = () => {
  // Mock Data
  const [contracts, setContracts] = useState([
    {
      id: 'CON-001',
      client: 'Emirates Properties',
      project: 'Landscape Design - Commercial Complex',
      projectCode: 'RFQ-002',
      value: '$89,500',
      signedDate: '2024-01-15',
      startDate: '2024-02-01',
      endDate: '2024-06-30',
      duration: '2024-02-01 - 2024-06-30',
      overdue: '424 days overdue',
      status: 'Active',
      manager: 'Ahmed Al-Rashid',
      clientRep: 'Mohammed Al-Fayed - m.alfayed@emirates.com - +971 50 123 4567',
      paymentTerms: '30% advance, 40% on completion of phase 1, 30% on final delivery'
    },
    {
      id: 'CON-002',
      client: 'Al Mansouri Development',
      project: 'Swimming Pool Construction - Villa Project',
      projectCode: 'RFQ-001',
      value: '$125,000',
      signedDate: '2024-01-10',
      startDate: '2024-01-20',
      endDate: '2024-05-15',
      duration: '2024-01-20 - 2024-05-15',
      overdue: '470 days overdue',
      status: 'Active',
      manager: 'Sarah Mohammed',
      clientRep: 'Fatima Al-Mansouri - f.mansouri@almansouri.com - +971 55 987 6543',
      paymentTerms: '40% advance, 30% after excavation, 30% upon completion'
    },
    {
      id: 'CON-003',
      client: 'Dubai Hills Estate',
      project: 'Site Survey - Residential Project',
      projectCode: 'RFQ-005',
      value: '$67,800',
      signedDate: '2023-12-15',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      duration: '2024-01-01 - 2024-03-31',
      overdue: null,
      status: 'Completed',
      manager: 'Omar Hassan',
      clientRep: 'Khalid Al-Jaber - k.jaber@dubaihills.com - +971 52 456 7890',
      paymentTerms: '50% advance, 50% on delivery of final report'
    },
  ]);

  // Modal States
  const [showNewModal, setShowNewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    projectId: '',
    contractValue: '',
    signedDate: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    clientRepInfo: '',
    paymentTerms: '',
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit for New Contract
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contract Created Successfully!');
    setShowNewModal(false);
    setFormData({
      projectId: '',
      contractValue: '',
      signedDate: '',
      startDate: '',
      endDate: '',
      projectManager: '',
      clientRepInfo: '',
      paymentTerms: '',
    });
  };

  // Handle Edit Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedContract) {
      const updatedContracts = contracts.map(contract =>
        contract.id === selectedContract.id ? { ...selectedContract } : contract
      );
      setContracts(updatedContracts);
      setShowEditModal(false);
      alert('Contract Updated Successfully!');
    }
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedContract(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open View Modal
  const openViewModal = (contract) => {
    setSelectedContract(contract);
    setShowViewModal(true);
  };

  // Open Edit Modal
  const openEditModal = (contract) => {
    setSelectedContract({ ...contract });
    setShowEditModal(true);
  };

  // Close All Modals
  const handleClose = () => {
    setShowNewModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setFormData({
      projectId: '',
      contractValue: '',
      signedDate: '',
      startDate: '',
      endDate: '',
      projectManager: '',
      clientRepInfo: '',
      paymentTerms: '',
    });
  };

  return (
    <div className="" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="h3 fw-bold">Contract Management</h1>
          <p className="text-muted mb-0">
            Manage your project contracts and track their progress.
          </p>
        </div>
        <button
          className="btn btn-primary px-3 py-2 rounded-1 d-flex align-items-center"
          onClick={() => setShowNewModal(true)}
        >
          <i className="fas fa-plus me-2"></i> New Contract
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card border-light shadow-sm p-3 h-100 bg-primary bg-opacity-10 text-primary">
            <div className="d-flex align-items-center">
              <div className="me-3 text-primary">
                <FaFileContract size={24} />
              </div>
              <div>
                <small className="text-mutprimaryed">Total Contracts</small>
                <div className="fs-5 fw-bold">3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card border-light shadow-sm p-3 h-100 bg-success bg-opacity-10 text-success">
            <div className="d-flex align-items-center">
              <div className="me-3 text-success">
                <FaDollarSign size={24} />
              </div>
              <div>
                <small className="text-success">Total Value</small>
                <div className="fs-5 fw-bold">$282,300</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card border-light shadow-sm p-3 h-100 bg-warning bg-opacity-10 text-warning">
            <div className="d-flex align-items-center">
              <div className="me-3 text-warning">
                <FaCalendarAlt size={24} />
              </div>
              <div>
                <small className="text-warning">Active Contracts</small>
                <div className="fs-5 fw-bold">2</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card border-light shadow-sm p-3 h-100 bg-info bg-opacity-10 text-info">
            <div className="d-flex align-items-center">
              <div className="me-3 text-info">
                <FaUser size={24} />
              </div>
              <div>
                <small className="text-info">Completed</small>
                <div className="fs-5 fw-bold">1</div>
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
              <label className="form-label mb-1 small">Search Contracts</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by client, project, or manager..."
                />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label mb-1 small">Status Filter</label>
              <div className="input-group">
                <select className="form-select">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>CONTRACT</th>
                <th>PROJECT</th>
                <th>VALUE</th>
                <th>DURATION</th>
                <th>STATUS</th>
                <th>MANAGER</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={index}>
                  <td>
                    <div className="fw-bold text-primary">{contract.id}</div>
                    <small className="text-muted">{contract.client}</small>
                  </td>
                  <td>
                    <div className="fw-medium">{contract.project}</div>
                    <small className="text-muted">Project: {contract.projectCode}</small>
                  </td>
                  <td className="fw-bold">{contract.value}</td>
                  <td>
                    <div>{contract.duration}</div>
                    {contract.overdue && (
                      <small className="text-danger">{contract.overdue}</small>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill px-2 py-1 ${contract.status === 'Active'
                        ? 'text-success bg-success-subtle'
                        : contract.status === 'Completed'
                          ? 'text-info bg-info-subtle'
                          : 'text-danger bg-danger-subtle'
                        }`}
                    >
                      {contract.status}
                    </span>
                  </td>
                  <td>{contract.manager}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm p-0 border-0 bg-transparent text-primary"
                        onClick={() => openViewModal(contract)}
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        className="btn btn-sm p-0 border-0 bg-transparent text-success"
                        onClick={() => openEditModal(contract)}
                      >
                        <FaEdit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Contract Modal */}
     <div
      className={`modal fade ${showNewModal ? "show" : ""}`}
      style={{
        display: showNewModal ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">New Contract</h5>
            <button type="button" className="btn-close" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Project ID */}
                <div className="col-md-6">
                  <label className="form-label">Project ID (Link to RFQ)</label>
                  <select
                    className="form-select"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Project</option>
                    <option value="RFQ-001">RFQ-001 - Villa Project</option>
                    <option value="RFQ-002">RFQ-002 - Commercial Complex</option>
                    <option value="RFQ-005">RFQ-005 - Residential Project</option>
                  </select>
                </div>

                {/* Contract Value */}
                <div className="col-md-6">
                  <label className="form-label">Contract Value</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contractValue"
                    value={formData.contractValue}
                    onChange={handleChange}
                    placeholder="Enter contract value"
                    required
                  />
                </div>

                {/* Signed Date */}
                <div className="col-md-6">
                  <label className="form-label">Signed Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="signedDate"
                    value={formData.signedDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Start Date */}
                <div className="col-md-6">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* End Date */}
                <div className="col-md-6">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Project Manager */}
                <div className="col-md-6">
                  <label className="form-label">Project Manager</label>
                  <input
                    type="text"
                    className="form-control"
                    name="projectManager"
                    value={formData.projectManager}
                    onChange={handleChange}
                    placeholder="Enter project manager name"
                    required
                  />
                </div>

                {/* Client Representative Info */}
                <div className="col-md-12">
                  <label className="form-label">Client Representative Info</label>
                  <textarea
                    className="form-control"
                    name="clientRepInfo"
                    value={formData.clientRepInfo}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter client representative details..."
                  ></textarea>
                </div>

                {/* Payment Terms */}
                <div className="col-md-12">
                  <label className="form-label">Payment Terms</label>
                  <textarea
                    className="form-control"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter payment terms..."
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit(formData)}
            >
              Create Contract
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* View Contract Modal */}
      <div
        className={`modal fade ${showViewModal ? 'show' : ''}`}
        style={{ display: showViewModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contract Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {selectedContract && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Contract ID</label>
                    <p>{selectedContract.id}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Client</label>
                    <p>{selectedContract.client}</p>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-bold">Project</label>
                    <p>{selectedContract.project}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Project Code</label>
                    <p>{selectedContract.projectCode}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Contract Value</label>
                    <p>{selectedContract.value}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Start Date</label>
                    <p>{selectedContract.startDate}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">End Date</label>
                    <p>{selectedContract.endDate}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Status</label>
                    <p>
                      <span
                        className={`badge rounded-pill px-2 py-1 ${selectedContract.status === 'Active'
                          ? 'text-success bg-success-subtle'
                          : selectedContract.status === 'Completed'
                            ? 'text-info bg-info-subtle'
                            : 'text-danger bg-danger-subtle'
                          }`}
                      >
                        {selectedContract.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Project Manager</label>
                    <p>{selectedContract.manager}</p>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-bold">Client Representative</label>
                    <p>{selectedContract.clientRep}</p>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-bold">Payment Terms</label>
                    <p>{selectedContract.paymentTerms}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Contract Modal */}
      <div
        className={`modal fade ${showEditModal ? 'show' : ''}`}
        style={{ display: showEditModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Contract</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {selectedContract && (
                <form onSubmit={handleEditSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Contract ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedContract.id}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Client</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedContract.client}
                        disabled
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Project</label>
                      <input
                        type="text"
                        className="form-control"
                        name="project"
                        value={selectedContract.project}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Project Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="projectCode"
                        value={selectedContract.projectCode}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Contract Value</label>
                      <input
                        type="text"
                        className="form-control"
                        name="value"
                        value={selectedContract.value}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Start Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="startDate"
                          value={selectedContract.startDate}
                          onChange={handleEditChange}
                        />
                        <span className="input-group-text">
                          <FaCalendarAlt />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="endDate"
                          value={selectedContract.endDate}
                          onChange={handleEditChange}
                        />
                        <span className="input-group-text">
                          <FaCalendarAlt />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={selectedContract.status}
                        onChange={handleEditChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Project Manager</label>
                      <input
                        type="text"
                        className="form-control"
                        name="manager"
                        value={selectedContract.manager}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Client Representative Info</label>
                      <textarea
                        className="form-control"
                        name="clientRep"
                        value={selectedContract.clientRep}
                        onChange={handleEditChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Payment Terms</label>
                      <textarea
                        className="form-control"
                        name="paymentTerms"
                        value={selectedContract.paymentTerms}
                        onChange={handleEditChange}
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Update Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractManagement;