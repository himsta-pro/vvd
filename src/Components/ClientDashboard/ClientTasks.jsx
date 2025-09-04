// ClientTasks.js
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
import { FaTasks, FaCheckCircle, FaSpinner } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientTasks = () => {
  // Sample static task data (replace with API later)
  const tasks = [
    { id: 101, title: "Site Inspection", progress: 100, status: "Completed" },
    { id: 102, title: "Design Review Meeting", progress: 80, status: "In Progress" },
    { id: 103, title: "Soil Testing", progress: 40, status: "In Progress" },
    { id: 104, title: "Permit Approval", progress: 10, status: "Pending" },
    { id: 105, title: "Final Handover Documentation", progress: 0, status: "Not Started" },
    { id: 106, title: "Weekly Progress Report", progress: 65, status: "In Progress" },
  ];

  // Status Badge Renderer
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
      case "Not Started":
        variant = "secondary";
        break;
      default:
        variant = "dark";
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
          <h3 className="fw-bold mb-1">Tasks</h3>
          <p className="text-muted">Manage and track project-related tasks easily.</p>
        </Col>
      </Row>

      {/* KPI Cards */}
<Row className="g-4 mb-4">
  {/* Total Tasks */}
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-primary bg-opacity-10">
      <div className="icon-circle bg-primary text-white mx-auto mb-3">
        <FaTasks size={22} />
      </div>
      <h6 className="fw-semibold text-primary">Total Tasks</h6>
      <h3 className="fw-bold text-dark">{tasks.length}</h3>
    </Card>
  </Col>

  {/* Completed Tasks */}
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-success bg-opacity-10">
      <div className="icon-circle bg-success text-white mx-auto mb-3">
        <FaCheckCircle size={22} />
      </div>
      <h6 className="fw-semibold text-success">Completed</h6>
      <h3 className="fw-bold text-dark">
        {tasks.filter((t) => t.status === "Completed").length}
      </h3>
    </Card>
  </Col>

  {/* In Progress Tasks */}
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-warning bg-opacity-10">
      <div className="icon-circle bg-warning text-white mx-auto mb-3">
        <FaSpinner size={22} />
      </div>
      <h6 className="fw-semibold text-warning">In Progress</h6>
      <h3 className="fw-bold text-dark">
        {tasks.filter((t) => t.status === "In Progress").length}
      </h3>
    </Card>
  </Col>
</Row>


      {/* Tasks Table */}
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Body>
          <h5 className="fw-bold mb-3">Task List</h5>
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th>Task ID</th>
                  <th>Title</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="task-row-hover">
                    <td><strong>{task.id}</strong></td>
                    <td>{task.title}</td>
                    <td style={{ minWidth: "160px" }}>
                      <ProgressBar
                        now={task.progress}
                        label={`${task.progress}%`}
                        variant={
                          task.progress === 100
                            ? "success"
                            : task.progress > 50
                            ? "primary"
                            : task.progress > 0
                            ? "warning"
                            : "secondary"
                        }
                      />
                    </td>
                    <td>{getStatusBadge(task.status)}</td>
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

export default ClientTasks;
