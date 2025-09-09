import { authService } from "../services";

function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  
  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-warning">🔒 Access Restricted</h3>
                <p className="mb-3">You need to be logged in to access this page.</p>
                <div className="d-flex gap-2 justify-content-center">
                  <a href="/login" className="btn btn-primary">Login</a>
                  <a href="/onboarding" className="btn btn-outline-primary">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return children;
}

export default ProtectedRoute;
