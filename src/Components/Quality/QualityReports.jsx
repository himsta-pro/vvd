import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reports = () => {
  const [reportType, setReportType] = useState('inspection');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    console.log('Generating report:', { reportType, startDate, endDate });
    alert(`Generating ${reportType === 'inspection' ? 'Inspection Summary' : 'Issue Tracker'} report`);
  };

  // Mock Data for Recent Projects
  const recentProjects = [
    { id: 'PRJ001', name: 'Swimming Pool Complex', client: 'ABC Resort', status: 'In Progress', value: '$150,000', progress: 75 },
    { id: 'PRJ002', name: 'Office Building', client: 'XYZ Corp', status: 'Design Phase', value: '$300,000', progress: 45 },
    { id: 'PRJ003', name: 'Residential Villa', client: 'John Smith', status: 'Procurement', value: '$200,000', progress: 60 },
    { id: 'PRJ004', name: 'Shopping Mall', client: 'Mall Group', status: 'Quality Check', value: '$800,000', progress: 90 },
  ];

  // Mock Data for RFQ Reports
  const rfqReports = [
    { id: 'RFQ001', project: 'Office Building', vendor: 'ABC Supplies', submitted: '2023-05-15', status: 'Under Review', amount: '$45,000' },
    { id: 'RFQ002', project: 'Residential Villa', vendor: 'XYZ Materials', submitted: '2023-06-20', status: 'Approved', amount: '$28,500' },
    { id: 'RFQ003', project: 'Shopping Mall', vendor: 'Global Builders', submitted: '2023-07-10', status: 'Rejected', amount: '$120,000' },
    { id: 'RFQ004', project: 'Swimming Pool', vendor: 'Aqua Tech', submitted: '2023-08-05', status: 'Pending', amount: '$65,000' },
  ];

  // Mock Data for Financial Reports
  const financialReports = [
    { id: 'FIN001', project: 'Office Building', budget: '$300,000', spent: '$245,000', remaining: '$55,000', variance: '-5%' },
    { id: 'FIN002', project: 'Residential Villa', budget: '$200,000', spent: '$180,000', remaining: '$20,000', variance: '-2%' },
    { id: 'FIN003', project: 'Shopping Mall', budget: '$800,000', spent: '$720,000', remaining: '$80,000', variance: '+3%' },
    { id: 'FIN004', project: 'Swimming Pool', budget: '$150,000', spent: '$110,000', remaining: '$40,000', variance: '+5%' },
  ];

  // Mock Data for Risk Register
  const riskRegister = [
    { id: 'RISK001', project: 'Office Building', risk: 'Material Shortage', impact: 'High', probability: 'Medium', status: 'Mitigated' },
    { id: 'RISK002', project: 'Residential Villa', risk: 'Permit Delays', impact: 'Medium', probability: 'High', status: 'Monitoring' },
    { id: 'RISK003', project: 'Shopping Mall', risk: 'Labor Strike', impact: 'Critical', probability: 'Low', status: 'Contingency Plan' },
    { id: 'RISK004', project: 'Swimming Pool', risk: 'Design Changes', impact: 'Medium', probability: 'Medium', status: 'Resolved' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-primary';
      case 'Design Phase': return 'bg-info';
      case 'Procurement': return 'bg-warning';
      case 'Quality Check': return 'bg-success';
      case 'Under Review': return 'bg-info';
      case 'Approved': return 'bg-success';
      case 'Rejected': return 'bg-danger';
      case 'Pending': return 'bg-warning';
      case 'Mitigated': return 'bg-success';
      case 'Monitoring': return 'bg-warning';
      case 'Contingency Plan': return 'bg-info';
      case 'Resolved': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Critical': return 'text-danger fw-bold';
      case 'High': return 'text-warning fw-bold';
      case 'Medium': return 'text-info';
      case 'Low': return 'text-success';
      default: return '';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Project ID</th>
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Value</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <a href="#" className="text-decoration-none fw-bold text-primary">
                        {project.id}
                      </a>
                    </td>
                    <td>{project.name}</td>
                    <td>{project.client}</td>
                    <td>
                      <span className={`badge ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.value}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${project.progress}%` }}
                            aria-valuenow={project.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small className="text-muted">{project.progress}%</small>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-sm text-primary">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm text-success ms-2">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'analytics':
        return (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Project Status Distribution</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <div className="chart-container" style={{ position: 'relative', height: '250px', width: '250px' }}>
                      <div className="chart-placeholder bg-light rounded d-flex align-items-center justify-content-center">
                        <div className="text-center">
                          <i className="fas fa-chart-pie fa-3x text-primary mb-2"></i>
                          <p>Project Status Chart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-primary me-2">In Progress</span>
                      <span>8 projects (33%)</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-info me-2">Design Phase</span>
                      <span>6 projects (25%)</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-warning me-2">Procurement</span>
                      <span>5 projects (21%)</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-success me-2">Quality Check</span>
                      <span>5 projects (21%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Budget vs Actual Spending</h5>
                </div>
                <div className="card-body">
                  <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
                    <div className="chart-placeholder bg-light rounded d-flex align-items-center justify-content-center h-100">
                      <div className="text-center">
                        <i className="fas fa-chart-bar fa-3x text-success mb-2"></i>
                        <p>Budget vs Actual Chart</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Budget:</span>
                      <strong>$2,450,000</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Actual Spending:</span>
                      <strong>$2,255,000</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Remaining:</span>
                      <strong className="text-success">$195,000</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'rfq':
        return (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>RFQ ID</th>
                  <th>Project</th>
                  <th>Vendor</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfqReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <a href="#" className="text-decoration-none fw-bold text-primary">
                        {report.id}
                      </a>
                    </td>
                    <td>{report.project}</td>
                    <td>{report.vendor}</td>
                    <td>{report.submitted}</td>
                    <td>
                      <span className={`badge ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>{report.amount}</td>
                    <td>
                      <button className="btn btn-sm text-primary">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm text-success ms-2">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'financial':
        return (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Report ID</th>
                  <th>Project</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th>Remaining</th>
                  <th>Variance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {financialReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <a href="#" className="text-decoration-none fw-bold text-primary">
                        {report.id}
                      </a>
                    </td>
                    <td>{report.project}</td>
                    <td>{report.budget}</td>
                    <td>{report.spent}</td>
                    <td>{report.remaining}</td>
                    <td>
                      <span className={report.variance.startsWith('+') ? 'text-success' : 'text-danger'}>
                        {report.variance}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm text-primary">
                        <i className="fas fa-file-invoice-dollar"></i>
                      </button>
                      <button className="btn btn-sm text-success ms-2">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'risk':
        return (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Risk ID</th>
                  <th>Project</th>
                  <th>Risk Description</th>
                  <th>Impact</th>
                  <th>Probability</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riskRegister.map((risk) => (
                  <tr key={risk.id}>
                    <td>
                      <a href="#" className="text-decoration-none fw-bold text-primary">
                        {risk.id}
                      </a>
                    </td>
                    <td>{risk.project}</td>
                    <td>{risk.risk}</td>
                    <td className={getImpactColor(risk.impact)}>{risk.impact}</td>
                    <td>{risk.probability}</td>
                    <td>
                      <span className={`badge ${getStatusColor(risk.status)}`}>
                        {risk.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm text-primary">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm text-warning ms-2">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h3 className="fw-bold mb-3 mb-md-0">Reports Dashboard</h3>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">
            <i className="fas fa-download me-1"></i> Export
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm border-0 text-center p-3 bg-primary bg-opacity-10">
            <div className="text-primary fs-2 mb-2">
              <i className="fas fa-project-diagram"></i>
            </div>
            <h4 className="fw-bold mb-0">24</h4>
            <small className="text-muted">Total Projects</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm border-0 text-center p-3 bg-success bg-opacity-10">
            <div className="text-success fs-2 mb-2">
              <i className="fas fa-play-circle"></i>
            </div>
            <h4 className="fw-bold mb-0">8</h4>
            <small className="text-muted">Active Projects</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm border-0 text-center p-3 bg-info bg-opacity-10">
            <div className="text-info fs-2 mb-2">
              <i className="fas fa-check-circle"></i>
            </div>
            <h4 className="fw-bold mb-0">16</h4>
            <small className="text-muted">Completed</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm border-0 text-center p-3 bg-warning bg-opacity-10">
            <div className="text-warning fs-2 mb-2">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <h4 className="fw-bold mb-0">$2.45M</h4>
            <small className="text-muted">Total Value</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm border-0 text-center p-3 bg-secondary bg-opacity-10">
            <div className="text-secondary fs-2 mb-2">
              <i className="fas fa-file-invoice"></i>
            </div>
            <h4 className="fw-bold mb-0">12</h4>
            <small className="text-muted">Pending Invoices</small>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-2">
          <div className="card shadow-sm border-0 text-center p-3 bg-danger bg-opacity-10">
            <div className="text-danger fs-2 mb-2">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h4 className="fw-bold mb-0">3</h4>
            <small className="text-muted">Overdue</small>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-project-diagram me-2"></i>Project Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fas fa-chart-line me-2"></i>Analytics Charts
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'rfq' ? 'active' : ''}`}
            onClick={() => setActiveTab('rfq')}
          >
            <i className="fas fa-file-contract me-2"></i>RFQ Reports
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'financial' ? 'active' : ''}`}
            onClick={() => setActiveTab('financial')}
          >
            <i className="fas fa-money-bill-wave me-2"></i>Financial Reports
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'risk' ? 'active' : ''}`}
            onClick={() => setActiveTab('risk')}
          >
            <i className="fas fa-exclamation-triangle me-2"></i>Risk Register
          </button>
        </li>
      </ul>

      {/* Filters */}
      <div className="row align-items-end g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="reportType" className="form-label mb-0 text-nowrap">
              Report Type:
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-select"
            >
              <option value="inspection">Inspection Summary</option>
              <option value="issue">Issue Tracker</option>
            </select>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="d-flex align-items-center">
            <label className="form-label me-2 mb-0">Date Range:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              placeholderText="Select date range"
              isClearable
              className="form-control"
            />
          </div>
        </div>

        <div className="col-12 col-md-4">
          <button
            onClick={handleGenerateReport}
            className="btn btn-primary w-100"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Reports;