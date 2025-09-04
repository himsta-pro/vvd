import React, { useState } from "react";
import UploadDrawingModal from "./UploadDrawingModal";

const DrawingRepository = () => {
  const [showModal, setShowModal] = useState(false);

  const drawings = [
    { id: "DRW-001", name: "Ground Floor Plan", type: "Concept", status: "Approved", date: "2024-01-15" },
    { id: "DRW-002", name: "Elevation Design", type: "Detailed", status: "In Review", date: "2024-01-14" },
    { id: "DRW-003", name: "Structural Layout", type: "IFC", status: "Pending", date: "2024-01-13" },
  ];

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
        <h3 className="fw-bold mb-0">Drawing Repository</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Upload Drawing
        </button>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-nowrap">
              <thead className="table-light">
                <tr>
                  <th>Drawing ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {drawings.map((drawing, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{drawing.id}</td>
                    <td>{drawing.name}</td>
                    <td>{drawing.type}</td>
                    <td>
                      <span
                        className={`badge ${
                          drawing.status === "Approved"
                            ? "bg-success"
                            : drawing.status === "In Review"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {drawing.status}
                      </span>
                    </td>
                    <td>{drawing.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <UploadDrawingModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default DrawingRepository;
