import React from "react";

const ProcurementDashboard = () => {
  return (
    <div className="">
      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Procurement Summary</h3>
        <p className="text-muted">Overview of material status and supplier activities.</p>
      </div>

      {/* Cards Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-warning bg-opacity-10 shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Materials Pending</h6>
                <h3 className="fw-bold">24</h3>
              </div>
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle">
                <i className="bi bi-hourglass-split fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success bg-opacity-10 shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Materials Delivered</h6>
                <h3 className="fw-bold">48</h3>
              </div>
              <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                <i className="bi bi-check-circle fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-primary bg-opacity-10 shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Active Suppliers</h6>
                <h3 className="fw-bold">12</h3>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                <i className="bi bi-people fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchase Orders Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Recent Purchase Orders</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>PO Number</th>
                  <th>Material</th>
                  <th>Supplier</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PO-1001</td>
                  <td>Steel Rods</td>
                  <td>ABC Metals</td>
                  <td>500</td>
                  <td><span className="badge bg-success">Delivered</span></td>
                </tr>
                <tr>
                  <td>PO-1002</td>
                  <td>Cement Bags</td>
                  <td>XYZ Supplies</td>
                  <td>200</td>
                  <td><span className="badge bg-warning text-dark">Pending</span></td>
                </tr>
                <tr>
                  <td>PO-1003</td>
                  <td>Wood Panels</td>
                  <td>Timber World</td>
                  <td>150</td>
                  <td><span className="badge bg-info">In Transit</span></td>
                </tr>
                <tr>
                  <td>PO-1004</td>
                  <td>Paint Buckets</td>
                  <td>ColorMax</td>
                  <td>75</td>
                  <td><span className="badge bg-success">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementDashboard;
