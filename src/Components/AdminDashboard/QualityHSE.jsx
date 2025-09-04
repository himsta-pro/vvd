import React, { useState } from 'react';
import { Modal, Button, Table, Form, Card, Badge, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const QualityHSE = () => {
  // Sample initial data
  const initialInspections = [
    {
      id: 'INSP-001',
      taskId: 'TASK-1001',
      date: '2023-10-15',
      inspector: 'John Smith',
      snags: 'Lack of safety signage in area B',
      status: 'Open',
      hseIssues: 'High'
    },
    {
      id: 'INSP-002',
      taskId: 'TASK-1002',
      date: '2023-10-16',
      inspector: 'Emma Johnson',
      snags: 'Equipment not properly stored',
      status: 'Closed',
      hseIssues: 'Medium'
    },
    {
      id: 'INSP-003',
      taskId: 'TASK-1005',
      date: '2023-10-17',
      inspector: 'Michael Brown',
      snags: 'Missing protective equipment',
      status: 'Open',
      hseIssues: 'Critical'
    }
  ];

  const [inspections, setInspections] = useState(initialInspections);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'
  const [currentInspection, setCurrentInspection] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Filter inspections based on search term
  const filteredInspections = inspections.filter(inspection =>
    inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.snags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (mode, inspection = {}) => {
    setModalMode(mode);
    setCurrentInspection(inspection);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (modalMode === 'add') {
      const newInspection = {
        ...currentInspection,
        id: `INSP-${String(inspections.length + 1).padStart(3, '0')}`
      };
      setInspections([...inspections, newInspection]);
    } else if (modalMode === 'edit') {
      setInspections(inspections.map(item =>
        item.id === currentInspection.id ? currentInspection : item
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setInspections(inspections.filter(item => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInspection({
      ...currentInspection,
      [name]: value
    });
  };

  return (
    <div className="">
      <Row className="align-items-center mb-4 g-2">
        <Col xs={12} md={6}>
          <h3 className="mb-0 fw-bold">Quality & HSE Inspection Log</h3>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end gap-2 flex-wrap">
          <div className="position-relative flex-grow-1 flex-md-grow-0" style={{ minWidth: "220px" }}>
            <FaSearch className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
            <Form.Control
              type="text"
              placeholder="Search inspections..."
              className="ps-5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => handleShowModal('add')}
          >
            <FaPlus className="me-2" />
            <span>Add Inspection</span>
          </button>

        </Col>
      </Row>

      {/* Inspection Table */}
      <div className="card shadow-sm border-0">
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-nowrap">Inspection ID</th>
                  <th className="text-nowrap">Task ID</th>
                  <th className="text-nowrap">Date</th>
                  <th className="text-nowrap">Inspector</th>
                  <th className="text-nowrap">Snags</th>
                  <th className="text-nowrap">Status</th>
                  <th className="text-nowrap">HSE Issues</th>
                  <th className="text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInspections.map((inspection, index) => (
                  <tr key={index}>
                    <td className="fw-bold text-nowrap">{inspection.id}</td>
                    <td className="text-nowrap">{inspection.taskId}</td>
                    <td className="text-nowrap">{inspection.date}</td>
                    <td className="text-nowrap">{inspection.inspector}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                      {inspection.snags}
                    </td>
                    <td>
                      <Badge bg={inspection.status === 'Open' ? 'warning' : 'success'}>
                        {inspection.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={
                        inspection.hseIssues === 'Critical' ? 'danger' :
                          inspection.hseIssues === 'High' ? 'warning' :
                            inspection.hseIssues === 'Medium' ? 'info' : 'secondary'
                      }>
                        {inspection.hseIssues}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className='btn text-primary'
                          size="sm"
                          onClick={() => handleShowModal('view', inspection)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className='btn text-success'
                          size="sm"
                          onClick={() => handleShowModal('edit', inspection)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className='btn text-danger'
                          size="sm"
                          onClick={() => handleDelete(inspection.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'view' ? 'View Inspection' :
              modalMode === 'edit' ? 'Edit Inspection' : 'Add New Inspection'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Inspection ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={currentInspection.id || ''}
                    onChange={handleInputChange}
                    disabled={modalMode !== 'add'}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Task ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="taskId"
                    value={currentInspection.taskId || ''}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={currentInspection.date || ''}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Inspector</Form.Label>
                  <Form.Control
                    type="text"
                    name="inspector"
                    value={currentInspection.inspector || ''}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Snags</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="snags"
                value={currentInspection.snags || ''}
                onChange={handleInputChange}
                disabled={modalMode === 'view'}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={currentInspection.status || 'Open'}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>HSE Issues</Form.Label>
                  <Form.Select
                    name="hseIssues"
                    value={currentInspection.hseIssues || 'Medium'}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {(modalMode === 'edit' || modalMode === 'add') && (
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QualityHSE;
