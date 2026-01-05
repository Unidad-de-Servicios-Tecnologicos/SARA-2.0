/**
 * Servicio para gestión de fichas
 * TODO: Reemplazar llamadas mock con API real cuando el backend esté disponible
 */

import {
  mockFichas,
  mockProgramas,
  mockSedes,
  mockCentros,
  mockAprendices,
  mockRAPs,
  mockNovedades,
  mockKPIs,
  mockEstadosFicha,
  mockJornadas,
  mockModalidades,
  mockFases,
  mockNiveles,
  mockTrimestres,
  mockTiposVinculacion,
  mockRolesInstructor,
  mockEstadosEtapaProductiva,
  mockTiposEtapaProductiva,
  mockEstadosAprendiz,
  mockInstructores,
} from "../mock/records.mock";

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Base URL del API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Helper para hacer peticiones HTTP
 */
export async function ApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

export const RecordsService = {
  // ==========================================
  // FICHAS
  // ==========================================

  /**
   * Obtener lista de fichas con filtros opcionales
   */
  async getFichas(filters = {}) {
    // TODO: Conectar con backend
    // return await ApiRequest('/records/fichas', { params: filters });
    
    await delay(300);
    
    let result = [...mockFichas];
    
    // Filtrar por estado
    if (filters.estado) {
      result = result.filter(f => f.estado === filters.estado);
    }
    
    // Filtrar por programa
    if (filters.programaId) {
      result = result.filter(f => f.programa.id === filters.programaId);
    }
    
    // Filtrar por sede
    if (filters.sedeId) {
      result = result.filter(f => f.sede.id === filters.sedeId);
    }
    
    // Filtrar por jornada
    if (filters.jornada) {
      result = result.filter(f => f.jornada === filters.jornada);
    }
    
    // Filtrar por fase
    if (filters.fase) {
      result = result.filter(f => f.fase === filters.fase);
    }
    
    // Búsqueda por texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(f => 
        f.numero.includes(filters.search) ||
        f.programa.nombre.toLowerCase().includes(searchLower) ||
        f.instructorTitular?.nombre.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  },

  /**
   * Obtener detalle de una ficha por ID
   */
  async getFichaById(id) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${id}`);
    
    await delay(200);
    
    const ficha = mockFichas.find(f => f.id === parseInt(id) || f.numero === id);
    if (!ficha) {
      throw new Error("Ficha no encontrada");
    }
    return ficha;
  },

  /**
   * Obtener ficha por número
   */
  async getFichaByNumero(numero) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/numero/${numero}`);
    
    await delay(200);
    
    const ficha = mockFichas.find(f => f.numero === numero);
    if (!ficha) {
      throw new Error("Ficha no encontrada");
    }
    return ficha;
  },

  /**
   * Crear nueva ficha
   */
  async createFicha(data) {
    // TODO: Conectar con backend
    // return await ApiRequest('/records/fichas', { method: 'POST', body: JSON.stringify(data) });
    
    await delay(400);
    console.log("Creando ficha:", data);
    
    return {
      success: true,
      message: "Ficha creada exitosamente",
      data: { id: Date.now(), ...data }
    };
  },

  /**
   * Actualizar ficha
   */
  async updateFicha(id, data) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    
    await delay(400);
    console.log("Actualizando ficha:", id, data);
    
    return {
      success: true,
      message: "Ficha actualizada exitosamente",
      data: { id, ...data }
    };
  },

  /**
   * Cambiar estado de ficha
   */
  async cambiarEstadoFicha(id, nuevoEstado, observaciones = "") {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${id}/estado`, { method: 'PATCH', body: JSON.stringify({ estado: nuevoEstado, observaciones }) });
    
    await delay(300);
    console.log("Cambiando estado de ficha:", id, nuevoEstado, observaciones);
    
    return {
      success: true,
      message: `Estado cambiado a ${nuevoEstado}`,
    };
  },

  // ==========================================
  // APRENDICES DE FICHA
  // ==========================================

  /**
   * Obtener aprendices de una ficha
   */
  async getAprendicesByFicha(fichaId) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/aprendices`);
    
    await delay(300);
    console.debug(`Obteniendo aprendices de ficha: ${fichaId}`);
    return mockAprendices;
  },

  /**
   * Agregar aprendiz a ficha
   */
  async addAprendizToFicha(fichaId, aprendizData) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/aprendices`, { method: 'POST', body: JSON.stringify(aprendizData) });
    
    await delay(300);
    console.log("Agregando aprendiz a ficha:", fichaId, aprendizData);
    
    return {
      success: true,
      message: "Aprendiz agregado exitosamente",
    };
  },

  /**
   * Actualizar estado de aprendiz en ficha
   */
  async updateAprendizEstado(fichaId, aprendizId, nuevoEstado, motivo = "") {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/aprendices/${aprendizId}/estado`, { method: 'PATCH', body: JSON.stringify({ estado: nuevoEstado, motivo }) });
    
    await delay(300);
    console.log("Actualizando estado de aprendiz:", fichaId, aprendizId, nuevoEstado, motivo);
    
    return {
      success: true,
      message: `Estado del aprendiz actualizado a ${nuevoEstado}`,
    };
  },

  // ==========================================
  // RAPs Y AVANCE
  // ==========================================

  /**
   * Obtener RAPs de una ficha
   */
  async getRAPsByFicha(fichaId) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/raps`);
    
    await delay(200);
    console.log("Consultando RAPs de ficha:", fichaId);
    return mockRAPs;
  },

  /**
   * Actualizar avance de RAP
   */
  async updateRAPAvance(fichaId, rapId, horasEjecutadas) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/raps/${rapId}`, { method: 'PATCH', body: JSON.stringify({ horasEjecutadas }) });
    
    await delay(300);
    console.log("Actualizando avance de RAP:", fichaId, rapId, horasEjecutadas);
    
    return {
      success: true,
      message: "Avance actualizado",
    };
  },

  // ==========================================
  // NOVEDADES
  // ==========================================

  /**
   * Obtener novedades de una ficha
   */
  async getNovedadesByFicha(fichaId) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/novedades`);
    
    await delay(200);
    console.log("Consultando novedades de ficha:", fichaId);
    return mockNovedades;
  },

  /**
   * Registrar novedad en ficha
   */
  async registrarNovedad(fichaId, novedadData) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/novedades`, { method: 'POST', body: JSON.stringify(novedadData) });
    
    await delay(300);
    console.log("Registrando novedad:", fichaId, novedadData);
    
    return {
      success: true,
      message: "Novedad registrada",
      data: { id: Date.now(), ...novedadData }
    };
  },

  // ==========================================
  // CATÁLOGOS
  // ==========================================

  /**
   * Obtener programas de formación
   */
  async getProgramas() {
    // TODO: Conectar con backend
    // return await ApiRequest('/records/programas');
    
    await delay(100);
    return mockProgramas;
  },

  /**
   * Obtener sedes
   */
  async getSedes() {
    // TODO: Conectar con backend
    // return await ApiRequest('/records/sedes');
    
    await delay(100);
    return mockSedes;
  },

  /**
   * Obtener estados de ficha
   */
  async getEstadosFicha() {
    return mockEstadosFicha;
  },

  /**
   * Obtener jornadas
   */
  async getJornadas() {
    return mockJornadas;
  },

  /**
   * Obtener modalidades
   */
  async getModalidades() {
    return mockModalidades;
  },

  /**
   * Obtener fases
   */
  async getFases() {
    return mockFases;
  },

  /**
   * Obtener niveles
   */
  async getNiveles() {
    return mockNiveles;
  },

  /**
   * Obtener centros de formación
   */
  async getCentros() {
    return mockCentros;
  },

  /**
   * Obtener trimestres
   */
  async getTrimestres() {
    return mockTrimestres;
  },

  /**
   * Obtener tipos de vinculación de instructores
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
   * Obtener estados de etapa productiva
   */
  async getEstadosEtapaProductiva() {
    return mockEstadosEtapaProductiva;
  },

  /**
   * Obtener tipos de etapa productiva
   */
  async getTiposEtapaProductiva() {
    return mockTiposEtapaProductiva;
  },

  /**
   * Obtener estados de aprendiz
   */
  async getEstadosAprendiz() {
    return mockEstadosAprendiz;
  },

  /**
   * Obtener lista de instructores
   */
  async getInstructores() {
    return mockInstructores;
  },

  // ==========================================
  // KPIs Y ESTADÍSTICAS
  // ==========================================

  /**
   * Obtener KPIs generales de fichas
   */
  async getKPIs() {
    // TODO: Conectar con backend
    // return await ApiRequest('/records/kpis');
    
    await delay(200);
    return mockKPIs;
  },

  /**
   * Obtener estadísticas de una ficha específica
   */
  async getFichaStats(fichaId) {
    // TODO: Conectar con backend
    // return await ApiRequest(`/records/fichas/${fichaId}/stats`);
    
    await delay(200);
    
    const ficha = mockFichas.find(f => f.id === parseInt(fichaId));
    if (!ficha) {
      throw new Error("Ficha no encontrada");
    }
    
    return {
      aprendicesActivos: ficha.aprendicesActivos,
      aprendicesDesertados: ficha.aprendicesDesertados,
      tasaDesercion: ((ficha.aprendicesDesertados / ficha.aprendicesTotal) * 100).toFixed(1),
      avanceHoras: ((ficha.horasEjecutadas / ficha.horasProgramadas) * 100).toFixed(1),
      avanceRAPs: ficha.avanceRAPs,
    };
  },

  // ==========================================
  // EXPORTACIÓN
  // ==========================================

  /**
   * Exportar lista de fichas
   */
  async exportFichas(format = "excel") {
    const { ExportService } = await import("@/features/instructors/services/ExportService");
    
    // Obtener fichas (simuladas para este ejemplo)
    const fichas = mockFichas || [];
    const filename = `fichas-${new Date().toISOString().split('T')[0]}`;
    
    switch(format) {
      case "csv":
        ExportService._downloadCSV(this._generateFichasCSV(fichas), `${filename}.csv`);
        break;
      case "excel":
        await ExportService.exportFichasExcel(fichas, filename);
        break;
      case "pdf":
        await ExportService.exportFichasPDF(fichas, filename);
        break;
      default:
        throw new Error("Formato no soportado");
    }
    
    return {
      success: true,
      message: `Fichas exportadas a ${format.toUpperCase()}`,
    };
  },

  /**
   * Exportar detalle de ficha
   */
  async exportFichaDetail(ficha, format = "pdf") {
    const { ExportService } = await import("@/features/instructors/services/ExportService");
    const filename = `ficha-${ficha?.codigo || 'detail'}-${new Date().toISOString().split('T')[0]}`;
    
    switch(format) {
      case "csv":
        ExportService._downloadCSV(this._generateFichaDetailCSV(ficha), `${filename}.csv`);
        break;
      case "excel":
        await ExportService.exportFichaDetailExcel(ficha, filename);
        break;
      case "pdf":
        await ExportService.exportFichaDetailPDF(ficha, filename);
        break;
      default:
        throw new Error("Formato no soportado");
    }
    
    return {
      success: true,
      message: `Ficha exportada a ${format.toUpperCase()}`,
    };
  },

  /**
   * Generar CSV de lista de fichas
   */
  _generateFichasCSV(fichas) {
    const headers = ['Código', 'Nombre', 'Instructor', 'Aprendices', 'Estado', 'Inicio', 'Cierre'];
    const rows = [
      headers.join(';'),
      ...(fichas || []).map(ficha => {
        const values = [
          ficha.codigo || 'N/A',
          ficha.nombre || 'N/A',
          ficha.instructor?.nombre || 'N/A',
          (ficha.aprendices?.length || 0).toString(),
          ficha.estado || 'N/A',
          ficha.fechaInicio || 'N/A',
          ficha.fechaCierre || 'N/A'
        ];
        
        return values.map(v => {
          const val = v.toString().trim();
          return val.includes(';') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(';');
      })
    ];
    return rows.join('\r\n');
  },

  /**
   * Generar CSV de detalle de ficha
   */
  _generateFichaDetailCSV(ficha) {
    const formatValue = (v) => {
      const val = v.toString().trim();
      return val.includes(';') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
    };

    const rows = [
      ['Campo', 'Valor'].join(';'),
      ['Código', formatValue(ficha?.codigo || 'N/A')].join(';'),
      ['Nombre', formatValue(ficha?.nombre || 'N/A')].join(';'),
      ['Instructor', formatValue(ficha?.instructor?.nombre || 'N/A')].join(';'),
      ['Aprendices', formatValue((ficha?.aprendices?.length || 0).toString())].join(';'),
      ['Estado', formatValue(ficha?.estado || 'N/A')].join(';'),
      ['Inicio', formatValue(ficha?.fechaInicio || 'N/A')].join(';'),
      ['Cierre', formatValue(ficha?.fechaCierre || 'N/A')].join(';'),
    ];
    return rows.join('\r\n');
  },
};

export default RecordsService;
