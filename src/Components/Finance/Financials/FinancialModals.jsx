import React from "react";

const FinancialModals = ({
  showAddInvoice,
  showRecordPayment,
  handleCloseAddInvoice,
  handleCloseRecordPayment,
}) => {
  return (
    <>
      {/* Add Invoice Modal */}
      <div
        className={`modal fade ${showAddInvoice ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Invoice</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseAddInvoice}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Project</label>
                  <select className="form-select">
                    <option>Select Project</option>
                    <option>Villa Project</option>
                    <option>Commercial Complex</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" />
                </div>
                <h6>Items</h6>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className="form-control"
                          placeholder="Item name"
                        />
                      </td>
                      <td>
                        <input type="number" className="form-control" />
                      </td>
                      <td>
                        <input type="number" className="form-control" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={handleCloseAddInvoice}
              >
                Close
              </button>
              <button className="btn btn-primary">Save Invoice</button>
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      <div
        className={`modal fade ${showRecordPayment ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Record Payment</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseRecordPayment}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Invoice</label>
                  <select className="form-select">
                    <option>Select Invoice</option>
                    <option>INV-1001</option>
                    <option>INV-1002</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount Paid</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select">
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={handleCloseRecordPayment}
              >
                Close
              </button>
              <button className="btn btn-primary">Save Payment</button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for Add Invoice */}
      {showAddInvoice && (
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseAddInvoice}
        ></div>
      )}

      {/* Backdrop for Record Payment */}
      {showRecordPayment && (
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseRecordPayment}
        ></div>
      )}
    </>
  );
};

export default FinancialModals;
