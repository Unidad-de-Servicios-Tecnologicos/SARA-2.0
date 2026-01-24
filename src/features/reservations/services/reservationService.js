import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const reservationService = {
  // Obtener todas las reservas
  getAllReservations: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reservations`, { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  // Obtener reserva por ID
  getReservationById: async (reservationId) => {
    try {
      const { data } = await axios.get(`${API_URL}/reservations/${reservationId}`);
      return data;
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  },

  // Crear nueva reserva
  createReservation: async (reservationData) => {
    try {
      const { data } = await axios.post(`${API_URL}/reservations`, reservationData);
      return data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Actualizar reserva
  updateReservation: async (reservationId, reservationData) => {
    try {
      const { data } = await axios.put(`${API_URL}/reservations/${reservationId}`, reservationData);
      return data;
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },

  // Eliminar reserva
  deleteReservation: async (reservationId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/reservations/${reservationId}`);
      return data;
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  },

  // Buscar disponibilidad
  checkAvailability: async (environmentId, startDate, endDate) => {
    try {
      const { data } = await axios.get(`${API_URL}/reservations/availability`, {
        params: { environmentId, startDate, endDate },
      });
      return data;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  },

  // Obtener reservas por ambiente
  getReservationsByEnvironment: async (environmentId) => {
    try {
      const { data } = await axios.get(`${API_URL}/reservations/environment/${environmentId}`);
      return data;
    } catch (error) {
      console.error('Error fetching reservations for environment:', error);
      throw error;
    }
  },

  // Obtener reservas por usuario
  getReservationsByUser: async (userId) => {
    try {
      const { data } = await axios.get(`${API_URL}/reservations/user/${userId}`);
      return data;
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      throw error;
    }
  },

  // Exportar reservas
  exportReservations: async (filters = {}) => {
    try {
      const { data } = await axios.get(`${API_URL}/reservations/export`, {
        params: filters,
        responseType: 'blob',
      });
      return data;
    } catch (error) {
      console.error('Error exporting reservations:', error);
      throw error;
    }
  },
};
