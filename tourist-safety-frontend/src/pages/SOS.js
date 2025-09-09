// src/pages/SOS.js
import { useState } from "react";
import { incidentService, apiService } from "../services";

function SOS() {
  const [loading, setLoading] = useState(false);

  const triggerSOS = async () => {
    setLoading(true);
    try {
      // Get current location
      const location = await apiService.getCurrentLocation();
      
      // Create SOS incident
      const response = await incidentService.createSOS({
        message: "Emergency SOS alert - Immediate assistance required",
        location: location
      });
      
      alert(`SOS alert sent successfully! Incident ID: ${response.incident._id}`);
    } catch (error) {
      console.error('SOS Error:', error);
      alert(`Failed to send SOS alert: ${error.message || error}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>SOS Emergency</h2>
      <button 
        className="btn btn-danger btn-lg" 
        onClick={triggerSOS}
        disabled={loading}
      >
        {loading ? "Sending SOS..." : "🚨 Send SOS"}
      </button>
    </div>
  );
}
export default SOS;
