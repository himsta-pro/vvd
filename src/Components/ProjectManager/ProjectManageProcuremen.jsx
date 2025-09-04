import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectManageProcurement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete', 'create'
  const [requests, setRequests] = useState([
    {
      id: 'MR-001',
      project: 'Website Redesign',
      material: 'Laptops',
      qty: 5,
      status: 'Approved',
      details: {
        requestedBy: 'John Smith',
        requestDate: '2025-08-15',
        requiredDate: '2025-09-10',
        notes: 'Need high-performance laptops for the development team',
        specifications: '16GB RAM, 512GB SSD, Intel i7 or equivalent'
      }
    },
    {
      id: 'MR-002',
      project: 'Mobile App Development',
      material: 'Testing Devices',
      qty: 8,
      status: 'Routing',
      details: {
        requestedBy: 'Sarah Johnson',
        requestDate: '2025-08-20',
        requiredDate: '2025-09-15',
        notes: 'Various iOS and Android devices for testing',
        specifications: 'Latest iPhone and Android models'
      }
    }
  ]);

  // Sample data for dropdowns
  const projectOptions = ['Website Redesign', 'Mobile App Development', 'Office Renovation', 'Product Launch'];
  const materialOptions = ['Laptops', 'Testing Devices', 'Desks', 'Monitors', 'Servers', 'Network Equipment'];

  const statusOptions = ['All Statuses', 'Approved', 'Routing', 'Pending', 'Rejected', 'Completed'];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.material.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleView = (request) => {
    setSelectedRequest(request);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDelete = (request) => {
    setSelectedRequest(request);
    setModalMode('delete');
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedRequest({
      id: `MR-${String(requests.length + 1).padStart(3, '0')}`,
      project: '',
      material: '',
      qty: 1,
      status: 'Pending',
      details: {
        requestedBy: '',
        requestDate: new Date().toISOString().split('T')[0],
        requiredDate: '',
        notes: '',
        specifications: ''
      }
    });
    setModalMode('create');
    setShowModal(true);
  };

  const confirmDelete = () => {
    setRequests(requests.filter(req => req.id !== selectedRequest.id));
    setShowModal(false);
  };

  const handleSave = (updatedRequest) => {
    if (modalMode === 'create') {
      // Add new request
      setRequests([...requests, updatedRequest]);
    } else {
      // Update existing request
      setRequests(requests.map(req => 
        req.id === updatedRequest.id ? updatedRequest : req
      ));
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Approved': 'bg-success',
      'Routing': 'bg-primary',
      'Pending': 'bg-warning',
      'Rejected': 'bg-danger',
      'Completed': 'bg-info'
    };
    
    return <span className={`badge ${statusClasses[status]}`}>{status}</span>;
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Procurement Management</h2>
        <button 
          className="btn btn-primary"
          onClick={handleCreate}
        >
          <i className="bi bi-plus-circle me-2"></i>Request Material
        </button>
      </div>
      
      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-3">
        <strong>{filteredRequests.length} found</strong>
      </div>
      
      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className='table-light'>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.project}</td>
                <td>{request.material}</td>
                <td>{request.qty}</td>
                <td>{getStatusBadge(request.status)}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-link text-primary me-2"
                    onClick={() => handleView(request)}
                    title="View"
                  >
                    <i className="bi bi-eye fs-5"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-link text-warning me-2"
                    onClick={() => handleEdit(request)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil fs-5"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-link text-danger"
                    onClick={() => handleDelete(request)}
                    title="Delete"
                  >
                    <i className="bi bi-trash fs-5"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === 'view' && 'View Material Request'}
                  {modalMode === 'edit' && 'Edit Material Request'}
                  {modalMode === 'create' && 'Create Material Request'}
                  {modalMode === 'delete' && 'Delete Material Request'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {modalMode === 'delete' ? (
                  <div>
                    <p>Are you sure you want to delete material request <strong>{selectedRequest.id}</strong>?</p>
                    <div className="alert alert-warning">
                      This action cannot be undone.
                    </div>
                  </div>
                ) : (
                  <RequestForm 
                    request={selectedRequest} 
                    mode={modalMode}
                    onSave={handleSave}
                    onCancel={() => setShowModal(false)}
                    projectOptions={projectOptions}
                    materialOptions={materialOptions}
                  />
                )}
              </div>
              <div className="modal-footer">
                {modalMode === 'delete' ? (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </>
                ) : modalMode === 'view' ? (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => handleSave(selectedRequest)}
                    >
                      {modalMode === 'create' ? 'Create Request' : 'Save Changes'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

const RequestForm = ({ request, mode, onSave, onCancel, projectOptions, materialOptions }) => {
  const [formData, setFormData] = useState(request || {
    id: '',
    project: '',
    material: '',
    qty: 1,
    status: 'Pending',
    details: {
      requestedBy: '',
      requestDate: new Date().toISOString().split('T')[0],
      requiredDate: '',
      notes: '',
      specifications: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">ID</label>
          <input
            type="text"
            className="form-control"
            value={formData.id}
            disabled
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={mode === 'view'}
          >
            <option value="Pending">Pending</option>
            <option value="Routing">Routing</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Project</label>
          <select
            className="form-select"
            name="project"
            value={formData.project}
            onChange={handleChange}
            disabled={mode === 'view'}
            required
          >
            <option value="">Select Project</option>
            {projectOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Material</label>
          <select
            className="form-select"
            name="material"
            value={formData.material}
            onChange={handleChange}
            disabled={mode === 'view'}
            required
          >
            <option value="">Select Material</option>
            {materialOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            disabled={mode === 'view'}
            min="1"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Required Date</label>
          <input
            type="date"
            className="form-control"
            name="details.requiredDate"
            value={formData.details.requiredDate}
            onChange={handleChange}
            disabled={mode === 'view'}
            required
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Requested By</label>
          <input
            type="text"
            className="form-control"
            name="details.requestedBy"
            value={formData.details.requestedBy}
            onChange={handleChange}
            disabled={mode === 'view'}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Request Date</label>
          <input
            type="date"
            className="form-control"
            name="details.requestDate"
            value={formData.details.requestDate}
            onChange={handleChange}
            disabled={mode === 'view'}
          />
        </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          className="form-control"
          rows="3"
          name="details.notes"
          value={formData.details.notes}
          onChange={handleChange}
          disabled={mode === 'view'}
        ></textarea>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Specifications</label>
        <textarea
          className="form-control"
          rows="3"
          name="details.specifications"
          value={formData.details.specifications}
          onChange={handleChange}
          disabled={mode === 'view'}
        ></textarea>
      </div>
    </form>
  );
};

export default ProjectManageProcurement;