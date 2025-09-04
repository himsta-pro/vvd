import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faDownload, faCalendarAlt, faMapMarkerAlt, faTimes, faFilePdf, faFileExcel, faFileWord, faPrint } from "@fortawesome/free-solid-svg-icons";

// Import CSS for react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

const RFQManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);

  // State for new RFQ form
  const [newRfq, setNewRfq] = useState({
    client: '',
    project: '',
    date: '',
    location: '',
    value: '',
    scopeSummary: '',
  });

  const [rfqs, setRfqs] = useState([
    {
      id: 'RFQ-001',
      status: 'Submitted',
      client: 'Al Mansouri Development',
      project: 'Swimming Pool Construction - Villa Project',
      date: '2024-01-15',
      location: 'Dubai Hills Estate',
      value: '$125,000',
      scopeSummary: 'Design and construction of luxury swimming pools for 15 villas, including filtration systems and water features.',
      contactPerson: 'Omar Al-Mansouri',
      contactEmail: 'omar@almansouridev.com',
      contactPhone: '+971 50 123 4567',
      deadline: '2024-02-15',
      notes: 'Client is particularly interested in eco-friendly filtration systems.'
    },
    {
      id: 'RFQ-002',
      status: 'Won',
      client: 'Emirates Properties',
      project: 'Landscape Design - Commercial Complex',
      date: '2024-01-12',
      location: 'Business Bay',
      value: '$89,500',
      scopeSummary: 'Complete landscape design for a new commercial complex including green spaces, walkways, and water features.',
      contactPerson: 'Sarah Johnson',
      contactEmail: 's.johnson@emiratesproperties.ae',
      contactPhone: '+971 55 987 6543',
      deadline: '2024-02-10',
      notes: 'Project won with a 10% discount offer. Client very satisfied with our sustainable approach.'
    },
    {
      id: 'RFQ-003',
      status: 'Lost',
      client: 'Dubai Hills Estate',
      project: 'Site Survey - Residential Project',
      date: '2024-01-10',
      location: 'Mohammed Bin Rashid City',
      value: '$67,800',
      scopeSummary: 'Comprehensive site survey for a new residential development including soil testing and topographic mapping.',
      contactPerson: 'Ahmed Hassan',
      contactEmail: 'a.hassan@dubaihills.com',
      contactPhone: '+971 52 456 7890',
      deadline: '2024-02-05',
      notes: 'Lost to competitor who offered a faster turnaround time.'
    },
  ]);

  // Status badge colors
  const statusColors = {
    Submitted: 'bg-primary text-white',
    Won: 'bg-success text-white',
    Lost: 'bg-danger text-white',
  };

  const filteredRfqs = rfqs.filter((rfq) => {
    const matchesSearch =
      rfq.client.toLowerCase().includes(search.toLowerCase()) ||
      rfq.project.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Statuses' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRfq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRfq(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setNewRfq((prev) => ({
      ...prev,
      date: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  // Handle edit date change
  const handleEditDateChange = (date) => {
    setSelectedRfq(prev => ({
      ...prev,
      date: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  // Create new RFQ
  const handleCreateRfq = () => {
    if (!newRfq.client || !newRfq.date || !newRfq.location || !newRfq.value) {
      alert('Please fill all required fields.');
      return;
    }

    const newId = `RFQ-${String(rfqs.length + 1).padStart(3, '0')}`;
    const newProject = newRfq.project || `${newRfq.client} - ${newRfq.scopeSummary || 'New Project'}`;
    const newValue = newRfq.value;

    const newRfqObj = {
      id: newId,
      status: 'Submitted',
      client: newRfq.client,
      project: newProject,
      date: newRfq.date,
      location: newRfq.location,
      value: newValue,
      scopeSummary: newRfq.scopeSummary,
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      deadline: '',
      notes: ''
    };

    setRfqs([...rfqs, newRfqObj]);
    setNewRfq({
      client: '',
      project: '',
      date: '',
      location: '',
      value: '',
      scopeSummary: '',
    });
    setShowNewModal(false);
  };

  // Update RFQ
  const handleUpdateRfq = () => {
    if (!selectedRfq.client || !selectedRfq.date || !selectedRfq.location || !selectedRfq.value) {
      alert('Please fill all required fields.');
      return;
    }

    const updatedRfqs = rfqs.map(rfq => 
      rfq.id === selectedRfq.id ? {...selectedRfq} : rfq
    );
    
    setRfqs(updatedRfqs);
    setShowEditModal(false);
  };

  // Open View Modal
  const openViewModal = (rfq) => {
    setSelectedRfq(rfq);
    setShowViewModal(true);
  };

  // Open Edit Modal
  const openEditModal = (rfq) => {
    setSelectedRfq({...rfq});
    setShowEditModal(true);
  };

  // Open Download Modal
  const openDownloadModal = (rfq) => {
    setSelectedRfq(rfq);
    setShowDownloadModal(true);
  };

  // Close all modals
  const handleCloseModal = () => {
    setShowNewModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDownloadModal(false);
    setNewRfq({
      client: '',
      project: '',
      date: '',
      location: '',
      value: '',
      scopeSummary: '',
    });
  };

  // Download options
  const downloadOptions = [
    { id: 1, format: 'PDF', icon: faFilePdf, color: 'text-danger' },
    { id: 2, format: 'Excel', icon: faFileExcel, color: 'text-success' },
    { id: 3, format: 'Word', icon: faFileWord, color: 'text-primary' },
    { id: 4, format: 'Print', icon: faPrint, color: 'text-secondary' }
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold">RFQ Management</h1>
          <p className="text-muted small mb-0">
            Manage your Request for Quotations and track proposal submissions.
          </p>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-1"
          onClick={() => setShowNewModal(true)}
        >
          <span>+</span>
          New RFQ
        </button>
      </div>

      {/* Filters Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2">
                  🔍
                </span>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by client or scope..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-12 col-md-3">
              <label className="visually-hidden">Status Filter</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
              >
                <option>All Statuses</option>
                <option>Submitted</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="card shadow-sm">
        {filteredRfqs.length > 0 ? (
          filteredRfqs.map((rfq, idx) => (
            <div
              key={rfq.id}
              className={`p-3 d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 ${
                idx !== filteredRfqs.length - 1 ? "border-bottom border-light" : ""
              }`}
            >
              {/* Left Side */}
              <div className="d-flex align-items-start gap-3 flex-grow-1">
                {/* RFQ Number Circle */}
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <strong>{rfq.id}</strong>
                    <span
                      className={`badge rounded-pill ${statusColors[rfq.status]}`}
                      style={{ fontSize: '0.75rem', padding: '0.35em 0.6em' }}
                    >
                      {rfq.status}
                    </span>
                  </div>
                  <h3 className="h6 mb-1">{rfq.client}</h3>
                  <p className="text-muted small mb-0">{rfq.project}</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="d-flex flex-column align-items-end text-end">
                <div className="text-muted small">
                  <div className="d-flex align-items-center justify-content-end gap-1">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{rfq.date}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end gap-1 mt-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{rfq.location}</span>
                  </div>
                  <div className="fw-bold text-dark mt-1">{rfq.value}</div>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-primary cursor-pointer"
                    style={{ fontSize: "1.1rem" }}
                    title="View"
                    onClick={() => openViewModal(rfq)}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-warning cursor-pointer"
                    style={{ fontSize: "1.1rem" }}
                    title="Edit"
                    onClick={() => openEditModal(rfq)}
                  />
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="text-success cursor-pointer"
                    style={{ fontSize: "1.1rem" }}
                    title="Download"
                    onClick={() => openDownloadModal(rfq)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted p-4">
            No RFQs match your filters.
          </div>
        )}
      </div>

      {/* New RFQ Modal */}
      {showNewModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New RFQ</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Client Name */}
                  <div className="col-md-6">
                    <label className="form-label">Client Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="client"
                      value={newRfq.client}
                      onChange={handleInputChange}
                      placeholder="Enter client name"
                    />
                  </div>

                  {/* RFQ Date */}
                  <div className="col-md-6">
                    <label className="form-label">RFQ Date <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <DatePicker
                        selected={newRfq.date ? new Date(newRfq.date) : null}
                        onChange={handleDateChange}
                        placeholderText="dd-mm-yyyy"
                        className="form-control"
                        dateFormat="dd-MM-yyyy"
                      />
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-md-6">
                    <label className="form-label">Location <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={newRfq.location}
                      onChange={handleInputChange}
                      placeholder="Enter location"
                    />
                  </div>

                  {/* Proposal Value */}
                  <div className="col-md-6">
                    <label className="form-label">Proposal Value <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="value"
                      value={newRfq.value}
                      onChange={handleInputChange}
                      placeholder="e.g. $100,000"
                    />
                  </div>

                  {/* Project Name */}
                  <div className="col-md-12">
                    <label className="form-label">Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="project"
                      value={newRfq.project}
                      onChange={handleInputChange}
                      placeholder="Enter project name"
                    />
                  </div>

                  {/* Scope Summary */}
                  <div className="col-12">
                    <label className="form-label">Scope Summary</label>
                    <textarea
                      className="form-control"
                      name="scopeSummary"
                      value={newRfq.scopeSummary}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Describe the scope of work..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateRfq}
                >
                  Create RFQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View RFQ Modal */}
      {showViewModal && selectedRfq && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">RFQ Details - {selectedRfq.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Client</label>
                    <p>{selectedRfq.client}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Status</label>
                    <p>
                      <span className={`badge ${statusColors[selectedRfq.status]}`}>
                        {selectedRfq.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">RFQ Date</label>
                    <p>{selectedRfq.date}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Location</label>
                    <p>{selectedRfq.location}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Value</label>
                    <p>{selectedRfq.value}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Project</label>
                    <p>{selectedRfq.project}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Scope Summary</label>
                    <p>{selectedRfq.scopeSummary}</p>
                  </div>
                  {selectedRfq.contactPerson && (
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Contact Person</label>
                      <p>{selectedRfq.contactPerson}</p>
                    </div>
                  )}
                  {selectedRfq.contactEmail && (
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Contact Email</label>
                      <p>{selectedRfq.contactEmail}</p>
                    </div>
                  )}
                  {selectedRfq.contactPhone && (
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Contact Phone</label>
                      <p>{selectedRfq.contactPhone}</p>
                    </div>
                  )}
                  {selectedRfq.deadline && (
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Deadline</label>
                      <p>{selectedRfq.deadline}</p>
                    </div>
                  )}
                  {selectedRfq.notes && (
                    <div className="col-12 mb-3">
                      <label className="form-label fw-bold">Notes</label>
                      <p>{selectedRfq.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit RFQ Modal */}
      {showEditModal && selectedRfq && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit RFQ - {selectedRfq.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Client Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="client"
                      value={selectedRfq.client}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="status"
                      value={selectedRfq.status}
                      onChange={handleEditInputChange}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">RFQ Date <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <DatePicker
                        selected={selectedRfq.date ? new Date(selectedRfq.date) : null}
                        onChange={handleEditDateChange}
                        className="form-control"
                        dateFormat="dd-MM-yyyy"
                      />
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Location <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={selectedRfq.location}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Value <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="value"
                      value={selectedRfq.value}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <input
                      type="text"
                      className="form-control"
                      name="project"
                      value={selectedRfq.project}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Person</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contactPerson"
                      value={selectedRfq.contactPerson}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="contactEmail"
                      value={selectedRfq.contactEmail}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contactPhone"
                      value={selectedRfq.contactPhone}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      name="deadline"
                      value={selectedRfq.deadline}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Scope Summary</label>
                    <textarea
                      className="form-control"
                      name="scopeSummary"
                      value={selectedRfq.scopeSummary}
                      onChange={handleEditInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={selectedRfq.notes}
                      onChange={handleEditInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateRfq}
                >
                  Update RFQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download RFQ Modal */}
      {showDownloadModal && selectedRfq && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Download RFQ - {selectedRfq.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted">Select a format to download this RFQ:</p>
                <div className="row g-3">
                  {downloadOptions.map(option => (
                    <div key={option.id} className="col-6">
                      <div 
                        className="card h-100 text-center cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => alert(`Downloading ${selectedRfq.id} as ${option.format}`)}
                      >
                        <div className="card-body py-4">
                          <FontAwesomeIcon 
                            icon={option.icon} 
                            className={`${option.color} mb-2`} 
                            size="2x" 
                          />
                          <h6 className="card-title mb-0">{option.format}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQManagement;