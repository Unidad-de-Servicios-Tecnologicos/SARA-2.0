/**
 * ========================================
 * MOCK DE AUTENTICACIÓN - SARA 2.0
 * ========================================
 * 
 * Este archivo simula respuestas de backend.
 * Cuando conectes con servidor real, solo cambias
 * la función login() en authService.js
 * 
 * 🎯 CONTRATO (lo que el frontend SIEMPRE espera):
 * {
 *   id: number,
 *   name: string,
 *   username: string,
 *   email: string,
 *   avatar: string | null,
 *   role: "ADMINISTRADOR" | "COORDINADOR" | "INSTRUCTOR" | "APRENDIZ" | "EMPRESA" | "INVITADO"
 * }
 */

// ========================================
// USUARIOS MOCK CON ROLES
// ========================================
export const mockUsers = {
  admin: {
    id: 1,
    username: "admin",
    name: "Admin del Sistema",
    email: "admin@sara.edu.co",
    avatar: null,
    role: "ADMINISTRADOR",
  },
  coordinador: {
    id: 2,
    username: "coordinador",
    name: "Juan Coordinador",
    email: "coordinador@sara.edu.co",
    avatar: null,
    role: "COORDINADOR",
  },
  instructor: {
    id: 3,
    username: "instructor",
    name: "María Instructora",
    email: "instructor@sara.edu.co",
    avatar: null,
    role: "INSTRUCTOR",
  },
  aprendiz: {
    id: 4,
    username: "aprendiz",
    name: "Carlos Aprendiz",
    email: "aprendiz@sara.edu.co",
    avatar: null,
    role: "APRENDIZ",
  },
  empresa: {
    id: 5,
    username: "empresa",
    name: "Tutor Empresa",
    email: "empresa@sara.edu.co",
    avatar: null,
    role: "EMPRESA",
  },
  invitado: {
    id: 6,
    username: "invitado",
    name: "Usuario Invitado",
    email: "invitado@sara.edu.co",
    avatar: null,
    role: "INVITADO",
  },
};

// ========================================
// CREDENCIALES VÁLIDAS (MOCK)
// ========================================
export const validCredentials = {
  admin: "123",
  coordinador: "123",
  instructor: "123",
  aprendiz: "123",
  empresa: "123",
  invitado: "123",
};

/**
 * Simula respuesta de backend al login
 * Retorna usuario con su rol asignado
 * 
 * @param {string} username - Usuario
 * @param {string} password - Contraseña
 * @returns {Promise<object>} Usuario con rol
 */
export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validar credenciales
      if (!validCredentials[username] || validCredentials[username] !== password) {
        reject(new Error("Credenciales incorrectas"));
        return;
      }

      const user = mockUsers[username];
      if (!user) {
        reject(new Error("Usuario no encontrado"));
        return;
      }

      // Resolver con usuario (incluye role)
      resolve(user);
    }, 800); // Simular latencia de 800ms
  });
};

/**
 * Obtiene el nombre del rol en español
 */
export const getRoleLabel = (role) => {
  const labels = {
    ADMINISTRADOR: "Administrador del Sistema",
    COORDINADOR: "Coordinador Académico",
    INSTRUCTOR: "Instructor",
    APRENDIZ: "Aprendiz",
    EMPRESA: "Empresa/Tutor Externo",
    INVITADO: "Invitado",
  };
  return labels[role] || role;
};
