// src/components/Navbar.js
import { Link } from "react-router-dom";
import { authService } from "../services";
import logo from "../images/logo.png";

function Navbar() {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img 
          src={logo} 
          alt="GeoGuard Logo" 
          style={{ height: "40px", width: "40px", marginRight: "10px", borderRadius: "8px" }}
        />
        <span style={{ fontWeight: "700", fontSize: "1.5rem" }}>GeoGuard</span>
      </Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        style={{ border: "none", borderRadius: "8px" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              🏠 Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/demo">
              🎮 Demo
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/incidents">
                  📊 Incidents
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-danger" to="/sos">
                  🚨 SOS
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li className="nav-item">
              <Link className="nav-link" to="/onboarding">
                ✨ Register
              </Link>
            </li>
          )}
        </ul>
        
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <>
              <li className="nav-item d-flex align-items-center">
                <span className="navbar-text me-3" style={{ 
                  background: "rgba(0, 122, 255, 0.1)", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "20px",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0, 122, 255, 0.2)",
                  color: "#1d1d1f"
                }}>
                  <span className="status-indicator online"></span>
                  👋 {currentUser?.name || 'User'}
                </span>
              </li>
              <li className="nav-item">
                <button className="btn btn-glass-ios btn-sm" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="btn btn-glass-ios btn-sm" to="/login">
                🔐 Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;