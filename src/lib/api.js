// <type="write" filePath="src/lib/api.js">
// Safe API configuration to prevent baseUrl errors
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Fallback for development/demo if env var is missing
  return 'https://api.infinityx.ai/v1';
};

const BASE_URL = getBaseUrl();

export const api = {
  baseUrl: BASE_URL,
  
  sendMessage: async (message) => {
    // Simulation for frontend-only demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          role: 'assistant',
          content: `[SIMULATION] Vision Cortex has received: "${message}". \n\nLive neural processing requires backend connection.`
        });
      }, 1000);
    });
  },

  // Generic fetch wrapper for future use
  request: async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('API Request failed (Simulation Mode active):', error);
      return null;
    }
  }
};