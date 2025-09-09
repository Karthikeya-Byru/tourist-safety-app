// src/pages/Dashboard.js
import { authService } from "../services";
import TestConnection from "../components/TestConnection";

function Dashboard() {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="hero-section">
            <div className="hero-content text-center">
              <h1 className="display-4 mb-3">🛡️ Smart Tourist Safety System</h1>
              <p className="lead mb-4">
                Real-time monitoring and safety alerts for tourists worldwide
              </p>
              {!isAuthenticated && (
                <div className="mt-4">
                  <a className="btn btn-glass-ios btn-lg me-3" href="/onboarding" role="button">
                    ✨ Get Started
                  </a>
                  <a className="btn btn-glass-ios btn-lg" href="/login" role="button">
                    🔐 Login
                  </a>
                </div>
              )}
              {isAuthenticated && (
                <div className="row mt-4">
                  <div className="col-md-3 col-6 mb-3">
                    <div className="stats-card">
                      <div className="stats-number">24/7</div>
                      <div className="stats-label">Protection</div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <div className="stats-card">
                      <div className="stats-number">
                        <span className="status-indicator online"></span>
                        Active
                      </div>
                      <div className="stats-label">Status</div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <div className="stats-card">
                      <div className="stats-number">🌍</div>
                      <div className="stats-label">Global Coverage</div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <div className="stats-card">
                      <div className="stats-number">⚡</div>
                      <div className="stats-label">Instant Alerts</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated ? (
        <div className="row">
          <div className="col-12">
            <div className="card card-glass-ios mb-4">
              <div className="card-body text-center">
                <h3 className="card-title mb-3" style={{ color: '#1d1d1f' }}>Welcome back, {currentUser?.name}! 👋</h3>
                <p className="card-text mb-4" style={{ color: '#8E8E93' }}>
                  Your safety dashboard is ready. Monitor incidents, send SOS alerts, and stay safe during your travels.
                </p>
                <div className="row mt-4">
                  <div className="col-md-4 mb-3">
                    <div className="feature-card emergency">
                      <div className="icon">🚨</div>
                      <h5 className="card-title">Emergency SOS</h5>
                      <p className="card-text">Send immediate help alerts with your location</p>
                      <a href="/sos" className="btn btn-danger">
                        🆘 Access SOS
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="feature-card incidents">
                      <div className="icon">📊</div>
                      <h5 className="card-title">View Incidents</h5>
                      <p className="card-text">Monitor recent safety incidents in your area</p>
                      <a href="/incidents" className="btn btn-info">
                        📈 View Incidents
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="feature-card zones">
                      <div className="icon">🗺️</div>
                      <h5 className="card-title">Safety Zones</h5>
                      <p className="card-text">Check restricted and safe areas nearby</p>
                      <button className="btn btn-warning" disabled>
                        🔄 Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4" style={{ color: '#1d1d1f' }}>✨ Key Features</h2>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="feature-card emergency">
                  <div className="icon">🚨</div>
                  <h5 className="card-title">Emergency SOS</h5>
                  <p className="card-text">Instant emergency alerts with GPS location sharing to authorities and emergency contacts.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="feature-card zones">
                  <div className="icon">🗺️</div>
                  <h5 className="card-title">Safety Zones</h5>
                  <p className="card-text">Real-time monitoring of restricted areas, curfew zones, and safety recommendations.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="feature-card incidents">
                  <div className="icon">📊</div>
                  <h5 className="card-title">Incident Tracking</h5>
                  <p className="card-text">Monitor and track safety incidents in your travel destinations.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="feature-card safety">
                  <div className="icon">🔒</div>
                  <h5 className="card-title">Secure & Private</h5>
                  <p className="card-text">Your data is protected with encryption and blockchain technology.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-glass-ios">
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: '#1d1d1f' }}>🔧 System Status</h5>
                <TestConnection />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="row">
          <div className="col-12">
            <div className="card card-glass-ios">
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: '#1d1d1f' }}>🔧 System Status & Diagnostics</h5>
                <TestConnection />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
