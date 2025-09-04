import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Reports = () => {
  const [reportsData, setReportsData] = useState([
    {
      name: "Monthly Progress Report",
      project: "Swimming Pool Construction - Villa Project",
      date: "2024-01-15",
      format: "PDF",
    },
    {
      name: "Cost Analysis Report",
      project: "Landscape Design - Commercial Complex",
      date: "2024-01-14",
      format: "Excel",
    },
    {
      name: "Quality Check Report",
      project: "Site Survey - Residential Project",
      date: "2024-01-13",
      format: "Word",
    },
  ]);

  const [newReport, setNewReport] = useState({
    name: "",
    project: "",
    date: "",
    format: "PDF",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleAddReport = () => {
    if (newReport.name && newReport.project && newReport.date && newReport.format) {
      setReportsData([...reportsData, newReport]);
      setNewReport({ name: "", project: "", date: "", format: "PDF" });
      const modal = document.getElementById("newReportModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="container-fluid">
      {/* Page Title + Actions */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        {/* Left Side: Title */}
        <div>
          <h3 className="fw-bold mb-1">Reports</h3>
          <p className="text-muted mb-0">Overview of all generated project reports.</p>
        </div>

        {/* Right Side: Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#newReportModal"
          >
            + New Report
          </button>
          <button className="btn btn-outline-secondary">Export All</button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <h5 className="p-3 mb-0 fw-semibold border-bottom">Reports List</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-nowrap">
              <thead className="table-light">
                <tr>
                  <th>Report Name</th>
                  <th>Project</th>
                  <th>Generated Date</th>
                  <th>Format</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((report, index) => (
                  <tr key={index}>
                    <td>{report.name}</td>
                    <td className="text-truncate" style={{ maxWidth: "250px" }}>
                      {report.project}
                    </td>
                    <td>{report.date}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {report.format}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Report Modal */}
      <div
        className="modal fade"
        id="newReportModal"
        tabIndex="-1"
        aria-labelledby="newReportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newReportModalLabel">
                Create New Report
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Report Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newReport.name}
                  onChange={handleInputChange}
                  placeholder="Enter report name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Project</label>
                <input
                  type="text"
                  className="form-control"
                  name="project"
                  value={newReport.project}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Generated Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={newReport.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Format</label>
                <select
                  className="form-select"
                  name="format"
                  value={newReport.format}
                  onChange={handleInputChange}
                >
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="Word">Word</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddReport}
              >
                Add Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
