import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Milestones = () => {
  const [milestones, setMilestones] = useState([
    { id: 1, projectId: 'PRJ-001', name: 'Requirements Gathering', plannedDate: '2023-06-15', actualDate: '2023-06-14', status: 'Completed' },
    { id: 2, projectId: 'PRJ-001', name: 'Design Approval', plannedDate: '2023-07-10', actualDate: '2023-07-12', status: 'Completed' },
    { id: 3, projectId: 'PRJ-002', name: 'Development Phase 1', plannedDate: '2023-08-01', actualDate: '', status: 'In Progress' },
    { id: 4, projectId: 'PRJ-003', name: 'Client Presentation', plannedDate: '2023-09-20', actualDate: '', status: 'Not Started' },
    { id: 5, projectId: 'PRJ-002', name: 'Testing Phase', plannedDate: '2023-08-25', actualDate: '', status: 'Pending' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterProject, setFilterProject] = useState('All');

  const handleAddMilestone = () => {
    setEditingMilestone(null);
    setShowModal(true);
  };

  const handleEditMilestone = (milestone) => {
    setEditingMilestone(milestone);
    setShowModal(true);
  };

  const handleDeleteMilestone = (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      setMilestones(milestones.filter(milestone => milestone.id !== id));
    }
  };

  const handleSaveMilestone = (milestoneData) => {
    if (editingMilestone) {
      // Update existing milestone
      setMilestones(milestones.map(milestone =>
        milestone.id === editingMilestone.id ? { ...milestoneData, id: editingMilestone.id } : milestone
      ));
    } else {
      // Add new milestone
      const newId = Math.max(...milestones.map(m => m.id)) + 1;
      setMilestones([...milestones, { ...milestoneData, id: newId }]);
    }
    setShowModal(false);
  };

  const filteredMilestones = milestones.filter(milestone => {
    const matchesSearch = milestone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      milestone.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || milestone.status === filterStatus;
    const matchesProject = filterProject === 'All' || milestone.projectId === filterProject;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const statuses = ['All', 'Completed', 'In Progress', 'Not Started', 'Pending', 'Delayed'];
  const projects = ['All', ...new Set(milestones.map(milestone => milestone.projectId))];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'In Progress': return 'bg-primary';
      case 'Not Started': return 'bg-secondary';
      case 'Pending': return 'bg-warning';
      case 'Delayed': return 'bg-danger';
      default: return 'bg-info';
    }
  };

  return (
    <div className="">
      <h3 className="fw-bold mb-4">Milestone Management</h3>

      {/* Controls */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        {/* Search */}
        <div className="flex-grow-1">
          <div className="input-group">
            <span className="input-group-text"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search milestones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <div className="input-group">
            <span className="input-group-text"><FaFilter /></span>
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Filter */}
        <div>
          <div className="input-group">
            <span className="input-group-text"><FaFilter /></span>
            <select
              className="form-select"
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
            >
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Button - Right Aligned */}
        <div className="ms-auto">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={handleAddMilestone}
            data-bs-toggle="modal"
            data-bs-target="#milestoneModal"
          >
            <FaPlus className="me-2" />
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Milestone Table */}
      <div className="card border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className='table-light'>
                <tr>
                  <th>ID</th>
                  <th>Project ID</th>
                  <th>Name</th>
                  <th>Planned Date</th>
                  <th>Actual Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMilestones.map(milestone => (
                  <tr key={milestone.id}>
                    <td>{milestone.id}</td>
                    <td>
                      <span className="badge bg-light text-dark">{milestone.projectId}</span>
                    </td>
                    <td>{milestone.name}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-muted" />
                        {milestone.plannedDate}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-muted" />
                        {milestone.actualDate || 'Not completed'}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn text-primary"
                          onClick={() => handleEditMilestone(milestone)}
                          data-bs-toggle="modal"
                          data-bs-target="#milestoneModal"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn text-danger"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Milestone Modal */}
      <div className="modal fade" id="milestoneModal" tabIndex="-1" aria-labelledby="milestoneModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="milestoneModalLabel">
                {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <MilestoneModalContent
                milestone={editingMilestone}
                onSave={handleSaveMilestone}
                onClose={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MilestoneModalContent = ({ milestone, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    milestone || {
      projectId: '',
      name: '',
      plannedDate: '',
      actualDate: '',
      status: 'Not Started'
    }
  );

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
    // Close the modal using Bootstrap's JavaScript
    const modal = document.getElementById('milestoneModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Project ID</label>
          <input
            type="text"
            className="form-control"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Milestone Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Planned Date</label>
          <input
            type="date"
            className="form-control"
            name="plannedDate"
            value={formData.plannedDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Actual Date</label>
          <input
            type="date"
            className="form-control"
            name="actualDate"
            value={formData.actualDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {milestone ? 'Update' : 'Add'} Milestone
        </button>
      </div>
    </form>
  );
};

export default Milestones;