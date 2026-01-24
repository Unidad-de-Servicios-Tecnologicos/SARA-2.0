/**
 * ========================================
 * MATRIZ DE PERMISOS - SARA 2.0
 * ========================================
 * Basada en especificación oficial del sistema
 * Define los roles y módulos accesibles
 */

// ========================================
// DEFINICIÓN DE ROLES
// ========================================
export const ROLES = {
  ADMINISTRADOR: "ADMINISTRADOR",
  COORDINADOR: "COORDINADOR",
  INSTRUCTOR: "INSTRUCTOR",
  APRENDIZ: "APRENDIZ",
  EMPRESA: "EMPRESA",
  INVITADO: "INVITADO",
};

// ========================================
// MATRIZ DE ACCESO: ROL → MÓDULOS VISIBLES
// ========================================
export const PERMISSION_MATRIX = {
  // ==========================================
  // 🥇 ADMINISTRADOR - Acceso total a TODOS los módulos
  // ==========================================
  ADMINISTRADOR: {
    dashboard: true,
    configuracion: true,
    instructores: true,
    aprendices: true,
    fichas: true,
    horarios: true,
    asistencia: true,
    practicas: true,
    empresas: true,
    documentos: true,
    reservas: true,
    ambientes: true,
    seguimiento: true,
    analytics: true,
  },

  // ==========================================
  // 🥈 COORDINADOR ACADÉMICO - Supervisión académica
  // ==========================================
  COORDINADOR: {
    dashboard: true,
    configuracion: true,           // ✅ Ver / ajustes limitados
    instructores: true,            // ✅ Ver cargas
    aprendices: true,              // ✅ Ajustar
    fichas: true,                  // ✅ Supervisar
    horarios: true,                // ✅ Ver
    asistencia: true,              // ✅ Ver
    practicas: true,               // ✅ Validar
    empresas: false,               // ❌
    documentos: true,              // ✅ Ver
    reservas: false,               // ❌
    ambientes: true,               // ✅ Ver
    seguimiento: true,             // ✅ Ver
    analytics: true,               // ✅ Ver / exportar
  },

  // ==========================================
  // 🥉 INSTRUCTOR - Procesos formativos asignados
  // ==========================================
  INSTRUCTOR: {
    dashboard: true,               // ✅ Ver perfil
    configuracion: false,          // ❌
    instructores: true,            // ✅ Ver su carga
    aprendices: true,              // ✅ Ver asignados
    fichas: true,                  // ✅ Ver asignadas
    horarios: true,                // ✅ Ver eventos
    asistencia: true,              // ✅ Registrar
    practicas: true,               // ✅ Registrar y actualizar
    empresas: false,               // ❌
    documentos: true,              // ✅ Crear y calificar
    reservas: true,                // ✅ Ver / crear propias
    ambientes: true,               // ✅ Ver
    seguimiento: false,            // ❌
    analytics: false,              // ❌
  },

  // ==========================================
  // 🧑‍🎓 APRENDIZ - Consulta y seguimiento personal
  // ==========================================
  APRENDIZ: {
    dashboard: true,               // ✅ Ver perfil
    configuracion: false,          // ❌
    instructores: true,            // ✅ Ver directorio
    aprendices: true,              // ✅ Ver perfil
    fichas: true,                  // ✅ Ver inscritos
    horarios: true,                // ✅ Ver calendario
    asistencia: true,              // ✅ Ver estado
    practicas: true,               // ✅ Ver estado
    empresas: false,               // ❌
    documentos: true,              // ✅ Subir evidencias
    reservas: true,                // ✅ Ver / crear
    ambientes: true,               // ✅ Ver
    seguimiento: false,            // ❌
    analytics: false,              // ❌
  },

  // ==========================================
  // 🏢 EMPRESA / TUTOR EXTERNO - Prácticas asignadas
  // ==========================================
  EMPRESA: {
    dashboard: false,              // ❌
    configuracion: false,          // ❌
    instructores: false,           // ❌
    aprendices: true,              // ✅ Ver aprendices en práctica
    fichas: false,                 // ❌
    horarios: false,               // ❌
    asistencia: false,             // ❌
    practicas: true,               // ✅ Validar prácticas
    empresas: true,                // ✅ Ver perfil
    documentos: true,              // ✅ Subir informes
    reservas: false,               // ❌
    ambientes: false,              // ❌
    seguimiento: true,             // ✅ Ver reportes
    analytics: false,              // ❌
  },

  // ==========================================
  // 👀 INVITADO / CONSULTA - Solo lectura pública
  // ==========================================
  INVITADO: {
    dashboard: true,               // ✅ Ver público
    configuracion: false,          // ❌
    instructores: true,            // ✅ Ver directorio
    aprendices: false,             // ❌
    fichas: false,                 // ❌
    horarios: false,               // ❌
    asistencia: false,             // ❌
    practicas: false,              // ❌
    empresas: true,                // ✅ Ver información
    documentos: false,             // ❌
    reservas: false,               // ❌
    ambientes: true,               // ✅ Ver espacios
    seguimiento: false,            // ❌
    analytics: false,              // ❌
  },
};

// ========================================
// METADATA DE ROLES - Para UI
// ========================================
export const ROLE_METADATA = {
  ADMINISTRADOR: {
    label: "Administrador del Sistema",
    description: "Gestión total del sistema (técnico y funcional)",
    color: "red",
    badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    icon: "🔴",
  },
  COORDINADOR: {
    label: "Coordinador Académico",
    description: "Supervisión y control académico",
    color: "blue",
    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    icon: "🔵",
  },
  INSTRUCTOR: {
    label: "Instructor",
    description: "Ejecución de procesos formativos",
    color: "green",
    badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    icon: "🟢",
  },
  APRENDIZ: {
    label: "Aprendiz",
    description: "Consulta y seguimiento personal",
    color: "yellow",
    badge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    icon: "🟡",
  },
  EMPRESA: {
    label: "Empresa/Tutor Externo",
    description: "Seguimiento de prácticas formativas",
    color: "purple",
    badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    icon: "🟣",
  },
  INVITADO: {
    label: "Invitado",
    description: "Consulta pública o institucional",
    color: "gray",
    badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    icon: "⚪",
  },
};

// ========================================
// MAPEO MÓDULO → NOMBRE Y DESCRIPCIÓN
// ========================================
export const MODULE_INFO = {
  dashboard: { label: "Dashboard", icon: "📊" },
  configuracion: { label: "Configuración", icon: "⚙️" },
  instructores: { label: "Instructores", icon: "👨‍🏫" },
  aprendices: { label: "Aprendices", icon: "👨‍🎓" },
  fichas: { label: "Fichas", icon: "📋" },
  horarios: { label: "Horarios", icon: "📅" },
  asistencia: { label: "Asistencia", icon: "✅" },
  practicas: { label: "Prácticas", icon: "💼" },
  empresas: { label: "Empresas", icon: "🏢" },
  documentos: { label: "Documentos", icon: "📄" },
  reservas: { label: "Reservas", icon: "🎫" },
  ambientes: { label: "Ambientes", icon: "🏛️" },
  seguimiento: { label: "Seguimiento", icon: "📈" },
  analytics: { label: "Análisis", icon: "📊" },
};

// ========================================
// FUNCIONES AUXILIARES
// ========================================

export const getAccessibleModules = (role) => {
  const modules = PERMISSION_MATRIX[role] || {};
  return Object.keys(modules).filter((module) => modules[module] === true);
};

export const canAccessModule = (role, module) => {
  return PERMISSION_MATRIX[role]?.[module] === true || false;
};

export const getModuleLabel = (module) => {
  return MODULE_INFO[module]?.label || module;
};

export const getModuleIcon = (module) => {
  return MODULE_INFO[module]?.icon || "📦";
};
