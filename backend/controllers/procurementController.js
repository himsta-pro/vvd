const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');

const getAllMaterials = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'name', 'planned_date', 'actual_date', 'status', 'created_at']);
    const filters = getFilterParams(req, ['status', 'project_id', 'supplier']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['m.name', 'm.supplier', 'p.name', 'm.po_no']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM materials m
      LEFT JOIN projects p ON m.project_id = p.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get materials with pagination
    const query = `
      SELECT m.*, p.name as project_name
      FROM materials m
      LEFT JOIN projects p ON m.project_id = p.id
      ${whereClause}
      ORDER BY m.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [materials] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, materials, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Materials retrieved successfully');

  } catch (error) {
    console.error('Get materials error:', error);
    errorResponse(res, 'Failed to retrieve materials', 500);
  }
};

const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [materials] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM materials m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [id]
    );

    if (materials.length === 0) {
      return errorResponse(res, 'Material not found', 404);
    }

    successResponse(res, materials[0], 'Material retrieved successfully');

  } catch (error) {
    console.error('Get material error:', error);
    errorResponse(res, 'Failed to retrieve material', 500);
  }
};

const createMaterial = async (req, res) => {
  try {
    const {
      name,
      project_id,
      supplier,
      qty,
      unit_cost,
      po_no,
      planned_date,
      actual_date,
      status = 'Processing',
      notes
    } = req.body;

    const connection = getConnection();

    // Generate material ID
    const [lastMaterial] = await connection.execute(
      'SELECT id FROM materials ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastMaterial.length > 0 ? lastMaterial[0].id + 1 : 1;
    const material_id = `MAT-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO materials (material_id, name, project_id, supplier, qty, unit_cost, po_no, 
                             planned_date, actual_date, status, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [material_id, name, project_id, supplier, qty, unit_cost, po_no, planned_date, actual_date, status, notes]
    );

    // Get created material
    const [materials] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM materials m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [result.insertId]
    );

    successResponse(res, materials[0], 'Material created successfully', 201);

  } catch (error) {
    console.error('Create material error:', error);
    errorResponse(res, 'Failed to create material', 500);
  }
};

const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      project_id,
      supplier,
      qty,
      unit_cost,
      po_no,
      planned_date,
      actual_date,
      status,
      notes
    } = req.body;

    const connection = getConnection();

    // Check if material exists
    const [existingMaterials] = await connection.execute(
      'SELECT id FROM materials WHERE id = ?',
      [id]
    );

    if (existingMaterials.length === 0) {
      return errorResponse(res, 'Material not found', 404);
    }

    await connection.execute(
      `UPDATE materials 
       SET name = ?, project_id = ?, supplier = ?, qty = ?, unit_cost = ?, po_no = ?, 
           planned_date = ?, actual_date = ?, status = ?, notes = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, project_id, supplier, qty, unit_cost, po_no, planned_date, actual_date, status, notes, id]
    );

    // Get updated material
    const [materials] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM materials m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [id]
    );

    successResponse(res, materials[0], 'Material updated successfully');

  } catch (error) {
    console.error('Update material error:', error);
    errorResponse(res, 'Failed to update material', 500);
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if material exists
    const [existingMaterials] = await connection.execute(
      'SELECT id FROM materials WHERE id = ?',
      [id]
    );

    if (existingMaterials.length === 0) {
      return errorResponse(res, 'Material not found', 404);
    }

    await connection.execute('DELETE FROM materials WHERE id = ?', [id]);

    successResponse(res, null, 'Material deleted successfully');

  } catch (error) {
    console.error('Delete material error:', error);
    errorResponse(res, 'Failed to delete material', 500);
  }
};

const generatePO = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [materials] = await connection.execute(
      `SELECT m.*, p.name as project_name
       FROM materials m
       LEFT JOIN projects p ON m.project_id = p.id
       WHERE m.id = ?`,
      [id]
    );

    if (materials.length === 0) {
      return errorResponse(res, 'Material not found', 404);
    }

    const material = materials[0];
    const total = material.qty * material.unit_cost;
    const vat = total * 0.05;
    const grandTotal = total + vat;

    const poData = {
      material,
      calculations: {
        subtotal: total,
        vat: vat,
        total: grandTotal
      },
      generatedOn: new Date().toISOString(),
      terms: 'Payment terms: Net 30 days. Delivery must be made by the specified date. Quality must meet project specifications.'
    };

    successResponse(res, poData, 'Purchase Order generated successfully');

  } catch (error) {
    console.error('Generate PO error:', error);
    errorResponse(res, 'Failed to generate Purchase Order', 500);
  }
};

const generateGRN = async (req, res) => {
  try {
    const {
      material_id,
      grn_number,
      receipt_date,
      received_qty,
      received_condition,
      inspected_by,
      storage_location,
      notes
    } = req.body;

    const connection = getConnection();

    // Check if material exists
    const [materials] = await connection.execute(
      'SELECT * FROM materials WHERE id = ?',
      [material_id]
    );

    if (materials.length === 0) {
      return errorResponse(res, 'Material not found', 404);
    }

    const [result] = await connection.execute(
      `INSERT INTO grns (grn_number, material_id, receipt_date, received_qty, received_condition, 
                        inspected_by, storage_location, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [grn_number, material_id, receipt_date, received_qty, received_condition, inspected_by, storage_location, notes]
    );

    // Update material status if fully received
    if (received_qty >= materials[0].qty && received_condition === 'Good') {
      await connection.execute(
        'UPDATE materials SET status = ?, actual_date = ? WHERE id = ?',
        ['Delivered', receipt_date, material_id]
      );
    }

    // Get created GRN
    const [grns] = await connection.execute(
      `SELECT g.*, m.name as material_name, m.material_id
       FROM grns g
       LEFT JOIN materials m ON g.material_id = m.id
       WHERE g.id = ?`,
      [result.insertId]
    );

    successResponse(res, grns[0], 'GRN generated successfully', 201);

  } catch (error) {
    console.error('Generate GRN error:', error);
    errorResponse(res, 'Failed to generate GRN', 500);
  }
};

const getProcurementStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_materials,
        SUM(CASE WHEN status = 'Delivered' THEN 1 ELSE 0 END) as delivered_materials,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending_materials,
        SUM(CASE WHEN status = 'Processing' THEN 1 ELSE 0 END) as processing_materials,
        SUM(CASE WHEN status = 'Ordered' THEN 1 ELSE 0 END) as ordered_materials,
        COUNT(DISTINCT supplier) as total_suppliers,
        SUM(qty * unit_cost) as total_procurement_value
      FROM materials
    `);

    successResponse(res, stats[0], 'Procurement statistics retrieved successfully');

  } catch (error) {
    console.error('Get procurement stats error:', error);
    errorResponse(res, 'Failed to retrieve procurement statistics', 500);
  }
};

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  generatePO,
  generateGRN,
  getProcurementStats,
};