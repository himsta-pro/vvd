import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
  FaChartLine,
  FaFlagCheckered,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";

const ClientDashboard = () => {
  // Mock Data
  const projectProgress = 76;
  const milestonesAchieved = 5;
  const invoicesPending = 3;

  const milestones = [
    { id: 1, title: "Project Kickoff", date: "2024-09-01", status: "completed" },
    { id: 2, title: "Design Phase", date: "2024-09-10", status: "completed" },
    { id: 3, title: "Development Start", date: "2024-09-20", status: "completed" },
    { id: 4, title: "Beta Testing", date: "2024-10-15", status: "pending" },
    { id: 5, title: "Final Delivery", date: "2024-11-05", status: "pending" },
  ];

  return (
    <div className="">
      {/* Page Header */}
      <h3 className="fw-bold mb-1">Client Dashboard</h3>
      <p className="text-muted mb-4">
        Overview of your project progress, milestones, and invoices.
      </p>

      {/* KPI Cards Section */}
      <Row className="g-4 mb-5">
        {/* Project Progress */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3 bg-primary bg-opacity-10">
            <Card.Body className="text-center">
              <div className="icon-circle bg-primary text-white mb-3 mx-auto">
                <FaChartLine size={22} />
              </div>
              <h6 className="fw-semibold text-primary">Project Progress</h6>
              <h3 className="fw-bold text-dark">{projectProgress}%</h3>
              <small className="text-success">+2.1% this month</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Milestones Achieved */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3 bg-warning bg-opacity-10">
            <Card.Body className="text-center">
              <div className="icon-circle bg-warning text-white mb-3 mx-auto">
                <FaFlagCheckered size={22} />
              </div>
              <h6 className="fw-semibold text-warning">Milestones Achieved</h6>
              <h3 className="fw-bold text-dark">{milestonesAchieved}</h3>
              <small className="text-success">+2 completed</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Invoices Pending */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3 bg-danger bg-opacity-10">
            <Card.Body className="text-center">
              <div className="icon-circle bg-danger text-white mb-3 mx-auto">
                <FaMoneyBillWave size={22} />
              </div>
              <h6 className="fw-semibold text-danger">Invoices Pending</h6>
              <h3 className="fw-bold text-dark">{invoicesPending}</h3>
              <small className="text-danger">Urgent</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="g-4">
        {/* Project Milestones Timeline */}
        <div>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body>
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-secondary" /> Project
                Milestones
              </h5>
              <div className="timeline">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-3 mb-3 border rounded-3 timeline-card-hover"
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      {/* Title */}
                      <h6 className="fw-semibold mb-1">{milestone.title}</h6>
                      {/* Date + Status */}
                      <div className="text-end">
                        <small className="text-muted d-flex align-items-center justify-content-end">
                          <FaCalendarAlt className="me-1" />
                          {new Date(milestone.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </small>
                        <Badge
                          bg={milestone.status === "completed" ? "success" : "secondary"}
                          className="mt-1"
                        >
                          {milestone.status === "completed" ? "Done" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
