// src/pages/Onboarding.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services";

function Onboarding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      
      const response = await authService.register(registrationData);
      setSuccess(`Registration successful! Welcome ${response.user.name}! You can now login.`);
      
      // Clear form
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error('Registration Error:', error);
      setError(error.message || "Registration failed. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card card-glass-ios">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="card-title mb-3" style={{ color: '#1d1d1f' }}>✨ Tourist Registration</h2>
                <p style={{ color: '#8E8E93' }}>Join GeoGuard for safe travels</p>
              </div>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">👤 Full Name</label>
                  <input 
                    id="name"
                    className="form-control" 
                    name="name"
                    type="text"
                    placeholder="Enter your full name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">📧 Email Address</label>
                  <input 
                    id="email"
                    className="form-control" 
                    name="email"
                    type="email"
                    placeholder="Enter your email address" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">🔒 Password</label>
                  <input 
                    id="password"
                    className="form-control" 
                    name="password"
                    type="password"
                    placeholder="Create a password (min 6 characters)" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    minLength="6"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">🔐 Confirm Password</label>
                  <input 
                    id="confirmPassword"
                    className="form-control" 
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <button 
                  className="btn btn-success w-100 mb-3" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      🔄 Registering...
                    </>
                  ) : (
                    "🚀 Register"
                  )}
                </button>
              </form>
              
              <div className="text-center">
                <p className="mb-0" style={{ color: '#8E8E93' }}>
                  Already have an account? {" "}
                  <Link to="/login" className="text-decoration-none" style={{ color: 'var(--ios-blue)' }}>
                    🔐 Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Onboarding;
