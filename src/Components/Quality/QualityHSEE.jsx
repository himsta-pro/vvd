// src/components/QualityHSE.js
import React, { useState } from 'react';
import {
  Container,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from 'react-bootstrap';

const QualityHSEE = () => {
  // Sample data
  const [inspections, setInspections] = useState([
    {
      id: 1,
      project: 'Project Alpha',
      type: 'Quality',
      status: 'Open',
      severity: 'High',
    },
    {
      id: 2,
      project: 'Project Beta',
      type: 'Safety',
      status: 'Closed',
      severity: 'Medium',
    },
  ]);

  // Modal states
  const [showLogIssue, setShowLogIssue] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  // Form states for Log Issue
  const [logForm, setLogForm] = useState({
    project: '',
    description: '',
    severity: '',
    photo: null,
  });

  // Form states for Schedule Inspection
  const [scheduleForm, setScheduleForm] = useState({
    project: '',
    type: '',
    date: '',
    inspector: '',
  });

  // Projects & inspectors (dropdown options)
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma'];
  const inspectors = ['John Doe', 'Jane Smith', 'Ali Khan'];

  // Handle Log Issue Submit
  const handleLogSubmit = (e) => {
    e.preventDefault();
    const newIssue = {
      id: inspections.length + 1,
      project: logForm.project,
      type: 'Quality', // default or can be added as field
      status: 'Open',
      severity: logForm.severity,
    };
    setInspections([newIssue, ...inspections]);
    setLogForm({ project: '', description: '', severity: '', photo: null });
    setShowLogIssue(false);
  };

  // Handle Schedule Inspection Submit
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const newInspection = {
      id: inspections.length + 1,
      project: scheduleForm.project,
      type: scheduleForm.type,
      status: 'Scheduled',
      severity: 'N/A', // or derive from type
    };
    setInspections([newInspection, ...inspections]);
    setScheduleForm({ project: '', type: '', date: '', inspector: '' });
    setShowSchedule(false);
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="row align-items-center mb-4">
        {/* Heading */}
        <div className="col-12 col-md">
          <h3 className="fw-bold mb-2 mb-md-0">Quality & HSE</h3>
        </div>

        {/* Action Buttons */}
        <div className="col-12 col-md-auto d-flex gap-2">
          <Button variant="success" onClick={() => setShowLogIssue(true)}>
            Log Issue
          </Button>
          <Button variant="primary" onClick={() => setShowSchedule(true)}>
            Schedule Inspection
          </Button>
        </div>
      </div>

       <div className="table-responsive">
  <Table striped bordered hover>
    <thead className="table-light">
      <tr>
        <th>Inspection ID</th>
        <th>Project</th>
        <th>Type</th>
        <th>Status</th>
        <th>Severity</th>
      </tr>
    </thead>
    <tbody>
      {inspections.length > 0 ? (
        inspections.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.project}</td>
            <td>{item.type}</td>
            <td>
              <span
                className={`badge ${
                  item.status === 'Open'
                    ? 'bg-warning'
                    : item.status === 'Closed'
                    ? 'bg-secondary'
                    : 'bg-info'
                }`}
              >
                {item.status}
              </span>
            </td>
            <td>
              <span
                className={`badge ${
                  item.severity === 'High'
                    ? 'bg-danger'
                    : item.severity === 'Medium'
                    ? 'bg-warning'
                    : 'bg-success'
                }`}
              >
                {item.severity}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center">
            No inspections found.
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>


      {/* Modal: Log Issue */}
      <Modal show={showLogIssue} onHide={() => setShowLogIssue(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Log Issue</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleLogSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formProject">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  required
                  value={logForm.project}
                  onChange={(e) =>
                    setLogForm({ ...logForm, project: e.target.value })
                  }
                >
                  <option value="">Select Project</option>
                  {projects.map((proj, idx) => (
                    <option key={idx} value={proj}>
                      {proj}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formSeverity">
                <Form.Label>Severity</Form.Label>
                <Form.Select
                  required
                  value={logForm.severity}
                  onChange={(e) =>
                    setLogForm({ ...logForm, severity: e.target.value })
                  }
                >
                  <option value="">Select Severity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={logForm.description}
                onChange={(e) =>
                  setLogForm({ ...logForm, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoto">
              <Form.Label>Photo Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setLogForm({ ...logForm, photo: e.target.files[0] })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLogIssue(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Log Issue
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal: Schedule Inspection */}
      <Modal show={showSchedule} onHide={() => setShowSchedule(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Schedule Inspection</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleScheduleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="scheduleProject">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  required
                  value={scheduleForm.project}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      project: e.target.value,
                    })
                  }
                >
                  <option value="">Select Project</option>
                  {projects.map((proj, idx) => (
                    <option key={idx} value={proj}>
                      {proj}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="scheduleType">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  required
                  value={scheduleForm.type}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, type: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="Safety">Safety</option>
                  <option value="Quality">Quality</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="scheduleDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={scheduleForm.date}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, date: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="scheduleInspector">
                <Form.Label>Inspector</Form.Label>
                <Form.Select
                  required
                  value={scheduleForm.inspector}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      inspector: e.target.value,
                    })
                  }
                >
                  <option value="">Select Inspector</option>
                  {inspectors.map((ins, idx) => (
                    <option key={idx} value={ins}>
                      {ins}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSchedule(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Schedule Inspection
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default QualityHSEE;
