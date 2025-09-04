import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import RFQManagement from "./Components/AdminDashboard/RFQManagement";
import ContractManagement from "./Components/AdminDashboard/ContractManagement";
import DesignManagement from "./Components/AdminDashboard/DesignManagement";
import Procurement from "./Components/AdminDashboard/Procurement";
import TaskManagement from "./Components/AdminDashboard/TaskManagement";
import Resources from "./Components/AdminDashboard/Resources";

import QualityHSE from "./Components/AdminDashboard/QualityHSE";
import Milestones from "./Components/AdminDashboard/Milestones";
import RiskManagement from "./Components/AdminDashboard/RiskManagement";
import ProjectCloseout from "./Components/AdminDashboard/ProjectCloseout";
import ReportsAnalytics from "./Components/AdminDashboard/ReportsAnalytics";
import JobCostManagement from "./Components/AdminDashboard/JobCostManagement";

import ClientFinancials from "./Components/ClientDashboard/ClientFinancials";
import ClientDashboard from "./Components/ClientDashboard/ClientDashboard";

import ClientReports from "./Components/ClientDashboard/ClientReports";
import ClientTasks from "./Components/ClientDashboard/ClientTasks";

import DesignerDashboard from "./Components/Designer/DesignerDashboard";
import DesignerProjects from "./Components/Designer/DesignerProjects";

import DesignerReport from "./Components/Designer/DesignerReport";

import FinanceDashboard from "./Components/Finance/FinanceDashboard";
import QualityDashboard from "./Components/Quality/QualityDashboard";
import QualityHSEE from "./Components/Quality/QualityHSEE";
import QualityReports from "./Components/Quality/QualityReports";
import QualityTasks from "./Components/Quality/QualityTasks";

import ProjectManagerDashboard from "./Components/ProjectManager/ProjectManagerDashboard";
import ProjectManagerReport from "./Components/ProjectManager/ProjectManagerReports";
import ProjectManagerTasks from "./Components/ProjectManager/ProjectManagerTasks";
import ProjectManagerRisks from "./Components/ProjectManager/ProjectManagerRisks";
import ProjectManagerQualityHSE from "./Components/ProjectManager/ProjectManagerQualityHSE";
import ProjectManageFinancials from "./Components/ProjectManager/ProjectManageFinancials";
import ProjectManageProcurement from "./Components/ProjectManager/ProjectManageProcuremen";
import ProjectManagerProject from "./Components/ProjectManager/ProjectManagerProject";

import DesignerTasks from "./Components/Designer/DesignerTask/DesignerTasks";
import DrawingRepository from "./Components/Designer/Design/DrawingRepository";
import Financials from "./Components/Finance/Financials/Financials";
import ProjectsPage from "./Components/Finance/Projects";
import ProcurementPage from "./Components/Finance/Procurement";
import ReportsPage from "./Components/Finance/Report";
import ProcurementDashboard from "./Components/ProcurementOfficer/ProcurementDashboard";
import Procurementss from "./Components/ProcurementOfficer/Procurement/Procurementss";
import ProcurementProject from "./Components/ProcurementOfficer/ProcurementProject";
import Procurementfinancial from "./Components/ProcurementOfficer/Procurementfinancial";
import ProcurementReport from "./Components/ProcurementOfficer/ProcurementReport";
import ClientProjects from "./Components/ClientDashboard/ClientProjects";



function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => window.innerWidth <= 768;
    if (checkIfMobile()) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {hideLayout ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      ) : (
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Sidebar
              collapsed={isSidebarCollapsed}
              setCollapsed={setIsSidebarCollapsed}
            />
            <div
              className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""
                }`}
            >
              <Routes>

                {/* Admin Dashboard Routes */}

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rfq" element={<RFQManagement />} />
                <Route path="/contracts" element={<ContractManagement />} />
                <Route path="/design" element={<DesignManagement />} />
                <Route path="/procurement" element={<Procurement />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/financials" element={<Financials />} />
                <Route path="/quality" element={<QualityHSE />} />
                <Route path="/milestones" element={<Milestones />} />
                <Route path="/risks" element={<RiskManagement />} />
                <Route path="/closeout" element={<ProjectCloseout />} />
                <Route path="/reports" element={<ReportsAnalytics />} />
                <Route path="/job-cost" element={<JobCostManagement />} />

                {/* Client Dashboard Routes */}

                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/projects" element={<ClientProjects/>} />
                <Route path="/client/financials" element={<ClientFinancials />} />
                <Route path="/client/reports" element={<ClientReports />} />
                <Route path="/client/tasks" element={<ClientTasks />} />

                {/* Designer Dashboard Routes */}

                <Route path="/designer/dashboard" element={<DesignerDashboard />} />
                <Route path="/designer/projects" element={<DesignerProjects />} />
                <Route path="/designer/design" element={<DrawingRepository/>} />
                <Route path="/designer/reports" element={<DesignerReport />} />
                <Route path="/designer/tasks" element={<DesignerTasks/>} />

                {/* Financial Dashboard Routes */}
                <Route path="/finance/dashboard" element={<FinanceDashboard />} />
                <Route path="/finance/financials" element={<Financials />} />
                <Route path="/finance/projects" element={<ProjectsPage />} />
                <Route path="/finance/procurement" element={<ProcurementPage />} />
                <Route path="/finance/reports" element={<ReportsPage   />} />


                
                {/* procurememtofficer Dashboard Routes */}
                <Route path="/procurementOfficer/dashboard" element={<ProcurementDashboard />} />
                <Route path="/procurementOfficer/procurement" element={<Procurementss />} />
                <Route path="/procurementOfficer/projects" element={<ProcurementProject />} />
                <Route path="/procurementOfficer/financials" element={<Procurementfinancial/>} />
                 <Route path="/procurementOfficer/reports" element={<ProcurementReport/>} />







                {/* Quality Dashboard Routes */}
                <Route path="/quality/dashboard" element={<QualityDashboard />} />
                <Route path="/quality/qualityhsee" element={<QualityHSEE />} />
                <Route path="/quality/qualityreports" element={<QualityReports />} />
                <Route path="/quality/qualitytasks" element={<QualityTasks />} />

                {/* Project Manager Dashboard Routes */}
                <Route path="/projectmanager/dashboard" element={<ProjectManagerDashboard />} />
                <Route path="/projectmanager/financials" element={<ProjectManageFinancials/>} />
                <Route path="/projectmanager/procurement" element={<ProjectManageProcurement/>} />
                <Route path="/projectmanager/reports" element={<ProjectManagerReport/>} />
                <Route path="/projectmanager/tasks" element={<ProjectManagerTasks/>} />
                <Route path="/projectmanager/risks" element={<ProjectManagerRisks/>} />
                <Route path="/projectmanager/qualityHSE" element={<ProjectManagerQualityHSE/>} />
                <Route path="/projectmanager/project" element={<ProjectManagerProject/>} />


              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
