-- Seed data for VVD Project Management System

USE vvd_project_management;

-- Insert sample users
INSERT INTO users (first_name, last_name, email, password, role, status) VALUES
('Admin', 'User', 'admin@vvd.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'Admin', 'active'),
('Ahmed', 'Al-Rashid', 'ahmed@vvd.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'ProjectManager', 'active'),
('Sarah', 'Mohammed', 'sarah@vvd.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'Designer', 'active'),
('Omar', 'Hassan', 'omar@vvd.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'ProcurementOfficer', 'active'),
('Fatima', 'Al-Zahra', 'fatima@vvd.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'Finance', 'active'),
('Khalid', 'Al-Mansouri', 'khalid@vvd.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'Quality', 'active'),
('Mohammed', 'Al-Fayed', 'client1@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAHVfXe', 'Client', 'active');

-- Insert sample projects
INSERT INTO projects (name, client, description, start_date, end_date, budget, status, priority, manager_id) VALUES
('Swimming Pool Construction - Villa Project', 'Al Mansouri Development', 'Design and construction of luxury swimming pools for 15 villas, including filtration systems and water features.', '2024-01-20', '2024-05-15', 125000.00, 'In Progress', 'High', 2),
('Landscape Design - Commercial Complex', 'Emirates Properties', 'Complete landscape design for a new commercial complex including green spaces, walkways, and water features.', '2024-02-01', '2024-06-30', 89500.00, 'In Progress', 'High', 2),
('Site Survey - Residential Project', 'Dubai Hills Estate', 'Comprehensive site survey for a new residential development including soil testing and topographic mapping.', '2024-01-01', '2024-03-31', 67800.00, 'Completed', 'Medium', 3);

-- Insert sample RFQs
INSERT INTO rfqs (rfq_id, client, project, date, location, value, scope_summary, contact_person, contact_email, contact_phone, deadline, notes, status) VALUES
('RFQ-001', 'Al Mansouri Development', 'Swimming Pool Construction - Villa Project', '2024-01-15', 'Dubai Hills Estate', '$125,000', 'Design and construction of luxury swimming pools for 15 villas, including filtration systems and water features.', 'Omar Al-Mansouri', 'omar@almansouridev.com', '+971 50 123 4567', '2024-02-15', 'Client is particularly interested in eco-friendly filtration systems.', 'Won'),
('RFQ-002', 'Emirates Properties', 'Landscape Design - Commercial Complex', '2024-01-12', 'Business Bay', '$89,500', 'Complete landscape design for a new commercial complex including green spaces, walkways, and water features.', 'Sarah Johnson', 's.johnson@emiratesproperties.ae', '+971 55 987 6543', '2024-02-10', 'Project won with a 10% discount offer. Client very satisfied with our sustainable approach.', 'Won'),
('RFQ-003', 'Dubai Hills Estate', 'Site Survey - Residential Project', '2024-01-10', 'Mohammed Bin Rashid City', '$67,800', 'Comprehensive site survey for a new residential development including soil testing and topographic mapping.', 'Ahmed Hassan', 'a.hassan@dubaihills.com', '+971 52 456 7890', '2024-02-05', 'Lost to competitor who offered a faster turnaround time.', 'Lost');

-- Insert sample contracts
INSERT INTO contracts (contract_id, project_id, client, project_name, value, signed_date, start_date, end_date, manager, client_rep, payment_terms, status) VALUES
('CON-001', 1, 'Al Mansouri Development', 'Swimming Pool Construction - Villa Project', '$125,000', '2024-01-10', '2024-01-20', '2024-05-15', 'Ahmed Al-Rashid', 'Fatima Al-Mansouri - f.mansouri@almansouri.com - +971 55 987 6543', '40% advance, 30% after excavation, 30% upon completion', 'Active'),
('CON-002', 2, 'Emirates Properties', 'Landscape Design - Commercial Complex', '$89,500', '2024-01-15', '2024-02-01', '2024-06-30', 'Ahmed Al-Rashid', 'Mohammed Al-Fayed - m.alfayed@emirates.com - +971 50 123 4567', '30% advance, 40% on completion of phase 1, 30% on final delivery', 'Active'),
('CON-003', 3, 'Dubai Hills Estate', 'Site Survey - Residential Project', '$67,800', '2023-12-15', '2024-01-01', '2024-03-31', 'Omar Hassan', 'Khalid Al-Jaber - k.jaber@dubaihills.com - +971 52 456 7890', '50% advance, 50% on delivery of final report', 'Completed');

-- Insert sample tasks
INSERT INTO tasks (task_id, title, description, project_id, assignee_id, start_date, due_date, priority, status, progress) VALUES
('TSK-001', 'Site Survey and Preparation', 'Complete site survey and prepare for excavation work', 1, 2, '2024-02-01', '2024-02-05', 'High', 'Completed', 100),
('TSK-002', 'Excavation Work', 'Excavate pool areas according to design specifications', 1, 2, '2024-02-06', '2024-02-12', 'High', 'In Progress', 75),
('TSK-003', 'Design Review and Approval', 'Review landscape design with client and get approval', 2, 3, '2024-02-15', '2024-02-20', 'Medium', 'Not Started', 0);

-- Insert sample resources
INSERT INTO resources (name, role, subcontractor, rate, availability, assigned_tasks) VALUES
('John Smith', 'Developer', 'Tech Solutions Inc.', '$85/hr', 'Full-time', 3),
('Sarah Johnson', 'Designer', 'Creative Designs', '$75/hr', 'Part-time', 2),
('Michael Brown', 'Project Manager', 'In-House', '$95/hr', 'Full-time', 5),
('Emily Davis', 'QA Engineer', 'Quality Assurance Co.', '$70/hr', 'Full-time', 4),
('Robert Wilson', 'DevOps', 'Cloud Services Ltd.', '$90/hr', 'Contract', 2);

-- Insert sample materials
INSERT INTO materials (material_id, name, project_id, supplier, qty, unit_cost, po_no, planned_date, actual_date, status, notes) VALUES
('MAT-001', 'Steel Beams', 1, 'Al-Mansouri Suppliers', 10, 250.00, 'PO-001', '2024-03-15', '2024-03-16', 'Delivered', 'High-quality structural steel beams for main framework.'),
('MAT-002', 'Reinforcement Bars', 2, 'Dubai Steel Co.', 5, 800.00, 'PO-002', '2024-03-20', NULL, 'Pending', 'Grade 60 reinforcement bars for concrete structures.'),
('MAT-003', 'Landscaping Plants', 3, 'Landscape Supplies Inc.', 200, 15.00, 'PO-003', '2024-03-25', '2024-03-24', 'Delivered', 'Drought-resistant plants for the main garden area.'),
('MAT-004', 'Electrical Wiring', 1, 'ElectroPower LLC', 1500, 2.50, 'PO-004', '2024-04-05', NULL, 'Ordered', 'Copper electrical wiring for entire building.'),
('MAT-005', 'Ceramic Tiles', 2, 'Tile Masters', 500, 12.00, 'PO-005', '2024-04-10', NULL, 'Processing', 'Premium ceramic tiles for bathrooms and kitchens.');

-- Insert sample invoices
INSERT INTO invoices (invoice_number, project_id, client, date, due_date, amount, grn_ref, status) VALUES
('INV-2023-001', 1, 'Al Mansouri Development', '2023-05-15', '2023-06-15', 450000.00, 'GRN-2023-045', 'Paid'),
('INV-2023-002', 1, 'Al Mansouri Development', '2023-06-20', '2023-07-20', 385000.00, 'GRN-2023-052', 'Paid'),
('INV-2023-003', 2, 'Emirates Properties', '2023-05-25', '2023-06-25', 320000.00, 'GRN-2023-048', 'Paid'),
('INV-2023-004', 2, 'Emirates Properties', '2023-07-10', '2023-08-10', 275000.00, 'GRN-2023-061', 'Pending'),
('INV-2023-005', 3, 'Dubai Hills Estate', '2023-06-05', '2023-07-05', 310000.00, 'GRN-2023-050', 'Overdue');

-- Insert sample invoice items
INSERT INTO invoice_items (invoice_id, description, quantity, rate, amount) VALUES
(1, 'Construction Materials', 1, 315000.00, 315000.00),
(1, 'Labor Charges', 1, 135000.00, 135000.00),
(2, 'Construction Materials', 1, 269500.00, 269500.00),
(2, 'Labor Charges', 1, 115500.00, 115500.00),
(3, 'Landscape Materials', 1, 224000.00, 224000.00),
(3, 'Installation Services', 1, 96000.00, 96000.00);

-- Insert sample payments
INSERT INTO payments (payment_id, invoice_id, amount, date, method, reference) VALUES
('PAY-2023-001', 1, 450000.00, '2023-06-10', 'Bank Transfer', 'TRX-78945612'),
('PAY-2023-002', 2, 385000.00, '2023-07-15', 'Bank Transfer', 'TRX-78945633'),
('PAY-2023-003', 3, 320000.00, '2023-06-20', 'Check', 'CHQ-784512'),
('PAY-2023-004', 5, 150000.00, '2023-07-01', 'Bank Transfer', 'TRX-78945789');

-- Insert sample quality inspections
INSERT INTO quality_inspections (inspection_id, task_id, date, inspector, snags, status, hse_issues, project, description, severity) VALUES
('INSP-001', 1, '2024-02-05', 'John Smith', 'Lack of safety signage in area B', 'Open', 'High', 'Swimming Pool Construction', 'Safety inspection revealed missing signage', 'High'),
('INSP-002', 2, '2024-02-10', 'Emma Johnson', 'Equipment not properly stored', 'Closed', 'Medium', 'Swimming Pool Construction', 'Equipment storage issues resolved', 'Medium'),
('INSP-003', 3, '2024-02-15', 'Michael Brown', 'Missing protective equipment', 'Open', 'Critical', 'Landscape Design', 'Critical safety equipment missing', 'High');

-- Insert sample milestones
INSERT INTO milestones (project_id, name, planned_date, actual_date, status) VALUES
(1, 'Requirements Gathering', '2024-01-25', '2024-01-24', 'Completed'),
(1, 'Design Approval', '2024-02-10', '2024-02-12', 'Completed'),
(2, 'Development Phase 1', '2024-03-01', NULL, 'In Progress'),
(3, 'Client Presentation', '2024-02-20', '2024-02-18', 'Completed'),
(2, 'Testing Phase', '2024-04-25', NULL, 'Pending');

-- Insert sample risks
INSERT INTO risks (risk_id, project_id, description, level, impact, probability, mitigation_plan, owner, status) VALUES
('RISK-001', 1, 'Scope creep due to unclear requirements', 'High', 'High', 'Medium', 'Implement change control process and regular stakeholder meetings', 'Ahmed Al-Rashid', 'Open'),
('RISK-002', 1, 'Key team member resignation', 'Medium', 'Medium', 'Low', 'Cross-train team members and document processes', 'Ahmed Al-Rashid', 'Monitoring'),
('RISK-003', 2, 'Technology compatibility issues', 'High', 'High', 'Medium', 'Conduct proof of concept early in the project', 'Sarah Mohammed', 'Open'),
('RISK-004', 3, 'Weather delays during survey', 'Medium', 'Medium', 'High', 'Plan for weather contingencies and flexible scheduling', 'Omar Hassan', 'Resolved');

-- Insert sample drawings
INSERT INTO drawings (drawing_id, project_id, contract_id, stage, file_name, file_url, file_size, submission_date, status) VALUES
('DRW-001', 1, 1, 'Concept', 'pool_concept_design.dwg', 'https://example.com/drawings/pool_concept.dwg', 2457600, '2024-01-15', 'Approved'),
('DRW-002', 1, 1, 'Detailed', 'pool_detailed_drawings.dwg', 'https://example.com/drawings/pool_detailed.dwg', 6082560, '2024-01-20', 'Submitted'),
('DRW-003', 2, 2, 'Concept', 'landscape_concept.pdf', 'https://example.com/drawings/landscape_concept.pdf', 3355443, '2024-01-18', 'Draft');

-- Insert sample job costs
INSERT INTO job_costs (job_id, project_id, project, task, resource, estimated_labor, estimated_material, overhead, estimated_cost, actual_labor, actual_material, actual_overhead, actual_cost, variance, status) VALUES
('JC-001', 1, 'Swimming Pool Construction', 'Excavation', 'Ahmed Al-Rashid', 8000.00, 6000.00, 2200.00, 16200.00, 8000.00, 6000.00, 2200.00, 16200.00, 0.00, 'Completed'),
('JC-002', 1, 'Swimming Pool Construction', 'Pool Shell Construction', 'Construction Team A', 25000.00, 15000.00, 2500.00, 42500.00, 25000.00, 15000.00, 2500.00, 42500.00, 0.00, 'In Progress'),
('JC-003', 2, 'Landscape Design', 'Site Preparation', 'Landscape Team', 7000.00, 4000.00, 1000.00, 12000.00, 0.00, 0.00, 0.00, 0.00, 12000.00, 'Estimated');

-- Insert sample material prices
INSERT INTO material_prices (item_name, price, unit, category) VALUES
('Concrete (m³)', 350.00, 'per m³', 'Construction'),
('Steel Rebar (ton)', 2800.00, 'per ton', 'Construction'),
('Pool Tiles (m²)', 85.00, 'per m²', 'Finishing'),
('Pool Equipment Set', 15000.00, 'per set', 'Equipment'),
('Landscape Plants', 45.00, 'per plant', 'Landscaping'),
('Irrigation System (m)', 25.00, 'per meter', 'Landscaping');

-- Insert sample labor rates
INSERT INTO labor_rates (role_name, rate, unit) VALUES
('Site Supervisor', 150.00, 'per day'),
('Skilled Worker', 120.00, 'per day'),
('General Laborer', 80.00, 'per day'),
('Equipment Operator', 180.00, 'per day'),
('Specialist Technician', 200.00, 'per day');

-- Insert sample GRNs
INSERT INTO grns (grn_number, material_id, receipt_date, received_qty, received_condition, inspected_by, storage_location, notes) VALUES
('GRN-2024-001', 1, '2024-03-16', 10, 'Good', 'Ahmed Al-Rashid', 'Warehouse A - Section 1', 'All steel beams received in good condition'),
('GRN-2024-002', 3, '2024-03-24', 200, 'Good', 'Sarah Mohammed', 'Nursery Area', 'Plants received and immediately planted'),
('GRN-2024-003', 2, '2024-03-22', 3, 'Partial Delivery', 'Omar Hassan', 'Warehouse B', 'Only 3 out of 5 bars received, remaining expected next week');

-- Insert sample project closeouts
INSERT INTO project_closeouts (project_id, final_inspection_date, snag_list_resolved, as_built_drawings_submitted, handover_date, warranty_period, closure_status) VALUES
(3, '2024-03-28', 'Yes', 'Yes', '2024-03-31', 12, 'Completed');