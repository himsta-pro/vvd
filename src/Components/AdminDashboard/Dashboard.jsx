import React, { useState, useEffect } from 'react';
import {
  FaFileContract,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckSquare,
  FaUser,
  FaTasks,
  FaRegFilePdf,
  FaExclamationCircle,
  FaChartLine,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  // Modal States
  const [showNewRFQ, setShowNewRFQ] = useState(false);
  const [showNewContract, setShowNewContract] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);

  // Form Data States
  const [rfqData, setRfqData] = useState({
    projectName: '',
    client: '',
    budget: '',
    deadline: '',
    description: ''
  });
  
  const [contractData, setContractData] = useState({
    projectId: '',
    contractValue: '',
    signedDate: '',
    startDate: '',
    endDate: '',
    manager: '',
    terms: ''
  });
  
  const [taskData, setTaskData] = useState({
    taskName: '',
    assignTo: '',
    dueDate: '',
    priority: 'Low',
    description: ''
  });
  
  const [resourceData, setResourceData] = useState({
    resourceName: '',
    role: '',
    contactInfo: '',
    availability: 'Full-time',
    notes: ''
  });

  // Handle Modals
  const handleShowRFQ = () => setShowNewRFQ(true);
  const handleCloseRFQ = () => setShowNewRFQ(false);

  const handleShowContract = () => setShowNewContract(true);
  const handleCloseContract = () => setShowNewContract(false);

  const handleShowTask = () => setShowAddTask(true);
  const handleCloseTask = () => setShowAddTask(false);

  const handleShowResource = () => setShowAddResource(true);
  const handleCloseResource = () => setShowAddResource(false);

  // Form Handlers
  const handleRfqSubmit = (e) => {
    e.preventDefault();
    console.log('RFQ Submitted:', rfqData);
    // Here you would typically send data to your backend
    alert('RFQ Submitted Successfully!');
    setRfqData({
      projectName: '',
      client: '',
      budget: '',
      deadline: '',
      description: ''
    });
    handleCloseRFQ();
  };

  const handleContractSubmit = (e) => {
    e.preventDefault();
    console.log('Contract Submitted:', contractData);
    alert('Contract Created Successfully!');
    setContractData({
      projectId: '',
      contractValue: '',
      signedDate: '',
      startDate: '',
      endDate: '',
      manager: '',
      terms: ''
    });
    handleCloseContract();
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    console.log('Task Submitted:', taskData);
    alert('Task Added Successfully!');
    setTaskData({
      taskName: '',
      assignTo: '',
      dueDate: '',
      priority: 'Low',
      description: ''
    });
    handleCloseTask();
  };

  const handleResourceSubmit = (e) => {
    e.preventDefault();
    console.log('Resource Submitted:', resourceData);
    alert('Resource Added Successfully!');
    setResourceData({
      resourceName: '',
      role: '',
      contactInfo: '',
      availability: 'Full-time',
      notes: ''
    });
    handleCloseResource();
  };

  // Input Change Handlers
  const handleRfqChange = (e) => {
    const { name, value } = e.target;
    setRfqData(prev => ({ ...prev, [name]: value }));
  };

  const handleContractChange = (e) => {
    const { name, value } = e.target;
    setContractData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceData(prev => ({ ...prev, [name]: value }));
  };

  // Initialize Bootstrap modals
  useEffect(() => {
    if (showNewRFQ) {
      const modalElement = document.getElementById('newRFQModal');
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
      
      // Add event listener for when modal is hidden
      const handleHidden = () => setShowNewRFQ(false);
      modalElement.addEventListener('hidden.bs.modal', handleHidden);
      
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        modal.hide();
      };
    }
  }, [showNewRFQ]);

  useEffect(() => {
    if (showNewContract) {
      const modalElement = document.getElementById('newContractModal');
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
      
      const handleHidden = () => setShowNewContract(false);
      modalElement.addEventListener('hidden.bs.modal', handleHidden);
      
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        modal.hide();
      };
    }
  }, [showNewContract]);

  useEffect(() => {
    if (showAddTask) {
      const modalElement = document.getElementById('addTaskModal');
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
      
      const handleHidden = () => setShowAddTask(false);
      modalElement.addEventListener('hidden.bs.modal', handleHidden);
      
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        modal.hide();
      };
    }
  }, [showAddTask]);

  useEffect(() => {
    if (showAddResource) {
      const modalElement = document.getElementById('addResourceModal');
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
      
      const handleHidden = () => setShowAddResource(false);
      modalElement.addEventListener('hidden.bs.modal', handleHidden);
      
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        modal.hide();
      };
    }
  }, [showAddResource]);

  // Mock Data
  const recentActivities = [
    {
      type: 'RFQ',
      title: 'Swimming Pool Construction - Villa Project',
      client: 'Al Mansouri Development',
      value: '$125,000',
      date: '2024-01-15',
    },
    {
      type: 'Contract',
      title: 'Landscape Design - Commercial Complex',
      client: 'Emirates Properties',
      value: '$89,500',
      date: '2024-01-14',
    },
    {
      type: 'Task',
      title: 'Site Survey - Residential Project',
      client: 'Dubai Hills Estate',
      value: '$15,000',
      date: '2024-01-13',
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1 fw-bold">Dashboard</h1>
        <p className="text-muted mb-0">overview of your project management activities and key metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4 w-100 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
        <div className="col">
          <div className="card shadow-sm h-100 border-0 p-3 position-relative hover-card bg-primary bg-opacity-10 text-primary">
            <div className="d-flex align-items-center">
              <div className="icon-circle bg-primary text-white me-3">
                <FaFileContract size={20} />
              </div>
              <div>
                <small className="text-dark">Ongoing Projects</small>
                <div className="fs-5 fw-bold text-dark">12</div>
                <small className="text-success">+2.1%</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm h-100 border-0 p-3 bg-warning bg-opacity-10 text-warning position-relative hover-card">
            <div className="d-flex align-items-center">
              <div className="icon-circle bg-warning text-white me-3">
                <FaRegFilePdf size={20} />
              </div>
              <div>
                <small className="text-dark">Pending RFQs</small>
                <div className="fs-5 fw-bold text-dark">8</div>
                <small className="text-success">+4.3%</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm h-100 border-0 p-3 bg-info bg-opacity-10 text-info position-relative hover-card">
            <div className="d-flex align-items-center">
              <div className="icon-circle bg-info text-white me-3">
                <FaFileContract size={20} />
              </div>
              <div>
                <small className="text-dark">Active Contracts</small>
                <div className="fs-5 fw-bold text-dark">24</div>
                <small className="text-success">+1.2%</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm h-100 border-0 p-3 bg-danger bg-opacity-10 text-danger position-relative hover-card">
            <div className="d-flex align-items-center">
              <div className="icon-circle bg-danger text-white me-3">
                <FaTasks size={20} />
              </div>
              <div>
                <small className="text-dark">Tasks in Progress</small>
                <div className="fs-5 fw-bold text-dark">156</div>
                <small className="text-danger">-0.8%</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm h-100 border-0 p-3 bg-success bg-opacity-10 text-success position-relative hover-card">
            <div className="d-flex align-items-center">
              <div className="icon-circle bg-success text-white me-3">
                <FaDollarSign size={20} />
              </div>
              <div>
                <small className="text-dark">Invoices Due</small>
                <div className="fs-5 fw-bold text-dark">$45,230</div>
                <small className="text-success">+12.5%</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="row g-4">
        {/* Recent Activities */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border">
            <div className="card-body p-3">
              <h5 className="mb-3">Recent Activities</h5>
              <div className="list-group list-group-flush">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="list-group-item p-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start flex-wrap">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center flex-wrap">
                          <span
                            className={`me-2 mb-2 rounded-pill px-2 py-1 text-xs ${activity.type === "RFQ"
                              ? "bg-primary text-white"
                              : activity.type === "Contract"
                                ? "bg-success text-white"
                                : "bg-warning text-dark"
                              }`}
                          >
                            {activity.type}
                          </span>
                          <div>
                            <div className="fw-medium">{activity.title}</div>
                            <div className="text-muted small">{activity.client}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end mt-2 mt-md-0">
                        <div className="fw-bold">{activity.value}</div>
                        <div className="text-muted small">{activity.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border">
            <div className="card-body p-3">
              <h5 className="mb-3">Quick Actions</h5>
              <div className="row g-3">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                  <button
                    className="btn btn-outline-secondary w-100 text-center p-3 border-dashed"
                    onClick={handleShowRFQ}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <FaRegFilePdf size={24} className="mb-2" />
                      <span>New RFQ</span>
                    </div>
                  </button>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                  <button
                    className="btn btn-outline-secondary w-100 text-center p-3 border-dashed"
                    onClick={handleShowContract}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <FaFileContract size={24} className="mb-2" />
                      <span>New Contract</span>
                    </div>
                  </button>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                  <button
                    className="btn btn-outline-secondary w-100 text-center p-3 border-dashed"
                    onClick={handleShowTask}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <FaCheckSquare size={24} className="mb-2" />
                      <span>Add Task</span>
                    </div>
                  </button>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                  <button
                    className="btn btn-outline-secondary w-100 text-center p-3 border-dashed"
                    onClick={handleShowResource}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <FaUser size={24} className="mb-2" />
                      <span>Add Resource</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-3">
              <h5 className="mb-3 fw-semibold">Project Status Overview</h5>

              <div className="row g-3">
                {/* On Track */}
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-3 d-flex align-items-center bg-success bg-opacity-10 h-100">
                    <FaChartLine size={22} className="text-success me-3" />
                    <div>
                      <div className="text-dark fw-medium">On Track</div>
                      <div className="fw-bold fs-4 text-success">18</div>
                    </div>
                  </div>
                </div>

                {/* At Risk */}
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-3 d-flex align-items-center bg-warning bg-opacity-10 h-100">
                    <FaCalendarAlt size={22} className="text-warning me-3" />
                    <div>
                      <div className="text-dark fw-medium">At Risk</div>
                      <div className="fw-bold fs-4 text-warning">4</div>
                    </div>
                  </div>
                </div>

                {/* Delayed */}
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-3 d-flex align-items-center bg-danger bg-opacity-10 h-100">
                    <FaExclamationCircle size={22} className="text-danger me-3" />
                    <div>
                      <div className="text-dark fw-medium">Delayed</div>
                      <div className="fw-bold fs-4 text-danger">2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* New RFQ Modal */}
      <div className="modal fade" id="newRFQModal" tabIndex="-1" aria-labelledby="newRFQModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newRFQModalLabel">New RFQ</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleRfqSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Project Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter project name" 
                      name="projectName"
                      value={rfqData.projectName}
                      onChange={handleRfqChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Client</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter client name" 
                      name="client"
                      value={rfqData.client}
                      onChange={handleRfqChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Budget</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., $100,000" 
                      name="budget"
                      value={rfqData.budget}
                      onChange={handleRfqChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Deadline</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="deadline"
                      value={rfqData.deadline}
                      onChange={handleRfqChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Enter description..."
                      name="description"
                      value={rfqData.description}
                      onChange={handleRfqChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit RFQ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* New Contract Modal */}
      <div className="modal fade" id="newContractModal" tabIndex="-1" aria-labelledby="newContractModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newContractModalLabel">New Contract</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleContractSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Project ID</label>
                    <select 
                      className="form-select"
                      name="projectId"
                      value={contractData.projectId}
                      onChange={handleContractChange}
                      required
                    >
                      <option value="">Select Project</option>
                      <option value="CON-001">CON-001</option>
                      <option value="CON-002">CON-002</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contract Value</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., $89,500" 
                      name="contractValue"
                      value={contractData.contractValue}
                      onChange={handleContractChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Signed Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="signedDate"
                      value={contractData.signedDate}
                      onChange={handleContractChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="startDate"
                      value={contractData.startDate}
                      onChange={handleContractChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="endDate"
                      value={contractData.endDate}
                      onChange={handleContractChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Manager</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter manager name" 
                      name="manager"
                      value={contractData.manager}
                      onChange={handleContractChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Terms & Conditions</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Enter terms..."
                      name="terms"
                      value={contractData.terms}
                      onChange={handleContractChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTaskModalLabel">Add Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleTaskSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Task Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter task name" 
                      name="taskName"
                      value={taskData.taskName}
                      onChange={handleTaskChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Assign To</label>
                    <select 
                      className="form-select"
                      name="assignTo"
                      value={taskData.assignTo}
                      onChange={handleTaskChange}
                      required
                    >
                      <option value="">Select Team Member</option>
                      <option value="Ahmed Al-Rashid">Ahmed Al-Rashid</option>
                      <option value="Sarah Mohammed">Sarah Mohammed</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Due Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="dueDate"
                      value={taskData.dueDate}
                      onChange={handleTaskChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>
                    <select 
                      className="form-select"
                      name="priority"
                      value={taskData.priority}
                      onChange={handleTaskChange}
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Enter description..."
                      name="description"
                      value={taskData.description}
                      onChange={handleTaskChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      <div className="modal fade" id="addResourceModal" tabIndex="-1" aria-labelledby="addResourceModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addResourceModalLabel">Add Resource</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleResourceSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Resource Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter resource name" 
                      name="resourceName"
                      value={resourceData.resourceName}
                      onChange={handleResourceChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <select 
                      className="form-select"
                      name="role"
                      value={resourceData.role}
                      onChange={handleResourceChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Architect">Architect</option>
                      <option value="Project Manager">Project Manager</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Info</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g., email or phone" 
                      name="contactInfo"
                      value={resourceData.contactInfo}
                      onChange={handleResourceChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Availability</label>
                    <select 
                      className="form-select"
                      name="availability"
                      value={resourceData.availability}
                      onChange={handleResourceChange}
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Notes</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Enter notes..."
                      name="notes"
                      value={resourceData.notes}
                      onChange={handleResourceChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;