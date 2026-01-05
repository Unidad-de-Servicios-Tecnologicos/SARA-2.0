
export const authService = {
  login: async (username, password) => {
    // Simular retraso
    await new Promise(res => setTimeout(res, 500));

    if (username === "admin" && password === "123") {
      return { id: 1, name: "Administrador", role: "admin" };
    }

    throw new Error("Credenciales incorrectas");
  },
};

