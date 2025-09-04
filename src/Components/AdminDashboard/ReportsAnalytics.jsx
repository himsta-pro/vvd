// import React, { useState, useEffect } from 'react';
// import { FaFilePdf, FaFileExcel, FaChartBar, FaFilter, FaDownload, FaShare, FaCog, FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';
// import { BsGraphUp, BsCalendarDate, BsCashCoin, BsThreeDotsVertical, BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';

// // ChartJS को register करें
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // API से डेटा fetch करने के लिए मock function (आप इसे वास्तविक API call से बदल सकते हैं)
// const fetchReportData = async (category, dateRange, project) => {
//   // यहाँ आप वास्तविक API call कर सकते हैं
//   console.log(`Fetching data for: ${category}, ${dateRange}, ${project}`);

//   // Mock data - आप इसे API response से replace कर सकते हैं
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         success: true,
//         data: {
//           // यहाँ आपका API response आएगा
//         }
//       });
//     }, 500);
//   });
// };

// const ReportsAnalytics = () => {
//   const [activeCategory, setActiveCategory] = useState('dashboard');
//   const [dateRange, setDateRange] = useState('last7days');
//   const [selectedProject, setSelectedProject] = useState('all');
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // API से fetch किए गए data को store करने के लिए state
//   const [apiData, setApiData] = useState({});

//   const reportCategories = [
//     { id: 'dashboard', name: 'Dashboard', icon: <BsGraphUp /> },
//     { id: 'project', name: 'Projects', icon: <FaChartBar /> },
//     { id: 'financial', name: 'Financial', icon: <BsCashCoin /> },
//     { id: 'procurement', name: 'Procurement', icon: <FaDownload /> },
//     { id: 'quality', name: 'Quality', icon: <FaFilter /> },
//     { id: 'resource', name: 'Resources', icon: <FaCog /> },
//     { id: 'risk', name: 'Risks', icon: <FaSearch /> },
//     { id: 'milestone', name: 'Milestones', icon: <BsCalendarDate /> }
//   ];

//   // Chart options और data
//   const barChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Performance',
//       },
//     },
//   };

//   const barChartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [
//       {
//         label: 'Completed',
//         data: [12, 19, 8, 15, 24, 18, 22],
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//       {
//         label: 'Pending',
//         data: [8, 12, 5, 9, 14, 10, 16],
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//     ],
//   };

//   const lineChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Progress Trend',
//       },
//     },
//   };

//   const lineChartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [
//       {
//         label: 'Budget Utilization (%)',
//         data: [65, 59, 70, 72, 75, 78, 82],
//         borderColor: 'rgb(53, 162, 235)',
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//       {
//         label: 'Schedule Adherence (%)',
//         data: [72, 68, 74, 78, 80, 82, 85],
//         borderColor: 'rgb(75, 192, 192)',
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//       },
//     ],
//   };

//   // Quality और Risks के लिए छोटे size वाले doughnut chart options
//   const smallDoughnutChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Project Distribution',
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   const regularDoughnutChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Project Distribution',
//       },
//     },
//   };

//   const doughnutChartData = {
//     labels: ['Completed', 'In Progress', 'Delayed', 'Not Started'],
//     datasets: [
//       {
//         label: 'Projects',
//         data: [18, 24, 6, 4],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Sample data for each report category
//   const reportData = {
//     dashboard: {
//       title: 'Executive Summary',
//       description: 'High-level overview of all projects with KPIs',
//       stats: [
//         { title: 'Active Projects', value: '24', change: '+2', trend: 'up' },
//         { title: 'Completed Tasks', value: '128', change: '+12', trend: 'up' },
//         { title: 'Budget Utilization', value: '78%', change: '+3%', trend: 'up' },
//         { title: 'Resource Utilization', value: '82%', change: '-2%', trend: 'down' },
//       ],
//       content: [
//         { label: 'Projects On Track', value: '14', color: 'success' },
//         { label: 'Projects At Risk', value: '6', color: 'warning' },
//         { label: 'Delayed Projects', value: '4', color: 'danger' },
//         { label: 'Not Started', value: '2', color: 'info' },
//       ],
//       chartType: 'mixed'
//     },
//     project: {
//       title: 'Project Performance Report',
//       description: 'Detailed analysis of all project performance metrics',
//       stats: [
//         { title: 'Total Projects', value: '24', change: '+2', trend: 'up' },
//         { title: 'Avg. Completion', value: '68%', change: '+5%', trend: 'up' },
//         { title: 'Behind Schedule', value: '6', change: '-2', trend: 'down' },
//         { title: 'On Budget', value: '18', change: '+3', trend: 'up' },
//       ],
//       content: [
//         { label: 'Design Phase', value: '8 projects', color: 'info' },
//         { label: 'Development Phase', value: '12 projects', color: 'primary' },
//         { label: 'Testing Phase', value: '7 projects', color: 'warning' },
//         { label: 'Completed', value: '5 projects', color: 'success' },
//       ],
//       chartType: 'bar'
//     },
//     financial: {
//       title: 'Financial Overview',
//       description: 'Comprehensive financial analysis across all projects',
//       stats: [
//         { title: 'Total Budget', value: '$4.2M', change: '+$0.3M', trend: 'up' },
//         { title: 'Actual Spend', value: '$3.1M', change: '+$0.4M', trend: 'up' },
//         { title: 'Remaining Budget', value: '$1.1M', change: '-$0.1M', trend: 'down' },
//         { title: 'Cost Variance', value: '-4.2%', change: '+1.2%', trend: 'up' },
//       ],
//       content: [
//         { label: 'Labor Costs', value: '$1.8M', color: 'primary' },
//         { label: 'Material Costs', value: '$0.9M', color: 'info' },
//         { label: 'Equipment Costs', value: '$0.4M', color: 'warning' },
//         { label: 'Overhead Costs', value: '$0.3M', color: 'secondary' },
//       ],
//       chartType: 'line'
//     },
//     procurement: {
//       title: 'Procurement Status',
//       description: 'Overview of purchase orders and vendor performance',
//       stats: [
//         { title: 'Total POs', value: '47', change: '+5', trend: 'up' },
//         { title: 'Pending Approval', value: '8', change: '-3', trend: 'down' },
//         { title: 'Completed POs', value: '32', change: '+4', trend: 'up' },
//         { title: 'Avg. Delivery Time', value: '6.2 days', change: '-0.8', trend: 'down' },
//       ],
//       content: [
//         { label: 'POs This Month', value: '12', color: 'primary' },
//         { label: 'Vendor Rating', value: '4.6/5', color: 'success' },
//         { label: 'Late Deliveries', value: '3', color: 'danger' },
//         { label: 'Quality Issues', value: '2', color: 'warning' },
//       ],
//       chartType: 'bar'
//     },
//     quality: {
//       title: 'Quality Assurance Report',
//       description: 'Quality metrics and compliance status across projects',
//       stats: [
//         { title: 'QA Tests Completed', value: '342', change: '+28', trend: 'up' },
//         { title: 'Defect Density', value: '1.2%', change: '-0.3%', trend: 'down' },
//         { title: 'Test Coverage', value: '87%', change: '+4%', trend: 'up' },
//         { title: 'Open Defects', value: '23', change: '-7', trend: 'down' },
//       ],
//       content: [
//         { label: 'Critical Defects', value: '3', color: 'danger' },
//         { label: 'Major Defects', value: '8', color: 'warning' },
//         { label: 'Minor Defects', value: '12', color: 'info' },
//         { label: 'Compliance Score', value: '94%', color: 'success' },
//       ],
//       chartType: 'doughnut',
//       isSmallChart: true
//     },
//     resource: {
//       title: 'Resource Utilization Report',
//       description: 'Analysis of workforce allocation and productivity',
//       stats: [
//         { title: 'Total Resources', value: '86', change: '+5', trend: 'up' },
//         { title: 'Billable Utilization', value: '78%', change: '+3%', trend: 'up' },
//         { title: 'Bench Strength', value: '12', change: '-2', trend: 'down' },
//         { title: 'Overtime Hours', value: '142', change: '-35', trend: 'down' },
//       ],
//       content: [
//         { label: 'Developers', value: '32', color: 'primary' },
//         { label: 'Designers', value: '14', color: 'info' },
//         { label: 'QA Engineers', value: '18', color: 'warning' },
//         { label: 'Project Managers', value: '8', color: 'success' },
//       ],
//       chartType: 'bar'
//     },
//     risk: {
//       title: 'Risk Management Report',
//       description: 'Identified risks and mitigation strategies',
//       stats: [
//         { title: 'Total Risks', value: '36', change: '+4', trend: 'up' },
//         { title: 'High Priority', value: '7', change: '-2', trend: 'down' },
//         { title: 'Mitigated Risks', value: '24', change: '+6', trend: 'up' },
//         { title: 'New Risks', value: '5', change: '+3', trend: 'up' },
//       ],
//       content: [
//         { label: 'Schedule Risks', value: '12', color: 'warning' },
//         { label: 'Budget Risks', value: '8', color: 'danger' },
//         { label: 'Technical Risks', value: '9', color: 'info' },
//         { label: 'External Risks', value: '7', color: 'secondary' },
//       ],
//       chartType: 'doughnut',
//       isSmallChart: true
//     },
//     milestone: {
//       title: 'Milestone Tracking Report',
//       description: 'Progress against key project milestones',
//       stats: [
//         { title: 'Total Milestones', value: '58', change: '+3', trend: 'up' },
//         { title: 'Completed', value: '42', change: '+5', trend: 'up' },
//         { title: 'Delayed', value: '9', change: '-2', trend: 'down' },
//         { title: 'Upcoming (30 days)', value: '7', change: '+1', trend: 'up' },
//       ],
//       content: [
//         { label: 'On Schedule', value: '42', color: 'success' },
//         { label: 'At Risk', value: '5', color: 'warning' },
//         { label: 'Delayed', value: '9', color: 'danger' },
//         { label: 'Not Started', value: '2', color: 'info' },
//       ],
//       chartType: 'mixed'
//     }
//   };

//   const currentReport = reportData[activeCategory] || reportData.dashboard;

//   // API से data fetch करने का function
//   const loadReportData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetchReportData(activeCategory, dateRange, selectedProject);
//       if (response.success) {
//         setApiData(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // जब category, date range या project change हो तो data reload करें
//   useEffect(() => {
//     loadReportData();
//   }, [activeCategory, dateRange, selectedProject]);

//   const renderChart = () => {
//     if (isLoading) {
//       return (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       );
//     }

//     switch (currentReport.chartType) {
//       case 'bar':
//         return <Bar options={barChartOptions} data={barChartData} />;
//       case 'line':
//         return <Line options={lineChartOptions} data={lineChartData} />;
//       case 'doughnut':
//         if (currentReport.isSmallChart) {
//           return (
//             <div style={{ height: '300px' }}>
//               <Doughnut options={smallDoughnutChartOptions} data={doughnutChartData} />
//             </div>
//           );
//         }
//         return <Doughnut options={regularDoughnutChartOptions} data={doughnutChartData} />;
//       case 'mixed':
//         return (
//           <div>
//             <div className="mb-4" style={{ height: '300px' }}>
//               <Bar options={barChartOptions} data={barChartData} />
//             </div>
//             <div style={{ height: '300px' }}>
//               <Line options={lineChartOptions} data={lineChartData} />
//             </div>
//           </div>
//         );
//       default:
//         return <Bar options={barChartOptions} data={barChartData} />;
//     }
//   };

//   const handleGenerateReport = () => {
//     alert(`Generating ${currentReport.title} Report`);
//   };

//   const handleExport = (format) => {
//     alert(`Exporting ${currentReport.title} as ${format}`);
//   };

//   const handleApplyFilters = () => {
//     loadReportData();
//   };

//   return (
//     <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       {/* Header */}
//       <div className="row mb-4">
//         <div className="col-md-8">
//           <h1 className="h2 mb-0" style={{ color: '#2c3e50', fontWeight: '700' }}>Reports Analytics</h1>
//           <p className="text-muted">Access all project reports and analytics</p>
//         </div>
//         <div className="col-md-4 d-flex align-items-center justify-content-end">
//           <div className="btn-group">
//             <button className="btn btn-outline-primary">
//               <FaDownload className="me-2" /> Export
//             </button>
//             <button className="btn btn-primary">
//               <FaShare className="me-2" /> Share
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 mb-4">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white">
//               <h5 className="mb-0">Report Categories</h5>
//             </div>
//             <div className="card-body p-0">
//               <div className="list-group list-group-flush">
//                 {reportCategories.map(category => (
//                   <button
//                     key={category.id}
//                     className={`list-group-item list-group-item-action border-0 d-flex align-items-center ${activeCategory === category.id ? 'active' : ''}`}
//                     onClick={() => setActiveCategory(category.id)}
//                     disabled={isLoading}
//                   >
//                     <span className="me-3" style={{ color: activeCategory === category.id ? 'white' : '#6c757d' }}>
//                       {category.icon}
//                     </span>
//                     {category.name}
//                     {isLoading && activeCategory === category.id && (
//                       <span className="spinner-border spinner-border-sm ms-auto" role="status"></span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Date Filter */}
//           <div className="card border-0 shadow-sm mt-4">
//             <div className="card-header bg-white">
//               <h5 className="mb-0">Filters</h5>
//             </div>
//             <div className="card-body">
//               <div className="mb-3">
//                 <label className="form-label">Date Range</label>
//                 <select 
//                   className="form-select"
//                   value={dateRange}
//                   onChange={(e) => setDateRange(e.target.value)}
//                   disabled={isLoading}
//                 >
//                   <option value="last7days">Last 7 days</option>
//                   <option value="last30days">Last 30 days</option>
//                   <option value="lastquarter">Last quarter</option>
//                   <option value="lastyear">Last year</option>
//                   <option value="custom">Custom range</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Project</label>
//                 <select 
//                   className="form-select"
//                   value={selectedProject}
//                   onChange={(e) => setSelectedProject(e.target.value)}
//                   disabled={isLoading}
//                 >
//                   <option value="all">All Projects</option>
//                   <option value="projectA">Project Alpha</option>
//                   <option value="projectB">Project Beta</option>
//                   <option value="projectC">Project Gamma</option>
//                 </select>
//               </div>
//               <button 
//                 className="btn btn-outline-primary w-100"
//                 onClick={handleApplyFilters}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status"></span>
//                     Applying...
//                   </>
//                 ) : (
//                   <>
//                     <FaFilter className="me-2" /> Apply Filters
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Report Content */}
//         <div className="col-md-9">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white d-flex justify-content-between align-items-center">
//               <div>
//                 <h5 className="mb-0">{currentReport.title}</h5>
//                 <p className="text-muted mb-0">{currentReport.description}</p>
//               </div>
//               <div className="d-flex">
//                 <div className="input-group me-2" style={{ width: '250px' }}>
//                   <span className="input-group-text bg-transparent"><FaSearch /></span>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     placeholder="Search..." 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     disabled={isLoading}
//                   />
//                   {searchQuery && (
//                     <button 
//                       className="btn btn-outline-secondary" 
//                       type="button"
//                       onClick={() => setSearchQuery('')}
//                     >
//                       <FaTimes />
//                     </button>
//                   )}
//                 </div>
//                 <button className="btn btn-outline-secondary" disabled={isLoading}>
//                   <BsThreeDotsVertical />
//                 </button>
//               </div>
//             </div>
//             <div className="card-body">
//               {/* Stats Cards */}
//               <div className="row mb-4">
//                 {currentReport.stats.map((stat, index) => (
//                   <div key={index} className="col-md-3 col-sm-6 mb-3">
//                     <div className="card border-0 shadow-sm h-100">
//                       <div className="card-body">
//                         <h6 className="card-subtitle mb-2 text-muted">{stat.title}</h6>
//                         <div className="d-flex align-items-center justify-content-between">
//                           <h3 className="card-title me-3" style={{ color: '#2c3e50' }}>{stat.value}</h3>
//                           <span className={`badge ${stat.trend === 'up' ? 'bg-success' : 'bg-danger'}`}>
//                             {stat.trend === 'up' ? <BsArrowUpShort /> : <BsArrowDownShort />}
//                             {stat.change}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Report Content */}
//               <div className="row mb-4">
//                 {currentReport.content.map((item, index) => (
//                   <div key={index} className="col-md-3 col-sm-6 mb-3">
//                     <div className="card border-0 shadow-sm h-100">
//                       <div className="card-body text-center">
//                         <h6 className="card-subtitle mb-2 text-muted">{item.label}</h6>
//                         <h4 className={`text-${item.color}`}>{item.value}</h4>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Report Visualization Area */}
//               <div className="border rounded p-3 bg-white mb-4" style={{ minHeight: '400px' }}>
//                 <div className="h-100 d-flex align-items-center justify-content-center">
//                   {renderChart()}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="d-flex gap-2 justify-content-end">
//                 <button 
//                   className="btn btn-primary" 
//                   onClick={handleGenerateReport}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status"></span>
//                       Generating...
//                     </>
//                   ) : (
//                     'Generate Report'
//                   )}
//                 </button>
//                 <div className="btn-group">
//                   <button 
//                     type="button" 
//                     className="btn btn-outline-primary" 
//                     onClick={() => handleExport('PDF')}
//                     disabled={isLoading}
//                   >
//                     <FaFilePdf className="me-2" /> PDF
//                   </button>
//                   <button 
//                     type="button" 
//                     className="btn btn-outline-primary" 
//                     onClick={() => handleExport('Excel')}
//                     disabled={isLoading}
//                   >
//                     <FaFileExcel className="me-2" /> Excel
//                   </button>
//                 </div>
//                 <button className="btn btn-outline-secondary" disabled={isLoading}>
//                   Schedule
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportsAnalytics;

import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [selectedFinancial, setSelectedFinancial] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editData, setEditData] = useState(null);

  // Sample data for demonstration
  const projectStats = {
    totalProjects: 24,
    activeProjects: 8,
    completedProjects: 16,
    totalValue: 2450000,
    pendingInvoices: 12,
    overdueProjects: 3
  };

  // Chart data
  const monthlyProjectData = [
    { month: 'Jan', projects: 18, completed: 15, revenue: 320000 },
    { month: 'Feb', projects: 20, completed: 17, revenue: 380000 },
    { month: 'Mar', projects: 22, completed: 19, revenue: 420000 },
    { month: 'Apr', projects: 25, completed: 20, revenue: 480000 },
    { month: 'May', projects: 24, completed: 22, revenue: 510000 },
    { month: 'Jun', projects: 26, completed: 24, revenue: 565000 },
    { month: 'Jul', projects: 24, completed: 21, revenue: 495000 },
    { month: 'Aug', projects: 24, completed: 16, revenue: 445000 }
  ];

  const projectStatusData = [
    { name: 'Completed', value: 16, color: '#28a745' },
    { name: 'In Progress', value: 8, color: '#007bff' },
    { name: 'Planning', value: 4, color: '#ffc107' },
    { name: 'On Hold', value: 2, color: '#dc3545' }
  ];

  const rfqStatusData = [
    { status: 'Won', count: 12, value: 1200000 },
    { status: 'Lost', count: 8, value: 650000 },
    { status: 'Pending', count: 6, value: 480000 },
    { status: 'In Review', count: 4, value: 320000 }
  ];

  const financialTrendData = [
    { month: 'Jan', budgeted: 400000, actual: 380000, invoiced: 350000, received: 320000 },
    { month: 'Feb', budgeted: 450000, actual: 420000, invoiced: 400000, received: 380000 },
    { month: 'Mar', budgeted: 500000, actual: 480000, invoiced: 450000, received: 420000 },
    { month: 'Apr', budgeted: 520000, actual: 510000, invoiced: 480000, received: 450000 },
    { month: 'May', budgeted: 560000, actual: 545000, invoiced: 520000, received: 490000 },
    { month: 'Jun', budgeted: 580000, actual: 565000, invoiced: 540000, received: 520000 },
    { month: 'Jul', budgeted: 550000, actual: 525000, invoiced: 500000, received: 480000 },
    { month: 'Aug', budgeted: 520000, actual: 495000, invoiced: 470000, received: 445000 }
  ];

  const riskDistributionData = [
    { level: 'Low', count: 15, color: '#28a745' },
    { level: 'Medium', count: 8, color: '#ffc107' },
    { level: 'High', count: 5, color: '#dc3545' },
    { level: 'Critical', count: 2, color: '#6f42c1' }
  ];

  const departmentPerformanceData = [
    { department: 'Design', efficiency: 92, projects: 8, budget: 85 },
    { department: 'Procurement', efficiency: 88, projects: 12, budget: 78 },
    { department: 'Construction', efficiency: 85, projects: 15, budget: 82 },
    { department: 'Quality', efficiency: 95, projects: 6, budget: 90 },
    { department: 'Finance', efficiency: 89, projects: 4, budget: 95 }
  ];

  const recentProjects = [
    { id: 'PRJ001', name: 'Swimming Pool Complex', client: 'ABC Resort', status: 'In Progress', value: 150000, completion: 75, startDate: '2024-05-15', endDate: '2024-10-30', description: 'Construction of an Olympic-sized swimming pool with changing facilities and spectator area.' },
    { id: 'PRJ002', name: 'Office Building', client: 'XYZ Corp', status: 'Design Phase', value: 300000, completion: 45, startDate: '2024-06-10', endDate: '2025-02-15', description: '5-story office building with modern amenities and sustainable design features.' },
    { id: 'PRJ003', name: 'Residential Villa', client: 'John Smith', status: 'Procurement', value: 200000, completion: 60, startDate: '2024-04-20', endDate: '2024-11-30', description: 'Luxury residential villa with pool, garden, and smart home features.' },
    { id: 'PRJ004', name: 'Shopping Mall', client: 'Mall Group', status: 'Quality Check', value: 800000, completion: 90, startDate: '2023-11-05', endDate: '2024-09-20', description: 'Two-level shopping mall with 50 retail units, food court, and parking facility.' },
  ];

  const rfqReports = [
    { id: 'RFQ001', client: 'Green Hotels', date: '2024-08-20', value: 120000, status: 'Won', details: 'Renovation of 50 hotel rooms with eco-friendly materials and modern amenities.' },
    { id: 'RFQ002', client: 'Tech Solutions', date: '2024-08-18', value: 85000, status: 'Pending', details: 'Office interior refurbishment with open plan workspace and meeting rooms.' },
    { id: 'RFQ003', client: 'City Council', date: '2024-08-15', value: 250000, status: 'Lost', details: 'Community center construction with multipurpose hall and outdoor facilities.' },
    { id: 'RFQ004', client: 'Private Developer', date: '2024-08-12', value: 180000, status: 'Won', details: 'Apartment complex common area development with landscaping and amenities.' },
  ];

  const financialData = [
    { project: 'PRJ001', budgeted: 150000, actual: 112500, variance: -37500, invoiced: 90000, received: 75000, details: 'Swimming Pool Complex - Budget variance due to material cost savings.' },
    { project: 'PRJ002', budgeted: 300000, actual: 135000, variance: -165000, invoiced: 120000, received: 120000, details: 'Office Building - Early stage project with minimal expenses to date.' },
    { project: 'PRJ003', budgeted: 200000, actual: 120000, variance: -80000, invoiced: 100000, received: 80000, details: 'Residential Villa - Procurement phase with advance payments made.' },
    { project: 'PRJ004', budgeted: 800000, actual: 720000, variance: -80000, invoiced: 640000, received: 500000, details: 'Shopping Mall - Final phase with retainers held until completion.' },
  ];

  const riskData = [
    { id: 'RSK001', project: 'PRJ001', description: 'Weather delays', level: 'Medium', impact: 'Schedule', status: 'Open', mitigation: 'Built-in weather contingency of 15 days in project timeline.' },
    { id: 'RSK002', project: 'PRJ002', description: 'Material shortage', level: 'High', impact: 'Cost', status: 'Mitigating', mitigation: 'Identifying alternative suppliers and pre-ordering critical materials.' },
    { id: 'RSK003', project: 'PRJ003', description: 'Design changes', level: 'Low', impact: 'Scope', status: 'Closed', mitigation: 'Client sign-off required before proceeding with each phase.' },
    { id: 'RSK004', project: 'PRJ004', description: 'Permit delays', level: 'High', impact: 'Schedule', status: 'Open', mitigation: 'Expedited processing requested and contingency plan developed.' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'In Progress': 'bg-primary',
      'Design Phase': 'bg-info',
      'Procurement': 'bg-warning',
      'Quality Check': 'bg-success',
      'Won': 'bg-success',
      'Lost': 'bg-danger',
      'Pending': 'bg-warning',
      'Open': 'bg-danger',
      'Closed': 'bg-success',
      'Mitigating': 'bg-warning'
    };
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  const getRiskLevelBadge = (level) => {
    const levelClasses = {
      'High': 'bg-danger',
      'Medium': 'bg-warning',
      'Low': 'bg-success'
    };
    return `badge ${levelClasses[level] || 'bg-secondary'}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const openModal = (type, data) => {
    setModalType(type);
    switch(type) {
      case 'project':
        setSelectedProject(data);
        break;
      case 'rfq':
        setSelectedRFQ(data);
        break;
      case 'financial':
        setSelectedFinancial(data);
        break;
      case 'risk':
        setSelectedRisk(data);
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const openEditModal = (type, data) => {
    setModalType(type);
    setEditData(data);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setSelectedProject(null);
    setSelectedRFQ(null);
    setSelectedFinancial(null);
    setSelectedRisk(null);
    setEditData(null);
  };

  const handleSave = () => {
    // Here you would typically save the edited data to your state or API
    console.log("Saving data:", editData);
    closeModal();
    // Show success message or update the UI accordingly
  };

  const handleInputChange = (e, field) => {
    setEditData({
      ...editData,
      [field]: e.target.value
    });
  };

  // Export functionality
  const handleExport = () => {
    // Determine what to export based on active tab
    let dataToExport = [];
    let filename = 'export.csv';
    
    switch(activeTab) {
      case 'overview':
        dataToExport = recentProjects;
        filename = 'projects_export.csv';
        break;
      case 'rfq':
        dataToExport = rfqReports;
        filename = 'rfq_export.csv';
        break;
      case 'financial':
        dataToExport = financialData;
        filename = 'financial_export.csv';
        break;
      case 'risks':
        dataToExport = riskData;
        filename = 'risks_export.csv';
        break;
      case 'charts':
        dataToExport = monthlyProjectData;
        filename = 'charts_export.csv';
        break;
      default:
        break;
    }
    
    // Convert data to CSV format
    if (dataToExport.length > 0) {
      const headers = Object.keys(dataToExport[0]).join(',');
      const csvData = dataToExport.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        ).join(',')
      );
      
      const csv = [headers, ...csvData].join('\n');
      
      // Create download link
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-4">
        <div className="row align-items-center">
          {/* Left side - Heading */}
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <h3 className="fw-bold m-0">Reports</h3>
          </div>

          {/* Right side - Buttons */}
          <div className="col-12 col-md-6 text-md-end text-start">
            <button className="btn btn-outline-primary btn-sm me-2 mb-2 mb-md-0" onClick={handleExport}>
              <i className="fas fa-download me-1"></i>
              Export
            </button>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-sync-alt me-1"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="">
        {/* Quick Stats Cards */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-primary mb-2">
                  <i className="fas fa-project-diagram fa-2x"></i>
                </div>
                <h3 className="card-title text-primary mb-1">{projectStats.totalProjects}</h3>
                <p className="card-text small text-muted mb-0">Total Projects</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-success mb-2">
                  <i className="fas fa-play-circle fa-2x"></i>
                </div>
                <h3 className="card-title text-success mb-1">{projectStats.activeProjects}</h3>
                <p className="card-text small text-muted mb-0">Active Projects</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-info mb-2">
                  <i className="fas fa-check-circle fa-2x"></i>
                </div>
                <h3 className="card-title text-info mb-1">{projectStats.completedProjects}</h3>
                <p className="card-text small text-muted mb-0">Completed</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-warning mb-2">
                  <i className="fas fa-dollar-sign fa-2x"></i>
                </div>
                <h3 className="card-title text-warning mb-1">{formatCurrency(projectStats.totalValue)}</h3>
                <p className="card-text small text-muted mb-0">Total Value</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-danger mb-2">
                  <i className="fas fa-file-invoice fa-2x"></i>
                </div>
                <h3 className="card-title text-danger mb-1">{projectStats.pendingInvoices}</h3>
                <p className="card-text small text-muted mb-0">Pending Invoices</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-secondary mb-2">
                  <i className="fas fa-exclamation-triangle fa-2x"></i>
                </div>
                <h3 className="card-title text-secondary mb-1">{projectStats.overdueProjects}</h3>
                <p className="card-text small text-muted mb-0">Overdue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-chart-pie me-2"></i>Project Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'charts' ? 'active' : ''}`}
              onClick={() => setActiveTab('charts')}
            >
              <i className="fas fa-chart-line me-2"></i>Analytics Charts
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'rfq' ? 'active' : ''}`}
              onClick={() => setActiveTab('rfq')}
            >
              <i className="fas fa-file-alt me-2"></i>RFQ Reports
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'financial' ? 'active' : ''}`}
              onClick={() => setActiveTab('financial')}
            >
              <i className="fas fa-dollar-sign me-2"></i>Financial Reports
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'risks' ? 'active' : ''}`}
              onClick={() => setActiveTab('risks')}
            >
              <i className="fas fa-exclamation-triangle me-2"></i>Risk Register
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Analytics Charts Tab */}
          {activeTab === 'charts' && (
            <div className="row">
              {/* Monthly Project Trend */}
              <div className="col-xl-8 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-line me-2"></i>
                      Monthly Project & Revenue Trends
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyProjectData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value, name) => {
                          if (name === 'revenue') return [formatCurrency(value), 'Revenue'];
                          return [value, name === 'projects' ? 'Total Projects' : 'Completed Projects'];
                        }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="projects" fill="#007bff" name="Total Projects" />
                        <Bar yAxisId="left" dataKey="completed" fill="#28a745" name="Completed Projects" />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ffc107" strokeWidth={3} name="Revenue" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Project Status Distribution */}
              <div className="col-xl-4 col-lg-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-pie me-2"></i>
                      Project Status Distribution
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Financial Performance Chart */}
              <div className="col-xl-8 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-area me-2"></i>
                      Financial Performance Trends
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={financialTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Area type="monotone" dataKey="budgeted" stackId="1" stroke="#007bff" fill="#007bff" fillOpacity={0.6} name="Budgeted" />
                        <Area type="monotone" dataKey="actual" stackId="2" stroke="#28a745" fill="#28a745" fillOpacity={0.6} name="Actual Cost" />
                        <Area type="monotone" dataKey="invoiced" stackId="3" stroke="#ffc107" fill="#ffc107" fillOpacity={0.6} name="Invoiced" />
                        <Area type="monotone" dataKey="received" stackId="4" stroke="#17a2b8" fill="#17a2b8" fillOpacity={0.6} name="Received" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Risk Distribution */}
              <div className="col-xl-4 col-lg-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-shield-alt me-2"></i>
                      Risk Level Distribution
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={riskDistributionData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="level" type="category" />
                        <Tooltip />
                        <Bar dataKey="count" fill={(entry) => entry.color} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* RFQ Analysis Chart */}
              <div className="col-xl-6 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-file-contract me-2"></i>
                      RFQ Performance Analysis
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={rfqStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value, name) => {
                          if (name === 'value') return [formatCurrency(value), 'Total Value'];
                          return [value, 'Count'];
                        }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" fill="#6c757d" name="Count" />
                        <Line yAxisId="right" type="monotone" dataKey="value" stroke="#dc3545" strokeWidth={3} name="Total Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Department Performance */}
              <div className="col-xl-6 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-users me-2"></i>
                      Department Performance Metrics
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" fill="#28a745" name="Efficiency %" />
                        <Bar dataKey="budget" fill="#17a2b8" name="Budget Adherence %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Overview Tab */}
          {activeTab === 'overview' && (
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-list me-2"></i>
                      Recent Projects
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="fw-bold">Project ID</th>
                            <th className="fw-bold">Project Name</th>
                            <th className="fw-bold">Client</th>
                            <th className="fw-bold">Status</th>
                            <th className="fw-bold">Value</th>
                            <th className="fw-bold">Progress</th>
                            <th className="fw-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentProjects.map((project) => (
                            <tr key={project.id}>
                              <td className="fw-semibold text-primary">{project.id}</td>
                              <td>{project.name}</td>
                              <td>{project.client}</td>
                              <td>
                                <span className={getStatusBadge(project.status)}>
                                  {project.status}
                                </span>
                              </td>
                              <td className="fw-semibold">{formatCurrency(project.value)}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
                                    <div
                                      className="progress-bar"
                                      style={{ width: `${project.completion}%` }}
                                    ></div>
                                  </div>
                                  <small className="text-muted">{project.completion}%</small>
                                </div>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => openModal('project', project)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => openEditModal('project', project)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RFQ Reports Tab */}
          {activeTab === 'rfq' && (
            <div className="row">
              {/* RFQ Performance Chart */}
              <div className="col-xl-8 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-bar me-2"></i>
                      RFQ Success Rate & Value Analysis
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={rfqStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value, name) => {
                          if (name === 'value') return [formatCurrency(value), 'Total Value'];
                          return [value, 'Count'];
                        }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" fill="#17a2b8" name="RFQ Count" />
                        <Line yAxisId="right" type='monotone' dataKey="value" stroke="#dc3545" strokeWidth={3} name="Total Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* RFQ Status Summary */}
              <div className="col-xl-4 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-pie me-2"></i>
                      RFQ Status Summary
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={rfqStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {rfqStatusData.map((entry, index) => {
                            const colors = ['#28a745', '#dc3545', '#ffc107', '#6c757d'];
                            return <Cell key={`cell-${index}`} fill={colors[index]} />;
                          })}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* RFQ Table */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-file-alt me-2"></i>
                      RFQ Status Report
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="fw-bold">RFQ ID</th>
                            <th className="fw-bold">Client</th>
                            <th className="fw-bold">Date</th>
                            <th className="fw-bold">Value</th>
                            <th className="fw-bold">Status</th>
                            <th className="fw-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rfqReports.map((rfq) => (
                            <tr key={rfq.id}>
                              <td className="fw-semibold text-info">{rfq.id}</td>
                              <td>{rfq.client}</td>
                              <td>{rfq.date}</td>
                              <td className="fw-semibold">{formatCurrency(rfq.value)}</td>
                              <td>
                                <span className={getStatusBadge(rfq.status)}>
                                  {rfq.status}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-info me-1"
                                  onClick={() => openModal('rfq', rfq)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => openEditModal('rfq', rfq)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Financial Reports Tab */}
          {activeTab === 'financial' && (
            <div className="row">
              {/* Financial Trends Chart */}
              <div className="col-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-area me-2"></i>
                      Financial Performance Trends
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={financialTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Area type="monotone" dataKey="budgeted" stackId="1" stroke="#007bff" fill="#007bff" fillOpacity={0.6} name="Budgeted" />
                        <Area type="monotone" dataKey="actual" stackId="2" stroke="#28a745" fill="#28a745" fillOpacity={0.6} name="Actual Cost" />
                        <Area type="monotone" dataKey="invoiced" stackId="3" stroke="#ffc107" fill="#ffc107" fillOpacity={0.6} name="Invoiced" />
                        <Area type="monotone" dataKey="received" stackId="4" stroke="#17a2b8" fill="#17a2b8" fillOpacity={0.6} name="Received" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Financial Performance Table */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-line me-2"></i>
                      Financial Performance Report
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="fw-bold">Project</th>
                            <th className="fw-bold">Budgeted</th>
                            <th className="fw-bold">Actual</th>
                            <th className="fw-bold">Variance</th>
                            <th className="fw-bold">Invoiced</th>
                            <th className="fw-bold">Received</th>
                            <th className="fw-bold">Outstanding</th>
                            <th className="fw-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {financialData.map((item) => (
                            <tr key={item.project}>
                              <td className="fw-semibold text-success">{item.project}</td>
                              <td>{formatCurrency(item.budgeted)}</td>
                              <td>{formatCurrency(item.actual)}</td>
                              <td className={item.variance < 0 ? 'text-success fw-semibold' : 'text-danger fw-semibold'}>
                                {formatCurrency(Math.abs(item.variance))}
                              </td>
                              <td>{formatCurrency(item.invoiced)}</td>
                              <td>{formatCurrency(item.received)}</td>
                              <td className="fw-semibold text-warning">
                                {formatCurrency(item.invoiced - item.received)}
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-primary me-1"
                                  onClick={() => openModal('financial', item)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => openEditModal('financial', item)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Register Tab */}
          {activeTab === 'risks' && (
            <div className="row">
              {/* Risk Distribution Charts */}
              <div className="col-xl-6 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-pie me-2"></i>
                      Risk Level Distribution
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Risk Count by Level Bar Chart */}
              <div className="col-xl-6 col-lg-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-bar me-2"></i>
                      Risk Count Analysis
                    </h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={riskDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="level" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#ffc107" name="Risk Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Risk Register Table */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      Active Risk Register
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="fw-bold">Risk ID</th>
                            <th className="fw-bold">Project</th>
                            <th className="fw-bold">Description</th>
                            <th className="fw-bold">Level</th>
                            <th className="fw-bold">Impact</th>
                            <th className="fw-bold">Status</th>
                            <th className="fw-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {riskData.map((risk) => (
                            <tr key={risk.id}>
                              <td className="fw-semibold text-warning">{risk.id}</td>
                              <td>{risk.project}</td>
                              <td>{risk.description}</td>
                              <td>
                                <span className={getRiskLevelBadge(risk.level)}>
                                  {risk.level}
                                </span>
                              </td>
                              <td>{risk.impact}</td>
                              <td>
                                <span className={getStatusBadge(risk.status)}>
                                  {risk.status}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-warning me-1"
                                  onClick={() => openModal('risk', risk)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => openEditModal('risk', risk)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'project' && `Project Details - ${selectedProject.name}`}
                  {modalType === 'rfq' && `RFQ Details - ${selectedRFQ.id}`}
                  {modalType === 'financial' && `Financial Details - ${selectedFinancial.project}`}
                  {modalType === 'risk' && `Risk Details - ${selectedRisk.id}`}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {modalType === 'project' && selectedProject && (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Project ID:</strong> {selectedProject.id}</p>
                        <p><strong>Client:</strong> {selectedProject.client}</p>
                        <p><strong>Status:</strong> <span className={getStatusBadge(selectedProject.status)}>{selectedProject.status}</span></p>
                        <p><strong>Value:</strong> {formatCurrency(selectedProject.value)}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
                        <p><strong>End Date:</strong> {selectedProject.endDate}</p>
                        <p><strong>Completion:</strong> 
                          <div className="progress mt-1" style={{ height: '10px' }}>
                            <div className="progress-bar" style={{ width: `${selectedProject.completion}%` }}></div>
                          </div>
                          <small>{selectedProject.completion}%</small>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h6>Description</h6>
                      <p>{selectedProject.description}</p>
                    </div>
                  </div>
                )}
                
                {modalType === 'rfq' && selectedRFQ && (
                  <div>
                    <p><strong>Client:</strong> {selectedRFQ.client}</p>
                    <p><strong>Date:</strong> {selectedRFQ.date}</p>
                    <p><strong>Value:</strong> {formatCurrency(selectedRFQ.value)}</p>
                    <p><strong>Status:</strong> <span className={getStatusBadge(selectedRFQ.status)}>{selectedRFQ.status}</span></p>
                    <div className="mt-3">
                      <h6>Details</h6>
                      <p>{selectedRFQ.details}</p>
                    </div>
                  </div>
                )}
                
                {modalType === 'financial' && selectedFinancial && (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Budgeted:</strong> {formatCurrency(selectedFinancial.budgeted)}</p>
                        <p><strong>Actual:</strong> {formatCurrency(selectedFinancial.actual)}</p>
                        <p><strong>Variance:</strong> 
                          <span className={selectedFinancial.variance < 0 ? 'text-success fw-semibold' : 'text-danger fw-semibold'}>
                            {formatCurrency(Math.abs(selectedFinancial.variance))}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Invoiced:</strong> {formatCurrency(selectedFinancial.invoiced)}</p>
                        <p><strong>Received:</strong> {formatCurrency(selectedFinancial.received)}</p>
                        <p><strong>Outstanding:</strong> 
                          <span className="fw-semibold text-warning">
                            {formatCurrency(selectedFinancial.invoiced - selectedFinancial.received)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h6>Notes</h6>
                      <p>{selectedFinancial.details}</p>
                    </div>
                  </div>
                )}
                
                {modalType === 'risk' && selectedRisk && (
                  <div>
                    <p><strong>Project:</strong> {selectedRisk.project}</p>
                    <p><strong>Description:</strong> {selectedRisk.description}</p>
                    <p><strong>Level:</strong> <span className={getRiskLevelBadge(selectedRisk.level)}>{selectedRisk.level}</span></p>
                    <p><strong>Impact:</strong> {selectedRisk.impact}</p>
                    <p><strong>Status:</strong> <span className={getStatusBadge(selectedRisk.status)}>{selectedRisk.status}</span></p>
                    <div className="mt-3">
                      <h6>Mitigation Strategy</h6>
                      <p>{selectedRisk.mitigation}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    openEditModal(modalType, 
                      modalType === 'project' ? selectedProject :
                      modalType === 'rfq' ? selectedRFQ :
                      modalType === 'financial' ? selectedFinancial :
                      selectedRisk
                    );
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'project' && `Edit Project - ${editData.name}`}
                  {modalType === 'rfq' && `Edit RFQ - ${editData.id}`}
                  {modalType === 'financial' && `Edit Financial Data - ${editData.project}`}
                  {modalType === 'risk' && `Edit Risk - ${editData.id}`}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {modalType === 'project' && editData && (
                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Project Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editData.name} 
                          onChange={(e) => handleInputChange(e, 'name')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Client</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editData.client} 
                          onChange={(e) => handleInputChange(e, 'client')}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select 
                          className="form-select" 
                          value={editData.status} 
                          onChange={(e) => handleInputChange(e, 'status')}
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="Design Phase">Design Phase</option>
                          <option value="Procurement">Procurement</option>
                          <option value="Quality Check">Quality Check</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Value</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={editData.value} 
                          onChange={(e) => handleInputChange(e, 'value')}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={editData.startDate} 
                          onChange={(e) => handleInputChange(e, 'startDate')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">End Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={editData.endDate} 
                          onChange={(e) => handleInputChange(e, 'endDate')}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Completion (%)</label>
                      <input 
                        type="range" 
                        className="form-range" 
                        min="0" 
                        max="100" 
                        value={editData.completion} 
                        onChange={(e) => handleInputChange(e, 'completion')}
                      />
                      <div className="d-flex justify-content-between">
                        <small>0%</small>
                        <small>{editData.completion}%</small>
                        <small>100%</small>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        value={editData.description} 
                        onChange={(e) => handleInputChange(e, 'description')}
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {modalType === 'rfq' && editData && (
                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Client</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editData.client} 
                          onChange={(e) => handleInputChange(e, 'client')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={editData.date} 
                          onChange={(e) => handleInputChange(e, 'date')}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Value</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={editData.value} 
                          onChange={(e) => handleInputChange(e, 'value')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select 
                          className="form-select" 
                          value={editData.status} 
                          onChange={(e) => handleInputChange(e, 'status')}
                        >
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                          <option value="Pending">Pending</option>
                          <option value="In Review">In Review</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Details</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        value={editData.details} 
                        onChange={(e) => handleInputChange(e, 'details')}
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {modalType === 'financial' && editData && (
                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Budgeted Amount</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={editData.budgeted} 
                          onChange={(e) => handleInputChange(e, 'budgeted')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Actual Amount</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={editData.actual} 
                          onChange={(e) => handleInputChange(e, 'actual')}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Invoiced Amount</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={editData.invoiced} 
                          onChange={(e) => handleInputChange(e, 'invoiced')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Received Amount</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={editData.received} 
                          onChange={(e) => handleInputChange(e, 'received')}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Notes</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        value={editData.details} 
                        onChange={(e) => handleInputChange(e, 'details')}
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {modalType === 'risk' && editData && (
                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Project</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editData.project} 
                          onChange={(e) => handleInputChange(e, 'project')}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Description</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editData.description} 
                          onChange={(e) => handleInputChange(e, 'description')}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Level</label>
                        <select 
                          className="form-select" 
                          value={editData.level} 
                          onChange={(e) => handleInputChange(e, 'level')}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Impact</label>
                        <select 
                          className="form-select" 
                          value={editData.impact} 
                          onChange={(e) => handleInputChange(e, 'impact')}
                        >
                          <option value="Schedule">Schedule</option>
                          <option value="Cost">Cost</option>
                          <option value="Scope">Scope</option>
                          <option value="Quality">Quality</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select 
                          className="form-select" 
                          value={editData.status} 
                          onChange={(e) => handleInputChange(e, 'status')}
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                          <option value="Mitigating">Mitigating</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mitigation Strategy</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        value={editData.mitigation} 
                        onChange={(e) => handleInputChange(e, 'mitigation')}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ReportsAnalytics;

