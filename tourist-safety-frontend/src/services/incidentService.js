import api from './api';

// Incident services
export const incidentService = {
  // Create SOS incident
  createSOS: async (incidentData) => {
    try {
      const response = await api.post('/incidents/sos', incidentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all incidents
  getIncidents: async () => {
    try {
      const response = await api.get('/incidents');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get incident by ID
  getIncidentById: async (id) => {
    try {
      const response = await api.get(`/incidents/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
