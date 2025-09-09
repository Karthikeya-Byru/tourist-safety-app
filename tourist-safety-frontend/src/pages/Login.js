import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      window.location.href = '/';
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await authService.login(credentials);
      // Success! User will be redirected by the service
      window.location.href = '/';
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.message || "Login failed. Please check your credentials.");
    }
    
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card card-glass-ios">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="card-title mb-3" style={{ color: '#1d1d1f' }}>🔐 Login to GeoGuard</h2>
                <p style={{ color: '#8E8E93' }}>Access your tourist safety dashboard</p>
              </div>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">📧 Email Address</label>
                  <input 
                    id="email"
                    className="form-control" 
                    name="email"
                    type="email"
                    placeholder="Enter your email" 
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">🔒 Password</label>
                  <input 
                    id="password"
                    className="form-control" 
                    name="password"
                    type="password"
                    placeholder="Enter your password" 
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>
                <button 
                  className="btn btn-primary w-100 mb-3" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      🔄 Logging in...
                    </>
                  ) : (
                    "🚀 Login"
                  )}
                </button>
              </form>
              
              <div className="text-center">
                <p className="mb-0" style={{ color: '#8E8E93' }}>
                  Don't have an account? {" "}
                  <Link to="/onboarding" className="text-decoration-none" style={{ color: 'var(--ios-blue)' }}>
                    ✨ Register here
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

export default Login;
