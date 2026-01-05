/**
 * ========================================
 * SERVICIO DE HORARIOS - SCHEDULES SERVICE
 * ========================================
 * 
 * Este servicio maneja todas las operaciones relacionadas con horarios.
 * Actualmente usa datos mock, pero está preparado para conectar con el backend.
 * 
 * INSTRUCCIONES PARA CONEXIÓN CON BACKEND:
 * 1. Descomentar las líneas de fetch en cada método
 * 2. Comentar o eliminar las líneas que retornan datos mock
 * 3. Configurar VITE_API_URL en el archivo .env
 */

import {
  mockInstructors,
  mockFichas,
  mockSedes,
  mockAmbientes,
  mockEvents,
  mockRAPs,
  mockPeriodos,
  mockItinerarios,
  mockRendimientoAcademico,
} from "../mock/schedules.mock.js";

// Base URL del API (configurar en .env para producción)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Helper para hacer peticiones HTTP
 * @param {string} endpoint - Endpoint del API
 * @param {Object} options - Opciones de fetch
 * @returns {Promise<any>} Respuesta del API
 */
export async function ApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      // TODO: Agregar token de autenticación cuando esté disponible
      // "Authorization": `Bearer ${getAuthToken()}`
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Servicio para gestión de horarios
 */
export const SchedulesService = {
  
  // ========================================
  // INSTRUCTORES
  // ========================================
  
  /**
   * Obtener lista de instructores
   * @param {Object} filters - Filtros opcionales (area, contrato, search)
   * @returns {Promise<Array>} Lista de instructores
   */
  async getInstructors(filters = {}) {
    // TODO: Conectar con backend
    // const queryParams = new URLSearchParams(filters).toString();
    // return await apiRequest(`/schedules/instructors?${queryParams}`);
    
    // Datos mock con filtrado local
    let instructors = [...mockInstructors];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      instructors = instructors.filter(i => 
        i.name.toLowerCase().includes(search) ||
        i.documento.includes(search)
      );
    }
    
    if (filters.area) {
      instructors = instructors.filter(i => i.area === filters.area);
    }
    
    return Promise.resolve(instructors);
  },

  /**
   * Obtener instructor por ID
   * @param {number|string} id - ID del instructor
   * @returns {Promise<Object>} Datos del instructor
   */
  async getInstructorById(id) {
    // TODO: Conectar con backend
    // return await apiRequest(`/schedules/instructors/${id}`);
    
    const instructor = mockInstructors.find(i => i.id === Number(id));
    return Promise.resolve(instructor || null);
  },

  /**
   * Obtener horario de un instructor
   * @param {number|string} instructorId - ID o documento del instructor
   * @param {string} periodo - Periodo académico (ej: "2024-4")
   * @returns {Promise<Object>} Horario con eventos y horas programadas
   */
  async getInstructorSchedule(instructorId, periodo = "2024-4") {
    // TODO: Conectar con backend
    // return await ApiRequest(`/schedules/instructors/${instructorId}/schedule?periodo=${periodo}`);
    console.log("Consultando periodo:", periodo);
    
    const instructor = mockInstructors.find(i => 
      i.id === Number(instructorId) || 
      i.name.toLowerCase().includes(String(instructorId).toLowerCase())
    );
    
    if (!instructor) return null;
    
    const events = mockEvents.filter(e => e.instructor === instructor.name);
    
    return Promise.resolve({
      instructor,
      events,
      horasProgramadas: {
        titulada: instructor.horasTitulada,
        complementaria: instructor.horasComplementaria,
        novedades: instructor.horasNovedades
      }
    });
  },

  // ========================================
  // FICHAS
  // ========================================

  /**
   * Obtener lista de fichas
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Array>} Lista de fichas
   */
  async getFichas(filters = {}) {
    // TODO: Conectar con backend
    // const queryParams = new URLSearchParams(filters).toString();
    // return await apiRequest(`/schedules/fichas?${queryParams}`);
    
    let fichas = [...mockFichas];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      fichas = fichas.filter(f => 
        f.numero.includes(search) ||
        f.programa.toLowerCase().includes(search)
      );
    }
    
    if (filters.estado) {
      fichas = fichas.filter(f => f.estado === filters.estado);
    }
    
    return Promise.resolve(fichas);
  },

  /**
   * Obtener ficha por número
   * @param {string} numero - Número de la ficha
   * @returns {Promise<Object>} Datos de la ficha
   */
  async getFichaByNumero(numero) {
    // TODO: Conectar con backend
    // return await apiRequest(`/schedules/fichas/${numero}`);
    
    const ficha = mockFichas.find(f => f.numero === numero);
    return Promise.resolve(ficha || null);
  },

  /**
   * Obtener horario de una ficha
   * @param {string} fichaNumero - Número de la ficha
   * @param {string} periodo - Periodo académico
   * @returns {Promise<Object>} Horario con eventos y horas
   */
  async getFichaSchedule(fichaNumero, periodo = "2024-4") {
    // TODO: Conectar con backend
    // return await ApiRequest(`/schedules/fichas/${fichaNumero}/schedule?periodo=${periodo}`);
    console.log("Consultando periodo:", periodo);
    
    const ficha = mockFichas.find(f => f.numero === fichaNumero);
    
    if (!ficha) return null;
    
    const events = mockEvents.filter(e => e.ficha === fichaNumero);
    
    return Promise.resolve({
      ficha,
      events,
      horasProgramadas: {
        titulada: ficha.horasTitulada,
        complementaria: ficha.horasComplementaria,
        novedades: ficha.horasNovedades
      }
    });
  },

  /**
   * Registrar una nueva ficha a un instructor
   * @param {Object} data - Datos de la ficha a registrar
   * @returns {Promise<Object>} Ficha registrada
   */
  async registrarFicha(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/fichas/registrar', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    
    console.log("Registrando ficha:", data);
    return Promise.resolve({ success: true, message: "Ficha registrada correctamente", data });
  },

  // ========================================
  // AMBIENTES
  // ========================================

  /**
   * Obtener lista de sedes
   * @returns {Promise<Array>} Lista de sedes
   */
  async getSedes() {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/sedes');
    
    return Promise.resolve(mockSedes);
  },

  /**
   * Obtener ambientes por sede
   * @param {string} sedeId - ID o nombre de la sede
   * @returns {Promise<Array>} Lista de ambientes
   */
  async getAmbientesBySede(sedeId) {
    // TODO: Conectar con backend
    // return await apiRequest(`/schedules/sedes/${sedeId}/ambientes`);
    
    const ambientes = mockAmbientes.filter(a => 
      a.sede === sedeId || a.sede.toLowerCase().includes(String(sedeId).toLowerCase())
    );
    return Promise.resolve(ambientes);
  },

  /**
   * Obtener horario de un ambiente
   * @param {string} sedeNombre - Nombre de la sede
   * @param {string} ambienteNumero - Número del ambiente
   * @returns {Promise<Object>} Horario del ambiente
   */
  async getAmbienteSchedule(sedeNombre, ambienteNumero) {
    // TODO: Conectar con backend
    // return await apiRequest(`/schedules/ambientes/${sedeNombre}/${ambienteNumero}/schedule`);
    
    const ambiente = mockAmbientes.find(a => 
      a.sede === sedeNombre && a.numero === ambienteNumero
    );
    
    if (!ambiente) return null;
    
    const events = mockEvents.filter(e => e.ambiente === ambienteNumero);
    
    return Promise.resolve({
      ambiente,
      events,
      horasProgramadas: ambiente.horasProgramadas
    });
  },

  // ========================================
  // RAPs (Resultados de Aprendizaje)
  // ========================================

  /**
   * Obtener RAPs por ficha
   * @param {string} fichaNumero - Número de la ficha
   * @returns {Promise<Array>} Lista de RAPs
   */
  async getRAPsByFicha(fichaNumero) {
    // TODO: Conectar con backend
    // return await apiRequest(`/schedules/fichas/${fichaNumero}/raps`);
    
    const raps = mockRAPs.filter(r => r.ficha === fichaNumero);
    return Promise.resolve(raps.length > 0 ? raps : mockRAPs);
  },

  /**
   * Obtener RAPs por instructor
   * @param {string} instructorId - ID del instructor
   * @returns {Promise<Array>} Lista de RAPs
   */
  async getRAPsByInstructor(instructorId) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/schedules/instructors/${instructorId}/raps`);
    console.log("Consultando RAPs del instructor:", instructorId);
    
    return Promise.resolve(mockRAPs);
  },

  // ========================================
  // PALABRAS CLAVE / ITINERARIOS
  // ========================================

  /**
   * Obtener lista de itinerarios
   * @returns {Promise<Array>} Lista de itinerarios
   */
  async getItinerarios() {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/itinerarios');
    
    return Promise.resolve(mockItinerarios);
  },

  /**
   * Activar palabra clave de ficha
   * @param {Object} data - { ficha, itinerario, fecha }
   * @returns {Promise<Object>} Resultado
   */
  async activarPalabraClaveFicha(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/palabras-clave/ficha', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    
    console.log("Activando palabra clave de ficha:", data);
    return Promise.resolve({ success: true, message: "Palabra clave activada", data });
  },

  /**
   * Activar palabra clave de instructor
   * @param {Object} data - { instructor, itinerario }
   * @returns {Promise<Object>} Resultado
   */
  async activarPalabraClaveInstructor(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/palabras-clave/instructor', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    
    console.log("Activando palabra clave de instructor:", data);
    return Promise.resolve({ success: true, message: "Palabra clave activada", data });
  },

  // ========================================
  // PERIODOS
  // ========================================

  /**
   * Obtener periodos académicos disponibles
   * @returns {Promise<Array>} Lista de periodos
   */
  async getPeriodos() {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/periodos');
    
    return Promise.resolve(mockPeriodos);
  },

  // ========================================
  // RENDIMIENTO ACADÉMICO
  // ========================================

  /**
   * Obtener rendimiento académico de una ficha
   * @param {string} fichaNumero - Número de la ficha
   * @returns {Promise<Object>} Datos de rendimiento
   */
  async getRendimientoAcademico(fichaNumero) {
    // TODO: Conectar con backend
    // return await apiRequest(`/schedules/fichas/${fichaNumero}/rendimiento`);
    
    return Promise.resolve({
      ...mockRendimientoAcademico,
      ficha: fichaNumero
    });
  },

  // ========================================
  // PLAN DE TRABAJO
  // ========================================

  /**
   * Guardar plan de trabajo
   * @param {Object} data - Datos del plan de trabajo
   * @returns {Promise<Object>} Resultado
   */
  async guardarPlanTrabajo(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/plan-trabajo', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    
    console.log("Guardando plan de trabajo:", data);
    return Promise.resolve({ success: true, message: "Plan de trabajo guardado", data });
  },

  // ========================================
  // ASIGNACIÓN DE TITULAR
  // ========================================

  /**
   * Asignar instructor titular a una ficha
   * @param {Object} data - { fichaNumero, instructorId }
   * @returns {Promise<Object>} Resultado
   */
  async asignarTitular(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/fichas/asignar-titular', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    
    console.log("Asignando titular:", data);
    return Promise.resolve({ success: true, message: "Titular asignado correctamente", data });
  },

  // ========================================
  // ENTREGA DE FICHA
  // ========================================

  /**
   * Registrar entrega de ficha
   * @param {Object} data - Datos de la entrega
   * @returns {Promise<Object>} Resultado
   */
  async registrarEntregaFicha(data) {
    // TODO: Conectar con backend
    // return await apiRequest('/schedules/fichas/entrega', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    
    console.log("Registrando entrega de ficha:", data);
    return Promise.resolve({ success: true, message: "Entrega registrada correctamente", data });
  },

  // ========================================
  // CALENDARIOS MÚLTIPLES
  // ========================================

  /**
   * Obtener todos los calendarios de instructores
   * @param {string} area - Área o coordinación (opcional)
   * @returns {Promise<Array>} Lista de calendarios
   */
  async getAllInstructorCalendars(area = null) {
    // TODO: Conectar con backend
    // const queryParams = area ? `?area=${area}` : '';
    // return await apiRequest(`/schedules/calendars/instructors${queryParams}`);
    
    const instructors = area 
      ? mockInstructors.filter(i => i.area.toLowerCase().includes(area.toLowerCase()))
      : mockInstructors;
    
    return Promise.resolve(instructors.map(i => ({
      instructor: i,
      horas: i.horasTitulada + i.horasComplementaria,
      events: mockEvents.filter(e => e.instructor === i.name)
    })));
  },

  /**
   * Obtener todos los calendarios de fichas
   * @param {string} area - Área o coordinación (opcional)
   * @returns {Promise<Array>} Lista de calendarios
   */
  async getAllFichaCalendars(area = null) {
    // TODO: Conectar con backend
    // const queryParams = area ? `?area=${area}` : '';
    // return await apiRequest(`/schedules/calendars/fichas${queryParams}`);
    
    const fichas = area 
      ? mockFichas.filter(f => f.programa.toLowerCase().includes(area.toLowerCase()))
      : mockFichas;
    
    return Promise.resolve(fichas.map(f => ({
      ficha: f,
      horas: f.horasTitulada + f.horasComplementaria,
      events: mockEvents.filter(e => e.ficha === f.numero)
    })));
  },

  // ========================================
  // EXPORTACIÓN
  // ========================================

  /**
   * Descargar horario en Excel
   * @param {string} tipo - 'instructor' | 'ficha' | 'ambiente'
   * @param {string} id - ID o número del elemento
   * @returns {Promise<Blob>} Archivo para descargar
   */
  async downloadScheduleExcel(tipo, id) {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/schedules/export/excel?tipo=${tipo}&id=${id}`);
    // return await response.blob();
    
    console.log(`Descargando horario Excel: ${tipo} - ${id}`);
    return Promise.resolve({ success: true, message: "Descarga iniciada" });
  },

  /**
   * Descargar lista de aprendices
   * @param {string} fichaNumero - Número de la ficha
   * @returns {Promise<Blob>} Archivo para descargar
   */
  async downloadListaAprendices(fichaNumero) {
    // TODO: Conectar con backend
    // const response = await fetch(`${API_BASE_URL}/schedules/fichas/${fichaNumero}/aprendices/export`);
    // return await response.blob();
    
    console.log(`Descargando lista de aprendices: ${fichaNumero}`);
    return Promise.resolve({ success: true, message: "Descarga iniciada" });
  },
};

export default SchedulesService;
