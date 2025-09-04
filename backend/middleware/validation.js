const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessage,
      });
    }
    
    next();
  };
};

// Common validation schemas
const schemas = {
  // Auth schemas
  register: Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Admin', 'ProjectManager', 'Designer', 'ProcurementOfficer', 'Finance', 'Quality', 'Client').default('Client'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('Admin', 'ProjectManager', 'Designer', 'ProcurementOfficer', 'Finance', 'Quality', 'Client').required(),
  }),

  // Project schemas
  project: Joi.object({
    name: Joi.string().min(3).max(255).required(),
    client: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(1000),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    budget: Joi.number().positive().required(),
    status: Joi.string().valid('Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled').default('Not Started'),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    manager_id: Joi.number().integer().positive(),
  }),

  // RFQ schemas
  rfq: Joi.object({
    client: Joi.string().min(2).max(255).required(),
    project: Joi.string().min(3).max(255).required(),
    date: Joi.date().required(),
    location: Joi.string().min(2).max(255).required(),
    value: Joi.string().required(),
    scope_summary: Joi.string().max(2000),
    contact_person: Joi.string().max(255),
    contact_email: Joi.string().email(),
    contact_phone: Joi.string().max(20),
    deadline: Joi.date(),
    notes: Joi.string().max(1000),
    status: Joi.string().valid('Submitted', 'Won', 'Lost').default('Submitted'),
  }),

  // Task schemas
  task: Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(1000),
    project_id: Joi.number().integer().positive().required(),
    assignee_id: Joi.number().integer().positive().required(),
    start_date: Joi.date().required(),
    due_date: Joi.date().greater(Joi.ref('start_date')).required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    status: Joi.string().valid('Not Started', 'In Progress', 'Completed', 'On Hold').default('Not Started'),
    progress: Joi.number().min(0).max(100).default(0),
  }),

  // Contract schemas
  contract: Joi.object({
    project_id: Joi.number().integer().positive().required(),
    client: Joi.string().min(2).max(255).required(),
    project_name: Joi.string().min(3).max(255).required(),
    value: Joi.string().required(),
    signed_date: Joi.date().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    manager: Joi.string().min(2).max(255).required(),
    client_rep: Joi.string().max(500),
    payment_terms: Joi.string().max(1000),
    status: Joi.string().valid('Active', 'Completed', 'Terminated').default('Active'),
  }),

  // Resource schemas
  resource: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    role: Joi.string().min(2).max(100).required(),
    subcontractor: Joi.string().min(2).max(255).required(),
    rate: Joi.string().required(),
    availability: Joi.string().valid('Full-time', 'Part-time', 'Contract').default('Full-time'),
    assigned_tasks: Joi.number().integer().min(0).default(0),
  }),

  // Material schemas
  material: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    project_id: Joi.number().integer().positive().required(),
    supplier: Joi.string().min(2).max(255).required(),
    qty: Joi.number().integer().positive().required(),
    unit_cost: Joi.number().positive().required(),
    po_no: Joi.string().required(),
    planned_date: Joi.date().required(),
    actual_date: Joi.date().allow(null),
    status: Joi.string().valid('Processing', 'Ordered', 'Pending', 'Delivered').default('Processing'),
    notes: Joi.string().max(1000),
  }),

  // Quality inspection schemas
  inspection: Joi.object({
    task_id: Joi.number().integer().positive(),
    date: Joi.date().required(),
    inspector: Joi.string().min(2).max(255).required(),
    snags: Joi.string().max(1000),
    status: Joi.string().valid('Open', 'Closed').default('Open'),
    hse_issues: Joi.string().valid('Low', 'Medium', 'High', 'Critical').default('Medium'),
    project: Joi.string().max(255),
    description: Joi.string().max(1000),
    severity: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    photo_url: Joi.string().uri().allow(null),
  }),

  // Milestone schemas
  milestone: Joi.object({
    project_id: Joi.number().integer().positive().required(),
    name: Joi.string().min(2).max(255).required(),
    planned_date: Joi.date().required(),
    actual_date: Joi.date().allow(null),
    status: Joi.string().valid('Not Started', 'In Progress', 'Completed', 'Pending', 'Delayed').default('Not Started'),
  }),

  // Risk schemas
  risk: Joi.object({
    project_id: Joi.number().integer().positive().required(),
    description: Joi.string().min(10).max(1000).required(),
    level: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    impact: Joi.string().valid('Low', 'Medium', 'High', 'Critical').default('Medium'),
    probability: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    mitigation_plan: Joi.string().max(1000),
    owner: Joi.string().min(2).max(255).required(),
    status: Joi.string().valid('Open', 'Monitoring', 'Mitigated', 'Resolved', 'Closed').default('Open'),
  }),

  // Job cost schemas
  jobCost: Joi.object({
    project_id: Joi.number().integer().positive(),
    project: Joi.string().min(2).max(255).required(),
    task: Joi.string().min(2).max(255).required(),
    resource: Joi.string().min(2).max(255).required(),
    estimated_labor: Joi.number().min(0).default(0),
    estimated_material: Joi.number().min(0).default(0),
    overhead: Joi.number().min(0).default(0),
    actual_labor: Joi.number().min(0).default(0),
    actual_material: Joi.number().min(0).default(0),
    actual_overhead: Joi.number().min(0).default(0),
    status: Joi.string().valid('Estimated', 'In Progress', 'Completed').default('Estimated'),
  }),

  // Invoice schemas
  invoice: Joi.object({
    project_id: Joi.number().integer().positive().required(),
    client: Joi.string().min(2).max(255).required(),
    date: Joi.date().required(),
    due_date: Joi.date().greater(Joi.ref('date')).required(),
    grn_ref: Joi.string().max(50),
    items: Joi.array().items(
      Joi.object({
        description: Joi.string().min(2).max(255).required(),
        quantity: Joi.number().integer().positive().required(),
        rate: Joi.number().positive().required(),
      })
    ).min(1).required(),
    notes: Joi.string().max(1000),
  }),

  // Payment schemas
  payment: Joi.object({
    invoice_id: Joi.number().integer().positive().required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().required(),
    method: Joi.string().valid('Bank Transfer', 'Credit Card', 'PayPal', 'Check', 'Cash').default('Bank Transfer'),
    reference: Joi.string().max(100),
    notes: Joi.string().max(1000),
  }),

  // GRN schemas
  grn: Joi.object({
    material_id: Joi.number().integer().positive().required(),
    grn_number: Joi.string().required(),
    receipt_date: Joi.date().required(),
    received_qty: Joi.number().integer().positive().required(),
    received_condition: Joi.string().valid('Good', 'Damaged', 'Partial Delivery', 'Wrong Items').default('Good'),
    inspected_by: Joi.string().min(2).max(255).required(),
    storage_location: Joi.string().max(255),
    notes: Joi.string().max(1000),
  }),
};

module.exports = { validate, schemas };