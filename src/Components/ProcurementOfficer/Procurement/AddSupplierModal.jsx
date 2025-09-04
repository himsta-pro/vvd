import React, { useState } from "react";

const AddSupplierModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    materials: []
  });
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (tagInput && !formData.materials.includes(tagInput)) {
      setFormData({
        ...formData,
        materials: [...formData.materials, tagInput]
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((m) => m !== tag)
    });
  };

  const handleSubmit = () => {
    alert(`Supplier Added: ${formData.name}`);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Supplier</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    className="form-control"
                    value={formData.contactPerson}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Materials Supplied</label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter material and press Add"
                  />
                  <button className="btn btn-outline-primary" onClick={handleAddTag}>Add</button>
                </div>
                <div>
                  {formData.materials.map((tag, index) => (
                    <span key={index} className="badge bg-primary me-2">
                      {tag} <button type="button" className="btn-close btn-close-white btn-sm ms-1" onClick={() => handleRemoveTag(tag)}></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default AddSupplierModal;
