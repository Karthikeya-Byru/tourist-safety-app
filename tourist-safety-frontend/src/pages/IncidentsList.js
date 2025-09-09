import { useState, useEffect } from "react";
import { incidentService } from "../services";

function IncidentsList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const data = await incidentService.getIncidents();
      setIncidents(data);
      setError(null);
    } catch (err) {
      setError(err.message || err);
    }
    setLoading(false);
  };

  const getRiskBadgeClass = (risk) => {
    switch(risk) {
      case 'High': return 'badge bg-danger';
      case 'Medium': return 'badge bg-warning';
      case 'Low': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  };

  if (loading) return <div className="text-center">Loading incidents...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Recent Incidents</h2>
        <button className="btn btn-outline-primary" onClick={loadIncidents}>
          Refresh
        </button>
      </div>
      
      {incidents.length === 0 ? (
        <div className="alert alert-info">No incidents found.</div>
      ) : (
        <div className="row">
          {incidents.map((incident) => (
            <div key={incident._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{incident.incidentType} Alert</h5>
                    <span className={getRiskBadgeClass(incident.riskLevel)}>
                      {incident.riskLevel}
                    </span>
                  </div>
                  <p className="card-text">{incident.message}</p>
                  <small className="text-muted">
                    {new Date(incident.createdAt).toLocaleString()}
                  </small>
                  {incident.location && (
                    <div className="mt-2">
                      <small className="text-muted">
                        Location: {incident.location.lat?.toFixed(4)}, {incident.location.lon?.toFixed(4)}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncidentsList;
