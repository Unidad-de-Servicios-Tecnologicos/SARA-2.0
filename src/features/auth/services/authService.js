import { mockLogin } from "@/mocks/authMock";

/**
 * Servicio de autenticación
 * 
 * 🎯 ARQUITECTURA ESCALABLE:
 * 
 * HOY: Usa mock (mockLogin)
 * MAÑANA: Cambia a axios.post("/api/auth/login")
 * 
 * El resto del código (useAuthStore, LoginForm, etc) NO cambia.
 */
export const authService = {
  /**
   * Login - Obtiene usuario con su rol
   * 
   * @param {string} username - Usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Usuario con datos: { id, name, username, email, avatar, role }
   * 
   * 📌 CONTRATO (igual en mock y backend real):
   * {
   *   id: number,
   *   username: string,
   *   name: string,
   *   email: string,
   *   avatar: string | null,
   *   role: "ADMINISTRADOR" | "COORDINADOR" | "INSTRUCTOR" | "APRENDIZ" | "EMPRESA" | "INVITADO"
   * }
   */
  login: async (username, password) => {
    try {
      // 👇 HOY: mockLogin() - simula respuesta del backend
      const user = await mockLogin(username, password);

      // Usuario ya incluye su rol asignado desde el mock/backend
      console.log("✅ Auth Service - Usuario autenticado:", {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      });

      return user;

      // 👇 MAÑANA: Descomenta para backend real (axios)
      // import axios from 'axios'
      // const response = await axios.post("/api/auth/login", { username, password });
      // return response.data; // Debe retornar { id, name, username, email, avatar, role }
    } catch (error) {
      console.error("❌ Auth Service - Error:", error.message);
      throw error;
    }
  },

  /**
   * Logout - Limpiar sesión
   */
  logout: async () => {
    try {
      // 📌 HOY: Solo limpiar localStorage
      // MAÑANA: axios.post("/api/auth/logout")
      console.log("✅ Auth Service - Logout exitoso");
      return true;
    } catch (error) {
      console.error("❌ Auth Service - Error en logout:", error.message);
      throw error;
    }
  },

  /**
   * Verificar token (para refresh)
   */
  verifyToken: async (token) => {
    try {
      // 📌 HOY: Verificación simple
      // MAÑANA: axios.post("/api/auth/verify", { token })
      return !!token;
    } catch (error) {
      console.error("❌ Auth Service - Error verificando token:", error.message);
      return false;
    }
  },
};

