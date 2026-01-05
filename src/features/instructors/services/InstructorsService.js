/**
 * Servicio para gestión de instructores
 * TODO: Reemplazar llamadas mock con API real cuando el backend esté disponible
 */

import {
  mockInstructores,
  mockInstructoresKPIs,
  mockTiposVinculacion,
  mockRolesInstructor,
  mockEstadosInstructor,
  mockAreasFormacion,
  mockSedes,
  mockNovedadesInstructor,
  mockHistorialAsignaciones,
} from "../mock/instructors.mock";

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// TODO: Descomentar cuando el backend esté disponible
// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
// async function apiRequest(endpoint, options = {}) {
//   const url = `${API_BASE_URL}${endpoint}`;
//   const response = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
//   if (!response.ok) throw new Error(`Error ${response.status}`);
//   return response.json();
// }

export const InstructorsService = {
  // ==========================================
  // INSTRUCTORES
  // ==========================================

  /**
   * Obtener lista de instructores con filtros opcionales
   */
  async getInstructores(filters = {}) {
    // TODO: Conectar con backend
    // return await apiRequest('/instructors', { params: filters });
    
    await delay(300);
    
    let result = [...mockInstructores];
    
    // Filtrar por estado
    if (filters.estado) {
      result = result.filter(i => i.estado === filters.estado);
    }
    
    // Filtrar por tipo de vinculación
    if (filters.tipoVinculacion) {
      result = result.filter(i => i.tipoVinculacion === filters.tipoVinculacion);
    }
    
    // Filtrar por rol
    if (filters.rol) {
      result = result.filter(i => i.rol === filters.rol);
    }
    
    // Filtrar por área
    if (filters.areaId) {
      result = result.filter(i => i.area.id === parseInt(filters.areaId));
    }
    
    // Filtrar por sede
    if (filters.sedeId) {
      result = result.filter(i => i.sede.id === parseInt(filters.sedeId));
    }
    
    // Búsqueda por texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(i => 
        i.nombre.toLowerCase().includes(searchLower) ||
        i.apellidos.toLowerCase().includes(searchLower) ||
        i.documento.includes(filters.search) ||
        i.email.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  },

  /**
   * Obtener detalle de un instructor por ID
   */
  async getInstructorById(id) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${id}`);
    
    await delay(200);
    
    const instructor = mockInstructores.find(i => i.id === parseInt(id));
    if (!instructor) {
      throw new Error("Instructor no encontrado");
    }
    return instructor;
  },

  /**
   * Crear nuevo instructor
   */
  async createInstructor(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/instructors', { method: 'POST', body: JSON.stringify(data) });
    
    await delay(400);
    console.log("Creando instructor:", data);
    
    return {
      success: true,
      message: "Instructor creado exitosamente",
      data: { id: Date.now(), ...data }
    };
  },

  /**
   * Actualizar instructor
   */
  async updateInstructor(id, data) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    
    await delay(400);
    console.log("Actualizando instructor:", id, data);
    
    return {
      success: true,
      message: "Instructor actualizado exitosamente",
      data: { id, ...data }
    };
  },

  /**
   * Cambiar estado de instructor
   */
  async cambiarEstadoInstructor(id, nuevoEstado, observaciones = "") {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${id}/estado`, { method: 'PATCH', body: JSON.stringify({ estado: nuevoEstado, observaciones }) });

    await delay(300);
    // Actualizar el estado en el mock
    const idx = mockInstructores.findIndex(i => i.id === parseInt(id));
    if (idx !== -1) {
      mockInstructores[idx].estado = nuevoEstado;
    }
    console.log("Cambiando estado de instructor:", id, nuevoEstado, observaciones);
    return {
      success: true,
      message: `Estado cambiado a ${nuevoEstado}`,
    };
  },

  // ==========================================
  // ASIGNACIONES DE FICHAS
  // ==========================================

  /**
   * Obtener fichas asignadas a un instructor
   */
  async getFichasAsignadas(instructorId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/fichas`);
    
    await delay(200);
    
    const instructor = mockInstructores.find(i => i.id === parseInt(instructorId));
    return instructor?.fichasAsignadas || [];
  },

  /**
   * Asignar instructor a ficha
   */
  async asignarFicha(instructorId, fichaId, rol = "apoyo") {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/fichas`, { method: 'POST', body: JSON.stringify({ fichaId, rol }) });
    
    await delay(300);
    console.log("Asignando ficha:", instructorId, fichaId, rol);
    
    return {
      success: true,
      message: "Instructor asignado a ficha exitosamente",
    };
  },

  /**
   * Desasignar instructor de ficha
   */
  async desasignarFicha(instructorId, fichaId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/fichas/${fichaId}`, { method: 'DELETE' });
    
    await delay(300);
    console.log("Desasignando ficha:", instructorId, fichaId);
    
    return {
      success: true,
      message: "Instructor desasignado de ficha",
    };
  },

  // ==========================================
  // CARGA HORARIA
  // ==========================================

  /**
   * Obtener carga horaria de un instructor
   */
  async getCargaHoraria(instructorId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/carga-horaria`);
    
    await delay(200);
    
    const instructor = mockInstructores.find(i => i.id === parseInt(instructorId));
    return instructor?.cargaHoraria || { asignada: 0, disponible: 0, porcentajeOcupacion: 0 };
  },

  /**
   * Actualizar carga horaria
   */
  async updateCargaHoraria(instructorId, horasAsignadas) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/carga-horaria`, { method: 'PATCH', body: JSON.stringify({ horasAsignadas }) });
    
    await delay(300);
    console.log("Actualizando carga horaria:", instructorId, horasAsignadas);
    
    return {
      success: true,
      message: "Carga horaria actualizada",
    };
  },

  // ==========================================
  // NOVEDADES
  // ==========================================

  /**
   * Obtener novedades de un instructor
   */
  async getNovedadesInstructor(instructorId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/novedades`);
    
    await delay(200);
    
    return mockNovedadesInstructor.filter(n => n.instructorId === parseInt(instructorId));
  },

  /**
   * Registrar novedad
   */
  async registrarNovedad(instructorId, novedadData) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/novedades`, { method: 'POST', body: JSON.stringify(novedadData) });
    
    await delay(300);
    console.log("Registrando novedad:", instructorId, novedadData);
    
    return {
      success: true,
      message: "Novedad registrada",
      data: { id: Date.now(), ...novedadData }
    };
  },

  // ==========================================
  // HISTORIAL
  // ==========================================

  /**
   * Obtener historial de asignaciones
   */
  async getHistorialAsignaciones(instructorId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/historial`);
    
    await delay(200);
    
    return mockHistorialAsignaciones.filter(h => h.instructorId === parseInt(instructorId));
  },

  // ==========================================
  // CATÁLOGOS
  // ==========================================

  /**
   * Obtener tipos de vinculación
   */
  async getTiposVinculacion() {
    return mockTiposVinculacion;
  },

  /**
   * Obtener roles de instructor
   */
  async getRolesInstructor() {
    return mockRolesInstructor;
  },

  /**
   * Obtener estados de instructor
   */
  async getEstadosInstructor() {
    return mockEstadosInstructor;
  },

  /**
   * Obtener áreas de formación
   */
  async getAreasFormacion() {
    return mockAreasFormacion;
  },

  /**
   * Obtener sedes
   */
  async getSedes() {
    return mockSedes;
  },

  // ==========================================
  // KPIs Y ESTADÍSTICAS
  // ==========================================

  /**
   * Obtener KPIs generales de instructores
   */
  async getKPIs() {
    // TODO: Conectar con backend
    // return await apiRequest('/instructors/kpis');
    
    await delay(200);
    return mockInstructoresKPIs;
  },

  /**
   * Obtener estadísticas de un instructor específico
   */
  async getInstructorStats(instructorId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/stats`);
    
    await delay(200);
    
    const instructor = mockInstructores.find(i => i.id === parseInt(instructorId));
    if (!instructor) {
      throw new Error("Instructor no encontrado");
    }
    
    return {
      fichasAsignadas: instructor.fichasAsignadas.length,
      horasAsignadas: instructor.cargaHoraria.asignada,
      horasDisponibles: instructor.cargaHoraria.disponible,
      porcentajeOcupacion: instructor.cargaHoraria.porcentajeOcupacion,
      competencias: instructor.competencias.length,
    };
  },

  // ==========================================
  // EXPORTACIÓN
  // ==========================================

  /**
   * Exportar lista de instructores
   */
  async exportInstructores(format = "excel", filters = {}) {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/export?format=${format}`, { params: filters });
    
    await delay(500);
    console.log("Exportando instructores en formato:", format, "con filtros:", filters);
    
    return {
      success: true,
      message: `Exportación en ${format.toUpperCase()} generada`,
    };
  },

  /**
   * Exportar detalle de instructor
   */
  async exportInstructorDetail(instructorId, format = "pdf") {
    // TODO: Conectar con backend
    // return await apiRequest(`/instructors/${instructorId}/export?format=${format}`);
    
    await delay(500);
    console.log("Exportando detalle de instructor:", instructorId, "en formato:", format);
    
    return {
      success: true,
      message: `Reporte de instructor exportado en ${format.toUpperCase()}`,
    };
  },
};

export default InstructorsService;
