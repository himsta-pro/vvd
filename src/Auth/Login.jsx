import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Admin", // Default role
  });

  const [user, setUser] = useState(null); // mock user state
  const role = localStorage.getItem("role"); // get saved role if any

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save role in localStorage
    localStorage.setItem("role", formData.role);

    // Fake user login (replace with real auth later)
    setUser({ email: formData.email });

    // Navigate handled by useEffect based on role
  };

  // Redirect based on role
  useEffect(() => {
    if (user && role) {
      const userRole = role.toLowerCase();
      switch (userRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "projectmanager":
          navigate("/projectmanager/dashboard");
          break;
        case "designer":
          navigate("/designer/dashboard");
          break;
        case "procurementofficer":
          navigate("/procurementOfficer/dashboard");
          break;
        case "finance":
          navigate("/finance/dashboard");
          break;
        case "quality":
          navigate("/quality/dashboard");
          break;
        case "client":
          navigate("/client/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, role, navigate]);

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{ backgroundColor: "#3c3c87" }}
    >
      <div
        className="card shadow-lg w-100 border-0"
        style={{
          maxWidth: "950px",
          borderRadius: "1.5rem",
          backgroundColor: "#f3e9e9",
        }}
      >
        <div className="row g-0">
          {/* Left Image */}
          <div
            className="col-md-6 d-none d-md-flex align-items-center justify-content-center rounded-start"
            style={{ backgroundColor: "#fff" }}
          >
            <img
              src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4684.jpg"
              alt="login"
              className="img-fluid p-4"
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>

          {/* Right Form */}
          <div className="col-md-6 d-flex align-items-center rounded-end">
            <div className="p-5 w-100">
              <h2
                className="fw-bold mb-3 text-center"
                style={{ color: "#3c3c87" }}
              >
                Welcome Back 👋
              </h2>
              <p
                className="text-center mb-4"
                style={{ color: "#6b6a75" }}
              >
                Login to access your dashboard
              </p>

              <form onSubmit={handleSubmit}>
                {/* Role */}
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ color: "#3c3c87" }}
                  >
                    Select Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  >
                    <option value="Admin">Admin</option>
                    <option value="ProjectManager">Project Manager</option>
                    <option value="Designer">Designer</option>
                    <option value="ProcurementOfficer">
                      Procurement Officer
                    </option>
                    <option value="Finance">Finance</option>
                    <option value="Quality">Quality</option>
                    <option value="Client">Client</option>
                  </select>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ color: "#3c3c87" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                </div>

                {/* Password */}
                <div className="mb-3 position-relative">
                  <label
                    className="form-label"
                    style={{ color: "#3c3c87" }}
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3 mt-3"
                    style={{ cursor: "pointer", color: "#3c3c87" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                      <i className="bi bi-eye-fill"></i>
                    )}
                  </span>
                </div>

                {/* Remember + Forgot */}
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                      style={{ borderColor: "#3c3c87" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="remember"
                      style={{ color: "#3c3c87" }}
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="small"
                    style={{
                      textDecoration: "none",
                      color: "#3c3c87",
                      fontWeight: 600,
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn w-100 py-2"
                  style={{
                    backgroundColor: "#3c3c87",
                    color: "#f3e9e9",
                    fontWeight: "600",
                  }}
                >
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="px-2 text-muted small">OR</span>
                <hr className="flex-grow-1" />
              </div>

              {/* Signup */}
              <div className="text-center">
                <p className="mb-2" style={{ color: "#3c3c87" }}>
                  Don't have an account?
                </p>
                <Link
                  to="/signup"
                  className="btn w-100 py-2"
                  style={{
                    border: "2px solid #3c3c87",
                    color: "#3c3c87",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
