import React, { useState } from 'react';
import {
  FaCheckSquare,
  FaClock,
  FaCheck,
  FaChartBar,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaPencilAlt,
  FaTasks,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskManagement = () => {
  // State for View Toggle
  const [view, setView] = useState('list'); // 'list' or 'kanban'

  // Modal States
  const [showNewTask, setShowNewTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showViewTask, setShowViewTask] = useState(false);

  // Handle Modals
  const handleShowNewTask = () => setShowNewTask(true);
  const handleCloseNewTask = () => setShowNewTask(false);

  const handleShowEditTask = () => setShowEditTask(true);
  const handleCloseEditTask = () => setShowEditTask(false);

  const handleShowViewTask = () => setShowViewTask(true);
  const handleCloseViewTask = () => setShowViewTask(false);

  // Mock Data
  const tasks = [
    {
      id: 'TSK-001',
      title: 'Site Survey and Preparation',
      project: 'Swimming Pool Construction',
      projectCode: 'CON-001',
      assignee: 'Ahmed Al-Rashid',
      schedule: '2024-02-01 - 2024-02-05',
      started: '2024-02-01',
      progress: 100,
      status: 'Completed',
      priority: 'High',
    },
    {
      id: 'TSK-002',
      title: 'Excavation Work',
      project: 'Swimming Pool Construction',
      projectCode: 'CON-001',
      assignee: 'Construction Team A',
      schedule: '2024-02-06 - 2024-02-12',
      started: '2024-02-06',
      progress: 75,
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 'TSK-003',
      title: 'Design Review and Approval',
      project: 'Landscape Design',
      projectCode: 'CON-002',
      assignee: 'Sarah Mohammed',
      schedule: '2024-02-15 - 2024-02-20',
      started: '2024-02-15',
      progress: 0,
      status: 'Not Started',
      priority: 'Medium',
    },
  ];

  // Group Tasks by Status for Kanban
  const groupedTasks = {
    'Not Started': tasks.filter(t => t.status === 'Not Started'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Completed': tasks.filter(t => t.status === 'Completed'),
    'On Hold': tasks.filter(t => t.status === 'On Hold'),
  };

  return (
    <div className="">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        {/* Left Side: Title + Subtitle */}
        <div className="mb-3 mb-md-0">
          <h1 className="h4 mb-1 fw-bold">Task Management</h1>
          <p className="text-muted mb-0">
            Track project tasks, assignments, and progress across all projects.
          </p>
        </div>

        {/* Right Side: Actions */}
        <div className="d-flex flex-wrap gap-2">
          <div className="btn-group" role="group">
            <button
              className={`btn ${view === "list" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => setView("list")}
            >
              <i className="bi bi-list-ul me-1"></i> List
            </button>
            <button
              className={`btn ${view === "kanban" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => setView("kanban")}
            >
              <i className="bi bi-kanban me-1"></i> Kanban
            </button>
          </div>

          <Button
            variant="primary"
            onClick={handleShowNewTask}
            className="d-flex align-items-center"
          >
            <i className="bi bi-plus-lg me-1"></i> New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {/* Total Tasks */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100 bg-primary bg-opacity-10">
            <div className="card-body d-flex align-items-center p-3">
              <div className="me-3 text-primary bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "48px", height: "48px" }}>
                <FaCheckSquare size={22} />
              </div>
              <div>
                <small className="text-muted">Total Tasks</small>
                <div className="fs-5 fw-bold text-primary">3</div>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100 bg-warning bg-opacity-10">
            <div className="card-body d-flex align-items-center p-3">
              <div className="me-3 text-warning bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "48px", height: "48px" }}>
                <FaClock size={22} />
              </div>
              <div>
                <small className="text-muted">In Progress</small>
                <div className="fs-5 fw-bold text-warning">1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100 bg-success bg-opacity-10">
            <div className="card-body d-flex align-items-center p-3">
              <div className="me-3 text-success bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "48px", height: "48px" }}>
                <FaCheck size={22} />
              </div>
              <div>
                <small className="text-muted">Completed</small>
                <div className="fs-5 fw-bold text-success">1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Avg Progress */}
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100 bg-info bg-opacity-10">
            <div className="card-body d-flex align-items-center p-3">
              <div className="me-3 text-info bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "48px", height: "48px" }}>
                <FaChartBar size={22} />
              </div>
              <div>
                <small className="text-muted">Avg Progress</small>
                <div className="fs-5 fw-bold text-info">58%</div>
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
              <label className="form-label mb-1 small">Search Tasks</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by task, project, or assignee..."
                />
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label mb-1 small">Status Filter</label>
              <div className="input-group">
                <select className="form-select">
                  <option>All Statuses</option>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="card shadow-sm border">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>TASK</th>
                  <th>PROJECT</th>
                  <th>ASSIGNED TO</th>
                  <th>SCHEDULE</th>
                  <th>PROGRESS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <div className="fw-bold text-primary">{task.id}</div>
                      <div className="fw-medium">{task.title}</div>
                      <span
                        className={`badge rounded-pill px-2 py-1 text-xs ${task.priority === 'High'
                          ? 'bg-danger text-white'
                          : task.priority === 'Medium'
                            ? 'bg-warning text-dark'
                            : 'bg-info text-white'
                          }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <div>{task.project}</div>
                      <small className="text-muted">{task.projectCode}</small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaUser size={14} className="me-1" />
                        <div>{task.assignee}</div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt size={14} className="me-1" />
                        <div>{task.schedule}</div>
                      </div>
                      <small className="text-muted">Started: {task.started}</small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="w-100">
                          <div className="progress" style={{ height: '6px' }}>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${task.progress}%`,
                                backgroundColor:
                                  task.progress === 100
                                    ? '#28a745'
                                    : task.progress > 50
                                      ? '#007bff'
                                      : '#6c757d',
                              }}
                              aria-valuenow={task.progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <small className="text-muted">{task.progress}%</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-2 py-1 text-xs ${task.status === 'Completed'
                          ? 'bg-success text-white'
                          : task.status === 'In Progress'
                            ? 'bg-info text-white'
                            : task.status === 'Not Started'
                              ? 'bg-secondary text-white'
                              : 'bg-danger text-white'
                          }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      {view === 'kanban' && (
        <div className="row g-4 mt-4">
          {Object.keys(groupedTasks).map((status) => (
            <div key={status} className="col-md-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">{status}</h6>
                <span className="badge bg-light text-muted rounded-circle px-2 py-1">
                  {groupedTasks[status].length}
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                {groupedTasks[status].map((task) => (
                  <div key={task.id} className="card border shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <div className="fw-bold text-primary">{task.id}</div>
                        <div className="fw-medium">{task.title}</div>
                        <small className="text-muted">{task.project}</small>
                      </div>
                      <span
                        className={`badge rounded-pill px-2 py-1 text-xs ${task.priority === 'High'
                          ? 'bg-warning text-dark'
                          : task.priority === 'Medium'
                            ? 'bg-warning text-dark'
                            : 'bg-info text-white'
                          }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaUser size={12} className="me-1" />
                      <small className="text-muted">{task.assignee}</small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="w-100">
                        <div className="progress" style={{ height: '6px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${task.progress}%`,
                              backgroundColor:
                                task.progress === 100
                                  ? '#28a745'
                                  : task.progress > 50
                                    ? '#007bff'
                                    : '#6c757d',
                            }}
                            aria-valuenow={task.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small className="text-muted">{task.progress}%</small>
                      </div>
                    </div>
                    <div className="d-flex gap-1 justify-content-end">
                      <Button variant="outline-secondary" size="sm" onClick={handleShowViewTask}>
                        <FaEye size={14} />
                      </Button>
                      <Button variant="outline-secondary" size="sm" onClick={handleShowEditTask}>
                        <FaPencilAlt size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {/* New Task Modal */}
      <Modal show={showNewTask} onHide={handleCloseNewTask} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label>Task ID</Form.Label>
                <Form.Control type="text" defaultValue="TSK-001" />
              </div>
              <div className="col-md-6">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter task title" />
              </div>
              <div className="col-md-6">
                <Form.Label>Project</Form.Label>
                <Form.Select>
                  <option>Select Project</option>
                  <option>Swimming Pool Construction</option>
                  <option>Landscape Design</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Assign To</Form.Label>
                <Form.Select>
                  <option>Select Assignee</option>
                  <option>Ahmed Al-Rashid</option>
                  <option>Sarah Mohammed</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
              </div>
              <div className="col-md-6">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" />
              </div>
              <div className="col-md-6">
                <Form.Label>Priority</Form.Label>
                <Form.Select>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Status</Form.Label>
                <Form.Select>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </Form.Select>
              </div>
              <div className="col-12">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter description..." />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewTask}>
            Cancel
          </Button>
          <Button variant="primary">Create Task</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Task Modal */}
      <Modal show={showEditTask} onHide={handleCloseEditTask} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label>Task ID</Form.Label>
                <Form.Control type="text" defaultValue="TSK-001" />
              </div>
              <div className="col-md-6">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue="Site Survey and Preparation" />
              </div>
              <div className="col-md-6">
                <Form.Label>Project</Form.Label>
                <Form.Select>
                  <option>Swimming Pool Construction</option>
                  <option>Landscape Design</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Assign To</Form.Label>
                <Form.Select>
                  <option>Ahmed Al-Rashid</option>
                  <option>Sarah Mohammed</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
              </div>
              <div className="col-md-6">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" />
              </div>
              <div className="col-md-6">
                <Form.Label>Priority</Form.Label>
                <Form.Select>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Status</Form.Label>
                <Form.Select>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </Form.Select>
              </div>
              <div className="col-12">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter description..." />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditTask}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* View Task Modal */}
      <Modal show={showViewTask} onHide={handleCloseViewTask} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Label>Task ID</Form.Label>
              <Form.Control type="text" value="TSK-001" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value="Site Survey and Preparation" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Project</Form.Label>
              <Form.Control type="text" value="Swimming Pool Construction" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Assign To</Form.Label>
              <Form.Control type="text" value="Ahmed Al-Rashid" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value="2024-02-01" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" value="2024-02-05" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Priority</Form.Label>
              <Form.Control type="text" value="High" readOnly />
            </div>
            <div className="col-md-6">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value="Completed" readOnly />
            </div>
            <div className="col-12">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Enter description..." readOnly />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewTask}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskManagement;