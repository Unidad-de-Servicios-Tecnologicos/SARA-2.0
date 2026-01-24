import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/integrations`;

export const integrationService = {
  // SOFIA Plus
  getSofiaConfig: async () => {
    const response = await axios.get(`${API_URL}/sofia/config`);
    return response.data;
  },

  updateSofiaConfig: async (config) => {
    const response = await axios.put(`${API_URL}/sofia/config`, config);
    return response.data;
  },

  testSofiaConnection: async () => {
    const response = await axios.post(`${API_URL}/sofia/test-connection`);
    return response.data;
  },

  syncWithSofia: async (entityType) => {
    const response = await axios.post(`${API_URL}/sofia/sync`, { entityType });
    return response.data;
  },

  getSofiaStatus: async () => {
    const response = await axios.get(`${API_URL}/sofia/status`);
    return response.data;
  },

  getSofiaLastSync: async () => {
    const response = await axios.get(`${API_URL}/sofia/last-sync`);
    return response.data;
  },

  // Google Gemini (Content Generation)
  getGeminiConfig: async () => {
    const response = await axios.get(`${API_URL}/gemini/config`);
    return response.data;
  },

  updateGeminiConfig: async (config) => {
    const response = await axios.put(`${API_URL}/gemini/config`, config);
    return response.data;
  },

  testGeminiConnection: async () => {
    const response = await axios.post(`${API_URL}/gemini/test-connection`);
    return response.data;
  },

  generateContent: async (prompt, contentType = 'text') => {
    const response = await axios.post(`${API_URL}/gemini/generate`, {
      prompt,
      contentType
    });
    return response.data;
  },

  generateActivityContent: async (activityData) => {
    const response = await axios.post(`${API_URL}/gemini/generate-activity`, activityData);
    return response.data;
  },

  generateReportContent: async (reportData) => {
    const response = await axios.post(`${API_URL}/gemini/generate-report`, reportData);
    return response.data;
  },

  getGeminiStatus: async () => {
    const response = await axios.get(`${API_URL}/gemini/status`);
    return response.data;
  },

  // Webhooks
  createWebhook: async (webhookData) => {
    const response = await axios.post(`${API_URL}/webhooks`, webhookData);
    return response.data;
  },

  getWebhooks: async () => {
    const response = await axios.get(`${API_URL}/webhooks`);
    return response.data;
  },

  updateWebhook: async (webhookId, webhookData) => {
    const response = await axios.put(`${API_URL}/webhooks/${webhookId}`, webhookData);
    return response.data;
  },

  deleteWebhook: async (webhookId) => {
    const response = await axios.delete(`${API_URL}/webhooks/${webhookId}`);
    return response.data;
  },

  testWebhook: async (webhookId) => {
    const response = await axios.post(`${API_URL}/webhooks/${webhookId}/test`);
    return response.data;
  },

  getWebhookHistory: async (webhookId) => {
    const response = await axios.get(`${API_URL}/webhooks/${webhookId}/history`);
    return response.data;
  },

  // Extensiones personalizadas
  createExtension: async (extensionData) => {
    const response = await axios.post(`${API_URL}/extensions`, extensionData);
    return response.data;
  },

  getExtensions: async () => {
    const response = await axios.get(`${API_URL}/extensions`);
    return response.data;
  },

  updateExtension: async (extensionId, extensionData) => {
    const response = await axios.put(`${API_URL}/extensions/${extensionId}`, extensionData);
    return response.data;
  },

  deleteExtension: async (extensionId) => {
    const response = await axios.delete(`${API_URL}/extensions/${extensionId}`);
    return response.data;
  },

  enableExtension: async (extensionId) => {
    const response = await axios.post(`${API_URL}/extensions/${extensionId}/enable`);
    return response.data;
  },

  disableExtension: async (extensionId) => {
    const response = await axios.post(`${API_URL}/extensions/${extensionId}/disable`);
    return response.data;
  },

  // APIs Externas
  getAvailableApis: async () => {
    const response = await axios.get(`${API_URL}/apis`);
    return response.data;
  },

  configureApi: async (apiName, config) => {
    const response = await axios.post(`${API_URL}/apis/${apiName}/configure`, config);
    return response.data;
  },

  testApiConnection: async (apiName) => {
    const response = await axios.post(`${API_URL}/apis/${apiName}/test`);
    return response.data;
  },

  // Sincronización General
  getSyncStatus: async () => {
    const response = await axios.get(`${API_URL}/sync/status`);
    return response.data;
  },

  startSyncProcess: async (syncType = 'full') => {
    const response = await axios.post(`${API_URL}/sync/start`, { syncType });
    return response.data;
  },

  getSyncHistory: async (limit = 10) => {
    const response = await axios.get(`${API_URL}/sync/history`, {
      params: { limit }
    });
    return response.data;
  },

  stopSync: async () => {
    const response = await axios.post(`${API_URL}/sync/stop`);
    return response.data;
  },

  // Errores y Logs
  getSyncErrors: async () => {
    const response = await axios.get(`${API_URL}/sync/errors`);
    return response.data;
  },

  getIntegrationLogs: async (filter = {}) => {
    const response = await axios.get(`${API_URL}/logs`, { params: filter });
    return response.data;
  }
};
