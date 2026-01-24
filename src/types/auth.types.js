/**
 * ========================================
 * AUTH TYPES - Contrato de Autenticación
 * ========================================
 * Define la estructura que el frontend SIEMPRE espera
 * 
 * 📌 HOY: Simulado con mocks
 * 📌 MAÑANA: Backend real
 * 📌 RESULTADO: Código sin cambios
 */

/**
 * @typedef {Object} AuthUser
 * @property {number} id - ID único del usuario
 * @property {string} email - Email del usuario
 * @property {string} name - Nombre completo
 * @property {string} avatar - URL del avatar (opcional)
 */

/**
 * @typedef {Object} AuthPayload
 * @property {AuthUser} user - Información del usuario
 * @property {string[]} roles - Array de roles: ["ADMIN"], ["COORDINADOR"], etc.
 * @property {string} token - JWT token para peticiones (opcional)
 * @property {number} expiresIn - Segundos hasta que expira el token (opcional)
 */

/**
 * Estructura que simularemos HOY
 * y que el backend entregará MAÑANA
 */
export const AUTH_CONTRACT = {
  user: {
    id: null,
    email: null,
    name: null,
    avatar: null,
  },
  roles: [],
  token: null,
  expiresIn: null,
};

/**
 * Roles disponibles en el sistema
 */
export const AVAILABLE_ROLES = [
  "ADMINISTRADOR",
  "COORDINADOR",
  "INSTRUCTOR",
  "APRENDIZ",
  "EMPRESA",
  "INVITADO",
];

/**
 * Validar que un payload cumple el contrato
 * @param {any} payload - Objeto a validar
 * @returns {boolean}
 */
export const isValidAuthPayload = (payload) => {
  if (!payload) return false;
  if (!payload.user) return false;
  if (!Array.isArray(payload.roles)) return false;
  if (!payload.user.id || !payload.user.email) return false;
  return true;
};
