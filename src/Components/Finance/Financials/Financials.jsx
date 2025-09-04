import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FinancialModals from "./FinancialModals";

const Financials = () => {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  const handleOpenAddInvoice = () => setShowAddInvoice(true);
  const handleCloseAddInvoice = () => setShowAddInvoice(false);

  const handleOpenRecordPayment = () => setShowRecordPayment(true);
  const handleCloseRecordPayment = () => setShowRecordPayment(false);

  return (
    <div className="">
      {/* Page Title */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
  {/* Heading Left */}
  <div>
    <h2 className="fw-bold mb-1">Financials</h2>
    <p className="text-muted mb-0">Manage invoices and payments</p>
  </div>

  {/* Buttons Right */}
  <div className="d-flex flex-column flex-sm-row gap-2 mt-2 mt-md-0">
    <button className="btn btn-primary" onClick={handleOpenAddInvoice}>
      + Add Invoice
    </button>
    <button className="btn btn-success" onClick={handleOpenRecordPayment}>
      Record Payment
    </button>
  </div>
</div>


      {/* Financials Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Invoice ID</th>
                  <th>Project</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Retention %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>INV-1001</td>
                  <td>Villa Project</td>
                  <td>$12,000</td>
                  <td>2024-09-15</td>
                  <td>
                    <span className="badge bg-warning text-dark">Pending</span>
                  </td>
                  <td>5%</td>
                </tr>
                <tr>
                  <td>INV-1002</td>
                  <td>Commercial Complex</td>
                  <td>$25,000</td>
                  <td>2024-09-20</td>
                  <td>
                    <span className="badge bg-success">Paid</span>
                  </td>
                  <td>10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Include Modals */}
      <FinancialModals
        showAddInvoice={showAddInvoice}
        showRecordPayment={showRecordPayment}
        handleCloseAddInvoice={handleCloseAddInvoice}
        handleCloseRecordPayment={handleCloseRecordPayment}
      />
    </div>
  );
};

export default Financials;
