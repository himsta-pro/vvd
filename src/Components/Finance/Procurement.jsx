import React from "react";

const ProcurementPage = () => {
  const procurementData = [
    {
      poNumber: "PO-1001",
      material: "Cement Bags",
      supplier: "Al Noor Suppliers",
      grnStatus: "Received",
    },
    {
      poNumber: "PO-1002",
      material: "Steel Rods",
      supplier: "Emirates Steel",
      grnStatus: "Pending",
    },
    {
      poNumber: "PO-1003",
      material: "Tiles",
      supplier: "Dubai Tiles Co.",
      grnStatus: "Partially Received",
    },
  ];

  return (
    <div className="">
      {/* Page Title */}
      <div className="mb-4">
        <h3 className="fw-bold">Procurement</h3>
        <p className="text-muted">
          Overview of all purchase orders and their GRN status.
        </p>
      </div>

      {/* Procurement Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Purchase Orders</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">PO Number</th>
                  <th scope="col">Material</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">GRN Status</th>
                </tr>
              </thead>
              <tbody>
                {procurementData.map((po, index) => (
                  <tr key={index}>
                    <td>{po.poNumber}</td>
                    <td>{po.material}</td>
                    <td>{po.supplier}</td>
                    <td>
                      <span
                        className={`badge ${
                          po.grnStatus === "Received"
                            ? "bg-success"
                            : po.grnStatus === "Pending"
                            ? "bg-warning text-dark"
                            : "bg-info text-dark"
                        }`}
                      >
                        {po.grnStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementPage;
