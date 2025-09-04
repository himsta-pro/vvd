import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectManagerProject = () => {
  // Sample project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      status: 'In Progress',
      priority: 'High',
      startDate: '2023-05-15',
      endDate: '2023-08-30',
      assignedTo: 'John Smith',
      progress: 65,
      description: 'Complete redesign of company website with modern UI/UX',
      budget: '$15,000',
      client: 'ABC Corporation'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'Completed',
      priority: 'High',
      startDate: '2023-02-10',
      endDate: '2023-07-22',
      assignedTo: 'Sarah Johnson',
      progress: 100,
      description: 'Development of a cross-platform mobile application',
      budget: '$25,000',
      client: 'XYZ Inc.'
    },
    {
      id: 3,
      name: 'Database Migration',
      status: 'Not Started',
      priority: 'Medium',
      startDate: '2023-08-01',
      endDate: '2023-09-15',
      assignedTo: 'Mike Chen',
      progress: 0,
      description: 'Migration from legacy database to modern cloud solution',
      budget: '$10,000',
      client: 'Internal'
    },
    {
      id: 4,
      name: 'API Integration',
      status: 'In Progress',
      priority: 'Medium',
      startDate: '2023-06-20',
      endDate: '2023-08-10',
      assignedTo: 'John Smith',
      progress: 80,
      description: 'Integration of third-party APIs into existing system',
      budget: '$12,500',
      client: 'Tech Solutions Ltd.'
    },
    {
      id: 5,
      name: 'UI/UX Research',
      status: 'Pending',
      priority: 'Low',
      startDate: '2023-07-05',
      endDate: '2023-08-25',
      assignedTo: 'Emma Wilson',
      progress: 30,
      description: 'User research and interface design for new product line',
      budget: '$8,000',
      client: 'Innovate Co.'
    }
  ]);

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [editedProject, setEditedProject] = useState(null);

  // Apply filters whenever filters or projects change
  useEffect(() => {
    let result = projects;
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(project => project.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'All') {
      result = result.filter(project => project.priority === priorityFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.name.toLowerCase().includes(term) ||
        project.assignedTo.toLowerCase().includes(term) ||
        project.client.toLowerCase().includes(term)
      );
    }
    
    setFilteredProjects(result);
  }, [statusFilter, priorityFilter, searchTerm, projects]);

  const handleView = (project) => {
    setCurrentProject(project);
    setShowViewModal(true);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setEditedProject({...project});
    setShowViewModal(false);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (editedProject) {
      const updatedProjects = projects.map(project => 
        project.id === editedProject.id ? editedProject : project
      );
      setProjects(updatedProjects);
      setShowEditModal(false);
      setCurrentProject(null);
      setEditedProject(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject({
      ...editedProject,
      [name]: value
    });
  };

  const handleCloseModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setCurrentProject(null);
    setEditedProject(null);
  };

  const getStatusBadge = (status) => {
    let variant = 'secondary';
    if (status === 'Completed') variant = 'success';
    if (status === 'In Progress') variant = 'primary';
    if (status === 'Pending') variant = 'warning';
    
    return <span className={`badge bg-${variant}`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    let variant = 'secondary';
    if (priority === 'High') variant = 'danger';
    if (priority === 'Medium') variant = 'warning';
    if (priority === 'Low') variant = 'info';
    
    return <span className={`badge bg-${variant}`}>{priority}</span>;
  };

  // View Modal
  const ViewModal = () => {
    if (!currentProject) return null;
    
    return (
      <div className={`modal fade ${showViewModal ? 'show d-block' : ''}`} style={{ display: showViewModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Project Details: {currentProject.name}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={handleCloseModals}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Basic Information</h6>
                  <p><strong>Name:</strong> {currentProject.name}</p>
                  <p><strong>Status:</strong> {getStatusBadge(currentProject.status)}</p>
                  <p><strong>Priority:</strong> {getPriorityBadge(currentProject.priority)}</p>
                  <p><strong>Assigned To:</strong> {currentProject.assignedTo}</p>
                </div>
                <div className="col-md-6">
                  <h6>Timeline & Budget</h6>
                  <p><strong>Start Date:</strong> {currentProject.startDate}</p>
                  <p><strong>End Date:</strong> {currentProject.endDate}</p>
                  <p><strong>Progress:</strong> 
                    <div className="progress mt-1" style={{ height: '10px' }}>
                      <div 
                        className={`progress-bar ${
                          currentProject.progress === 100 ? 'bg-success' : 
                          currentProject.progress > 70 ? 'bg-primary' : 
                          currentProject.progress > 30 ? 'bg-warning' : 'bg-secondary'
                        }`} 
                        role="progressbar" 
                        style={{ width: `${currentProject.progress}%` }}
                      ></div>
                    </div>
                    <small>{currentProject.progress}%</small>
                  </p>
                  <p><strong>Budget:</strong> {currentProject.budget}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <h6>Description</h6>
                  <p>{currentProject.description}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <h6>Client Information</h6>
                  <p><strong>Client:</strong> {currentProject.client}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleEdit(currentProject)}>Edit Project</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal
  const EditModal = () => {
    if (!editedProject) return null;
    
    return (
      <div className={`modal fade ${showEditModal ? 'show d-block' : ''}`} style={{ display: showEditModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Edit Project: {editedProject.name}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={handleCloseModals}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Project Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="name"
                      value={editedProject.name || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      name="status"
                      value={editedProject.status || ''} 
                      onChange={handleInputChange}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select 
                      className="form-select" 
                      name="priority"
                      value={editedProject.priority || ''} 
                      onChange={handleInputChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Assigned To</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="assignedTo"
                      value={editedProject.assignedTo || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="startDate"
                      value={editedProject.startDate || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="endDate"
                      value={editedProject.endDate || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Progress (%)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="progress"
                      min="0"
                      max="100"
                      value={editedProject.progress || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Budget</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="budget"
                      value={editedProject.budget || ''} 
                      onChange={handleInputChange}
                    />
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
                      name="description"
                      value={editedProject.description || ''} 
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="client"
                      value={editedProject.client || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid mt-4">
      {/* Backdrop for modals */}
      <div className={`modal-backdrop fade ${showViewModal || showEditModal ? 'show' : ''}`} 
           style={{ display: showViewModal || showEditModal ? 'block' : 'none' }}></div>
      
      <div className="row">
        <div className="col">
          <h3 className="fw-bold mb-4">Project Management</h3>
        </div>
      </div>
      
      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
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
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="col-md-3 mb-2 text-end">
          <span className="badge bg-light text-dark">
            {filteredProjects.length} project(s) found
          </span>
        </div>
      </div>
      
      {/* Projects Table */}
   <div className="row">
  <div className="col">
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th className="text-nowrap">Name</th>
            <th className="text-nowrap">Status</th>
            <th className="text-nowrap">Priority</th>
            <th className="text-nowrap">Assigned To</th>
            <th className="text-nowrap">Start Date</th>
            <th className="text-nowrap">End Date</th>
            <th className="text-nowrap">Progress</th>
            <th className="text-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <tr key={project.id}>
                <td className="fw-bold text-break">{project.name}</td>
                <td className="text-nowrap">{getStatusBadge(project.status)}</td>
                <td className="text-nowrap">{getPriorityBadge(project.priority)}</td>
                <td className="text-break">{project.assignedTo}</td>
                <td className="text-nowrap">{project.startDate}</td>
                <td className="text-nowrap">{project.endDate}</td>
                <td className="text-nowrap">
                  <div className="progress" style={{ height: "8px", minWidth: "80px" }}>
                    <div
                      className={`progress-bar ${
                        project.progress === 100
                          ? "bg-success"
                          : project.progress > 70
                          ? "bg-primary"
                          : project.progress > 30
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                      role="progressbar"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <small>{project.progress}%</small>
                </td>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm text-primary"
                    onClick={() => handleView(project)}
                    title="View Project"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm text-success"
                    onClick={() => handleEdit(project)}
                    title="Edit Project"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No projects found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

      
      {/* Modals */}
      <ViewModal />
      <EditModal />
      
      {/* Backdrop for modals */}
      {(showViewModal || showEditModal) && (
        <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      )}
    </div>
  );
};

export default ProjectManagerProject;