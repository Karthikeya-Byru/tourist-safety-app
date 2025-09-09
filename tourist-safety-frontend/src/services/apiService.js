import api from './api';

// General API services
export const apiService = {
  // Test backend connection
  testConnection: async () => {
    try {
      const response = await api.get('/test');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get geolocation
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }
};
