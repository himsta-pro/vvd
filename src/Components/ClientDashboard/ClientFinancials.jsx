// ClientFinancials.js
import React from "react";
import {
  Container,
  Table,
  Badge,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaExclamationCircle,
  FaDownload,
} from "react-icons/fa";

const ClientFinancials = () => {
  // Sample static financial data
  const invoices = [
    { id: "INV-2024-001", amount: 45000, dueDate: "2024-06-15", status: "Paid" },
    { id: "INV-2024-002", amount: 78000, dueDate: "2024-07-01", status: "Overdue" },
    { id: "INV-2024-003", amount: 32000, dueDate: "2024-06-30", status: "Pending" },
    { id: "INV-2024-004", amount: 150000, dueDate: "2024-08-10", status: "Pending" },
    { id: "INV-2024-005", amount: 23000, dueDate: "2024-05-20", status: "Paid" },
    { id: "INV-2024-006", amount: 67000, dueDate: "2024-07-15", status: "Due Soon" },
  ];

  // Status badge helper
  const getStatusBadge = (status) => {
    let variant;
    switch (status) {
      case "Paid":
        variant = "success";
        break;
      case "Overdue":
        variant = "danger";
        break;
      case "Pending":
        variant = "warning";
        break;
      case "Due Soon":
        variant = "info";
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

  // Mock download handler
  const handleDownload = (invoiceId) => {
    alert(`Downloading invoice: ${invoiceId}`);
    // Future: window.open(`/api/invoices/${invoiceId}/download`, "_blank");
  };

  return (
    <div className="">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold mb-1">Financials</h3>
          <p className="text-muted">
            View invoices, payment status, and download billing records.
          </p>
        </Col>
      </Row>

      {/* KPI Cards */}
 <Row className="g-4 mb-4">
  {/* Total Invoices */}
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-primary bg-opacity-10">
      <div className="icon-circle bg-primary text-white mx-auto mb-3">
        <FaFileInvoiceDollar size={22} />
      </div>
      <h6 className="fw-semibold text-primary">Total Invoices</h6>
      <h3 className="fw-bold text-dark">{invoices.length}</h3>
    </Card>
  </Col>

  {/* Paid Invoices */}
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-success bg-opacity-10">
      <div className="icon-circle bg-success text-white mx-auto mb-3">
        <FaCheckCircle size={22} />
      </div>
      <h6 className="fw-semibold text-success">Paid</h6>
      <h3 className="fw-bold text-dark">
        {invoices.filter((i) => i.status === "Paid").length}
      </h3>
    </Card>
  </Col>

  {/* Overdue Invoices */}
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-3 bg-danger bg-opacity-10">
      <div className="icon-circle bg-danger text-white mx-auto mb-3">
        <FaExclamationCircle size={22} />
      </div>
      <h6 className="fw-semibold text-danger">Overdue</h6>
      <h3 className="fw-bold text-dark">
        {invoices.filter((i) => i.status === "Overdue").length}
      </h3>
    </Card>
  </Col>
</Row>


      {/* Invoices Table */}
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Body>
          <h5 className="fw-bold mb-3">Invoice List</h5>
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th>Invoice ID</th>
                  <th>Amount ($)</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th className="text-center">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="fw-semibold">{invoice.id}</td>
                    <td>${invoice.amount.toLocaleString()}</td>
                    <td>
                      {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>{getStatusBadge(invoice.status)}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleDownload(invoice.id)}
                        title="Download Invoice"
                        className="d-flex align-items-center justify-content-center mx-auto"
                        style={{
                          width: "40px",
                          height: "40px",
                          padding: "0",
                          borderRadius: "8px",
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClientFinancials;
