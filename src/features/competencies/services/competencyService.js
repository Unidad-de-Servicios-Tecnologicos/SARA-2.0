import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/competencies`;

export const competencyService = {
  // Itinerarios
  getAllItineraries: async () => {
    const response = await axios.get(`${API_URL}/itineraries`);
    return response.data;
  },

  getItineraryById: async (itineraryId) => {
    const response = await axios.get(`${API_URL}/itineraries/${itineraryId}`);
    return response.data;
  },

  createItinerary: async (itineraryData) => {
    const response = await axios.post(`${API_URL}/itineraries`, itineraryData);
    return response.data;
  },

  updateItinerary: async (itineraryId, itineraryData) => {
    const response = await axios.put(`${API_URL}/itineraries/${itineraryId}`, itineraryData);
    return response.data;
  },

  deleteItinerary: async (itineraryId) => {
    const response = await axios.delete(`${API_URL}/itineraries/${itineraryId}`);
    return response.data;
  },

  searchItineraries: async (searchTerm) => {
    const response = await axios.get(`${API_URL}/itineraries/search`, {
      params: { q: searchTerm }
    });
    return response.data;
  },

  // Competencias
  getAllCompetencies: async () => {
    const response = await axios.get(`${API_URL}/competencies`);
    return response.data;
  },

  getCompetencyById: async (competencyId) => {
    const response = await axios.get(`${API_URL}/competencies/${competencyId}`);
    return response.data;
  },

  createCompetency: async (competencyData) => {
    const response = await axios.post(`${API_URL}/competencies`, competencyData);
    return response.data;
  },

  updateCompetency: async (competencyId, competencyData) => {
    const response = await axios.put(`${API_URL}/competencies/${competencyId}`, competencyData);
    return response.data;
  },

  deleteCompetency: async (competencyId) => {
    const response = await axios.delete(`${API_URL}/competencies/${competencyId}`);
    return response.data;
  },

  searchCompetencies: async (searchTerm) => {
    const response = await axios.get(`${API_URL}/competencies/search`, {
      params: { q: searchTerm }
    });
    return response.data;
  },

  // Asignación de competencias
  assignCompetenciesToItinerary: async (itineraryId, competencyIds) => {
    const response = await axios.post(
      `${API_URL}/itineraries/${itineraryId}/competencies`,
      { competencyIds }
    );
    return response.data;
  },

  getCompetenciesByItinerary: async (itineraryId) => {
    const response = await axios.get(`${API_URL}/itineraries/${itineraryId}/competencies`);
    return response.data;
  },

  removeCompetencyFromItinerary: async (itineraryId, competencyId) => {
    const response = await axios.delete(
      `${API_URL}/itineraries/${itineraryId}/competencies/${competencyId}`
    );
    return response.data;
  },

  assignCompetenciesToCourse: async (courseId, competencyIds) => {
    const response = await axios.post(
      `${API_URL}/courses/${courseId}/competencies`,
      { competencyIds }
    );
    return response.data;
  },

  assignCompetenciesToInstructor: async (instructorId, competencyIds) => {
    const response = await axios.post(
      `${API_URL}/instructors/${instructorId}/competencies`,
      { competencyIds }
    );
    return response.data;
  },

  // Carga masiva
  bulkImportCompetencies: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/competencies/bulk-import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  bulkImportItineraries: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/itineraries/bulk-import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Exportación
  exportCompetencies: async (format = 'excel') => {
    const response = await axios.get(`${API_URL}/competencies/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  },

  exportItineraries: async (format = 'excel') => {
    const response = await axios.get(`${API_URL}/itineraries/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  }
};
