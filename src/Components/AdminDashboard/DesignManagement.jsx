import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  FaFile,
  FaUpload,
  FaEdit,
  FaDownload,
  FaSearch,
  FaFilter,
  FaEye,
  FaPencilAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function DesignManagement() {
  const [activeModal, setActiveModal] = useState(null); // track which modal is open
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  const handleShow = (modalType, drawing = null) => {
    setSelectedDrawing(drawing);
    setActiveModal(modalType);
  };

  const handleClose = () => {
    setActiveModal(null);
    setSelectedDrawing(null);
  };

  const drawings = [
    {
      id: "DRW-001",
      project: "Swimming Pool Construction",
      contract: "CON-001",
      stage: "Concept",
      file: "pool_concept_design.dwg",
      size: "2.4 MB",
      date: "2024-01-15",
      status: "Approved",
    },
    {
      id: "DRW-002",
      project: "Swimming Pool Construction",
      contract: "CON-001",
      stage: "Detailed",
      file: "pool_detailed_drawings.dwg",
      size: "5.8 MB",
      date: "2024-01-20",
      status: "Submitted",
    },
    {
      id: "DRW-003",
      project: "Landscape Design",
      contract: "CON-002",
      stage: "Concept",
      file: "landscape_concept.pdf",
      size: "3.2 MB",
      date: "2024-01-18",
      status: "Draft",
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h3 className="fw-bold">Design Management</h3>
          <p className="text-muted">
            Manage project drawings and design submissions across all stages.
          </p>
        </div>
        <button
          onClick={() => handleShow("upload")}
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <FaUpload /> Upload Drawing
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        {/* Total Drawings */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100 bg-primary bg-opacity-10">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <FaFile className="text-primary me-2" size={22} />
              <span className="fw-bold text-primary">Total Drawings</span>
            </div>
            <div className="fs-3 fw-bold text-primary">3</div>
          </div>
        </div>

        {/* Concept Stage */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100 bg-danger bg-opacity-10">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <FaUpload className="text-danger me-2" size={22} />
              <span className="fw-bold text-danger">Concept Stage</span>
            </div>
            <div className="fs-3 fw-bold text-danger">2</div>
          </div>
        </div>

        {/* Detailed Stage */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100 bg-info bg-opacity-10">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <FaEdit className="text-info me-2" size={22} />
              <span className="fw-bold text-info">Detailed Stage</span>
            </div>
            <div className="fs-3 fw-bold text-info">1</div>
          </div>
        </div>

        {/* IFC Stage */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100 bg-success bg-opacity-10">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <FaDownload className="text-success me-2" size={22} />
              <span className="fw-bold text-success">IFC Stage</span>
            </div>
            <div className="fs-3 fw-bold text-success">0</div>
          </div>
        </div>
      </div>


      {/* Search + Filter */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2 position-relative">
          <Form.Control
            type="text"
            placeholder="Search by project or filename..."
            className="ps-5"
          />
          <FaSearch
            className="text-muted position-absolute"
            style={{ top: "50%", left: "15px", transform: "translateY(-50%)" }}
          />
        </div>
        <div className="col-md-3 mb-2">
          <Form.Select>
            <option>All Stages</option>
            <option>Concept</option>
            <option>Detailed</option>
            <option>IFC</option>
          </Form.Select>
        </div>
        <div className="col-md-3 mb-2">
          <button
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
            onClick={() => handleShow("filter")}
          >
            <FaFilter className="me-2" /> More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table align-middle table-hover">
          <thead className="table-light">
            <tr>
              <th>DRAWING ID</th>
              <th>PROJECT</th>
              <th>STAGE</th>
              <th>FILE DETAILS</th>
              <th>SUBMISSION DATE</th>
              <th>STATUS</th>
              <th className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {drawings.map((d) => (
              <tr key={d.id}>
                <td className="text-primary fw-bold">{d.id}</td>
                <td>
                  {d.project}
                  <div className="text-muted small">{d.contract}</div>
                </td>
                <td>
                  <span
                    className={`badge ${d.stage === "Concept"
                      ? "bg-info text-light"        // light bg + teal text
                      : d.stage === "Detailed"
                        ? "bg-primary text-light"   // light bg + blue text
                        : "bg-secondary text-light" // light bg + gray text
                      }`}
                  >
                    {d.stage}
                  </span>
                </td>

                <td>
                  <div className="fw-medium">{d.file}</div>
                  <div className="text-muted small">{d.size}</div>
                </td>
                <td>{d.date}</td>
                <td>
                  <span
                    className={`badge ${d.status === "Approved"
                      ? "bg-success"
                      : d.status === "Submitted"
                        ? "bg-info"
                        : "bg-secondary"
                      }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => handleShow("view", d)}
                  >
                    <FaEye className="text-primary" />
                  </Button>
                  <Button size="sm" variant="link">
                    <FaDownload className="text-danger" />
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => handleShow("edit", d)}
                  >
                    <FaPencilAlt className="text-success" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Drawing Modal */}
      <Modal show={activeModal === "upload"} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Drawing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Select>
                <option>Select Project</option>
                <option>Swimming Pool Construction</option>
                <option>Landscape Design</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Design Stage</Form.Label>
              <Form.Select>
                <option>Concept</option>
                <option>Detailed</option>
                <option>IFC</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Drawing File</Form.Label>
              <div
                className="border rounded p-4 text-center"
                style={{ cursor: "pointer" }}
              >
                <FaUpload size={24} className="text-primary mb-2" />
                <div>
                  <a href="#">Upload a file</a> or drag and drop
                </div>
                <small className="text-muted">DWG, PDF, DXF up to 10MB</small>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Upload Drawing</Button>
        </Modal.Footer>
      </Modal>

      {/* View Drawing Modal */}
      <Modal show={activeModal === "view"} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Drawing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDrawing ? (
            <>
              <p>
                <strong>Drawing ID:</strong> {selectedDrawing.id}
              </p>
              <p>
                <strong>Project:</strong> {selectedDrawing.project}
              </p>
              <p>
                <strong>Stage:</strong> {selectedDrawing.stage}
              </p>
              <p>
                <strong>File:</strong> {selectedDrawing.file}
              </p>
              <p>
                <strong>Status:</strong> {selectedDrawing.status}
              </p>
            </>
          ) : (
            <p>No drawing selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Drawing Modal */}
      <Modal show={activeModal === "edit"} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Drawing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDrawing && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project</Form.Label>
                <Form.Control type="text" defaultValue={selectedDrawing.project} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Design Stage</Form.Label>
                <Form.Select defaultValue={selectedDrawing.stage}>
                  <option>Concept</option>
                  <option>Detailed</option>
                  <option>IFC</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select defaultValue={selectedDrawing.status}>
                  <option>Draft</option>
                  <option>Submitted</option>
                  <option>Approved</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Filter Modal */}
      <Modal show={activeModal === "filter"} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Advanced Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Control type="text" placeholder="Enter project name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option>All</option>
                <option>Draft</option>
                <option>Submitted</option>
                <option>Approved</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Range</Form.Label>
              <Form.Control type="date" className="mb-2" />
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Apply Filters</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DesignManagement;
