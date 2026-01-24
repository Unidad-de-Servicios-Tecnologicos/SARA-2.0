import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const reportService = {
  // Reportes de Estudiantes
  getStudentPerformanceReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/student-performance`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching performance report:', error);
      throw error;
    }
  },

  getAttendanceReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/attendance`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching attendance report:', error);
      throw error;
    }
  },

  getCompetenciesReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/competencies`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching competencies report:', error);
      throw error;
    }
  },

  getPracticesReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/practices`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching practices report:', error);
      throw error;
    }
  },

  // Reportes de Cursos
  getCourseReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/courses`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching course report:', error);
      throw error;
    }
  },

  getScheduleReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/schedule`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching schedule report:', error);
      throw error;
    }
  },

  // Reportes de Instructores
  getInstructorReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/instructors`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching instructor report:', error);
      throw error;
    }
  },

  getInstructorActivityReport: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/instructor-activity`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching instructor activity report:', error);
      throw error;
    }
  },

  // Exportar reportes
  exportToExcel: async (reportType, filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/${reportType}/export/excel`, {
        params: filters,
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw error;
    }
  },

  exportToWord: async (reportType, filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/${reportType}/export/word`, {
        params: filters,
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Error exporting to Word:', error);
      throw error;
    }
  },

  exportToPdf: async (reportType, filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/${reportType}/export/pdf`, {
        params: filters,
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      throw error;
    }
  },

  // Programar reporte
  scheduleReport: async (reportConfig) => {
    try {
      const { data } = await axios.post(`${API_URL}/reports/schedule`, reportConfig);
      return data;
    } catch (error) {
      console.error('Error scheduling report:', error);
      throw error;
    }
  },

  // Obtener reportes programados
  getScheduledReports: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reports/scheduled`);
      return data;
    } catch (error) {
      console.error('Error fetching scheduled reports:', error);
      throw error;
    }
  },
};
