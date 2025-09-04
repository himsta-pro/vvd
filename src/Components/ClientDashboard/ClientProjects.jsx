// Projects.js
import React from "react";
import {
  Container,
  Table,
  Badge,
  Row,
  Col,
  Card,
  ProgressBar,
} from "react-bootstrap";
import { FaProjectDiagram, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientProjects = () => {
  // Sample static data (replace with API call later)
  const projects = [
    {
      id: 1,
      name: "Bridge Construction",
      contractValue: 2500000,
      progress: 75,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Highway Expansion",
      contractValue: 5200000,
      progress: 100,
      status: "Completed",
    },
    {
      id: 3,
      name: "Metro Rail Project",
      contractValue: 12000000,
      progress: 45,
      status: "In Progress",
    },
    {
      id: 4,
      name: "Water Treatment Plant",
      contractValue: 3400000,
      progress: 10,
      status: "Pending",
    },
    {
      id: 5,
      name: "Solar Park Development",
      contractValue: 8700000,
      progress: 60,
      status: "In Progress",
    },
  ];

  // Helper to render status badge
  const getStatusBadge = (status) => {
    let variant;
    switch (status) {
      case "Completed":
        variant = "success";
        break;
      case "In Progress":
        variant = "primary";
        break;
      case "Pending":
        variant = "warning";
        break;
      default:
        variant = "secondary";
    }
    return (
      <Badge bg={variant} className="px-3 py-2 rounded-pill fw-semibold">
        {status}
      </Badge>
    );
  };

  return (
    <div className="">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold mb-1">Projects</h3>
          <p className="text-muted">
            Track your ongoing, completed, and upcoming projects.
          </p>
        </Col>
      </Row>

      {/* KPI Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-primary bg-opacity-10">
            <div className="icon-circle bg-primary  text-white mx-auto mb-3">
              <FaProjectDiagram size={22} />
            </div>
            <h6 className="fw-semibold">Total Projects</h6>
            <h3 className="fw-bold">{projects.length}</h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-success bg-opacity-10">
            <div className="icon-circle bg-success  text-white mx-auto mb-3">
              <FaCheckCircle size={22} />
            </div>
            <h6 className="fw-semibold">Completed</h6>
            <h3 className="fw-bold">
              {projects.filter((p) => p.status === "Completed").length}
            </h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-warning bg-opacity-10">
            <div className="icon-circle bg-warning  text-white mx-auto mb-3">
              <FaDollarSign size={22} />
            </div>
            <h6 className="fw-semibold">Total Value</h6>
            <h3 className="fw-bold">
              $
              {projects
                .reduce((sum, p) => sum + p.contractValue, 0)
                .toLocaleString()}
            </h3>
          </Card>
        </Col>
      </Row>

      {/* Projects Table */}
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Body>
          <h5 className="fw-bold mb-3">Project List</h5>
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th>Project ID</th>
                  <th>Name</th>
                  <th>Contract Value ($)</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="project-row-hover">
                    <td>
                      <strong>{project.id}</strong>
                    </td>
                    <td>{project.name}</td>
                    <td>${project.contractValue.toLocaleString()}</td>
                    <td style={{ minWidth: "160px" }}>
                      <ProgressBar
                        now={project.progress}
                        label={`${project.progress}%`}
                        variant={
                          project.progress === 100
                            ? "success"
                            : project.progress > 50
                            ? "primary"
                            : "warning"
                        }
                      />
                    </td>
                    <td>{getStatusBadge(project.status)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientProjects;
