import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending reset link
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{ backgroundColor: "#3c3c87" }} // Dark purple background
    >
      <div
        className="card shadow-lg w-100 border-0"
        style={{ maxWidth: "950px", borderRadius: "1.5rem", backgroundColor: "#f3e9e9" }} // Light cream card
      >
        <div className="row g-0">
          {/* Left Image Section */}
          <div
            className="col-md-6 d-none d-md-flex align-items-center justify-content-center rounded-start"
            style={{ backgroundColor: "#fff" }}
          >
            <img
              src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg"
              alt="forgot-password"
              className="img-fluid p-4"
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>

          {/* Right Form Section */}
          <div className="col-md-6 d-flex align-items-center rounded-end">
            <div className="p-5 w-100">
              <h2 className="fw-bold mb-3 text-center" style={{ color: "#3c3c87" }}>
                Forgot Password 🔑
              </h2>
              <p className="text-center mb-4" style={{ color: "#6b6a75" }}>
                Enter your email address and we’ll send you a reset link.
              </p>

              {isSubmitted ? (
                <div className="alert text-center" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
                  ✅ Reset link sent to <strong>{email}</strong>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="mb-3 position-relative">
                    <i
                      className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3"
                      style={{ color: "#3c3c87" }}
                    ></i>
                    <input
                      type="email"
                      className="form-control ps-5"
                      placeholder="Enter your email"
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-semibold"
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
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              )}

              {/* Back to Login */}
              <div className="text-center mt-4">
                <p className="mb-1" style={{ color: "#6b6a75" }}>
                  Remembered your password?
                </p>
                <Link
                  to="/"
                  className="btn w-100 py-2 fw-semibold"
                  style={{
                    border: "2px solid #3c3c87",
                    color: "#3c3c87",
                    backgroundColor: "transparent",
                  }}
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
