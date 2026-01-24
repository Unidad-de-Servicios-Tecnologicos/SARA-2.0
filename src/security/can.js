/**
 * ========================================
 * FUNCIÓN can() - VERIFICADOR UNIVERSAL DE PERMISOS
 * ========================================
 * Función clave que verifica si un rol tiene permiso
 * para acceder a un módulo y acción específica.
 * 
 * 🎯 USO:
 *   if (can("ADMIN", "usuarios", "create")) { <Button /> }
 * 
 * 📌 Esta función NO cambia cuando llegue el backend
 */

import { PERMISSION_MATRIX } from "@/config/permissions";

/**
 * Verificar si un rol (o array de roles) puede hacer una acción en un módulo
 *
 * @param {string|string[]} roles - Role o array de roles del usuario
 * @param {string} module - Nombre del módulo (ej: "usuarios", "reportes")
 * @param {boolean} [strictMode=false] - Si true, requiere acceso explícito
 * @returns {boolean} true si tiene permiso
 *
 * @example
 * // Caso simple (un rol)
 * can("ADMIN", "usuarios") // → true
 *
 * @example
 * // Multi-rol (basta que uno tenga permiso)
 * can(["INSTRUCTOR", "COORDINADOR"], "fichas") // → true si CUALQUIERA tiene acceso
 *
 * @example
 * // Verificar acción específica
 * can("INSTRUCTOR", "practicas.view") // → true
 */
export const can = (roles, module, action = null) => {
  // Normalizar roles a array
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  if (!rolesArray || rolesArray.length === 0) {
    return false;
  }

  // Verificar si ALGUNO de los roles tiene acceso
  return rolesArray.some((role) => {
    const rolePerms = PERMISSION_MATRIX[role];

    if (!rolePerms) {
      return false;
    }

    // Si no hay acción específica, solo verificar acceso al módulo
    if (!action) {
      return rolePerms[module] === true;
    }

    // Si hay acción, verificar que el módulo existe y la acción es permitida
    const modulePerms = rolePerms[module];

    if (typeof modulePerms === "boolean") {
      // Si el módulo es true/false, devolver ese valor
      return modulePerms;
    }

    if (typeof modulePerms === "object" && Array.isArray(modulePerms)) {
      // Si es un array de acciones, verificar si contiene la acción
      return modulePerms.includes(action);
    }

    return false;
  });
};

/**
 * Verificar si un rol es administrador
 */
export const isAdmin = (roles) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  return rolesArray.includes("ADMINISTRADOR");
};

/**
 * Verificar si un rol tiene permiso para acceder a un módulo
 * (alias más semántico de can())
 */
export const canAccessModule = (roles, module) => {
  return can(roles, module);
};

/**
 * Obtener lista de módulos accesibles para un rol o array de roles
 */
export const getAccessibleModules = (roles) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  const allModules = new Set();

  rolesArray.forEach((role) => {
    const rolePerms = PERMISSION_MATRIX[role];
    if (rolePerms) {
      Object.entries(rolePerms).forEach(([module, hasAccess]) => {
        if (hasAccess === true || (Array.isArray(hasAccess) && hasAccess.length > 0)) {
          allModules.add(module);
        }
      });
    }
  });

  return Array.from(allModules);
};

/**
 * Verificar si usuario puede realizar CUALQUIER acción en un módulo
 */
export const canAccessAny = (roles, modules) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  const modulesArray = Array.isArray(modules) ? modules : [modules];

  return modulesArray.some((module) => can(rolesArray, module));
};

/**
 * Filtrar un array de módulos solo con los que el usuario puede acceder
 */
export const filterAccessibleModules = (roles, modules) => {
  return modules.filter((module) => can(roles, module));
};

/**
 * Debug: Mostrar los permisos de un rol en consola
 */
export const debugRolePermissions = (role) => {
  const perms = PERMISSION_MATRIX[role];
  console.group(`📋 Permisos de ${role}`);
  console.table(perms);
  console.groupEnd();
};
