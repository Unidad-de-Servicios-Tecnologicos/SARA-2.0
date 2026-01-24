import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const courseService = {
  // Gestión de Cursos
  getAllCourses: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/courses`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  getCourseById: async (courseId) => {
    try {
      const { data } = await axios.get(`${API_URL}/courses/${courseId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const { data } = await axios.post(`${API_URL}/courses`, courseData);
      return data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const { data } = await axios.put(`${API_URL}/courses/${courseId}`, courseData);
      return data;
    } catch (error) {
      console.error(`Error updating course ${courseId}:`, error);
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/courses/${courseId}`);
      return data;
    } catch (error) {
      console.error(`Error deleting course ${courseId}:`, error);
      throw error;
    }
  },

  searchCourses: async (query) => {
    try {
      const { data } = await axios.get(`${API_URL}/courses/search`, { params: { q: query } });
      return data;
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  },

  // Cambio de estado
  updateCourseStatus: async (courseId, status) => {
    try {
      const { data } = await axios.patch(`${API_URL}/courses/${courseId}/status`, { status });
      return data;
    } catch (error) {
      console.error(`Error updating course status ${courseId}:`, error);
      throw error;
    }
  },

  // Asignación a coordinaciones
  assignToCoordination: async (courseId, coordinationId) => {
    try {
      const { data } = await axios.post(`${API_URL}/courses/${courseId}/assign-coordination`, {
        coordinationId,
      });
      return data;
    } catch (error) {
      console.error('Error assigning course to coordination:', error);
      throw error;
    }
  },

  // Gestión de Estudiantes en Cursos
  getStudentsByCourse: async (courseId) => {
    try {
      const { data } = await axios.get(`${API_URL}/courses/${courseId}/students`);
      return data;
    } catch (error) {
      console.error(`Error fetching students for course ${courseId}:`, error);
      throw error;
    }
  },

  addStudentToCourse: async (courseId, studentId) => {
    try {
      const { data } = await axios.post(`${API_URL}/courses/${courseId}/students`, { studentId });
      return data;
    } catch (error) {
      console.error('Error adding student to course:', error);
      throw error;
    }
  },

  removeStudentFromCourse: async (courseId, studentId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/courses/${courseId}/students/${studentId}`);
      return data;
    } catch (error) {
      console.error('Error removing student from course:', error);
      throw error;
    }
  },

  bulkImportStudents: async (courseId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(`${API_URL}/courses/${courseId}/students/bulk-import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      console.error('Error bulk importing students:', error);
      throw error;
    }
  },

  // Descargas
  downloadCourseSchedule: async (courseId) => {
    try {
      const { data } = await axios.get(`${API_URL}/courses/${courseId}/schedule/export`, {
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Error downloading course schedule:', error);
      throw error;
    }
  },

  downloadStudentList: async (courseId) => {
    try {
      const { data } = await axios.get(`${API_URL}/courses/${courseId}/students/export`, {
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Error downloading student list:', error);
      throw error;
    }
  },
};
