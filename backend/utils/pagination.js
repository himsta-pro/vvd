const getPaginationParams = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
};

const getSortParams = (req, allowedFields = []) => {
  const sortBy = req.query.sortBy || 'id';
  const sortOrder = req.query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  // Validate sortBy field
  const validSortBy = allowedFields.includes(sortBy) ? sortBy : 'id';

  return {
    sortBy: validSortBy,
    sortOrder,
  };
};

const getFilterParams = (req, allowedFilters = []) => {
  const filters = {};

  allowedFilters.forEach(filter => {
    if (req.query[filter]) {
      filters[filter] = req.query[filter];
    }
  });

  return filters;
};

const buildWhereClause = (filters, searchFields = []) => {
  const conditions = [];
  const values = [];

  // Add filter conditions
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      conditions.push(`${key} = ?`);
      values.push(filters[key]);
    }
  });

  // Add search condition
  if (filters.search && searchFields.length > 0) {
    const searchConditions = searchFields.map(field => `${field} LIKE ?`);
    conditions.push(`(${searchConditions.join(' OR ')})`);
    
    // Add search value for each search field
    searchFields.forEach(() => {
      values.push(`%${filters.search}%`);
    });
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return { whereClause, values };
};

const calculateTotalPages = (totalItems, limit) => {
  return Math.ceil(totalItems / limit);
};

module.exports = {
  getPaginationParams,
  getSortParams,
  getFilterParams,
  buildWhereClause,
  calculateTotalPages,
};