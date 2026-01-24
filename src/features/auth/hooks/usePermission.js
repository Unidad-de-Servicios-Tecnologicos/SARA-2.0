/**
 * ========================================
 * HOOK: usePermission
 * ========================================
 * Proporciona funciones para validar permisos
 * en componentes individuales
 */

import { usePermissionStore } from "@/features/auth/store/usePermissionStore";
import { PERMISSIONS } from "@/config/permissions";

export const usePermission = () => {
  const hasPermission = usePermissionStore((s) => s.hasPermission);
  const canAccessModule = usePermissionStore((s) => s.canAccessModule);
  const getModulePermissions = usePermissionStore((s) => s.getModulePermissions);
  const getAccessibleModules = usePermissionStore((s) => s.getAccessibleModules);
  const isAdmin = usePermissionStore((s) => s.isAdmin);
  const getRole = usePermissionStore((s) => s.getRole);

  return {
    /**
     * Verificar si el usuario puede LEER un módulo
     * @param {string} module - Nombre del módulo
     * @returns {boolean}
     */
    canRead: (module) => hasPermission(module, PERMISSIONS.READ),

    /**
     * Verificar si el usuario puede CREAR en un módulo
     * @param {string} module - Nombre del módulo
     * @returns {boolean}
     */
    canCreate: (module) => hasPermission(module, PERMISSIONS.CREATE),

    /**
     * Verificar si el usuario puede EDITAR en un módulo
     * @param {string} module - Nombre del módulo
     * @returns {boolean}
     */
    canUpdate: (module) => hasPermission(module, PERMISSIONS.UPDATE),

    /**
     * Verificar si el usuario puede ELIMINAR en un módulo
     * @param {string} module - Nombre del módulo
     * @returns {boolean}
     */
    canDelete: (module) => hasPermission(module, PERMISSIONS.DELETE),

    /**
     * Verificar si el usuario puede ADMINISTRAR un módulo
     * @param {string} module - Nombre del módulo
     * @returns {boolean}
     */
    canManage: (module) => hasPermission(module, PERMISSIONS.MANAGE),

    /**
     * Verificar si el usuario tiene acceso a un módulo
     * @param {string} module - Nombre del módulo
     * @returns {boolean}
     */
    canAccess: (module) => canAccessModule(module),

    /**
     * Obtener todos los permisos de un módulo
     * @param {string} module - Nombre del módulo
     * @returns {array}
     */
    getPermissions: (module) => getModulePermissions(module),

    /**
     * Obtener lista de módulos accesibles
     * @returns {array}
     */
    getAccessibleModules: () => getAccessibleModules(),

    /**
     * Verificar si es administrador
     * @returns {boolean}
     */
    isAdmin: () => isAdmin(),

    /**
     * Obtener rol actual del usuario
     * @returns {string}
     */
    getRole: () => getRole(),
  };
};
