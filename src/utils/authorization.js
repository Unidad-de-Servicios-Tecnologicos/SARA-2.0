/**
 * ========================================
 * FUNCIONES DE AUTORIZACIÓN - can()
 * ========================================
 * 
 * Esta es la función ÚNICA que determina
 * qué puede hacer un usuario en la aplicación.
 * 
 * Se usa en toda la UI para mostrar/ocultar elementos.
 * Cuando el backend valida, esta función sigue igual.
 */

import { PERMISSION_MATRIX } from "@/config/permissions";

/**
 * Verifica si un rol puede acceder a un módulo
 * 
 * @param {string} role - El rol del usuario (ADMINISTRADOR, APRENDIZ, etc)
 * @param {string} module - El módulo a verificar (dashboard, configuracion, etc)
 * @returns {boolean} true si puede acceder, false si no
 * 
 * @example
 * if (canAccess("APRENDIZ", "configuracion")) {
 *   // Mostrar configuración
 * }
 */
export const canAccess = (role, module) => {
  if (!role || !module) return false;
  return PERMISSION_MATRIX[role]?.[module] === true || false;
};

/**
 * Obtiene lista de módulos accesibles para un rol
 * 
 * @param {string} role - El rol del usuario
 * @returns {array} Array con nombres de módulos accesibles
 * 
 * @example
 * const modules = getAccessibleModules("INSTRUCTOR");
 * // ["dashboard", "instructores", "aprendices", "fichas", ...]
 */
export const getAccessibleModules = (role) => {
  if (!role || !PERMISSION_MATRIX[role]) return [];
  return Object.keys(PERMISSION_MATRIX[role]).filter(
    (module) => PERMISSION_MATRIX[role][module] === true
  );
};

/**
 * Cuenta cuántos módulos puede acceder un rol
 * 
 * @param {string} role - El rol del usuario
 * @returns {number} Cantidad de módulos accesibles
 * 
 * @example
 * const count = countAccessibleModules("APRENDIZ"); // 8
 */
export const countAccessibleModules = (role) => {
  return getAccessibleModules(role).length;
};

/**
 * Verifica si un rol es de tipo admin/coordinador (roles altos)
 * 
 * @param {string} role - El rol del usuario
 * @returns {boolean} true si es admin-like
 */
export const isAdminRole = (role) => {
  return ["ADMINISTRADOR", "COORDINADOR"].includes(role);
};

/**
 * Verifica si un rol es académico (instructor, coordinador, admin)
 * 
 * @param {string} role - El rol del usuario
 * @returns {boolean} true si es académico
 */
export const isAcademicRole = (role) => {
  return ["ADMINISTRADOR", "COORDINADOR", "INSTRUCTOR"].includes(role);
};

/**
 * Verifica si un rol es solo lectura (invitado, aprendiz con restricciones)
 * 
 * @param {string} role - El rol del usuario
 * @returns {boolean} true si es solo lectura
 */
export const isReadOnlyRole = (role) => {
  return role === "INVITADO";
};
