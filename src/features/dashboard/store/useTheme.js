import { create } from "zustand";

/**
 * Store para manejar el tema (modo oscuro/claro)
 * Persiste en localStorage para mantener la preferencia del usuario
 */
export const useThemeStore = create((set, get) => ({
  darkMode: false,

  // Inicializar tema desde localStorage
  init: () => {
    const stored = localStorage.getItem("sara_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Usar preferencia guardada o preferencia del sistema
    const isDark = stored ? stored === "dark" : prefersDark;
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
    
    set({ darkMode: isDark });
  },

  // Alternar modo oscuro
  toggleDarkMode: () => {
    const newMode = !get().darkMode;
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sara_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sara_theme", "light");
    }
    
    set({ darkMode: newMode });
  },

  // Establecer modo específico
  setDarkMode: (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sara_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sara_theme", "light");
    }
    
    set({ darkMode: isDark });
  },
}));

export default useThemeStore;
