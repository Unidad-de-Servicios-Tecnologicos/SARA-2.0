import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  init: () => {
    const stored = localStorage.getItem("sara_user");
    if (stored) {
      set({ user: JSON.parse(stored) });
    }
  },

  login: async (username, password) => {
  set({ loading: true, error: null });

  try {
    const response = await authService.login(username, password);

    // 👇 NORMALIZAMOS EL USUARIO (CLAVE)
    const user = {
      ...response,
      role: response.role || "SUBDIRECTOR", // 👈 Vista principal del Subdirector
    };

    localStorage.setItem("sara_user", JSON.stringify(user));
    set({ user, loading: false });

  } catch {
    set({ error: "Credenciales incorrectas", loading: false });
  }
},

  logout: () => {
    localStorage.removeItem("sara_user");
    set({ user: null });
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