import React, { useState } from 'react';
import { Modal, Button, Table, Form, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const RiskManagement = () => {
  const initialRisks = [
    {
      id: 1,
      projectId: 'PROJ-001',
      description: 'Scope creep due to unclear requirements',
      level: 'High',
      impact: 'Project delays and budget overruns',
      mitigationPlan: 'Implement change control process and regular stakeholder meetings',
      owner: 'Project Manager'
    },
    {
      id: 2,
      projectId: 'PROJ-001',
      description: 'Key team member resignation',
      level: 'Medium',
      impact: 'Loss of knowledge and project slowdown',
      mitigationPlan: 'Cross-train team members and document processes',
      owner: 'Team Lead'
    },
    {
      id: 3,
      projectId: 'PROJ-002',
      description: 'Technology compatibility issues',
      level: 'High',
      impact: 'Integration failures and rework needed',
      mitigationPlan: 'Conduct proof of concept early in the project',
      owner: 'Technical Architect'
    }
  ];

  const [risks, setRisks] = useState(initialRisks);
  const [showModal, setShowModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [newRisk, setNewRisk] = useState({
    projectId: '',
    description: '',
    level: 'Low',
    impact: '',
    mitigationPlan: '',
    owner: ''
  });

  // New state for view modal
  const [viewRisk, setViewRisk] = useState(null);

  const handleShow = (risk = null) => {
    if (risk) {
      setEditingRisk(risk);
      setNewRisk(risk);
    } else {
      setEditingRisk(null);
      setNewRisk({
        projectId: '',
        description: '',
        level: 'Low',
        impact: '',
        mitigationPlan: '',
        owner: ''
      });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingRisk(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRisk({ ...newRisk, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRisk) {
      setRisks(risks.map(risk => risk.id === editingRisk.id ? { ...newRisk, id: editingRisk.id } : risk));
    } else {
      const newId = risks.length > 0 ? Math.max(...risks.map(r => r.id)) + 1 : 1;
      setRisks([...risks, { ...newRisk, id: newId }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this risk?')) {
      setRisks(risks.filter(risk => risk.id !== id));
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h3 className="fw-bold mb-1">Risk Register</h3>
            <p className="text-muted mb-0">Manage project risks effectively with this risk register</p>
          </div>
          <div>
            <button className="btn btn-primary d-flex align-items-center" onClick={() => handleShow()}>
              <FaPlus className="me-1" />
              <span>Add New Risk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Risk ID</th>
              <th>Project ID</th>
              <th>Description</th>
              <th>Level</th>
              <th>Impact</th>
              <th>Mitigation Plan</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {risks.length > 0 ? (
              risks.map((risk) => (
                <tr key={risk.id}>
                  <td>{risk.id}</td>
                  <td>{risk.projectId}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>{risk.description}</td>
                  <td><Badge bg={getLevelBadge(risk.level)}>{risk.level}</Badge></td>
                  <td>{risk.impact}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>{risk.mitigationPlan}</td>
                  <td>{risk.owner}</td>
                  <td>
                    <button className="btn me-1 text-info" size="sm" onClick={() => setViewRisk(risk)}>
                      <FaEye />
                    </button>
                    <button className="btn me-1 text-primary" size="sm" onClick={() => handleShow(risk)}>
                      <FaEdit />
                    </button>
                    <button className="btn text-danger" size="sm" onClick={() => handleDelete(risk.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No risks registered. Click <strong>"Add New Risk"</strong> to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingRisk ? 'Edit Risk' : 'Add New Risk'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Project ID</Form.Label>
                  <Form.Control type="text" name="projectId" value={newRisk.projectId} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Risk Level</Form.Label>
                  <Form.Select name="level" value={newRisk.level} onChange={handleInputChange} required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} name="description" value={newRisk.description} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Impact</Form.Label>
              <Form.Control as="textarea" rows={2} name="impact" value={newRisk.impact} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mitigation Plan</Form.Label>
              <Form.Control as="textarea" rows={3} name="mitigationPlan" value={newRisk.mitigationPlan} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control type="text" name="owner" value={newRisk.owner} onChange={handleInputChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">{editingRisk ? 'Update Risk' : 'Add Risk'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal show={!!viewRisk} onHide={() => setViewRisk(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Risk Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewRisk && (
            <div>
              <p><strong>Risk ID:</strong> {viewRisk.id}</p>
              <p><strong>Project ID:</strong> {viewRisk.projectId}</p>
              <p><strong>Description:</strong> {viewRisk.description}</p>
              <p><strong>Level:</strong> <Badge bg={getLevelBadge(viewRisk.level)}>{viewRisk.level}</Badge></p>
              <p><strong>Impact:</strong> {viewRisk.impact}</p>
              <p><strong>Mitigation Plan:</strong> {viewRisk.mitigationPlan}</p>
              <p><strong>Owner:</strong> {viewRisk.owner}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewRisk(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RiskManagement;
