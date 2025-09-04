import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

const Resources = () => {
  const [resources, setResources] = useState([
    { id: 1, name: 'John Smith', role: 'Developer', subcontractor: 'Tech Solutions Inc.', rate: '$85/hr', availability: 'Full-time', assignedTasks: 3 },
    { id: 2, name: 'Sarah Johnson', role: 'Designer', subcontractor: 'Creative Designs', rate: '$75/hr', availability: 'Part-time', assignedTasks: 2 },
    { id: 3, name: 'Michael Brown', role: 'Project Manager', subcontractor: 'In-House', rate: '$95/hr', availability: 'Full-time', assignedTasks: 5 },
    { id: 4, name: 'Emily Davis', role: 'QA Engineer', subcontractor: 'Quality Assurance Co.', rate: '$70/hr', availability: 'Full-time', assignedTasks: 4 },
    { id: 5, name: 'Robert Wilson', role: 'DevOps', subcontractor: 'Cloud Services Ltd.', rate: '$90/hr', availability: 'Contract', assignedTasks: 2 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  useEffect(() => {
    // Initialize Bootstrap modal
    if (showModal) {
      const modalElement = document.getElementById('resourceModal');
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
      
      // Clean up when component unmounts
      return () => {
        modal.hide();
      };
    }
  }, [showModal]);

  const handleAddResource = () => {
    setEditingResource(null);
    setShowModal(true);
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setShowModal(true);
  };

  const handleDeleteResource = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  const handleSaveResource = (resourceData) => {
    if (editingResource) {
      // Update existing resource
      setResources(resources.map(resource =>
        resource.id === editingResource.id ? { ...resourceData, id: editingResource.id } : resource
      ));
    } else {
      // Add new resource
      const newId = Math.max(...resources.map(r => r.id)) + 1;
      setResources([...resources, { ...resourceData, id: newId }]);
    }
    setShowModal(false);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subcontractor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || resource.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roles = ['All', ...new Set(resources.map(resource => resource.role))];

  return (
    <div className="">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h1 className="h3 fw-bold mb-3">Resource Management</h1>
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center mb-3"
          onClick={handleAddResource}
        >
          <FaPlus className="me-2" />
          <span>Add Resource</span>
        </button>
      </div>

{/* Controls */}
<div className="d-flex flex-wrap gap-3 mb-4">
  <div className="flex-grow-1">
    <div className="input-group">
      <span className="input-group-text"><FaSearch /></span>
      <input
        type="text"
        className="form-control"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  <div>
    <div className="input-group">
      <span className="input-group-text"><FaFilter /></span>
      <select
        className="form-select"
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
      >
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </div>
  </div>


</div>

      {/* Resource Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Subcontractor</th>
                  <th>Rate</th>
                  <th>Availability</th>
                  <th>Assigned Tasks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map(resource => (
                  <tr key={resource.id}>
                    <td>{resource.id}</td>
                    <td>{resource.name}</td>
                    <td>{resource.role}</td>
                    <td>{resource.subcontractor}</td>
                    <td>{resource.rate}</td>
                    <td>
                      <span className={`badge ${resource.availability === 'Full-time' ? 'bg-success' :
                        resource.availability === 'Part-time' ? 'bg-warning' : 'bg-info'}`}>
                        {resource.availability}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-primary">{resource.assignedTasks}</span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn text-primary"
                          onClick={() => handleEditResource(resource)}
                        >
                          <FaEdit />
                        </button>

                        <i className="bi bi-trash mt-1 text-danger btn-primary cursor-pointer" onClick={() => handleDeleteResource(resource.id)}></i>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resource Modal */}
      <ResourceModal
        resource={editingResource}
        onSave={handleSaveResource}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

const ResourceModal = ({ resource, onSave, show, onClose }) => {
  const [formData, setFormData] = useState(
    resource || {
      name: '',
      role: '',
      subcontractor: '',
      rate: '',
      availability: 'Full-time',
      assignedTasks: 0
    }
  );

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        name: '',
        role: '',
        subcontractor: '',
        rate: '',
        availability: 'Full-time',
        assignedTasks: 0
      });
    }
  }, [resource]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal fade" id="resourceModal" tabIndex="-1" aria-labelledby="resourceModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="resourceModalLabel">
              {resource ? 'Edit Resource' : 'Add New Resource'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="resourceForm">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Subcontractor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subcontractor"
                    value={formData.subcontractor}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Rate ($/hr)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Availability</label>
                  <select
                    className="form-select"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Assigned Tasks</label>
                  <input
                    type="number"
                    className="form-control"
                    name="assignedTasks"
                    value={formData.assignedTasks}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" form="resourceForm">
              {resource ? 'Update' : 'Add'} Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;