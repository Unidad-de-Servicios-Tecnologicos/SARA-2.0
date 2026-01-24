import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/configuration`;

export const configService = {
  // Configuración General del Sistema
  getSystemConfig: async () => {
    const response = await axios.get(`${API_URL}/system`);
    return response.data;
  },

  updateSystemConfig: async (config) => {
    const response = await axios.put(`${API_URL}/system`, config);
    return response.data;
  },

  getApplicationSettings: async () => {
    const response = await axios.get(`${API_URL}/application`);
    return response.data;
  },

  updateApplicationSettings: async (settings) => {
    const response = await axios.put(`${API_URL}/application`, settings);
    return response.data;
  },

  // Configuración de Usuario
  getUserPreferences: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/preferences`);
    return response.data;
  },

  updateUserPreferences: async (userId, preferences) => {
    const response = await axios.put(`${API_URL}/user/${userId}/preferences`, preferences);
    return response.data;
  },

  getUserTheme: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/theme`);
    return response.data;
  },

  setUserTheme: async (userId, theme) => {
    const response = await axios.put(`${API_URL}/user/${userId}/theme`, { theme });
    return response.data;
  },

  getUserLanguage: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/language`);
    return response.data;
  },

  setUserLanguage: async (userId, language) => {
    const response = await axios.put(`${API_URL}/user/${userId}/language`, { language });
    return response.data;
  },

  // Configuración de Notificaciones
  getNotificationSettings: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/notifications`);
    return response.data;
  },

  updateNotificationSettings: async (userId, settings) => {
    const response = await axios.put(`${API_URL}/user/${userId}/notifications`, settings);
    return response.data;
  },

  // Configuración de Email
  getEmailSettings: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/email`);
    return response.data;
  },

  updateEmailSettings: async (userId, settings) => {
    const response = await axios.put(`${API_URL}/user/${userId}/email`, settings);
    return response.data;
  },

  // Configuración de Seguridad
  getSecuritySettings: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/security`);
    return response.data;
  },

  updateSecuritySettings: async (userId, settings) => {
    const response = await axios.put(`${API_URL}/user/${userId}/security`, settings);
    return response.data;
  },

  enableTwoFactor: async (userId) => {
    const response = await axios.post(`${API_URL}/user/${userId}/security/2fa/enable`);
    return response.data;
  },

  disableTwoFactor: async (userId) => {
    const response = await axios.post(`${API_URL}/user/${userId}/security/2fa/disable`);
    return response.data;
  },

  // Configuración de Privacidad
  getPrivacySettings: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/privacy`);
    return response.data;
  },

  updatePrivacySettings: async (userId, settings) => {
    const response = await axios.put(`${API_URL}/user/${userId}/privacy`, settings);
    return response.data;
  },

  // Configuración de Accesibilidad
  getAccessibilitySettings: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/accessibility`);
    return response.data;
  },

  updateAccessibilitySettings: async (userId, settings) => {
    const response = await axios.put(`${API_URL}/user/${userId}/accessibility`, settings);
    return response.data;
  },

  // Parámetros de Sistema
  getSystemParameters: async () => {
    const response = await axios.get(`${API_URL}/parameters`);
    return response.data;
  },

  updateSystemParameter: async (paramName, value) => {
    const response = await axios.put(`${API_URL}/parameters/${paramName}`, { value });
    return response.data;
  },

  // Configuración de Instituciones/Espacios
  getInstitutionConfig: async (institutionId) => {
    const response = await axios.get(`${API_URL}/institution/${institutionId}`);
    return response.data;
  },

  updateInstitutionConfig: async (institutionId, config) => {
    const response = await axios.put(`${API_URL}/institution/${institutionId}`, config);
    return response.data;
  },

  // Configuración de Roles y Permisos
  getRolePermissions: async (roleId) => {
    const response = await axios.get(`${API_URL}/roles/${roleId}/permissions`);
    return response.data;
  },

  updateRolePermissions: async (roleId, permissions) => {
    const response = await axios.put(`${API_URL}/roles/${roleId}/permissions`, permissions);
    return response.data;
  },

  // Logs de Configuración
  getConfigurationLogs: async (limit = 50) => {
    const response = await axios.get(`${API_URL}/logs`, { params: { limit } });
    return response.data;
  },

  // Restaurar Valores Predeterminados
  resetToDefaults: async (section = 'all') => {
    const response = await axios.post(`${API_URL}/reset-defaults`, { section });
    return response.data;
  },

  // Exportar/Importar Configuración
  exportConfiguration: async () => {
    const response = await axios.get(`${API_URL}/export`, { responseType: 'blob' });
    return response.data;
  },

  importConfiguration: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
