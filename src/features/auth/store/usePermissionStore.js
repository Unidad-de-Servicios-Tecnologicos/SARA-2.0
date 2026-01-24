/**
 * ========================================
 * PERMISSION STORE - usePermissionStore
 * ========================================
 * Gestiona los permisos del usuario actual
 * Basado en su rol y la matriz de permisos
 */

import { create } from "zustand";
import { PERMISSION_MATRIX, getAccessibleModules } from "@/config/permissions";

export const usePermissionStore = create((set, get) => ({
  userRole: null,
  userPermissions: {},
  accessibleModules: [],

  // ========================================
  // Inicializar permisos basado en rol
  // ========================================
  initPermissions: (role) => {
    const permissions = PERMISSION_MATRIX[role] || {};
    const modules = getAccessibleModules(role);

    console.log(`🔑 Permisos inicializados para rol: ${role}`);
    console.log(`📦 Módulos accesibles: ${modules.join(", ")}`);

    set({
      userRole: role,
      userPermissions: permissions,
      accessibleModules: modules,
    });
  },

  // ========================================
  // Verificar si el usuario puede acceder a un módulo
  // ========================================
  canAccessModule: (module) => {
    const { userPermissions } = get();
    return userPermissions[module] === true;
  },

  // ========================================
  // Obtener lista de módulos accesibles
  // ========================================
  getAccessibleModules: () => {
    const { accessibleModules } = get();
    return accessibleModules;
  },

  // ========================================
  // Verificar si usuario es Administrador
  // ========================================
  isAdmin: () => {
    const { userRole } = get();
    return userRole === "ADMINISTRADOR";
  },

  // ========================================
  // Obtener rol actual
  // ========================================
  getRole: () => {
    const { userRole } = get();
    return userRole;
  },

  // ========================================
  // Limpiar permisos (logout)
  // ========================================
  clearPermissions: () => {
    set({
      userRole: null,
      userPermissions: {},
      accessibleModules: [],
    });
  },
}));
