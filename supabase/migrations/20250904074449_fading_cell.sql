-- VVD Project Management System Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS vvd_project_management;
USE vvd_project_management;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'ProjectManager', 'Designer', 'ProcurementOfficer', 'Finance', 'Quality', 'Client') DEFAULT 'Client',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
);

-- Projects table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(15,2) NOT NULL,
  status ENUM('Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled') DEFAULT 'Not Started',
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  manager_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_manager (manager_id),
  INDEX idx_dates (start_date, end_date)
);

-- RFQs table
CREATE TABLE rfqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rfq_id VARCHAR(20) UNIQUE NOT NULL,
  client VARCHAR(255) NOT NULL,
  project VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  value VARCHAR(50) NOT NULL,
  scope_summary TEXT,
  contact_person VARCHAR(255),
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  deadline DATE,
  notes TEXT,
  status ENUM('Submitted', 'Won', 'Lost') DEFAULT 'Submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_rfq_id (rfq_id),
  INDEX idx_status (status),
  INDEX idx_client (client),
  INDEX idx_date (date)
);

-- Contracts table
CREATE TABLE contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_id VARCHAR(20) UNIQUE NOT NULL,
  project_id INT,
  client VARCHAR(255) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  value VARCHAR(50) NOT NULL,
  signed_date DATE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  manager VARCHAR(255) NOT NULL,
  client_rep TEXT,
  payment_terms TEXT,
  status ENUM('Active', 'Completed', 'Terminated') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  INDEX idx_contract_id (contract_id),
  INDEX idx_status (status),
  INDEX idx_project (project_id),
  INDEX idx_dates (start_date, end_date)
);

-- Tasks table
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id INT NOT NULL,
  assignee_id INT NOT NULL,
  start_date DATE NOT NULL,
  due_date DATE NOT NULL,
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  status ENUM('Not Started', 'In Progress', 'Completed', 'On Hold') DEFAULT 'Not Started',
  progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_task_id (task_id),
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_project (project_id),
  INDEX idx_assignee (assignee_id),
  INDEX idx_dates (start_date, due_date)
);

-- Resources table
CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  subcontractor VARCHAR(255) NOT NULL,
  rate VARCHAR(50) NOT NULL,
  availability ENUM('Full-time', 'Part-time', 'Contract') DEFAULT 'Full-time',
  assigned_tasks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_role (role),
  INDEX idx_availability (availability)
);

-- Materials table (Procurement)
CREATE TABLE materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  material_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  project_id INT NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  qty INT NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  po_no VARCHAR(50) NOT NULL,
  planned_date DATE NOT NULL,
  actual_date DATE,
  status ENUM('Processing', 'Ordered', 'Pending', 'Delivered') DEFAULT 'Processing',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_material_id (material_id),
  INDEX idx_status (status),
  INDEX idx_project (project_id),
  INDEX idx_supplier (supplier),
  INDEX idx_po_no (po_no)
);

-- GRNs table (Goods Received Notes)
CREATE TABLE grns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grn_number VARCHAR(50) UNIQUE NOT NULL,
  material_id INT NOT NULL,
  receipt_date DATE NOT NULL,
  received_qty INT NOT NULL,
  received_condition ENUM('Good', 'Damaged', 'Partial Delivery', 'Wrong Items') DEFAULT 'Good',
  inspected_by VARCHAR(255) NOT NULL,
  storage_location VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
  INDEX idx_grn_number (grn_number),
  INDEX idx_material (material_id),
  INDEX idx_receipt_date (receipt_date)
);

-- Invoices table
CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  project_id INT NOT NULL,
  client VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  due_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  grn_ref VARCHAR(50),
  notes TEXT,
  status ENUM('Pending', 'Paid', 'Overdue') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_invoice_number (invoice_number),
  INDEX idx_status (status),
  INDEX idx_project (project_id),
  INDEX idx_dates (date, due_date)
);

-- Invoice Items table
CREATE TABLE invoice_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  INDEX idx_invoice (invoice_id)
);

-- Payments table
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id VARCHAR(50) UNIQUE NOT NULL,
  invoice_id INT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  date DATE NOT NULL,
  method ENUM('Bank Transfer', 'Credit Card', 'PayPal', 'Check', 'Cash') DEFAULT 'Bank Transfer',
  reference VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  INDEX idx_payment_id (payment_id),
  INDEX idx_invoice (invoice_id),
  INDEX idx_date (date),
  INDEX idx_method (method)
);

-- Quality Inspections table
CREATE TABLE quality_inspections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inspection_id VARCHAR(20) UNIQUE NOT NULL,
  task_id INT,
  date DATE NOT NULL,
  inspector VARCHAR(255) NOT NULL,
  snags TEXT,
  status ENUM('Open', 'Closed') DEFAULT 'Open',
  hse_issues ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  project VARCHAR(255),
  description TEXT,
  severity ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL,
  INDEX idx_inspection_id (inspection_id),
  INDEX idx_status (status),
  INDEX idx_hse_issues (hse_issues),
  INDEX idx_task (task_id),
  INDEX idx_date (date)
);

-- Milestones table
CREATE TABLE milestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  planned_date DATE NOT NULL,
  actual_date DATE,
  status ENUM('Not Started', 'In Progress', 'Completed', 'Pending', 'Delayed') DEFAULT 'Not Started',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_project (project_id),
  INDEX idx_dates (planned_date, actual_date)
);

-- Risks table
CREATE TABLE risks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  risk_id VARCHAR(20) UNIQUE NOT NULL,
  project_id INT NOT NULL,
  description TEXT NOT NULL,
  level ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  impact ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  probability ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  mitigation_plan TEXT,
  owner VARCHAR(255) NOT NULL,
  status ENUM('Open', 'Monitoring', 'Mitigated', 'Resolved', 'Closed') DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_risk_id (risk_id),
  INDEX idx_level (level),
  INDEX idx_impact (impact),
  INDEX idx_status (status),
  INDEX idx_project (project_id)
);

-- Drawings table (Design Management)
CREATE TABLE drawings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  drawing_id VARCHAR(20) UNIQUE NOT NULL,
  project_id INT NOT NULL,
  contract_id INT,
  stage ENUM('Concept', 'Detailed', 'IFC') NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size INT,
  submission_date DATE NOT NULL,
  status ENUM('Draft', 'Submitted', 'Approved') DEFAULT 'Draft',
  cloudinary_public_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE SET NULL,
  INDEX idx_drawing_id (drawing_id),
  INDEX idx_stage (stage),
  INDEX idx_status (status),
  INDEX idx_project (project_id),
  INDEX idx_contract (contract_id)
);

-- Job Costs table
CREATE TABLE job_costs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id VARCHAR(20) UNIQUE NOT NULL,
  project_id INT,
  project VARCHAR(255) NOT NULL,
  task VARCHAR(255) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  estimated_labor DECIMAL(15,2) DEFAULT 0,
  estimated_material DECIMAL(15,2) DEFAULT 0,
  overhead DECIMAL(15,2) DEFAULT 0,
  estimated_cost DECIMAL(15,2) DEFAULT 0,
  actual_labor DECIMAL(15,2) DEFAULT 0,
  actual_material DECIMAL(15,2) DEFAULT 0,
  actual_overhead DECIMAL(15,2) DEFAULT 0,
  actual_cost DECIMAL(15,2) DEFAULT 0,
  variance DECIMAL(15,2) DEFAULT 0,
  status ENUM('Estimated', 'In Progress', 'Completed') DEFAULT 'Estimated',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  INDEX idx_job_id (job_id),
  INDEX idx_status (status),
  INDEX idx_project (project_id)
);

-- Material Prices table (for price database)
CREATE TABLE material_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_item_name (item_name)
);

-- Labor Rates table (for price database)
CREATE TABLE labor_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_role_name (role_name)
);

-- Project Closeout table
CREATE TABLE project_closeouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  final_inspection_date DATE,
  snag_list_resolved ENUM('Yes', 'No'),
  as_built_drawings_submitted ENUM('Yes', 'No'),
  handover_date DATE,
  warranty_period INT, -- in months
  closure_status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_project (project_id),
  INDEX idx_status (closure_status)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email_role ON users(email, role);
CREATE INDEX idx_projects_status_priority ON projects(status, priority);
CREATE INDEX idx_tasks_project_assignee ON tasks(project_id, assignee_id);
CREATE INDEX idx_materials_project_status ON materials(project_id, status);
CREATE INDEX idx_invoices_project_status ON invoices(project_id, status);
CREATE INDEX idx_quality_task_status ON quality_inspections(task_id, status);