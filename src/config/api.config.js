/**
 * ========================================
 * CONFIGURACIÓN DE API
 * ========================================
 * 
 * Archivo centralizado para configuración de conexión con el backend.
 * 
 * INSTRUCCIONES DE USO:
 * 1. En desarrollo: Los valores por defecto usan datos mock
 * 2. En producción: Configurar las variables de entorno en .env
 * 
 * Variables de entorno requeridas (.env):
 * - VITE_API_URL: URL base del API (ej: https://api.sara.sena.edu.co)
 * - VITE_API_TIMEOUT: Timeout en ms (default: 30000)
 * - VITE_USE_MOCK: "true" para usar datos mock, "false" para API real
 */

// ========================================
// CONFIGURACIÓN BASE
// ========================================

export const API_CONFIG = {
  // URL base del API
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  
  // Timeout para peticiones (30 segundos por defecto)
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
  
  // Usar datos mock en desarrollo
  useMock: import.meta.env.VITE_USE_MOCK !== "false",
  
  // Versión del API
  version: "v1",
};

// ========================================
// ENDPOINTS
// ========================================

export const ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Dashboard
  DASHBOARD: {
    KPIS: "/dashboard/kpis",
    INSTRUCTORS_CONTRACT: "/dashboard/instructors/contract",
    INSTRUCTORS_GENDER: "/dashboard/instructors/gender",
    APPRENTICES_STATUS: "/dashboard/apprentices/status",
    APPRENTICES_PROGRAM: "/dashboard/apprentices/program",
    FICHAS_PROGRAM: "/dashboard/fichas/program",
    ALL: "/dashboard/all",
  },

  // Horarios
  SCHEDULES: {
    // Instructores
    INSTRUCTORS: "/schedules/instructors",
    INSTRUCTOR_SCHEDULE: (id) => `/schedules/instructors/${id}/schedule`,
    INSTRUCTOR_RAPS: (id) => `/schedules/instructors/${id}/raps`,
    
    // Fichas
    FICHAS: "/schedules/fichas",
    FICHA_SCHEDULE: (numero) => `/schedules/fichas/${numero}/schedule`,
    FICHA_RAPS: (numero) => `/schedules/fichas/${numero}/raps`,
    FICHA_RENDIMIENTO: (numero) => `/schedules/fichas/${numero}/rendimiento`,
    FICHA_REGISTRAR: "/schedules/fichas/registrar",
    FICHA_ASIGNAR_TITULAR: "/schedules/fichas/asignar-titular",
    FICHA_ENTREGA: "/schedules/fichas/entrega",
    
    // Ambientes
    SEDES: "/schedules/sedes",
    AMBIENTES_BY_SEDE: (sedeId) => `/schedules/sedes/${sedeId}/ambientes`,
    AMBIENTE_SCHEDULE: (sede, numero) => `/schedules/ambientes/${sede}/${numero}/schedule`,
    
    // Palabras clave
    PALABRA_CLAVE_FICHA: "/schedules/palabras-clave/ficha",
    PALABRA_CLAVE_INSTRUCTOR: "/schedules/palabras-clave/instructor",
    
    // Periodos e Itinerarios
    PERIODOS: "/schedules/periodos",
    ITINERARIOS: "/schedules/itinerarios",
    
    // Calendarios
    ALL_INSTRUCTOR_CALENDARS: "/schedules/calendars/instructors",
    ALL_FICHA_CALENDARS: "/schedules/calendars/fichas",
    
    // Plan de trabajo
    PLAN_TRABAJO: "/schedules/plan-trabajo",
    
    // Exportación
    EXPORT_EXCEL: (tipo, id) => `/schedules/export/excel?tipo=${tipo}&id=${id}`,
    EXPORT_APRENDICES: (ficha) => `/schedules/fichas/${ficha}/aprendices/export`,
  },

  // Fichas (Gestión completa - próximo módulo)
  FICHAS: {
    LIST: "/fichas",
    BY_ID: (id) => `/fichas/${id}`,
    APRENDICES: (id) => `/fichas/${id}/aprendices`,
    RENDIMIENTO: (id) => `/fichas/${id}/rendimiento`,
  },

  // Asistencia (próximo módulo)
  ATTENDANCE: {
    BY_FICHA: (ficha) => `/attendance/ficha/${ficha}`,
    REGISTER: "/attendance/register",
    HISTORY: (ficha) => `/attendance/ficha/${ficha}/history`,
  },

  // Prácticas (próximo módulo)
  PRACTICES: {
    DASHBOARD: "/practices/dashboard",
    INDUCCIONES: "/practices/inducciones",
    APRENDICES: "/practices/aprendices",
    INSTRUCTORES: "/practices/instructores",
    EMPRESAS: "/practices/empresas",
    FICHAS: "/practices/fichas",
  },
};

// ========================================
// HELPER PARA CONSTRUIR URLs
// ========================================

/**
 * Construir URL completa del API
 * @param {string} endpoint - Endpoint del API
 * @returns {string} URL completa
 */
export function buildApiUrl(endpoint) {
  const base = API_CONFIG.baseURL.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

// ========================================
// HELPER PARA PETICIONES HTTP
// ========================================

/**
 * Cliente HTTP para peticiones al API
 * Incluye manejo de autenticación y errores
 */
export async function apiClient(endpoint, options = {}) {
  const url = buildApiUrl(endpoint);
  
  // Obtener token de autenticación
  const token = getAuthToken();
  
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    // Manejar errores HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Error ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Retornar JSON o texto según el content-type
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === "AbortError") {
      throw new ApiError("La petición ha excedido el tiempo de espera", 408);
    }
    
    throw error;
  }
}

// ========================================
// CLASE DE ERROR PERSONALIZADA
// ========================================

export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ========================================
// HELPER PARA OBTENER TOKEN
// ========================================

function getAuthToken() {
  try {
    const userData = localStorage.getItem("sara_user");
    if (userData) {
      const user = JSON.parse(userData);
      return user.token || null;
    }
  } catch {
    return null;
  }
  return null;
}

// ========================================
// MÉTODOS ABREVIADOS
// ========================================

export const api = {
  get: (endpoint, options = {}) => 
    apiClient(endpoint, { ...options, method: "GET" }),
    
  post: (endpoint, data, options = {}) => 
    apiClient(endpoint, { 
      ...options, 
      method: "POST", 
      body: JSON.stringify(data) 
    }),
    
  put: (endpoint, data, options = {}) => 
    apiClient(endpoint, { 
      ...options, 
      method: "PUT", 
      body: JSON.stringify(data) 
    }),
    
  patch: (endpoint, data, options = {}) => 
    apiClient(endpoint, { 
      ...options, 
      method: "PATCH", 
      body: JSON.stringify(data) 
    }),
    
  delete: (endpoint, options = {}) => 
    apiClient(endpoint, { ...options, method: "DELETE" }),
};

export default API_CONFIG;
