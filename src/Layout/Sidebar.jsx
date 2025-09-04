// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTachometerAlt,
//   faFileSignature,
//   faFileContract,
//   faDraftingCompass,
//   faShoppingCart,
//   faTasks,
//   faUsersCog,
//   faMoneyBillWave,
//   faShieldAlt,
//   faFlagCheckered,
//   faExclamationTriangle,
//   faTimesCircle,
//   faChartBar,
//   faDollarSign,
//   faBars,
//   faTimes
// } from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

// const Sidebar = ({ collapsed, setCollapsed }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);

//       // Auto-collapse sidebar on mobile
//       if (mobile) {
//         setCollapsed(true);
//       } else {
//         setMobileMenuOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setCollapsed]);

//   const isActive = (path) => location.pathname === path;

//   const handleNavigate = (path) => {
//     navigate(path);
//     if (isMobile) {
//       setMobileMenuOpen(false);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const menus = [
//     { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//     { label: "RFQ", path: "/rfq", icon: faFileSignature },
//     { label: "Contracts", path: "/contracts", icon: faFileContract },
//     { label: "Design", path: "/design", icon: faDraftingCompass },
//     { label: "Procurement", path: "/procurement", icon: faShoppingCart },
//     { label: "Tasks", path: "/tasks", icon: faTasks },
//     { label: "Resources", path: "/resources", icon: faUsersCog },
//     { label: "Financials", path: "/financials", icon: faDollarSign },
//     { label: "Quality-HSE", path: "/quality", icon: faShieldAlt },
//     { label: "Milestones", path: "/milestones", icon: faFlagCheckered },
//     { label: "Risks", path: "/risks", icon: faExclamationTriangle },
//     { label: "Closeout", path: "/closeout", icon: faTimesCircle },
//     { label: "Reports", path: "/reports", icon: faChartBar },
//     { label: "Job Cost", path: "/job-cost", icon: faMoneyBillWave },
//   ];

//   return (
//     <>
//       {/* Mobile menu toggle button */}
//       {isMobile && (
//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
//         </button>
//       )}

//       {/* Overlay for mobile when menu is open */}
//       {isMobile && mobileMenuOpen && (
//         <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>
//       )}

//       <div
//         className={`sidebar-container ${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}
//       >
//         <div className="sidebar">
//           <ul className="menu">
//             {menus.map((menu, index) => (
//               <li
//                 key={index}
//                 className={`menu-item ${isActive(menu.path) ? "active" : ""}`}
//                 onClick={() => handleNavigate(menu.path)}
//               >
//                 <div className="menu-link">
//                   <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
//                   {!collapsed && <span className="menu-text">{menu.label}</span>}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;





// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTachometerAlt,
//   faFileSignature,
//   faFileContract,
//   faDraftingCompass,
//   faShoppingCart,
//   faTasks,
//   faUsersCog,
//   faMoneyBillWave,
//   faShieldAlt,
//   faFlagCheckered,
//   faExclamationTriangle,
//   faTimesCircle,
//   faChartBar,
//   faDollarSign,
//   faBars,
//   faTimes,
//   faUserShield, // for User Management (Admin only)
// } from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

// const Sidebar = ({ collapsed, setCollapsed, role }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);

//       if (mobile) {
//         setCollapsed(true);
//       } else {
//         setMobileMenuOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setCollapsed]);

//   const isActive = (path) => location.pathname === path;

//   const handleNavigate = (path) => {
//     navigate(path);
//     if (isMobile) {
//       setMobileMenuOpen(false);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   // 🎯 Role-based Menus
//   const roleMenus = {
//     Admin: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "RFQ", path: "/rfq", icon: faFileSignature },
//       { label: "Contracts", path: "/contracts", icon: faFileContract },
//       { label: "Design", path: "/design", icon: faDraftingCompass },
//       { label: "Procurement", path: "/procurement", icon: faShoppingCart },
//       { label: "Tasks", path: "/tasks", icon: faTasks },
//       { label: "Resources", path: "/resources", icon: faUsersCog },
//       { label: "Financials", path: "/financials", icon: faDollarSign },
//       { label: "Quality-HSE", path: "/quality", icon: faShieldAlt },
//       { label: "Milestones", path: "/milestones", icon: faFlagCheckered },
//       { label: "Risks", path: "/risks", icon: faExclamationTriangle },
//       { label: "Closeout", path: "/closeout", icon: faTimesCircle },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//       { label: "Job Cost", path: "/job-cost", icon: faMoneyBillWave },
//     ],
//     ProjectManager: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "Projects", path: "/projects", icon: faFileContract },
//       { label: "Tasks", path: "/tasks", icon: faTasks },
//       { label: "Procurement", path: "/procurement", icon: faShoppingCart },
//       { label: "Financials", path: "/financials", icon: faDollarSign },
//       { label: "Quality-HSE", path: "/quality", icon: faShieldAlt },
//       { label: "Risks", path: "/risks", icon: faExclamationTriangle },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//     ],
//     Designer: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "Projects", path: "/projects", icon: faFileContract },
//       { label: "Tasks", path: "/tasks", icon: faTasks },
//       { label: "Design", path: "/design", icon: faDraftingCompass },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//     ],
//     ProcurementOfficer: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "Procurement", path: "/procurement", icon: faShoppingCart },
//       { label: "Projects", path: "/projects", icon: faFileContract },
//       { label: "Financials", path: "/financials", icon: faDollarSign },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//     ],
//     Finance: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "Financials", path: "/financials", icon: faDollarSign },
//       { label: "Projects", path: "/projects", icon: faFileContract },
//       { label: "Procurement", path: "/procurement", icon: faShoppingCart },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//     ],
//     Quality: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "Quality-HSE", path: "/quality", icon: faShieldAlt },
//       { label: "Tasks", path: "/tasks", icon: faTasks },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//     ],
//     Client: [
//       { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
//       { label: "Projects", path: "/projects", icon: faFileContract },
//       { label: "Tasks", path: "/tasks", icon: faTasks },
//       { label: "Financials", path: "/financials", icon: faDollarSign },
//       { label: "Reports", path: "/reports", icon: faChartBar },
//     ],
//   };

//   const menus = roleMenus[role] || [];

//   return (
//     <>
//       {isMobile && (
//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
//         </button>
//       )}

//       {isMobile && mobileMenuOpen && (
//         <div
//           className="sidebar-overlay"
//           onClick={() => setMobileMenuOpen(false)}
//         ></div>
//       )}

//       <div
//         className={`sidebar-container ${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""
//           } ${mobileMenuOpen ? "mobile-open" : ""}`}
//       >
//         <div className="sidebar">
//           <ul className="menu">
//             {menus.map((menu, index) => (
//               <li
//                 key={index}
//                 className={`menu-item ${isActive(menu.path) ? "active" : ""}`}
//                 onClick={() => handleNavigate(menu.path)}
//               >
//                 <div className="menu-link">
//                   <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
//                   {!collapsed && (
//                     <span className="menu-text">{menu.label}</span>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;










import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFileSignature,
  faFileContract,
  faDraftingCompass,
  faShoppingCart,
  faTasks,
  faUsersCog,
  faMoneyBillWave,
  faShieldAlt,
  faFlagCheckered,
  faExclamationTriangle,
  faTimesCircle,
  faChartBar,
  faDollarSign,
  faBars,
  faTimes,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const role = localStorage.getItem("role"); // Get user role from localStorage

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Auto-collapse sidebar on mobile
      if (mobile) {
        setCollapsed(true);
      } else {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // Define menu items based on roles
  const adminMenuItems = [
    { label: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    { label: "RFQ", path: "/rfq", icon: faFileSignature },
    // { label: "User Management", path: "/usermanagement", icon: faUserShield }, 
    { label: "Contracts", path: "/contracts", icon: faFileContract },
    { label: "Design", path: "/design", icon: faDraftingCompass },
    { label: "Procurement", path: "/procurement", icon: faShoppingCart },
    { label: "Tasks", path: "/tasks", icon: faTasks },
    { label: "Resources", path: "/resources", icon: faUsersCog },
    { label: "Financials", path: "/financials", icon: faDollarSign },
    { label: "Quality-HSE", path: "/quality", icon: faShieldAlt },
    { label: "Milestones", path: "/milestones", icon: faFlagCheckered },
    { label: "Risks", path: "/risks", icon: faExclamationTriangle },
    { label: "Closeout", path: "/closeout", icon: faTimesCircle },
    { label: "Reports", path: "/reports", icon: faChartBar },
    { label: "Job Cost", path: "/job-cost", icon: faMoneyBillWave },
  ];

  const projectManagerMenuItems = [
    { label: "Dashboard", path: "/projectmanager/dashboard", icon: faTachometerAlt },
    { label: "Projects", path: "/projectmanager/project", icon: faFileContract },
    { label: "Tasks", path: "/projectmanager/tasks", icon: faTasks },
    { label: "Procurement", path: "/projectmanager/procurement", icon: faShoppingCart },
    { label: "Financials", path: "/projectmanager/financials", icon: faDollarSign },
    { label: "Quality-HSE", path: "/projectmanager/qualityHSE", icon: faShieldAlt },
    { label: "Risks", path: "/projectmanager/risks", icon: faExclamationTriangle },
    { label: "Reports", path: "/projectmanager/reports", icon: faChartBar },
  ];

  const designerMenuItems = [
    { label: "Dashboard", path: "/designer/dashboard", icon: faTachometerAlt },
    { label: "Projects", path: "/designer/projects", icon: faFileContract },
    { label: "Tasks", path: "/designer/tasks", icon: faTasks },
    { label: "Design", path: "/designer/design", icon: faDraftingCompass },
    { label: "Reports", path: "/designer/reports", icon: faChartBar },
  ];

  const procurementOfficerMenuItems = [
    { label: "Dashboard", path: "/procurementOfficer/dashboard", icon: faTachometerAlt },
    { label: "Procurement", path: "/procurementOfficer/procurement", icon: faShoppingCart },
    { label: "Projects", path: "/procurementOfficer/projects", icon: faFileContract },
    { label: "Financials", path: "/procurementOfficer/financials", icon: faDollarSign },
    { label: "Reports", path: "/procurementOfficer/reports", icon: faChartBar },
  ];

  const financeMenuItems = [
    { label: "Dashboard", path: "/finance/dashboard", icon: faTachometerAlt },
    { label: "Financials", path: "/finance/financials", icon: faDollarSign },
    { label: "Projects", path: "/finance/projects", icon: faFileContract },
    { label: "Procurement", path: "/finance/procurement", icon: faShoppingCart },
    { label: "Reports", path: "/finance/reports", icon: faChartBar },
  ];

  const qualityMenuItems = [
    { label: "Dashboard", path: "/quality/dashboard", icon: faTachometerAlt },
    { label: "Quality-HSEE", path: "/quality/qualityhsee", icon: faShieldAlt },
    { label: "Tasks", path: "/quality/qualitytasks", icon: faTasks },
    { label: "Reports", path: "/quality/qualityreports", icon: faChartBar },
  ];

  const clientMenuItems = [
    { label: "Dashboard", path: "/client/dashboard", icon: faTachometerAlt },
    { label: "Projects", path: "/client/projects", icon: faFileContract },
    { label: "Tasks", path: "/client/tasks", icon: faTasks },
    { label: "Financials", path: "/client/financials", icon: faDollarSign },
    { label: "Reports", path: "/client/reports", icon: faChartBar },
  ];

  // Get menu items based on role
  const getMenuItems = () => {
    switch (role) {
      case "Admin":
        return adminMenuItems;
      case "ProjectManager":
        return projectManagerMenuItems;
      case "Designer":
        return designerMenuItems;
      case "ProcurementOfficer":
        return procurementOfficerMenuItems;
      case "Finance":
        return financeMenuItems;
      case "Quality":
        return qualityMenuItems;
      case "Client":
        return clientMenuItems;
      default:
        return [];
    }
  };

  const menus = getMenuItems();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>
      )}

      {/* Overlay for mobile when menu is open */}
      {isMobile && mobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <div
        className={`sidebar-container ${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}
      >
        <div className="sidebar">
          <ul className="menu">
            {menus.map((menu, index) => (
              <li
                key={index}
                className={`menu-item ${isActive(menu.path) ? "active" : ""}`}
                onClick={() => handleNavigate(menu.path)}
                data-tooltip={collapsed ? menu.label : ""}
              >
                <div className="menu-link">
                  <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                  {!collapsed && <span className="menu-text">{menu.label}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;