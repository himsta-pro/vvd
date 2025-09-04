import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectManageFinancials = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('all');
  const [newInvoice, setNewInvoice] = useState({
    projectId: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
  });
  const [newPayment, setNewPayment] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    method: 'Bank Transfer'
  });

  // Sample data - in a real app this would come from an API
  useEffect(() => {
    const sampleInvoices = [
      {
        id: 1,
        projectId: 1,
        invoiceNumber: 'INV-2023-001',
        client: 'Acme Corp',
        date: '2023-10-15',
        dueDate: '2023-11-15',
        amount: 4500,
        status: 'paid',
        items: [
          { description: 'Design', quantity: 10, rate: 200, amount: 2000 },
          { description: 'Development', quantity: 20, rate: 125, amount: 2500 }
        ],
        payments: [
          { date: '2023-10-20', amount: 4500, method: 'Bank Transfer' }
        ]
      },
      {
        id: 2,
        projectId: 2,
        invoiceNumber: 'INV-2023-002',
        client: 'Tech Solutions',
        date: '2023-10-20',
        dueDate: '2023-11-20',
        amount: 7200,
        status: 'pending',
        items: [
          { description: 'UI/UX Design', quantity: 15, rate: 150, amount: 2250 },
          { description: 'Frontend Development', quantity: 30, rate: 120, amount: 3600 },
          { description: 'Backend Integration', quantity: 15, rate: 90, amount: 1350 }
        ],
        payments: []
      },
      {
        id: 3,
        projectId: 3,
        invoiceNumber: 'INV-2023-003',
        client: 'Global Retail',
        date: '2023-10-25',
        dueDate: '2023-11-25',
        amount: 12500,
        status: 'overdue',
        items: [
          { description: 'Platform Setup', quantity: 1, rate: 5000, amount: 5000 },
          { description: 'Payment Integration', quantity: 1, rate: 3000, amount: 3000 },
          { description: 'Custom Features', quantity: 30, rate: 150, amount: 4500 }
        ],
        payments: [
          { date: '2023-10-30', amount: 6250, method: 'Credit Card' }
        ]
      },
      {
        id: 4,
        projectId: 1,
        invoiceNumber: 'INV-2023-004',
        client: 'Acme Corp',
        date: '2023-11-01',
        dueDate: '2023-12-01',
        amount: 3200,
        status: 'paid',
        items: [
          { description: 'Maintenance', quantity: 16, rate: 200, amount: 3200 }
        ],
        payments: [
          { date: '2023-11-05', amount: 3200, method: 'PayPal' }
        ]
      }
    ];

    const sampleProjects = [
      { id: 1, name: 'Website Redesign', client: 'Acme Corp', status: 'completed' },
      { id: 2, name: 'Mobile App', client: 'Tech Solutions', status: 'in-progress' },
      { id: 3, name: 'E-commerce Platform', client: 'Global Retail', status: 'in-progress' }
    ];

    setInvoices(sampleInvoices);
    setProjects(sampleProjects);
  }, []);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleViewPayments = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleCloseModals = () => {
    setShowInvoiceModal(false);
    setShowPaymentModal(false);
    setShowNewInvoiceModal(false);
    setShowRecordPaymentModal(false);
    setSelectedInvoice(null);
  };

  const handleCreateInvoice = () => {
    // Generate a new ID and invoice number
    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    const newInvoiceNumber = `INV-2023-${String(newId).padStart(3, '0')}`;
    
    // Calculate total amount
    const totalAmount = newInvoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    
    const invoiceToAdd = {
      id: newId,
      invoiceNumber: newInvoiceNumber,
      projectId: parseInt(newInvoice.projectId),
      client: newInvoice.client,
      date: newInvoice.date,
      dueDate: newInvoice.dueDate,
      amount: totalAmount,
      status: 'pending',
      items: newInvoice.items,
      payments: []
    };
    
    setInvoices([...invoices, invoiceToAdd]);
    setShowNewInvoiceModal(false);
    setNewInvoice({
      projectId: '',
      client: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const handleRecordPayment = () => {
    if (!selectedInvoice) return;
    
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === selectedInvoice.id) {
        const updatedPayments = [...invoice.payments, newPayment];
        const totalPaid = updatedPayments.reduce((sum, payment) => sum + payment.amount, 0);
        const newStatus = totalPaid >= invoice.amount ? 'paid' : 
                         (new Date(invoice.dueDate) < new Date() ? 'overdue' : 'pending');
        
        return {
          ...invoice,
          payments: updatedPayments,
          status: newStatus
        };
      }
      return invoice;
    });
    
    setInvoices(updatedInvoices);
    setShowRecordPaymentModal(false);
    setNewPayment({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      method: 'Bank Transfer'
    });
  };

  const handleAddInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const handleRemoveInvoiceItem = (index) => {
    if (newInvoice.items.length <= 1) return;
    
    const updatedItems = [...newInvoice.items];
    updatedItems.splice(index, 1);
    
    setNewInvoice({
      ...newInvoice,
      items: updatedItems
    });
  };

  const handleInvoiceItemChange = (index, field, value) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'description' ? value : Number(value)
    };
    
    // Calculate amount if quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    }
    
    setNewInvoice({
      ...newInvoice,
      items: updatedItems
    });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === 'all' || invoice.projectId.toString() === selectedProject;
    return matchesStatus && matchesSearch && matchesProject;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const calculatePaidAmount = (invoice) => {
    return invoice.payments.reduce((total, payment) => total + payment.amount, 0);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  // Calculate summary statistics
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + (invoice.amount - calculatePaidAmount(invoice)), 0);

  return (
    <div className="financials-dashboard">
      <div className="row">
        <div className="col-12">
         <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
  <h3 className="fw-bold mb-0">
    Financial Dashboard
  </h3>
  <button className="btn btn-primary" onClick={() => setShowNewInvoiceModal(true)}>
    <i className="fas fa-plus me-2"></i> New Invoice
  </button>
</div>


          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <div className="card border-0 bg-primary bg-opacity-10 text-primary h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Revenue</h5>
                  <h3 className="card-text">{formatCurrency(totalRevenue)}</h3>
                  <p className="card-text"><small>From all projects</small></p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <div className="card bg-success text-success bg-opacity-10 border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">Paid Invoices</h5>
                  <h3 className="card-text">{formatCurrency(paidAmount)}</h3>
                  <p className="card-text"><small>{invoices.filter(i => i.status === 'paid').length} of {invoices.length} invoices</small></p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <div className="card bg-warning text-warning bg-opacity-10 border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">Pending</h5>
                  <h3 className="card-text">{formatCurrency(pendingAmount)}</h3>
                  <p className="card-text"><small>{invoices.filter(i => i.status === 'pending').length} invoice(s) pending</small></p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-3">
              <div className="card bg-danger text-danger bg-opacity-10 border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">Overdue</h5>
                  <h3 className="card-text">{formatCurrency(overdueAmount)}</h3>
                  <p className="card-text"><small>{invoices.filter(i => i.status === 'overdue').length} invoice(s) overdue</small></p>
                </div>
              </div>
            </div>
          </div>


          {/* Filters and Search */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="searchTerm">Search</label>
                    <input
                      type="text"
                      id="searchTerm"
                      className="form-control"
                      placeholder="Search invoice numbers or clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="filterStatus">Status</label>
                    <select
                      id="filterStatus"
                      className="form-control"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="selectedProject">Project</label>
                    <select
                      id="selectedProject"
                      className="form-control"
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                    >
                      <option value="all">All Projects</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                      setSelectedProject('all');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Invoice/Payment History
              </h5>
            </div>
            <div className="card-body p-0">
              {filteredInvoices.length === 0 ? (
                <div className="text-center p-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No invoices found matching your criteria.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                      setSelectedProject('all');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle text-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Invoice #</th>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                        <th>Paid</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="fw-bold">{invoice.invoiceNumber}</td>
                          <td>{getProjectName(invoice.projectId)}</td>
                          <td>{invoice.client}</td>
                          <td>{invoice.date}</td>
                          <td>{invoice.dueDate}</td>
                          <td className="fw-bold">{formatCurrency(invoice.amount)}</td>
                          <td>{formatCurrency(calculatePaidAmount(invoice))}</td>
                          <td>
                            <span className={`badge bg-${getStatusBadge(invoice.status)}`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm text-primary me-1"
                              onClick={() => handleViewInvoice(invoice)}
                              title="View Invoice"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm text-info"
                              onClick={() => handleViewPayments(invoice)}
                              title="View Payments"
                            >
                              <i className="fas fa-receipt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="card-footer bg-light">
              <small className="text-muted">
                Showing {filteredInvoices.length} of {invoices.length} invoices
              </small>
            </div>
          </div>

        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className={`modal fade ${showInvoiceModal ? 'show d-block' : 'd-none'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-file-invoice me-2"></i>
                  Invoice Details - {selectedInvoice.invoiceNumber}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModals}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Project: {getProjectName(selectedInvoice.projectId)}</h6>
                    <h6>Client: {selectedInvoice.client}</h6>
                  </div>
                  <div className="col-md-6 text-end">
                    <h6>Date: {selectedInvoice.date}</h6>
                    <h6>Due Date: {selectedInvoice.dueDate}</h6>
                    <span className={`badge bg-${getStatusBadge(selectedInvoice.status)}`}>
                      {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.rate)}</td>
                          <td>{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">Total:</td>
                        <td className="fw-bold">{formatCurrency(selectedInvoice.amount)}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">Amount Paid:</td>
                        <td className="fw-bold">{formatCurrency(calculatePaidAmount(selectedInvoice))}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">Balance Due:</td>
                        <td className="fw-bold">{formatCurrency(selectedInvoice.amount - calculatePaidAmount(selectedInvoice))}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Close</button>
                <button type="button" className="btn btn-primary">
                  <i className="fas fa-print me-2"></i>Print
                </button>
                {selectedInvoice.status !== 'paid' && (
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => {
                      setShowInvoiceModal(false);
                      setShowRecordPaymentModal(true);
                    }}
                  >
                    <i className="fas fa-money-bill me-2"></i>Record Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Modal */}
      {selectedInvoice && (
        <div className={`modal fade ${showPaymentModal ? 'show d-block' : 'd-none'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <i className="fas fa-receipt me-2"></i>
                  Payment History - {selectedInvoice.invoiceNumber}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModals}></button>
              </div>
              <div className="modal-body">
                <h6 className="mb-3">Invoice Total: {formatCurrency(selectedInvoice.amount)}</h6>

                {selectedInvoice.payments.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="fas fa-money-bill-wave fa-2x text-muted mb-3"></i>
                    <p className="text-muted">No payments recorded for this invoice.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead className="table-light">
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.payments.map((payment, index) => (
                          <tr key={index}>
                            <td>{payment.date}</td>
                            <td className="fw-bold">{formatCurrency(payment.amount)}</td>
                            <td>{payment.method}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="table-light">
                        <tr>
                          <th className="text-end">Total Paid:</th>
                          <th colSpan="2">{formatCurrency(calculatePaidAmount(selectedInvoice))}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Close</button>
                {selectedInvoice.status !== 'paid' && (
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => {
                      setShowPaymentModal(false);
                      setShowRecordPaymentModal(true);
                    }}
                  >
                    <i className="fas fa-plus me-2"></i>Add Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      <div className={`modal fade ${showNewInvoiceModal ? 'show d-block' : 'd-none'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title">
                <i className="fas fa-plus me-2"></i>
                Create New Invoice
              </h5>
              <button type="button" className="btn-close btn-close-dark" onClick={handleCloseModals}></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Project</label>
                    <select 
                      className="form-control"
                      value={newInvoice.projectId}
                      onChange={(e) => setNewInvoice({...newInvoice, projectId: e.target.value})}
                    >
                      <option value="">Select Project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name} - {project.client}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Client</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={newInvoice.client}
                      onChange={(e) => setNewInvoice({...newInvoice, client: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Invoice Date</label>
                    <input 
                      type="date" 
                      className="form-control"
                      value={newInvoice.date}
                      onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input 
                      type="date" 
                      className="form-control"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Invoice Items</h6>
                  <button type="button" className="btn btn-sm btn-success mb-4" onClick={handleAddInvoiceItem}>
                    <i className="fas fa-plus me-1"></i>Add Item
                  </button>
                </div>
                
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleInvoiceItemChange(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleInvoiceItemChange(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => handleInvoiceItemChange(index, 'rate', e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                        value={formatCurrency(item.amount)}
                        disabled
                      />
                    </div>
                    <div className="col-md-1">
                 
                          <i className="bi bi-trash me-1 text-red-600 btn-primary cursor-pointer mt-2" type="button" 
      
                        onClick={() => handleRemoveInvoiceItem(index)}
                        disabled={newInvoice.items.length <= 1}></i> 
                     
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>
                      {formatCurrency(newInvoice.items.reduce((sum, item) => sum + item.amount, 0))}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateInvoice}>Create Invoice</button>
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedInvoice && (
        <div className={`modal fade ${showRecordPaymentModal ? 'show d-block' : 'd-none'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="fas fa-money-bill me-2"></i>
                  Record Payment - {selectedInvoice.invoiceNumber}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModals}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <p><strong>Invoice Amount:</strong> {formatCurrency(selectedInvoice.amount)}</p>
                  <p><strong>Amount Due:</strong> {formatCurrency(selectedInvoice.amount - calculatePaidAmount(selectedInvoice))}</p>
                </div>
                
                <div className="form-group mb-3">
                  <label className="form-label">Payment Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={newPayment.date}
                    onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label className="form-label">Amount</label>
                  <input 
                    type="number" 
                    className="form-control"
                    min="0"
                    step="0.01"
                    max={selectedInvoice.amount - calculatePaidAmount(selectedInvoice)}
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: parseFloat(e.target.value)})}
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label className="form-label">Payment Method</label>
                  <select 
                    className="form-control"
                    value={newPayment.method}
                    onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Check">Check</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={handleRecordPayment}>Record Payment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManageFinancials;