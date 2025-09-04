const { getConnection } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');
const { getPaginationParams, getSortParams, getFilterParams, buildWhereClause, calculateTotalPages } = require('../utils/pagination');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

const getAllDrawings = async (req, res) => {
  try {
    const connection = getConnection();
    const { page, limit, offset } = getPaginationParams(req);
    const { sortBy, sortOrder } = getSortParams(req, ['id', 'stage', 'file_name', 'submission_date', 'status', 'created_at']);
    const filters = getFilterParams(req, ['stage', 'status', 'project_id']);
    
    if (req.query.search) {
      filters.search = req.query.search;
    }

    const { whereClause, values } = buildWhereClause(filters, ['d.drawing_id', 'd.file_name', 'p.name']);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM drawings d
      LEFT JOIN projects p ON d.project_id = p.id
      ${whereClause}
    `;
    const [countResult] = await connection.execute(countQuery, values);
    const totalItems = countResult[0].total;

    // Get drawings with pagination
    const query = `
      SELECT d.*, p.name as project_name, c.contract_id
      FROM drawings d
      LEFT JOIN projects p ON d.project_id = p.id
      LEFT JOIN contracts c ON d.contract_id = c.id
      ${whereClause}
      ORDER BY d.${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [drawings] = await connection.execute(query, [...values, limit, offset]);

    const totalPages = calculateTotalPages(totalItems, limit);

    paginatedResponse(res, drawings, {
      page,
      limit,
      totalPages,
      totalItems,
    }, 'Drawings retrieved successfully');

  } catch (error) {
    console.error('Get drawings error:', error);
    errorResponse(res, 'Failed to retrieve drawings', 500);
  }
};

const getDrawingById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    const [drawings] = await connection.execute(
      `SELECT d.*, p.name as project_name, c.contract_id
       FROM drawings d
       LEFT JOIN projects p ON d.project_id = p.id
       LEFT JOIN contracts c ON d.contract_id = c.id
       WHERE d.id = ?`,
      [id]
    );

    if (drawings.length === 0) {
      return errorResponse(res, 'Drawing not found', 404);
    }

    successResponse(res, drawings[0], 'Drawing retrieved successfully');

  } catch (error) {
    console.error('Get drawing error:', error);
    errorResponse(res, 'Failed to retrieve drawing', 500);
  }
};

const uploadDrawing = async (req, res) => {
  try {
    const {
      project_id,
      contract_id,
      stage,
      submission_date,
      status = 'Draft'
    } = req.body;

    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const connection = getConnection();

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file, 'drawings');

    // Generate drawing ID
    const [lastDrawing] = await connection.execute(
      'SELECT id FROM drawings ORDER BY id DESC LIMIT 1'
    );
    const nextId = lastDrawing.length > 0 ? lastDrawing[0].id + 1 : 1;
    const drawing_id = `DRW-${String(nextId).padStart(3, '0')}`;

    const [result] = await connection.execute(
      `INSERT INTO drawings (drawing_id, project_id, contract_id, stage, file_name, file_url, file_size, 
                            submission_date, status, cloudinary_public_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [drawing_id, project_id, contract_id, stage, req.file.originalname, uploadResult.url, 
       uploadResult.size, submission_date, status, uploadResult.public_id]
    );

    // Get created drawing
    const [drawings] = await connection.execute(
      `SELECT d.*, p.name as project_name
       FROM drawings d
       LEFT JOIN projects p ON d.project_id = p.id
       WHERE d.id = ?`,
      [result.insertId]
    );

    successResponse(res, drawings[0], 'Drawing uploaded successfully', 201);

  } catch (error) {
    console.error('Upload drawing error:', error);
    errorResponse(res, 'Failed to upload drawing', 500);
  }
};

const updateDrawing = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      contract_id,
      stage,
      submission_date,
      status
    } = req.body;

    const connection = getConnection();

    // Check if drawing exists
    const [existingDrawings] = await connection.execute(
      'SELECT id, cloudinary_public_id FROM drawings WHERE id = ?',
      [id]
    );

    if (existingDrawings.length === 0) {
      return errorResponse(res, 'Drawing not found', 404);
    }

    let updateQuery = `
      UPDATE drawings 
      SET project_id = ?, contract_id = ?, stage = ?, submission_date = ?, status = ?, updated_at = NOW()
      WHERE id = ?
    `;
    let updateValues = [project_id, contract_id, stage, submission_date, status, id];

    // If new file is uploaded
    if (req.file) {
      // Delete old file from Cloudinary
      if (existingDrawings[0].cloudinary_public_id) {
        await deleteFromCloudinary(existingDrawings[0].cloudinary_public_id);
      }

      // Upload new file
      const uploadResult = await uploadToCloudinary(req.file, 'drawings');

      updateQuery = `
        UPDATE drawings 
        SET project_id = ?, contract_id = ?, stage = ?, file_name = ?, file_url = ?, file_size = ?, 
            submission_date = ?, status = ?, cloudinary_public_id = ?, updated_at = NOW()
        WHERE id = ?
      `;
      updateValues = [project_id, contract_id, stage, req.file.originalname, uploadResult.url, 
                     uploadResult.size, submission_date, status, uploadResult.public_id, id];
    }

    await connection.execute(updateQuery, updateValues);

    // Get updated drawing
    const [drawings] = await connection.execute(
      `SELECT d.*, p.name as project_name
       FROM drawings d
       LEFT JOIN projects p ON d.project_id = p.id
       WHERE d.id = ?`,
      [id]
    );

    successResponse(res, drawings[0], 'Drawing updated successfully');

  } catch (error) {
    console.error('Update drawing error:', error);
    errorResponse(res, 'Failed to update drawing', 500);
  }
};

const deleteDrawing = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Check if drawing exists
    const [existingDrawings] = await connection.execute(
      'SELECT id, cloudinary_public_id FROM drawings WHERE id = ?',
      [id]
    );

    if (existingDrawings.length === 0) {
      return errorResponse(res, 'Drawing not found', 404);
    }

    // Delete from Cloudinary
    if (existingDrawings[0].cloudinary_public_id) {
      await deleteFromCloudinary(existingDrawings[0].cloudinary_public_id);
    }

    await connection.execute('DELETE FROM drawings WHERE id = ?', [id]);

    successResponse(res, null, 'Drawing deleted successfully');

  } catch (error) {
    console.error('Delete drawing error:', error);
    errorResponse(res, 'Failed to delete drawing', 500);
  }
};

const getDesignStats = async (req, res) => {
  try {
    const connection = getConnection();

    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_drawings,
        SUM(CASE WHEN stage = 'Concept' THEN 1 ELSE 0 END) as concept_drawings,
        SUM(CASE WHEN stage = 'Detailed' THEN 1 ELSE 0 END) as detailed_drawings,
        SUM(CASE WHEN stage = 'IFC' THEN 1 ELSE 0 END) as ifc_drawings,
        SUM(CASE WHEN status = 'Draft' THEN 1 ELSE 0 END) as draft_drawings,
        SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) as submitted_drawings,
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved_drawings
      FROM drawings
    `);

    successResponse(res, stats[0], 'Design statistics retrieved successfully');

  } catch (error) {
    console.error('Get design stats error:', error);
    errorResponse(res, 'Failed to retrieve design statistics', 500);
  }
};

module.exports = {
  getAllDrawings,
  getDrawingById,
  uploadDrawing,
  updateDrawing,
  deleteDrawing,
  getDesignStats,
};