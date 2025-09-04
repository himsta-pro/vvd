import React, { useState } from "react";

const UpdateStatusModal = ({ task, onClose }) => {
  const [status, setStatus] = useState(task.status);

  const handleUpdate = () => {
    alert(`Status for ${task.title} updated to ${status}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
        onClick={onClose} // Optional: Click backdrop to close
      ></div>

      {/* Modal */}
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050, position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Task Status</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p><strong>Task:</strong> {task.title}</p>
              <div className="mb-3">
                <label className="form-label">Select Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-success" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStatusModal;
