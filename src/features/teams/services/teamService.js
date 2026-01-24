import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/teams`;

export const teamService = {
  // Equipos
  getAllTeams: async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  getTeamById: async (teamId) => {
    const response = await axios.get(`${API_URL}/${teamId}`);
    return response.data;
  },

  createTeam: async (teamData) => {
    const response = await axios.post(`${API_URL}`, teamData);
    return response.data;
  },

  updateTeam: async (teamId, teamData) => {
    const response = await axios.put(`${API_URL}/${teamId}`, teamData);
    return response.data;
  },

  deleteTeam: async (teamId) => {
    const response = await axios.delete(`${API_URL}/${teamId}`);
    return response.data;
  },

  searchTeams: async (searchTerm) => {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: searchTerm }
    });
    return response.data;
  },

  getTeamsByCourse: async (courseId) => {
    const response = await axios.get(`${API_URL}/course/${courseId}`);
    return response.data;
  },

  // Miembros del equipo
  addTeamMember: async (teamId, userId) => {
    const response = await axios.post(`${API_URL}/${teamId}/members`, { userId });
    return response.data;
  },

  removeTeamMember: async (teamId, userId) => {
    const response = await axios.delete(`${API_URL}/${teamId}/members/${userId}`);
    return response.data;
  },

  getTeamMembers: async (teamId) => {
    const response = await axios.get(`${API_URL}/${teamId}/members`);
    return response.data;
  },

  updateTeamMemberRole: async (teamId, userId, role) => {
    const response = await axios.put(`${API_URL}/${teamId}/members/${userId}`, { role });
    return response.data;
  },

  // Archivos
  uploadFile: async (teamId, file, folderPath = '/') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderPath', folderPath);
    const response = await axios.post(`${API_URL}/${teamId}/files/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getTeamFiles: async (teamId, folderPath = '/') => {
    const response = await axios.get(`${API_URL}/${teamId}/files`, {
      params: { folderPath }
    });
    return response.data;
  },

  downloadFile: async (fileId) => {
    const response = await axios.get(`${API_URL}/files/${fileId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  downloadFolder: async (teamId, folderPath = '/') => {
    const response = await axios.get(`${API_URL}/${teamId}/folders/download`, {
      params: { folderPath },
      responseType: 'blob'
    });
    return response.data;
  },

  deleteFile: async (fileId) => {
    const response = await axios.delete(`${API_URL}/files/${fileId}`);
    return response.data;
  },

  deleteFolder: async (folderId) => {
    const response = await axios.delete(`${API_URL}/folders/${folderId}`);
    return response.data;
  },

  renameFile: async (fileId, newName) => {
    const response = await axios.put(`${API_URL}/files/${fileId}`, { name: newName });
    return response.data;
  },

  createFolder: async (teamId, folderName, parentPath = '/') => {
    const response = await axios.post(`${API_URL}/${teamId}/folders`, {
      folderName,
      parentPath
    });
    return response.data;
  },

  // Permisos
  updateFilePermissions: async (fileId, permissions) => {
    const response = await axios.put(`${API_URL}/files/${fileId}/permissions`, permissions);
    return response.data;
  },

  getFilePermissions: async (fileId) => {
    const response = await axios.get(`${API_URL}/files/${fileId}/permissions`);
    return response.data;
  },

  shareFile: async (fileId, userIds, permission = 'view') => {
    const response = await axios.post(`${API_URL}/files/${fileId}/share`, {
      userIds,
      permission
    });
    return response.data;
  },

  // Almacenamiento
  getTeamStorageInfo: async (teamId) => {
    const response = await axios.get(`${API_URL}/${teamId}/storage`);
    return response.data;
  },

  getStorageQuota: async () => {
    const response = await axios.get(`${API_URL}/storage/quota`);
    return response.data;
  },

  // Actividades
  getTeamActivity: async (teamId) => {
    const response = await axios.get(`${API_URL}/${teamId}/activity`);
    return response.data;
  }
};
