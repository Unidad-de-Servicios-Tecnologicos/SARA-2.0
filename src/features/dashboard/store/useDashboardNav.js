import { create } from "zustand";

// Store para manejar la navegación dentro del dashboard
export const useDashboardNav = create((set) => ({
  currentModule: "dashboard", // dashboard, horarios, fichas, etc.
  
  setCurrentModule: (module) => set({ currentModule: module }),
  
  // Reset al dashboard principal
  goToDashboard: () => set({ currentModule: "dashboard" }),
}));
