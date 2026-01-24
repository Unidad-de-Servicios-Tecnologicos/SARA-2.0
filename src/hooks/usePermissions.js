/**
 * ========================================
 * HOOK usePermissions()
 * ========================================
 * Hook reutilizable para acceder a permisos en componentes
 * Combina AuthStore + función can() de forma conveniente
 * 
 * 🎯 SIMPLIFICA:
 *   const { can } = usePermissions()
 *   if (can("usuarios", "create")) { <Button /> }
 */

import { useCallback, useMemo } from "react";
import { useAuthStore } from "@/features/auth/store/useAuth";
import { usePermissionStore } from "@/features/auth/store/usePermissionStore";
import {
  can as canFn,
  isAdmin as isAdminFn,
  getAccessibleModules,
  canAccessModule,
  filterAccessibleModules,
} from "@/security/can";

/**
 * Hook principal para permisos
 * @returns {Object} Objeto con funciones de verificación de permisos
 */
export const usePermissions = () => {
  // Obtener datos de autenticación
  const user = useAuthStore((state) => state.user);
  const userRole = usePermissionStore((state) => state.userRole);
  const userPermissions = usePermissionStore((state) => state.userPermissions);
  const accessibleModules = usePermissionStore((state) => state.accessibleModules);

  // Extraer roles del usuario (memoizado para evitar cambios constantes)
  const roles = useMemo(() => {
    if (!user?.role) return [];
    return Array.isArray(user.role) ? user.role : [user.role];
  }, [user]);

  /**
   * Verificar si usuario puede hacer algo
   * @param {string} module - Módulo
   * @param {string} [action] - Acción opcional
   * @returns {boolean}
   */
  const can = useCallback(
    (module, action = null) => {
      return canFn(roles, module, action);
    },
    [roles]
  );

  /**
   * Verificar si es administrador
   * @returns {boolean}
   */
  const isAdmin = useCallback(() => {
    return isAdminFn(roles);
  }, [roles]);

  /**
   * Obtener módulos accesibles
   * @returns {string[]}
   */
  const getModules = useCallback(() => {
    return getAccessibleModules(roles);
  }, [roles]);

  /**
   * Verificar acceso a módulo específico
   * @param {string} module
   * @returns {boolean}
   */
  const canAccess = useCallback(
    (module) => {
      return canAccessModule(roles, module);
    },
    [roles]
  );

  /**
   * Filtrar modules permitidos
   * @param {string[]} modules
   * @returns {string[]}
   */
  const filterModules = useCallback(
    (modules) => {
      return filterAccessibleModules(roles, modules);
    },
    [roles]
  );

  /**
   * Información actual del usuario logueado
   */
  const currentUser = useMemo(() => ({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    avatar: user?.avatar,
    roles,
    role: userRole,
  }), [user?.id, user?.name, user?.email, user?.avatar, roles, userRole]);

  return {
    // Funciones principales
    can,
    isAdmin,
    getModules,
    canAccess,
    filterModules,

    // Info del usuario
    currentUser,
    user,
    roles,
    userRole,

    // Info de permisos
    permissions: userPermissions,
    accessibleModules,

    // Funciones de utilidad
    hasAnyRole: (roleList) => roleList.some((r) => roles.includes(r)),
    hasAllRoles: (roleList) => roleList.every((r) => roles.includes(r)),
    isLoggedIn: !!user,
  };
};

/**
 * Hook especializado para verificar permisos específicos
 * Más simple si solo necesitas verificar un módulo
 * 
 * @example
 * const { canViewUsers, canEditUsers } = useModulePermissions("usuarios")
 */
export const useModulePermissions = (module) => {
  const { can, isAdmin } = usePermissions();

  const actions = ["view", "create", "edit", "delete", "export"];
  const perms = {};

  actions.forEach((action) => {
    perms[`can${action.charAt(0).toUpperCase() + action.slice(1)}${
      module.charAt(0).toUpperCase() + module.slice(1)
    }`] = can(module, action);
  });

  return {
    canView: can(module, "view"),
    canCreate: can(module, "create"),
    canEdit: can(module, "edit"),
    canDelete: can(module, "delete"),
    canExport: can(module, "export"),
    can: (action) => can(module, action),
    isAdmin: isAdmin(),
    ...perms,
  };
};

/**
 * Hook para obtener lista de módulos accesibles
 * Útil para menús dinámicos
 */
export const useAccessibleModules = () => {
  const { getModules, filterModules } = usePermissions();

  return {
    all: getModules(),
    filter: filterModules,
  };
};
