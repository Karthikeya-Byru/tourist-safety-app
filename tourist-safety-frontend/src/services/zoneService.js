import api from './api';

// Zone services
export const zoneService = {
  // Create a new zone (admin only)
  createZone: async (zoneData) => {
    try {
      const response = await api.post('/zones', zoneData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all zones
  getZones: async () => {
    try {
      const response = await api.get('/zones');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Check if coordinates are in any restricted zone
  checkZone: async (coordinates) => {
    try {
      const response = await api.post('/zones/check', coordinates);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
