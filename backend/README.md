# VVD Project Management System - Backend API

A comprehensive Node.js + Express backend with MySQL database for the VVD Project Management System.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Complete CRUD Operations**: Full Create, Read, Update, Delete for all entities
- **Advanced Filtering**: Search, filter, sort, and pagination on all endpoints
- **File Upload**: Cloudinary integration for drawing/document uploads
- **Role-Based Access**: Different permissions for Admin, ProjectManager, Designer, etc.
- **Performance Optimized**: Database indexing, pagination, and query optimization
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Input Validation**: Joi validation for all inputs
- **Security**: Helmet, CORS, rate limiting, and password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Cloudinary account (for file uploads)

## 🛠️ Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=vvd_project_management
   DB_USER=root
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Create database and tables
   npm run migrate
   
   # Insert sample data
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📊 Database Schema

### Core Tables
- **users**: User management with roles
- **projects**: Project information and tracking
- **tasks**: Task management and assignment
- **rfqs**: Request for Quotations
- **contracts**: Contract management
- **resources**: Resource allocation

### Financial Tables
- **invoices**: Invoice management
- **invoice_items**: Invoice line items
- **payments**: Payment tracking
- **job_costs**: Job cost management

### Operational Tables
- **materials**: Procurement and material tracking
- **grns**: Goods Received Notes
- **quality_inspections**: Quality and HSE inspections
- **milestones**: Project milestones
- **risks**: Risk management
- **drawings**: Design document management

### Reference Tables
- **material_prices**: Material price database
- **labor_rates**: Labor rate database
- **project_closeouts**: Project closure tracking

## 🔐 Authentication

### Default Users (Password: `password123`)
- **Admin**: admin@vvd.com
- **Project Manager**: ahmed@vvd.com
- **Designer**: sarah@vvd.com
- **Procurement Officer**: omar@vvd.com
- **Finance**: fatima@vvd.com
- **Quality**: khalid@vvd.com
- **Client**: client1@example.com

### JWT Token Usage
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📡 API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # User login
POST   /api/auth/forgot-password   # Password reset
GET    /api/auth/profile           # Get user profile
```

### Project Management
```
GET    /api/projects               # Get all projects (paginated)
GET    /api/projects/stats         # Get project statistics
GET    /api/projects/:id           # Get project by ID
POST   /api/projects               # Create new project
PUT    /api/projects/:id           # Update project
DELETE /api/projects/:id           # Delete project
```

### RFQ Management
```
GET    /api/rfqs                   # Get all RFQs (paginated)
GET    /api/rfqs/stats             # Get RFQ statistics
GET    /api/rfqs/:id               # Get RFQ by ID
POST   /api/rfqs                   # Create new RFQ
PUT    /api/rfqs/:id               # Update RFQ
DELETE /api/rfqs/:id               # Delete RFQ
```

### Contract Management
```
GET    /api/contracts              # Get all contracts (paginated)
GET    /api/contracts/stats        # Get contract statistics
GET    /api/contracts/:id          # Get contract by ID
POST   /api/contracts              # Create new contract
PUT    /api/contracts/:id          # Update contract
DELETE /api/contracts/:id          # Delete contract
```

### Task Management
```
GET    /api/tasks                  # Get all tasks (paginated)
GET    /api/tasks/stats            # Get task statistics
GET    /api/tasks/project/:id      # Get tasks by project
GET    /api/tasks/assignee/:id     # Get tasks by assignee
GET    /api/tasks/:id              # Get task by ID
POST   /api/tasks                  # Create new task
PUT    /api/tasks/:id              # Update task
DELETE /api/tasks/:id              # Delete task
```

### Resource Management
```
GET    /api/resources              # Get all resources (paginated)
GET    /api/resources/stats        # Get resource statistics
GET    /api/resources/:id          # Get resource by ID
POST   /api/resources              # Create new resource
PUT    /api/resources/:id          # Update resource
DELETE /api/resources/:id          # Delete resource
```

### Financial Management
```
GET    /api/financials/invoices    # Get all invoices (paginated)
GET    /api/financials/invoices/:id # Get invoice by ID
POST   /api/financials/invoices    # Create new invoice
PUT    /api/financials/invoices/:id # Update invoice
DELETE /api/financials/invoices/:id # Delete invoice

GET    /api/financials/payments    # Get all payments (paginated)
POST   /api/financials/payments    # Record new payment

GET    /api/financials/stats       # Get financial statistics
GET    /api/financials/projects/:id # Get project financials
```

### Procurement Management
```
GET    /api/procurement/materials  # Get all materials (paginated)
GET    /api/procurement/materials/stats # Get procurement statistics
GET    /api/procurement/materials/:id # Get material by ID
POST   /api/procurement/materials  # Create new material
PUT    /api/procurement/materials/:id # Update material
DELETE /api/procurement/materials/:id # Delete material

GET    /api/procurement/materials/:id/po # Generate Purchase Order
POST   /api/procurement/grn        # Generate GRN
```

### Quality & HSE Management
```
GET    /api/quality/inspections    # Get all inspections (paginated)
GET    /api/quality/inspections/stats # Get quality statistics
GET    /api/quality/inspections/:id # Get inspection by ID
POST   /api/quality/inspections    # Create new inspection
PUT    /api/quality/inspections/:id # Update inspection
DELETE /api/quality/inspections/:id # Delete inspection
```

### Milestone Management
```
GET    /api/milestones             # Get all milestones (paginated)
GET    /api/milestones/stats       # Get milestone statistics
GET    /api/milestones/:id         # Get milestone by ID
POST   /api/milestones             # Create new milestone
PUT    /api/milestones/:id         # Update milestone
DELETE /api/milestones/:id         # Delete milestone
```

### Risk Management
```
GET    /api/risks                  # Get all risks (paginated)
GET    /api/risks/stats            # Get risk statistics
GET    /api/risks/:id              # Get risk by ID
POST   /api/risks                  # Create new risk
PUT    /api/risks/:id              # Update risk
DELETE /api/risks/:id              # Delete risk
```

### Design Management
```
GET    /api/designs/drawings       # Get all drawings (paginated)
GET    /api/designs/drawings/stats # Get design statistics
GET    /api/designs/drawings/:id   # Get drawing by ID
POST   /api/designs/drawings       # Upload new drawing
PUT    /api/designs/drawings/:id   # Update drawing
DELETE /api/designs/drawings/:id   # Delete drawing
```

### Job Cost Management
```
GET    /api/job-costs              # Get all job costs (paginated)
GET    /api/job-costs/stats        # Get job cost statistics & price database
GET    /api/job-costs/:id          # Get job cost by ID
POST   /api/job-costs              # Create new job cost
PUT    /api/job-costs/:id          # Update job cost
DELETE /api/job-costs/:id          # Delete job cost
```

### Reports & Analytics
```
GET    /api/reports/generate       # Generate project reports
GET    /api/reports/history        # Get report history
GET    /api/reports/dashboard-stats # Get dashboard statistics by role
```

### User Management
```
GET    /api/users                  # Get all users (Admin only)
GET    /api/users/stats            # Get user statistics (Admin only)
GET    /api/users/:id              # Get user by ID (Admin only)
PUT    /api/users/:id              # Update user (Admin only)
DELETE /api/users/:id              # Delete user (Admin only)
```

## 🔍 Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Sorting
- `sortBy`: Field to sort by
- `sortOrder`: ASC or DESC (default: ASC)

### Filtering
- `search`: Search term for text fields
- `status`: Filter by status
- `priority`: Filter by priority
- `role`: Filter by role (users)
- `project_id`: Filter by project

### Example Requests
```bash
# Get paginated projects with search and filter
GET /api/projects?page=1&limit=10&search=villa&status=In Progress&sortBy=name&sortOrder=ASC

# Get tasks for specific project
GET /api/tasks/project/1

# Get financial statistics
GET /api/financials/stats

# Generate project report
GET /api/reports/generate?projectId=1&reportType=project-summary&startDate=2024-01-01&endDate=2024-12-31
```

## 🎯 Frontend-Backend Mapping

### Admin Dashboard (`/dashboard`)
- **API**: `GET /api/reports/dashboard-stats`
- **Data**: Project stats, RFQ stats, contract stats, task stats, financial stats

### RFQ Management (`/rfq`)
- **API**: `GET /api/rfqs` (list), `POST /api/rfqs` (create), `PUT /api/rfqs/:id` (update)
- **Data**: RFQ list with pagination, search, and status filtering

### Contract Management (`/contracts`)
- **API**: `GET /api/contracts` (list), `POST /api/contracts` (create), `PUT /api/contracts/:id` (update)
- **Data**: Contract list with project linking and client information

### Task Management (`/tasks`)
- **API**: `GET /api/tasks` (list), `POST /api/tasks` (create), `PUT /api/tasks/:id` (update)
- **Data**: Task list with assignee and project information

### Design Management (`/design`)
- **API**: `GET /api/designs/drawings` (list), `POST /api/designs/drawings` (upload)
- **Data**: Drawing repository with file upload to Cloudinary

### Procurement (`/procurement`)
- **API**: `GET /api/procurement/materials` (list), `POST /api/procurement/materials` (create)
- **Data**: Material list with supplier and PO information

### Financials (`/financials`)
- **API**: `GET /api/financials/invoices` (invoices), `GET /api/financials/payments` (payments)
- **Data**: Invoice and payment management with project linking

### Quality & HSE (`/quality`)
- **API**: `GET /api/quality/inspections` (list), `POST /api/quality/inspections` (create)
- **Data**: Quality inspection logs with task linking

### Job Cost Management (`/job-cost`)
- **API**: `GET /api/job-costs` (list), `GET /api/job-costs/stats` (price database)
- **Data**: Job cost tracking with material and labor price database

### Reports (`/reports`)
- **API**: `GET /api/reports/generate` (generate), `GET /api/reports/history` (history)
- **Data**: Report generation and history tracking

## 🔒 Role-Based Access Control

### Admin
- Full access to all endpoints
- User management capabilities
- System configuration

### ProjectManager
- Project, task, and resource management
- RFQ and contract management
- Financial and procurement oversight
- Quality and risk management

### Designer
- Design document management
- Task management (assigned tasks)
- Project viewing

### ProcurementOfficer
- Material and supplier management
- Purchase order generation
- GRN management

### Finance
- Invoice and payment management
- Financial reporting
- Job cost management

### Quality
- Quality inspection management
- HSE issue tracking
- Quality reporting

### Client
- Project viewing
- Task viewing (assigned)
- Financial information (own projects)
- Report viewing

## 🧪 Testing

### Using Postman
1. Import the provided Postman collection
2. Set environment variables:
   - `baseUrl`: http://localhost:5000
   - `token`: JWT token from login response

### Sample API Calls

#### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@vvd.com",
  "password": "password123",
  "role": "Admin"
}
```

#### Get Projects
```bash
GET http://localhost:5000/api/projects?page=1&limit=10
Authorization: Bearer <your_jwt_token>
```

#### Create Task
```bash
POST http://localhost:5000/api/tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "project_id": 1,
  "assignee_id": 2,
  "start_date": "2024-01-01",
  "due_date": "2024-01-15",
  "priority": "High"
}
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # MySQL connection
│   └── cloudinary.js        # Cloudinary configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── projectController.js # Project management
│   ├── rfqController.js     # RFQ management
│   ├── contractController.js # Contract management
│   ├── taskController.js    # Task management
│   ├── resourceController.js # Resource management
│   ├── financialController.js # Financial management
│   ├── procurementController.js # Procurement management
│   ├── qualityController.js # Quality & HSE management
│   ├── milestoneController.js # Milestone management
│   ├── riskController.js    # Risk management
│   ├── designController.js  # Design management
│   ├── jobCostController.js # Job cost management
│   ├── reportController.js  # Reports and analytics
│   └── userController.js    # User management
├── middleware/
│   ├── auth.js             # JWT authentication
│   ├── errorHandler.js     # Error handling
│   ├── notFound.js         # 404 handler
│   ├── upload.js           # File upload (Multer)
│   └── validation.js       # Input validation (Joi)
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   ├── projectRoutes.js    # Project routes
│   ├── rfqRoutes.js        # RFQ routes
│   ├── contractRoutes.js   # Contract routes
│   ├── taskRoutes.js       # Task routes
│   ├── resourceRoutes.js   # Resource routes
│   ├── financialRoutes.js  # Financial routes
│   ├── procurementRoutes.js # Procurement routes
│   ├── qualityRoutes.js    # Quality routes
│   ├── milestoneRoutes.js  # Milestone routes
│   ├── riskRoutes.js       # Risk routes
│   ├── designRoutes.js     # Design routes
│   ├── jobCostRoutes.js    # Job cost routes
│   ├── reportRoutes.js     # Report routes
│   └── userRoutes.js       # User routes
├── utils/
│   ├── responseHelper.js   # Response formatting
│   └── pagination.js       # Pagination utilities
├── database/
│   ├── schema.sql          # Database schema
│   └── seed.sql            # Sample data
├── scripts/
│   ├── migrate.js          # Database migration
│   └── seed.js             # Database seeding
├── .env.example            # Environment template
├── package.json            # Dependencies
└── server.js               # Main server file
```

## 🚦 Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## 📈 Performance Considerations

- **Database Indexing**: Optimized indexes on frequently queried fields
- **Pagination**: Server-side pagination for large datasets
- **Connection Pooling**: MySQL connection pooling for better performance
- **Rate Limiting**: API rate limiting to prevent abuse
- **Compression**: Response compression for faster data transfer
- **Caching Headers**: Appropriate cache headers for static content

## 🔧 Development

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run migrate    # Run database migrations
npm run seed       # Seed database with sample data
npm test           # Run tests
```

### Adding New Endpoints
1. Create controller in `controllers/`
2. Add routes in `routes/`
3. Update `server.js` to include new routes
4. Add validation schemas in `middleware/validation.js`
5. Update database schema if needed

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **JWT Token Issues**
   - Check JWT_SECRET in `.env`
   - Verify token format in Authorization header

3. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits (10MB max)
   - Ensure proper file types

4. **CORS Issues**
   - Update FRONTEND_URL in `.env`
   - Check CORS configuration in `server.js`

### Logs
- Development: Console logs with Morgan
- Production: Consider adding Winston for file logging

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review API documentation
- Check database schema and relationships
- Verify role-based permissions

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

This backend provides complete API coverage for all frontend screens with proper authentication, validation, and error handling.