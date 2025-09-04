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
};

module.exports = { validate, schemas };