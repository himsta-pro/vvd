import React, { useState } from 'react';
import { Modal, Button, Form, Badge, ListGroup, Card, Row, Col } from 'react-bootstrap';

const ProjectManagerTasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium'
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Homepage Layout',
      description: 'Create wireframes for the new homepage design',
      assignee: '2',
      dueDate: '2023-06-15',
      priority: 'high',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'API Integration',
      description: 'Integrate user authentication API',
      assignee: '1',
      dueDate: '2023-06-20',
      priority: 'medium',
      status: 'Not Started'
    }
  ]);

  const assignees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Johnson' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'Michael Wilson' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map(task => 
        task.id === editingTask.id 
          ? { 
              ...task, 
              title: taskData.title,
              description: taskData.description,
              assignee: taskData.assignee,
              dueDate: taskData.dueDate,
              priority: taskData.priority
            } 
          : task
      );
      setTasks(updatedTasks);
    } else {
      // Add new task
      const newTask = {
        id: tasks.length + 1,
        title: taskData.title,
        description: taskData.description,
        assignee: taskData.assignee,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        status: 'Not Started'
      };
      setTasks([...tasks, newTask]);
    }
    
    setShowModal(false);
    setEditingTask(null);
    setTaskData({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      priority: 'medium'
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskData({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      dueDate: task.dueDate,
      priority: task.priority
    });
    setShowModal(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'primary';
      case 'Completed': return 'success';
      case 'Not Started': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getAssigneeName = (assigneeId) => {
    const assignee = assignees.find(a => a.id.toString() === assigneeId.toString());
    return assignee ? assignee.name : 'Unassigned';
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md">
            <h2 className="fw-bold text-shadow-black">Task Management</h2>
            <p className="text-muted mb-0">Manage and assign tasks to your team members</p>
          </div>
          <div className="col-12 col-md-auto mt-2 mt-md-0 text-md-end">
            <Button 
              variant="primary" 
              onClick={() => {
                setEditingTask(null);
                setTaskData({
                  title: '',
                  description: '',
                  assignee: '',
                  dueDate: '',
                  priority: 'medium'
                });
                setShowModal(true);
              }}
              className="w-100 w-md-auto d-flex justify-content-center align-items-center"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Assign New Task
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center bg-primary bg-opacity-10">
                <h5 className="text-muted">Total Tasks</h5>
                <h3 className="fw-bold text-primary">{tasks.length}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center bg-opacity-10 bg-warning">
                <h5 className="text-muted">In Progress</h5>
                <h3 className="fw-bold text-warning">
                  {tasks.filter(t => t.status === 'In Progress').length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center bg-success bg-opacity-10">
                <h5 className="text-muted">Completed</h5>
                <h3 className="fw-bold text-success">
                  {tasks.filter(t => t.status === 'Completed').length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center bg-opacity-10 bg-secondary">
                <h5 className="text-muted">Not Started</h5>
                <h3 className="fw-bold text-secondary">
                  {tasks.filter(t => t.status === 'Not Started').length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tasks list */}
        <div className="row">
          <div className="col-12">
            <Card className="shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0 text-dark">Assigned Tasks</h5>
              </Card.Header>
              <Card.Body className="p-0">
                {tasks.length > 0 ? (
                  <ListGroup variant="flush">
                    {tasks.map(task => (
                      <ListGroup.Item key={task.id} className="px-4 py-3 border-bottom">
                        <div className="row align-items-start align-items-md-center">
                          {/* Task details */}
                          <div className="col-12 col-md flex-grow-1">
                            <h6 className="mb-1 fw-bold">{task.title}</h6>
                            <p className="mb-2 text-muted small">{task.description}</p>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                              <Badge bg="secondary" className="d-flex align-items-center">
                                <i className="bi bi-person me-1"></i>
                                {getAssigneeName(task.assignee)}
                              </Badge>
                              <Badge bg="info" className="d-flex align-items-center">
                                <i className="bi bi-calendar me-1"></i>
                                Due: {formatDate(task.dueDate)}
                              </Badge>
                              <Badge bg={getPriorityColor(task.priority)} className="d-flex align-items-center">
                                <i className="bi bi-flag me-1"></i>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                              <Badge bg={getStatusColor(task.status)} className="d-flex align-items-center">
                                {task.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="col-12 col-md-auto text-end mt-2 mt-md-0">
                      
                              <i className="bi bi-pencil me-4 text-green-700 btn-primary cursor-pointer"  onClick={() => handleEdit(task)} ></i> 
                            
                          
                              <i className="bi bi-trash me-1 text-red-600 btn-primary cursor-pointer" onClick={() => handleDelete(task.id)}></i> 
                            
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center p-5 text-muted">
                    <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
                    <p className="mt-3">No tasks assigned yet</p>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                      Assign Your First Task
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Assign Task Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="bg-light">
            <Modal.Title>{editingTask ? 'Edit Task' : 'Assign New Task'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={taskData.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Assignee</Form.Label>
                    <Form.Select
                      name="assignee"
                      value={taskData.assignee}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an assignee</option>
                      {assignees.map(assignee => (
                        <option key={assignee.id} value={assignee.id}>
                          {assignee.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={taskData.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingTask ? 'Update Task' : 'Assign Task'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectManagerTasks;