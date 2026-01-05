// Dashboard Service - Preparado para conexión con backend
// Importar datos mock para desarrollo
import {
  subdirectorKPIs,
  instructorsByContract,
  instructorsByGender,
  apprenticesByStatus,
  apprenticesByProgram,
  fichasByProgram,
} from "../mock/dashboard.mock.js";

// Base URL del API (configurar en .env para producción)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Servicio para obtener datos del dashboard
 * Actualmente usa datos mock, pero está preparado para conectar con el backend
 */
export const DashboardService = {
  /**
   * Obtener KPIs del subdirector
   * @returns {Promise<Array>} KPIs con label y value
   */
  async getSubdirectorKPIs() {
    // TODO: Descomentar cuando el backend esté listo
    // try {
    //   const response = await fetch(`${API_BASE_URL}/dashboard/kpis`);
    //   if (!response.ok) throw new Error("Error al obtener KPIs");
    //   return await response.json();
    // } catch (error) {
    //   console.error("Error fetching KPIs:", error);
    //   throw error;
    // }
    
    // Datos mock para desarrollo
    return Promise.resolve(subdirectorKPIs);
  },

  /**
   * Obtener instructores por tipo de contrato
   * @returns {Promise<Array>} Datos de instructores por contrato
   */
  async getInstructorsByContract() {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/dashboard/instructors/contract`);
    // return await response.json();
    
    return Promise.resolve(instructorsByContract);
  },

  /**
   * Obtener instructores por género
   * @returns {Promise<Array>} Datos de instructores por género
   */
  async getInstructorsByGender() {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/dashboard/instructors/gender`);
    // return await response.json();
    
    return Promise.resolve(instructorsByGender);
  },

  /**
   * Obtener aprendices por estado de formación
   * @returns {Promise<Array>} Datos de aprendices por estado
   */
  async getApprenticesByStatus() {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/dashboard/apprentices/status`);
    // return await response.json();
    
    return Promise.resolve(apprenticesByStatus);
  },

  /**
   * Obtener aprendices activos por programa
   * @returns {Promise<Array>} Datos de aprendices por programa
   */
  async getApprenticesByProgram() {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/dashboard/apprentices/program`);
    // return await response.json();
    
    return Promise.resolve(apprenticesByProgram);
  },

  /**
   * Obtener fichas por programa
   * @returns {Promise<Array>} Datos de fichas por programa
   */
  async getFichasByProgram() {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/dashboard/fichas/program`);
    // return await response.json();
    
    return Promise.resolve(fichasByProgram);
  },

  /**
   * Obtener todos los datos del dashboard en una sola llamada
   * @returns {Promise<Object>} Todos los datos del dashboard
   */
  async getDashboardData() {
    // TODO: Conectar con backend (endpoint consolidado)
    // const response = await fetch(`${API_BASE_URL}/dashboard/all`);
    // return await response.json();
    
    const [kpis, instructorsContract, instructorsGender, apprenticesStatus, apprenticesProgram, fichas] = await Promise.all([
      this.getSubdirectorKPIs(),
      this.getInstructorsByContract(),
      this.getInstructorsByGender(),
      this.getApprenticesByStatus(),
      this.getApprenticesByProgram(),
      this.getFichasByProgram(),
    ]);

    return {
      kpis,
      instructorsContract,
      instructorsGender,
      apprenticesStatus,
      apprenticesProgram,
      fichas,
    };
  },
};

export default DashboardService;