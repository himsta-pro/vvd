// Reports.js
import React from "react";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { FaFileAlt, FaCalendarAlt, FaDownload } from "react-icons/fa";

const ClientReports = () => {
  // Sample report data
  const reports = [
    {
      id: 1,
      name: "Project Summary",
      project: "Bridge Construction",
      generatedDate: "2024-06-10",
      status: "Generated",
    },
    {
      id: 2,
      name: "Weekly Progress Report",
      project: "Metro Rail Project",
      generatedDate: "2024-06-05",
      status: "Generated",
    },
    {
      id: 3,
      name: "Financial Summary",
      project: "Highway Expansion",
      generatedDate: "2024-06-01",
      status: "Generated",
    },
    {
      id: 4,
      name: "Milestone Review",
      project: "Solar Park Development",
      generatedDate: "2024-05-28",
      status: "Generated",
    },
    {
      id: 5,
      name: "Final Delivery Report",
      project: "Water Treatment Plant",
      generatedDate: "2024-05-20",
      status: "Archived",
    },
  ];

  // Status badge styling
  const getStatusVariant = (status) => {
    return status === "Generated" ? "success" : "secondary";
  };

  // Mock download handler
  const handleDownload = (reportName, projectId) => {
    alert(`Downloading: ${reportName} (Project ID: ${projectId})`);
  };

  return (
    <div className="">
      {/* Page Title */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-dark d-flex align-items-center fw-bold">
            Reports
          </h3>
          <p className="text-muted">View and download project reports.</p>
        </Col>
      </Row>

      {/* Table Card */}
      <div
        className="table-responsive shadow-sm rounded-3"
       
      >
        <Table
          hover
        
          className="align-middle mb-0"
         
        >
          <thead
          >
            <tr>
              <th>Report Name</th>
              <th>Project</th>
              <th>Generated Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.02)")
                }
              >
                <td className="fw-semibold">{report.name}</td>
                <td>{report.project}</td>
                <td>
                  <div className="d-flex align-items-center text-muted">
                    <FaCalendarAlt className="me-2" />
                    {new Date(report.generatedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                </td>
                <td className="text-center">
                  <Badge
                    bg={getStatusVariant(report.status)}
                    className="px-3 py-1 rounded-pill"
                    style={{ fontSize: "0.85em" }}
                  >
                    {report.status}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => handleDownload(report.name, report.id)}
                    title="Download Report"
                    className="d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "40px",
                      height: "40px",
                      padding: "0",
                      borderRadius: "10px",
                      border: "1px solid rgba(0,200,255,0.6)",
                      color: "#00c8ff",
                    }}
                  >
                    <FaDownload style={{ fontSize: "0.9rem" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* No Reports Message */}
      {reports.length === 0 && (
        <Row>
          <Col className="text-center mt-4">
            <p className="text-muted">No reports available at the moment.</p>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ClientReports;
