import React, { useState } from 'react';
import {
  BsHouse, BsFileText, BsFileEarmarkText, BsPencil, BsBox,
  BsCheckSquare, BsPeople, BsCurrencyDollar, BsShield, BsExclamationTriangle,
  BsBoxSeam, BsBarChart, BsGrid, BsSearch, BsPlusCircle, BsPrinter,
  BsEye, BsPencilSquare, BsTrash, BsArrowLeftRight, BsClipboardCheck
} from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

const Procurement = () => {
  // Modal States
  const [showNewMaterial, setShowNewMaterial] = useState(false);
  const [showEditMaterial, setShowEditMaterial] = useState(false);
  const [showViewMaterial, setShowViewMaterial] = useState(false);
  const [showGeneratePO, setShowGeneratePO] = useState(false);
  const [showGenerateGRN, setShowGenerateGRN] = useState(false);

  // Selected material state
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Modals
  const handleShowNewMaterial = () => setShowNewMaterial(true);
  const handleCloseNewMaterial = () => setShowNewMaterial(false);

  const handleShowEditMaterial = (material) => {
    setSelectedMaterial(material);
    setShowEditMaterial(true);
  };
  const handleCloseEditMaterial = () => setShowEditMaterial(false);

  const handleShowViewMaterial = (material) => {
    setSelectedMaterial(material);
    setShowViewMaterial(true);
  };
  const handleCloseViewMaterial = () => setShowViewMaterial(false);

  const handleShowGeneratePO = (material) => {
    setSelectedMaterial(material);
    setShowGeneratePO(true);
  };
  const handleCloseGeneratePO = () => setShowGeneratePO(false);

  const handleShowGenerateGRN = (material) => {
    setSelectedMaterial(material);
    setShowGenerateGRN(true);
  };
  const handleCloseGenerateGRN = () => setShowGenerateGRN(false);

  // Mock Data
  const materials = [
    {
      id: 'MAT-001',
      name: 'Steel Beams',
      projectId: 'CON-001',
      projectName: 'Downtown Tower',
      supplier: 'Al-Mansouri Suppliers',
      qty: 10,
      unitCost: 250,
      poNo: 'PO-001',
      plannedDate: '2024-03-15',
      actualDate: '2024-03-16',
      status: 'Delivered',
      notes: 'High-quality structural steel beams for main framework.'
    },
    {
      id: 'MAT-002',
      name: 'Reinforcement Bars',
      projectId: 'CON-002',
      projectName: 'Residential Complex',
      supplier: 'Dubai Steel Co.',
      qty: 5,
      unitCost: 800,
      poNo: 'PO-002',
      plannedDate: '2024-03-20',
      actualDate: null,
      status: 'Pending',
      notes: 'Grade 60 reinforcement bars for concrete structures.'
    },
    {
      id: 'MAT-003',
      name: 'Landscaping Plants',
      projectId: 'CON-003',
      projectName: 'Luxury Villas',
      supplier: 'Landscape Supplies Inc.',
      qty: 200,
      unitCost: 15,
      poNo: 'PO-003',
      plannedDate: '2024-03-25',
      actualDate: '2024-03-24',
      status: 'Delivered',
      notes: 'Drought-resistant plants for the main garden area.'
    },
    {
      id: 'MAT-004',
      name: 'Electrical Wiring',
      projectId: 'CON-001',
      projectName: 'Downtown Tower',
      supplier: 'ElectroPower LLC',
      qty: 1500,
      unitCost: 2.5,
      poNo: 'PO-004',
      plannedDate: '2024-04-05',
      actualDate: null,
      status: 'Ordered',
      notes: 'Copper electrical wiring for entire building.'
    },
    {
      id: 'MAT-005',
      name: 'Ceramic Tiles',
      projectId: 'CON-002',
      projectName: 'Residential Complex',
      supplier: 'Tile Masters',
      qty: 500,
      unitCost: 12,
      poNo: 'PO-005',
      plannedDate: '2024-04-10',
      actualDate: null,
      status: 'Processing',
      notes: 'Premium ceramic tiles for bathrooms and kitchens.'
    }
  ];

  // Filter materials based on search term
  const filteredMaterials = materials.filter(material =>
    material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.poNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total value
  const calculateTotal = (qty, unitCost) => {
    return (qty * unitCost).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  // Status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-success';
      case 'Processing': return 'bg-warning text-dark';
      case 'Ordered': return 'bg-info';
      case 'Pending': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="">
      {/* Top Navigation Bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        {/* Title */}
        <div>
          <h3 className="h3 mb-1 fw-bold">Procurement Module</h3>
        </div>
        {/* Search + Button */}
        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary d-flex align-items-center text-nowrap"
            onClick={handleShowNewMaterial}
          >
            <BsPlusCircle className="me-2" />
            <span>New Material</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-3 ">
        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          {/* Total Materials */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card shadow-sm text-primary bg-primary bg-opacity-10 rounded-3 border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title fw-semibold">Total Materials</h6>
                    <h3 className="card-text mb-0">{materials.length}</h3>
                  </div>
                  <BsBox size={36} />
                </div>
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card shadow-sm text-success bg-success bg-opacity-10 rounded-3 border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title fw-semibold">Delivered</h6>
                    <h3 className="card-text mb-0">
                      {materials.filter((m) => m.status === "Delivered").length}
                    </h3>
                  </div>
                  <BsCheckSquare size={36} />
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card shadow-sm text-warning bg-warning bg-opacity-10 rounded-3 border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title fw-semibold">Pending</h6>
                    <h3 className="card-text mb-0">
                      {materials.filter((m) => m.status === "Pending").length}
                    </h3>
                  </div>
                  <BsExclamationTriangle size={36} />
                </div>
              </div>
            </div>
          </div>

          {/* Total Suppliers */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card shadow-sm text-info bg-info bg-opacity-10 rounded-3 border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title fw-semibold">Total Suppliers</h6>
                    <h3 className="card-text mb-0">5</h3>
                  </div>
                  <BsPeople size={36} />
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Materials Table */}
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <h5 className="mb-0">Material List</h5>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-light text-dark">Total: {materials.length}</span>
              <span className="badge bg-success">
                Delivered: {materials.filter((m) => m.status === "Delivered").length}
              </span>
              <span className="badge bg-warning text-dark">
                Pending: {materials.filter((m) => m.status === "Pending").length}
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-sm align-middle">
                <thead className="table-light text-nowrap">
                  <tr>
                    <th>Material ID</th>
                    <th>Name</th>
                    <th>Project ID</th>
                    <th>Supplier</th>
                    <th>Qty</th>
                    <th>Unit Cost</th>
                    <th>Total</th>
                    <th>PO No.</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((material) => (
                    <tr key={material.id}>
                      <td className="fw-bold text-nowrap">{material.id}</td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }}>
                        {material.name}
                      </td>
                      <td className="text-nowrap">
                        <span className="badge bg-light text-dark">{material.projectId}</span>
                        <div className="small text-muted">{material.projectName}</div>
                      </td>
                      <td>{material.supplier}</td>
                      <td className="text-center">{material.qty}</td>
                      <td>
                        {material.unitCost.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="fw-bold">
                        {calculateTotal(material.qty, material.unitCost)}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">{material.poNo}</span>
                      </td>
                      <td className="text-nowrap">
                        <div>Planned: {material.plannedDate}</div>
                        <div className="small text-muted">
                          Actual: {material.actualDate || "Not delivered"}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getStatusClass(material.status)}`}>
                          {material.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm text-primary"
                            onClick={() => handleShowViewMaterial(material)}
                          >
                            <BsEye />
                          </button>
                          <button
                            className="btn btn-sm text-secondary"
                            onClick={() => handleShowEditMaterial(material)}
                          >
                            <BsPencilSquare />
                          </button>
                          <button
                            className="btn btn-sm text-success"
                            onClick={() => handleShowGeneratePO(material)}
                          >
                            <BsPrinter />
                          </button>
                          <button
                            className="btn btn-sm text-info"
                            onClick={() => handleShowGenerateGRN(material)}
                          >
                            <BsClipboardCheck />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        {/* Modals */}
        {/* New Material Modal */}
        <div
          className={`modal fade ${showNewMaterial ? 'show' : ''}`}
          style={{ display: showNewMaterial ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Material</h5>
                <button type="button" className="btn-close" onClick={handleCloseNewMaterial}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Material ID</label>
                      <input type="text" className="form-control" defaultValue="MAT-006" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Material Name</label>
                      <input type="text" className="form-control" placeholder="Enter material name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Project ID</label>
                      <select className="form-select">
                        <option>Select Project</option>
                        <option>CON-001 - Downtown Tower</option>
                        <option>CON-002 - Residential Complex</option>
                        <option>CON-003 - Luxury Villas</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Supplier</label>
                      <select className="form-select">
                        <option>Select Supplier</option>
                        <option>Al-Mansouri Suppliers</option>
                        <option>Dubai Steel Co.</option>
                        <option>Landscape Supplies Inc.</option>
                        <option>ElectroPower LLC</option>
                        <option>Tile Masters</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                      <input type="number" className="form-control" placeholder="e.g., 10" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Unit Cost</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" placeholder="e.g., 250" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">PO No.</label>
                      <input type="text" className="form-control" placeholder="e.g., PO-006" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option>Select Status</option>
                        <option>Processing</option>
                        <option>Ordered</option>
                        <option>Pending</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Planned Delivery Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Actual Delivery Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" placeholder="Enter additional notes..."></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseNewMaterial}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Save Material
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Material Modal */}
        {selectedMaterial && (
          <div
            className={`modal fade ${showEditMaterial ? 'show' : ''}`}
            style={{ display: showEditMaterial ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Material</h5>
                  <button type="button" className="btn-close" onClick={handleCloseEditMaterial}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Material ID</label>
                        <input type="text" className="form-control" value={selectedMaterial.id} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Material Name</label>
                        <input type="text" className="form-control" value={selectedMaterial.name} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Project ID</label>
                        <select className="form-select" value={selectedMaterial.projectId}>
                          <option>CON-001 - Downtown Tower</option>
                          <option>CON-002 - Residential Complex</option>
                          <option>CON-003 - Luxury Villas</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Supplier</label>
                        <select className="form-select" value={selectedMaterial.supplier}>
                          <option>Al-Mansouri Suppliers</option>
                          <option>Dubai Steel Co.</option>
                          <option>Landscape Supplies Inc.</option>
                          <option>ElectroPower LLC</option>
                          <option>Tile Masters</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" value={selectedMaterial.qty} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Unit Cost</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input type="number" className="form-control" value={selectedMaterial.unitCost} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">PO No.</label>
                        <input type="text" className="form-control" value={selectedMaterial.poNo} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Status</label>
                        <select className="form-select" value={selectedMaterial.status}>
                          <option>Processing</option>
                          <option>Ordered</option>
                          <option>Pending</option>
                          <option>Delivered</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Planned Delivery Date</label>
                        <input type="date" className="form-control" value={selectedMaterial.plannedDate} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Actual Delivery Date</label>
                        <input type="date" className="form-control" value={selectedMaterial.actualDate || ''} />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" defaultValue={selectedMaterial.notes}></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseEditMaterial}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary">
                    Update Material
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Material Modal */}
        {selectedMaterial && (
          <div
            className={`modal fade ${showViewMaterial ? 'show' : ''}`}
            style={{ display: showViewMaterial ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">View Material</h5>
                  <button type="button" className="btn-close" onClick={handleCloseViewMaterial}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Material ID</label>
                      <input type="text" className="form-control" value={selectedMaterial.id} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Material Name</label>
                      <input type="text" className="form-control" value={selectedMaterial.name} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Project ID</label>
                      <input type="text" className="form-control" value={selectedMaterial.projectId} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Project Name</label>
                      <input type="text" className="form-control" value={selectedMaterial.projectName} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" value={selectedMaterial.supplier} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                      <input type="number" className="form-control" value={selectedMaterial.qty} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Unit Cost</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="text" className="form-control" value={selectedMaterial.unitCost} readOnly />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Total Value</label>
                      <input type="text" className="form-control" value={calculateTotal(selectedMaterial.qty, selectedMaterial.unitCost)} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">PO No.</label>
                      <input type="text" className="form-control" value={selectedMaterial.poNo} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <input type="text" className="form-control" value={selectedMaterial.status} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Planned Delivery Date</label>
                      <input type="date" className="form-control" value={selectedMaterial.plannedDate} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Actual Delivery Date</label>
                      <input type="date" className="form-control" value={selectedMaterial.actualDate || ''} readOnly />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" value={selectedMaterial.notes} readOnly></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseViewMaterial}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate PO Modal */}
        {selectedMaterial && (
          <div
            className={`modal fade ${showGeneratePO ? 'show' : ''}`}
            style={{ display: showGeneratePO ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Generate Purchase Order</h5>
                  <button type="button" className="btn-close" onClick={handleCloseGeneratePO}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6>Supplier Information</h6>
                      <p className="mb-1">{selectedMaterial.supplier}</p>
                      <p className="mb-1">123 Supplier Street, Industrial Area</p>
                      <p className="mb-1">Dubai, UAE</p>
                      <p className="mb-0">Tel: +971 4 123 4567</p>
                    </div>
                    <div className="col-md-6 text-end">
                      <h6>Purchase Order</h6>
                      <p className="mb-1">PO Number: {selectedMaterial.poNo}</p>
                      <p className="mb-1">Date: {new Date().toLocaleDateString()}</p>
                      <p className="mb-0">Project: {selectedMaterial.projectId}</p>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Material ID</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedMaterial.id}</td>
                          <td>{selectedMaterial.name}</td>
                          <td>{selectedMaterial.qty}</td>
                          <td>
                            {selectedMaterial.unitCost.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </td>
                          <td>
                            {calculateTotal(selectedMaterial.qty, selectedMaterial.unitCost)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="4" className="text-end fw-bold">Subtotal</td>
                          <td className="fw-bold">
                            {calculateTotal(selectedMaterial.qty, selectedMaterial.unitCost)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="text-end fw-bold">VAT (5%)</td>
                          <td className="fw-bold">
                            {(selectedMaterial.qty * selectedMaterial.unitCost * 0.05).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="text-end fw-bold">Total</td>
                          <td className="fw-bold">
                            {(selectedMaterial.qty * selectedMaterial.unitCost * 1.05).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Delivery Instructions</label>
                    <textarea className="form-control" rows="2" placeholder="Enter delivery instructions..."></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Terms & Conditions</label>
                    <textarea className="form-control" rows="3" defaultValue="Payment terms: Net 30 days. Delivery must be made by the specified date. Quality must meet project specifications."></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseGeneratePO}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary d-flex align-items-center">
                    <BsPrinter className="me-2" />
                    Generate PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate GRN Modal */}
        {selectedMaterial && (
          <div
            className={`modal fade ${showGenerateGRN ? 'show' : ''}`}
            style={{ display: showGenerateGRN ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Generate Goods Received Note (GRN)</h5>
                  <button type="button" className="btn-close" onClick={handleCloseGenerateGRN}></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-info">
                    <BsExclamationTriangle className="me-2" />
                    GRN is not directly linked to PO and is generated separately upon material receipt.
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">GRN Number</label>
                      <input type="text" className="form-control" defaultValue="GRN-2024-001" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Receipt Date</label>
                      <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Material ID</label>
                      <input type="text" className="form-control" value={selectedMaterial.id} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Material Name</label>
                      <input type="text" className="form-control" value={selectedMaterial.name} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Received Quantity</label>
                      <input type="number" className="form-control" defaultValue={selectedMaterial.qty} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Received Condition</label>
                      <select className="form-select">
                        <option>Good</option>
                        <option>Damaged</option>
                        <option>Partial Delivery</option>
                        <option>Wrong Items</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Inspected By</label>
                      <input type="text" className="form-control" placeholder="Enter inspector name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Storage Location</label>
                      <input type="text" className="form-control" placeholder="Enter storage location" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" placeholder="Enter any notes about the received goods..."></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseGenerateGRN}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary d-flex align-items-center">
                    <BsClipboardCheck className="me-2" />
                    Generate GRN
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Procurement;