import React, { useState } from "react";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleGenerateReport = () => {
    alert(`Generating ${reportType} for ${dateRange}`);
  };

  return (
    <div className="">
      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Reports</h3>
        <p className="text-muted">Generate financial and performance reports.</p>
      </div>

      {/* Report Selection Form */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Generate Report</h5>
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Report Type</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="">Select Report Type</option>
                <option value="Income Statement">Income Statement</option>
                <option value="Cash Flow">Cash Flow</option>
                <option value="Aging Report">Aging Report</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Date Range</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Jan 01, 2024 - Jan 31, 2024"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={handleGenerateReport}
              disabled={!reportType || !dateRange}
            >
              Generate Report
            </button>
          </form>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Recent Reports</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Report Type</th>
                  <th>Date Range</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Income Statement</td>
                  <td>Jan 01 - Jan 31, 2024</td>
                  <td><span className="badge bg-success">Completed</span></td>
                </tr>
                <tr>
                  <td>Cash Flow</td>
                  <td>Dec 01 - Dec 31, 2023</td>
                  <td><span className="badge bg-success">Completed</span></td>
                </tr>
                <tr>
                  <td>Aging Report</td>
                  <td>Nov 01 - Nov 30, 2023</td>
                  <td><span className="badge bg-warning text-dark">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
