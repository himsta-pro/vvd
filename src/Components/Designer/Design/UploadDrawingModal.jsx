import React from "react";

const UploadDrawingModal = ({ show, onClose }) => {
  return (
    <>
      {show && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Drawing</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Project</label>
                    <select className="form-select">
                      <option>Select Project</option>
                      <option>Villa Project</option>
                      <option>Commercial Complex</option>
                      <option>Residential Project</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select className="form-select">
                      <option>Select Type</option>
                      <option>Concept</option>
                      <option>Detailed</option>
                      <option>IFC</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">File Upload</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder="Enter description"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDrawingModal;
