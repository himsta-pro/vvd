import React, { useState } from 'react';
import {
  BsCurrencyDollar, BsGraphUp, BsGraphDown, BsReceipt,
  BsCashStack, BsClockHistory, BsSearch, BsPlusCircle,
  BsEye, BsPencilSquare, BsPrinter, BsClipboardCheck,
  BsArrowDownCircle, BsArrowUpCircle, BsPercent,
  BsDownload
} from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

const Financials = () => {
  // Modal States
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  // Selected item state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Modals
  const handleShowInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };
  const handleCloseInvoiceDetails = () => setShowInvoiceDetails(false);

  const handleShowGenerateInvoice = () => setShowGenerateInvoice(true);
  const handleCloseGenerateInvoice = () => setShowGenerateInvoice(false);

  const handleShowPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };
  const handleClosePaymentDetails = () => setShowPaymentDetails(false);

  const handleShowRecordPayment = () => setShowRecordPayment(true);
  const handleCloseRecordPayment = () => setShowRecordPayment(false);

  // Mock Data
  const projects = [
    {
      id: 'CON-001',
      name: 'Downtown Tower',
      budget: 5000000,
      actualCost: 4250000,
      invoicesRaised: 12,
      paymentsReceived: 3850000,
      retention: 400000,
      completion: 85,
      status: 'On Track'
    },
    {
      id: 'CON-002',
      name: 'Residential Complex',
      budget: 3500000,
      actualCost: 3200000,
      invoicesRaised: 8,
      paymentsReceived: 2800000,
      retention: 400000,
      completion: 75,
      status: 'On Track'
    },
    {
      id: 'CON-003',
      name: 'Luxury Villas',
      budget: 2800000,
      actualCost: 3100000,
      invoicesRaised: 10,
      paymentsReceived: 2500000,
      retention: 300000,
      completion: 65,
      status: 'Over Budget'
    }
  ];

  const invoices = [
    {
      id: 'INV-2023-001',
      projectId: 'CON-001',
      projectName: 'Downtown Tower',
      amount: 450000,
      date: '2023-05-15',
      dueDate: '2023-06-15',
      status: 'Paid',
      grnRef: 'GRN-2023-045'
    },
    {
      id: 'INV-2023-002',
      projectId: 'CON-001',
      projectName: 'Downtown Tower',
      amount: 385000,
      date: '2023-06-20',
      dueDate: '2023-07-20',
      status: 'Paid',
      grnRef: 'GRN-2023-052'
    },
    {
      id: 'INV-2023-003',
      projectId: 'CON-002',
      projectName: 'Residential Complex',
      amount: 320000,
      date: '2023-05-25',
      dueDate: '2023-06-25',
      status: 'Paid',
      grnRef: 'GRN-2023-048'
    },
    {
      id: 'INV-2023-004',
      projectId: 'CON-002',
      projectName: 'Residential Complex',
      amount: 275000,
      date: '2023-07-10',
      dueDate: '2023-08-10',
      status: 'Pending',
      grnRef: 'GRN-2023-061'
    },
    {
      id: 'INV-2023-005',
      projectId: 'CON-003',
      projectName: 'Luxury Villas',
      amount: 310000,
      date: '2023-06-05',
      dueDate: '2023-07-05',
      status: 'Overdue',
      grnRef: 'GRN-2023-050'
    }
  ];

  const payments = [
    {
      id: 'PAY-2023-001',
      invoiceId: 'INV-2023-001',
      amount: 450000,
      date: '2023-06-10',
      method: 'Bank Transfer',
      reference: 'TRX-78945612'
    },
    {
      id: 'PAY-2023-002',
      invoiceId: 'INV-2023-002',
      amount: 385000,
      date: '2023-07-15',
      method: 'Bank Transfer',
      reference: 'TRX-78945633'
    },
    {
      id: 'PAY-2023-003',
      invoiceId: 'INV-2023-003',
      amount: 320000,
      date: '2023-06-20',
      method: 'Cheque',
      reference: 'CHQ-784512'
    },
    {
      id: 'PAY-2023-004',
      invoiceId: 'INV-2023-005',
      amount: 150000,
      date: '2023-07-01',
      method: 'Bank Transfer',
      reference: 'TRX-78945789'
    }
  ];

  // Calculate variance
  const calculateVariance = (budget, actual) => {
    return budget - actual;
  };

  // Calculate variance percentage
  const calculateVariancePercentage = (budget, actual) => {
    return ((budget - actual) / budget * 100).toFixed(2);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'bg-success';
      case 'Pending': return 'bg-warning text-dark';
      case 'Overdue': return 'bg-danger';
      case 'On Track': return 'bg-success';
      case 'Over Budget': return 'bg-danger';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="">
      {/* Top Navigation Bar */}
      <div className="mb-4">
        <div className="row align-items-center g-3">
          {/* Heading on Left */}
          <div className="col-12 col-md-4 col-lg-3">
            <h3 className="mb-0 fw-bold">Financials Module</h3>
          </div>

          {/* Search + Buttons on Right */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className="d-flex flex-column flex-sm-row justify-content-end align-items-stretch align-items-sm-center gap-2">

              {/* Search */}
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <span className="input-group-text bg-light border-end-0">
                  <BsSearch />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search projects, invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-primary d-flex align-items-center" onClick={handleShowGenerateInvoice}>
                  <BsPlusCircle className="me-1" /> New Invoice
                </button>
                <button className="btn btn-success d-flex align-items-center" onClick={handleShowRecordPayment}>
                  <BsCashStack className="me-1" /> Record Payment
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="">
        {/* Stats Cards */}
     <div className="row mb-4 g-3">
  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card bg-primary border-0 bg-opacity-10 text-primary stats-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Total Budget</h6>
            <h3 className="card-text">{formatCurrency(11300000)}</h3>
          </div>
          <BsCurrencyDollar size={36} />
        </div>
        <p className="mb-0">Across all projects</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card bg-info border-0 bg-opacity-10 text-info stats-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Actual Cost</h6>
            <h3 className="card-text">{formatCurrency(10550000)}</h3>
          </div>
          <BsGraphUp size={36} />
        </div>
        <p className="mb-0">Total spent</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card bg-success border-0 bg-opacity-10 text-success stats-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Payments Received</h6>
            <h3 className="card-text">{formatCurrency(9150000)}</h3>
          </div>
          <BsCashStack size={36} />
        </div>
        <p className="mb-0">86.7% collection rate</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card bg-warning border-0 bg-opacity-10 text-warning stats-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="card-title">Retention Held</h6>
            <h3 className="card-text">{formatCurrency(1100000)}</h3>
          </div>
          <BsClockHistory size={36} />
        </div>
        <p className="mb-0">To be released</p>
      </div>
    </div>
  </div>
</div>


        {/* Project Financials */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">Project Financial Summary</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Budgeted Cost</th>
                    <th>Actual Cost</th>
                    <th>Variance</th>
                    <th>Invoices Raised</th>
                    <th>Payments Received</th>
                    <th>Retention</th>
                    <th>Completion</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => {
                    const variance = calculateVariance(project.budget, project.actualCost);
                    const variancePercent = calculateVariancePercentage(project.budget, project.actualCost);

                    return (
                      <tr key={project.id}>
                        <td className="fw-bold">{project.id}</td>
                        <td>{project.name}</td>
                        <td>{formatCurrency(project.budget)}</td>
                        <td>{formatCurrency(project.actualCost)}</td>
                        <td className={variance >= 0 ? 'positive-variance fw-bold' : 'negative-variance fw-bold'}>
                          {formatCurrency(variance)} ({variancePercent}%)
                        </td>
                        <td>{project.invoicesRaised}</td>
                        <td>{formatCurrency(project.paymentsReceived)}</td>
                        <td>{formatCurrency(project.retention)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress w-100 me-2" style={{ height: '8px' }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${project.completion}%` }}
                                aria-valuenow={project.completion}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span>{project.completion}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getStatusClass(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="">
          {/* Invoices */}
          <div className="">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Invoices Raised</h5>
                <span className="badge bg-light text-dark">Total: {invoices.length}</span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="text-nowrap">Invoice ID</th>
                        <th className="text-nowrap">Project</th>
                        <th className="text-nowrap">Amount</th>
                        <th className="text-nowrap">Due Date</th>
                        <th className="text-nowrap">Status</th>
                        <th className="text-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="fw-bold text-nowrap">{invoice.id}</td>
                          <td className="text-truncate">
                            <div>{invoice.projectName}</div>
                            <div className="small text-muted">{invoice.projectId}</div>
                          </td>
                          <td className="text-nowrap">{formatCurrency(invoice.amount)}</td>
                          <td className="text-nowrap">{invoice.dueDate}</td>
                          <td className="text-nowrap">
                            <span
                              className={`badge ${getStatusClass(invoice.status)}`}
                            >
                              {invoice.status}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex">
                              <button
                                className="btn text-primary"
                                onClick={() => handleShowInvoiceDetails(invoice)}
                              >
                                <BsEye />
                              </button>
                              <button className="btn text-secondary">
                                <BsDownload />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Payments */}
          <div className="mt-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Payments Received</h5>
                <span className="badge bg-light text-dark">Total: {payments.length}</span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover ">
                    <thead className='table-light'>
                      <tr>
                        <th>Payment ID</th>
                        <th>Invoice ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="fw-bold">{payment.id}</td>
                          <td>{payment.invoiceId}</td>
                          <td>{formatCurrency(payment.amount)}</td>
                          <td>{payment.date}</td>
                          <td>{payment.method}</td>
                          <td>
                            <button
                              className="btn text-primary"
                              onClick={() => handleShowPaymentDetails(payment)}
                            >
                              <BsEye />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {/* Invoice Details Modal */}
        {selectedInvoice && (
          <div
            className={`modal fade ${showInvoiceDetails ? 'show' : ''}`}
            style={{ display: showInvoiceDetails ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Invoice Details</h5>
                  <button type="button" className="btn-close btn-close-dark" onClick={handleCloseInvoiceDetails}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6>Invoice Information</h6>
                      <p className="mb-1"><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
                      <p className="mb-1"><strong>Project:</strong> {selectedInvoice.projectName} ({selectedInvoice.projectId})</p>
                      <p className="mb-1"><strong>Issue Date:</strong> {selectedInvoice.date}</p>
                      <p className="mb-0"><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
                    </div>
                    <div className="col-md-6 text-end">
                      <h6>Financial Details</h6>
                      <p className="mb-1"><strong>Amount:</strong> {formatCurrency(selectedInvoice.amount)}</p>
                      <p className="mb-1"><strong>Status:</strong> <span className={`badge ${getStatusClass(selectedInvoice.status)}`}>{selectedInvoice.status}</span></p>
                      <p className="mb-0"><strong>GRN Reference:</strong> {selectedInvoice.grnRef}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6>Items</h6>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Construction Materials</td>
                            <td>1</td>
                            <td>{formatCurrency(selectedInvoice.amount * 0.7)}</td>
                            <td>{formatCurrency(selectedInvoice.amount * 0.7)}</td>
                          </tr>
                          <tr>
                            <td>Labor Charges</td>
                            <td>1</td>
                            <td>{formatCurrency(selectedInvoice.amount * 0.3)}</td>
                            <td>{formatCurrency(selectedInvoice.amount * 0.3)}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" className="text-end fw-bold">Subtotal</td>
                            <td className="fw-bold">{formatCurrency(selectedInvoice.amount)}</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end fw-bold">VAT (5%)</td>
                            <td className="fw-bold">{formatCurrency(selectedInvoice.amount * 0.05)}</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end fw-bold">Total</td>
                            <td className="fw-bold">{formatCurrency(selectedInvoice.amount * 1.05)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6>Payment History</h6>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Reference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments
                            .filter(payment => payment.invoiceId === selectedInvoice.id)
                            .map(payment => (
                              <tr key={payment.id}>
                                <td>{payment.date}</td>
                                <td>{formatCurrency(payment.amount)}</td>
                                <td>{payment.method}</td>
                                <td>{payment.reference}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseInvoiceDetails}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary d-flex align-items-center">
                    <BsPrinter className="me-1" />
                    <span>Print Invoice</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Invoice Modal */}
        <div
          className={`modal fade ${showGenerateInvoice ? 'show' : ''}`}
          style={{ display: showGenerateInvoice ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Generate New Invoice</h5>
                <button type="button" className="btn-close btn-close-dark" onClick={handleCloseGenerateInvoice}></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  <BsClipboardCheck className="me-2" />
                  Invoice can only be generated after GRN is created for the materials.
                </div>

                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Invoice Number</label>
                      <input type="text" className="form-control" defaultValue="INV-2023-006" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Invoice Date</label>
                      <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Project</label>
                      <select className="form-select">
                        <option>Select Project</option>
                        <option>CON-001 - Downtown Tower</option>
                        <option>CON-002 - Residential Complex</option>
                        <option>CON-003 - Luxury Villas</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">GRN Reference</label>
                      <select className="form-select">
                        <option>Select GRN</option>
                        <option>GRN-2023-062</option>
                        <option>GRN-2023-063</option>
                        <option>GRN-2023-064</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Due Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" placeholder="Enter amount" />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" placeholder="Enter invoice description..."></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseGenerateInvoice}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div
            className={`modal fade ${showPaymentDetails ? 'show' : ''}`}
            style={{ display: showPaymentDetails ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Payment Details</h5>
                  <button type="button" className="btn-close btn-close-dark" onClick={handleClosePaymentDetails}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Payment ID:</strong> {selectedPayment.id}</p>
                      <p className="mb-1"><strong>Invoice ID:</strong> {selectedPayment.invoiceId}</p>
                      <p className="mb-1"><strong>Date:</strong> {selectedPayment.date}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Amount:</strong> {formatCurrency(selectedPayment.amount)}</p>
                      <p className="mb-1"><strong>Method:</strong> {selectedPayment.method}</p>
                      <p className="mb-0"><strong>Reference:</strong> {selectedPayment.reference}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h6>Notes</h6>
                    <p className="text-muted">Payment received via {selectedPayment.method}. Reference number: {selectedPayment.reference}.</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClosePaymentDetails}>
                    Close
                  </button>
                  <button type="button" className="btn btn-success d-flex align-items-center">
                    <BsPrinter className="me-1" />
                    <span>Print Receipt</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Record Payment Modal */}
        <div
          className={`modal fade ${showRecordPayment ? 'show' : ''}`}
          style={{ display: showRecordPayment ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Record Payment Received</h5>
                <button type="button" className="btn-close btn-close-dark" onClick={handleCloseRecordPayment}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Payment ID</label>
                      <input type="text" className="form-control" defaultValue="PAY-2023-005" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Payment Date</label>
                      <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Invoice ID</label>
                      <select className="form-select">
                        <option>Select Invoice</option>
                        <option>INV-2023-004</option>
                        <option>INV-2023-005</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" placeholder="Enter amount" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select">
                        <option>Bank Transfer</option>
                        <option>Cheque</option>
                        <option>Cash</option>
                        <option>Credit Card</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Reference Number</label>
                      <input type="text" className="form-control" placeholder="Enter reference number" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="2" placeholder="Enter any additional notes..."></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseRecordPayment}>
                  Cancel
                </button>
                <button type="button" className="btn btn-success">
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;