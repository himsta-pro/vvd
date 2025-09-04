import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaFilePdf, FaClipboardCheck, FaWrench } from 'react-icons/fa';

const ProjectCloseout = () => {
  // State for form data
  const [formData, setFormData] = useState({
    finalInspectionDate: '',
    snagListResolved: '',
    asBuiltDrawingsSubmitted: '',
    handoverDate: '',
    warrantyPeriod: '',
    closureStatus: 'Pending'
  });

  // State for modals
  const [showFinalInspectionModal, setShowFinalInspectionModal] = useState(false);
  const [showSnagListModal, setShowSnagListModal] = useState(false);
  const [showDrawingsModal, setShowDrawingsModal] = useState(false);
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setShowSubmitModal(true);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      finalInspectionDate: '',
      snagListResolved: '',
      asBuiltDrawingsSubmitted: '',
      handoverDate: '',
      warrantyPeriod: '',
      closureStatus: 'Pending'
    });
  };

  return (
    <div className="">
      <h3 className="mb-4 fw-bold">
        Project Closeout Form
      </h3>

      <div className="card border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label className="d-flex align-items-center ">
                    <FaCalendarAlt className="me-2" />
                    <span>Final Inspection Date</span>
                  </Form.Label>

                  <div className="d-flex">
                    <Form.Control
                      type="date"
                      name="finalInspectionDate"
                      value={formData.finalInspectionDate}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowFinalInspectionModal(true)}
                    >
                      <FaExclamationCircle />
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className='d-flex align-items-center'>
                    <FaWrench className="me-2" />
                    <span>
                      Snag List Resolved
                    </span>
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Select
                      name="snagListResolved"
                      value={formData.snagListResolved}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowSnagListModal(true)}
                    >
                      <FaExclamationCircle />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label className='d-flex align-items-center'>
                    <FaFilePdf className="me-2" />
                    <span>As-Built Drawings Submitted</span>
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Select
                      name="asBuiltDrawingsSubmitted"
                      value={formData.asBuiltDrawingsSubmitted}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowDrawingsModal(true)}
                    >
                      <FaExclamationCircle />
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className='d-flex align-items-center'>
                    <FaCalendarAlt className="me-2" />
                    <span>Handover Date</span>
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="date"
                      name="handoverDate"
                      value={formData.handoverDate}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowHandoverModal(true)}
                    >
                      <FaExclamationCircle />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6} className='mb-3'>
                <Form.Group>
                  <Form.Label>Warranty Period (months)</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="number"
                      name="warrantyPeriod"
                      value={formData.warrantyPeriod}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowWarrantyModal(true)}
                    >
                      <FaExclamationCircle />
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Closure Status</Form.Label>
                  <div className="d-flex">
                    <Form.Select
                      name="closureStatus"
                      value={formData.closureStatus}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowStatusModal(true)}
                    >
                      <FaExclamationCircle />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="outline-secondary" className="me-2" onClick={handleReset}>
                Reset Form
              </Button>
              <Button variant="primary" type="submit">
                Submit Closeout Form
              </Button>
            </div>
          </Form>
        </Card.Body>
      </div>

      {/* Information Modals */}
      <Modal show={showFinalInspectionModal} onHide={() => setShowFinalInspectionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Final Inspection Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the date when the final inspection of the project was completed. This should be the date when all construction work was verified against project specifications.</p>
          <p className="mb-0"><strong>Note:</strong> This date must be after the project start date and before the handover date.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFinalInspectionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSnagListModal} onHide={() => setShowSnagListModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Snag List Resolved</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Indicate whether all items on the snag list have been resolved. A snag list contains minor defects or omissions in the project that need to be addressed before final acceptance.</p>
          <p className="mb-0"><strong>Note:</strong> Project closeout cannot be completed until all snag list items are resolved.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSnagListModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDrawingsModal} onHide={() => setShowDrawingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>As-Built Drawings Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Indicate whether the as-built drawings have been submitted. As-built drawings reflect all changes made during the construction process and show the exact final built configuration.</p>
          <p className="mb-0"><strong>Note:</strong> These are essential for future maintenance and renovations.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDrawingsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showHandoverModal} onHide={() => setShowHandoverModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Handover Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the date when the project was officially handed over to the client or operations team. This marks the formal transition from construction to operation.</p>
          <p className="mb-0"><strong>Note:</strong> This date should be after the final inspection date.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHandoverModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWarrantyModal} onHide={() => setShowWarrantyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Warranty Period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Specify the warranty period in months. This is the duration during which the contractor is responsible for fixing any defects that arise from materials or workmanship.</p>
          <p className="mb-0"><strong>Note:</strong> Standard warranty periods are typically 12-24 months but may vary by contract.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWarrantyModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Closure Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select the current closure status of the project:</p>
          <ul>
            <li><strong>Pending:</strong> Closeout process has not yet started</li>
            <li><strong>In Progress:</strong> Closeout activities are underway</li>
            <li><strong>Completed:</strong> All closeout activities are finished</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCheckCircle className="text-success me-2" />
            Form Submitted Successfully
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your project closeout form has been submitted successfully. The project closure process will now be initiated.</p>
          <p className="mb-0">You will receive a confirmation email shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSubmitModal(false)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectCloseout;