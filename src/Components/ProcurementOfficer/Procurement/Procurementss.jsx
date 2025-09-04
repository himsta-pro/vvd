import React, { useState } from "react";
import AddMaterialModal from "./AddMaterialModal";
import AddSupplierModal from "./AddSupplierModal";

const Procurementss = () => {
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);

  return (
    <div className="">
      {/* Header */}
   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">
  {/* Heading Section */}
  <div className="text-start">
    <h3 className="fw-bold">Procurement</h3>
    <p className="text-muted mb-0">Manage materials and suppliers</p>
  </div>

  {/* Quick Actions */}
  <div className="d-flex gap-2 mt-2 mt-sm-0">
    <button
      className="btn btn-primary"
      onClick={() => setShowMaterialModal(true)}
    >
      + Add Material
    </button>
    <button
      className="btn btn-success"
      onClick={() => setShowSupplierModal(true)}
    >
      + Add Supplier
    </button>
  </div>
</div>


      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Materials List</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Material ID</th>
                  <th>Name</th>
                  <th>Supplier</th>
                  <th>Quantity</th>
                  <th>Order Date</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>M001</td>
                  <td>Cement</td>
                  <td>ABC Traders</td>
                  <td>100 Bags</td>
                  <td>2025-08-28</td>
                  <td>
                    <span className="badge bg-warning text-dark">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>M002</td>
                  <td>Steel Rods</td>
                  <td>XYZ Suppliers</td>
                  <td>50 Units</td>
                  <td>2025-08-29</td>
                  <td>
                    <span className="badge bg-success">Delivered</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddMaterialModal
        show={showMaterialModal}
        onClose={() => setShowMaterialModal(false)}
      />
      <AddSupplierModal
        show={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
      />
    </div>
  );
};

export default Procurementss;
