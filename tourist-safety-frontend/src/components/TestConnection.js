import { useState } from "react";
import { apiService } from "../services";

function TestConnection() {
  const [status, setStatus] = useState("Not tested");
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await apiService.testConnection();
      setStatus(`✅ Connected! ${response.message}`);
      setIsOnline(true);
    } catch (error) {
      setStatus(`❌ Failed: ${error.message || error}`);
      setIsOnline(false);
    }
    setLoading(false);
  };

  const getStatusColor = () => {
    if (isOnline === true) return "text-success";
    if (isOnline === false) return "text-danger";
    return "text-warning";
  };

  return (
    <div className="border-0">
      <h6 className="mb-3" style={{ color: '#8E8E93' }}>🔗 Backend Connection</h6>
      <div className="d-flex align-items-center mb-3">
        <span className={`status-indicator ${isOnline ? 'online' : 'offline'} me-2`}></span>
        <span className={`fw-bold ${getStatusColor()}`}>
          {status}
        </span>
      </div>
      <button 
        className="btn btn-glass-ios btn-sm" 
        onClick={testConnection}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Testing...
          </>
        ) : (
          <>
            🔍 Test Connection
          </>
        )}
      </button>
    </div>
  );
}

export default TestConnection;
