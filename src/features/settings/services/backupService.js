import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/backup`;

export const backupService = {
  // Información de backup
  getBackupStatus: async () => {
    const response = await axios.get(`${API_URL}/status`);
    return response.data;
  },

  getBackupInfo: async () => {
    const response = await axios.get(`${API_URL}/info`);
    return response.data;
  },

  getBackupHistory: async (limit = 20) => {
    const response = await axios.get(`${API_URL}/history`, {
      params: { limit }
    });
    return response.data;
  },

  // Crear backup
  createBackup: async (backupData = {}) => {
    const response = await axios.post(`${API_URL}/create`, backupData);
    return response.data;
  },

  createBackupNow: async (type = 'full') => {
    const response = await axios.post(`${API_URL}/create-now`, { type });
    return response.data;
  },

  // Restaurar backup
  restoreBackup: async (backupId) => {
    const response = await axios.post(`${API_URL}/${backupId}/restore`);
    return response.data;
  },

  // Descargar backup
  downloadBackup: async (backupId) => {
    const response = await axios.get(`${API_URL}/${backupId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  downloadBackupList: async () => {
    const response = await axios.get(`${API_URL}/export-list`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Eliminar backup
  deleteBackup: async (backupId) => {
    const response = await axios.delete(`${API_URL}/${backupId}`);
    return response.data;
  },

  // Programación automática
  getScheduleConfig: async () => {
    const response = await axios.get(`${API_URL}/schedule/config`);
    return response.data;
  },

  updateScheduleConfig: async (config) => {
    const response = await axios.put(`${API_URL}/schedule/config`, config);
    return response.data;
  },

  enableAutomaticBackup: async () => {
    const response = await axios.post(`${API_URL}/schedule/enable`);
    return response.data;
  },

  disableAutomaticBackup: async () => {
    const response = await axios.post(`${API_URL}/schedule/disable`);
    return response.data;
  },

  setBackupSchedule: async (scheduleData) => {
    const response = await axios.post(`${API_URL}/schedule/set`, scheduleData);
    return response.data;
  },

  getNextScheduledBackup: async () => {
    const response = await axios.get(`${API_URL}/schedule/next`);
    return response.data;
  },

  // Almacenamiento
  getStorageInfo: async () => {
    const response = await axios.get(`${API_URL}/storage`);
    return response.data;
  },

  getBackupSize: async (backupId) => {
    const response = await axios.get(`${API_URL}/${backupId}/size`);
    return response.data;
  },

  // Configuración de destino
  getBackupDestinations: async () => {
    const response = await axios.get(`${API_URL}/destinations`);
    return response.data;
  },

  addBackupDestination: async (destination) => {
    const response = await axios.post(`${API_URL}/destinations`, destination);
    return response.data;
  },

  updateBackupDestination: async (destinationId, destination) => {
    const response = await axios.put(`${API_URL}/destinations/${destinationId}`, destination);
    return response.data;
  },

  deleteBackupDestination: async (destinationId) => {
    const response = await axios.delete(`${API_URL}/destinations/${destinationId}`);
    return response.data;
  },

  testBackupDestination: async (destinationId) => {
    const response = await axios.post(`${API_URL}/destinations/${destinationId}/test`);
    return response.data;
  },

  // Retención y limpieza
  getRetentionPolicy: async () => {
    const response = await axios.get(`${API_URL}/retention/policy`);
    return response.data;
  },

  updateRetentionPolicy: async (policy) => {
    const response = await axios.put(`${API_URL}/retention/policy`, policy);
    return response.data;
  },

  cleanupOldBackups: async () => {
    const response = await axios.post(`${API_URL}/retention/cleanup`);
    return response.data;
  },

  // Verificación e integridad
  verifyBackup: async (backupId) => {
    const response = await axios.post(`${API_URL}/${backupId}/verify`);
    return response.data;
  },

  getBackupIntegrity: async (backupId) => {
    const response = await axios.get(`${API_URL}/${backupId}/integrity`);
    return response.data;
  },

  // Notificaciones
  getBackupNotifications: async () => {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  },

  updateBackupNotifications: async (settings) => {
    const response = await axios.put(`${API_URL}/notifications`, settings);
    return response.data;
  }
};
