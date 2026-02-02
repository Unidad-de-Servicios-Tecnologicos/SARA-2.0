import { create } from "zustand";
import { authService } from "../services/authService";
import { usePermissionStore } from "./usePermissionStore";
import { showToast } from "@/shared/notifications";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  init: () => {
    const stored = localStorage.getItem("sara_user");
    if (stored) {
      const user = JSON.parse(stored);
      set({ user });
      // Inicializar permisos al recuperar usuario de localStorage
      usePermissionStore.getState().initPermissions(user.role);
    }
  },

  login: async (username, password, role) => {
  set({ loading: true, error: null });

  try {
    const response = await authService.login(username, password);

    // 👇 NORMALIZAMOS EL USUARIO CON ROL ASIGNADO (ROL SELECCIONADO TIENE PRIORIDAD)
    const user = {
      ...response,
      role: role || "INVITADO", // 👈 PRIORIDAD: rol seleccionado en formulario
    };

    console.log("🔐 Login exitoso - Usuario:", user.name, "Rol:", user.role);

    localStorage.setItem("sara_user", JSON.stringify(user));
    set({ user, loading: false });
    
    // 👇 INICIALIZAR PERMISOS BASADO EN ROL SELECCIONADO
    usePermissionStore.getState().initPermissions(user.role);

  } catch {
    const errorMsg = "Credenciales incorrectas";
    showToast.error(errorMsg);
    set({ error: null, loading: false });
  }
},

  logout: () => {
    localStorage.removeItem("sara_user");
    set({ user: null });
    // 👇 LIMPIAR PERMISOS AL LOGOUT
    usePermissionStore.getState().clearPermissions();
  },

  // Actualizar avatar del usuario
  updateAvatar: (avatarUrl) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, avatar: avatarUrl };
      localStorage.setItem("sara_user", JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }
  },

  // Actualizar datos del perfil
  updateProfile: (profileData) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem("sara_user", JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }
  },
}));