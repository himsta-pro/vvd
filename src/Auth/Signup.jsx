import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setIsLoading(true);
    setPasswordMismatch(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{ backgroundColor: "#3c3c87" }} // Dark Purple Background
    >
      <div
        className="card shadow-lg w-100 border-0"
        style={{ maxWidth: "950px", borderRadius: "1.5rem", backgroundColor: "#f3e9e9" }} // Light Cream Card
      >
        <div className="row g-0">
          {/* Left Form Section */}
          <div className="col-md-6 d-flex align-items-center rounded-start">
            <div className="p-5 w-100">
              <h2 className="fw-bold mb-3 text-center" style={{ color: "#3c3c87" }}>
                Create Account ✨
              </h2>
              <p className="text-center mb-4" style={{ color: "#6b6a75" }}>
                Fill in your details to get started
              </p>

              <form onSubmit={handleSignup}>
                {/* First Name */}
                <div className="mb-3 position-relative">
                  <i className="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#3c3c87" }}></i>
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                </div>

                {/* Last Name */}
                <div className="mb-3 position-relative">
                  <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#3c3c87" }}></i>
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-3 position-relative">
                  <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#3c3c87" }}></i>
                  <input
                    type="email"
                    className="form-control ps-5"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                </div>

                {/* Password */}
                <div className="mb-3 position-relative">
                  <i className="bi bi-lock position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#3c3c87" }}></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control ps-5 pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer`}
                    style={{ color: "#3c3c87" }}
                    role="button"
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>

                {/* Confirm Password */}
                <div className="mb-3 position-relative">
                  <i className="bi bi-shield-lock position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#3c3c87" }}></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control ps-5"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#3c3c87",
                      color: "#3c3c87",
                    }}
                  />
                </div>

                {passwordMismatch && (
                  <p className="text-danger small mb-3">⚠️ Passwords do not match</p>
                )}

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="btn w-100 py-2 fw-semibold mb-3"
                  style={{
                    backgroundColor: "#3c3c87",
                    color: "#f3e9e9",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <span style={{ color: "#6b6a75" }}>Already have an account? </span>
                  <Link
                    to="/"
                    className="fw-semibold"
                    style={{ textDecoration: "none", color: "#3c3c87" }}
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center rounded-end" style={{ backgroundColor: "#fff" }}>
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
              alt="signup"
              className="img-fluid p-4"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
