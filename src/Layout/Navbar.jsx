import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="navbar navbar-expand px-3 py-2 shadow-sm d-flex justify-content-between align-items-center fixed-top "
      style={{ backgroundColor: "#3c3c87" }} // Dark Purple BG
    >
      {/* Sidebar Toggle + Logo */}
      <div className="d-flex align-items-center gap-3">
        {/* Toggle Button */}
        <button
          className="btn p-2"
          style={{ backgroundColor: "#f3e9e9", color: "#3c3c87" }}
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Logo */}
        <img src="https://kiaantechnology.com/img/kt.png" alt="Logo" width={"110"} className="navbar-logo" />
      </div>

      {/* Search */}
      <div className="d-flex align-items-center">
        <div className="input-group d-none d-sm-flex">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search"
            aria-label="Search"
            style={{ backgroundColor: "#f3e9e9", color: "#3c3c87" }}
          />
          <span
            className="input-group-text"
            style={{ backgroundColor: "#f3e9e9", color: "#3c3c87" }}
          >
            <FaSearch />
          </span>
        </div>

        {/* Mobile Search Icon */}
        <button
          className="btn btn-sm d-sm-none ms-2"
          style={{ color: "#f3e9e9" }}
        >
          <FaSearch />
        </button>
      </div>

      {/* Notification + User */}
      <div className="d-flex align-items-center gap-3 position-relative">
        {/* Notification */}
        {/* <div className="position-relative">
          <FaBell size={18} style={{ color: "#f3e9e9" }} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </div> */}

        {/* User Profile */}
        <div className="dropdown" ref={dropdownRef}>
          <div
            className="d-flex align-items-center gap-2 cursor-pointer"
            role="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ color: "#f3e9e9" }}
          >
            <FaUserCircle size={24} />
            <div className="d-none d-sm-block">
              <small className="mb-0" style={{ color: "#d1cfd9" }}>
                Welcome
              </small>
              <div className="fw-bold" style={{ color: "#f3e9e9" }}>
                Admin
              </div>
            </div>
          </div>

          {dropdownOpen && (
            <ul
              className="dropdown-menu show mt-2 shadow-sm"
              style={{
                position: "absolute",
                right: 0,
                minWidth: "180px",
                backgroundColor: "#f3e9e9", // Light cream dropdown
                color: "#3c3c87",
                zIndex: 1000,
              }}
            >
              <li>
                <a className="dropdown-item" href="#" style={{ color: "#3c3c87" }}>
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" style={{ color: "#3c3c87" }}>
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/" style={{ color: "#3c3c87" }}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
