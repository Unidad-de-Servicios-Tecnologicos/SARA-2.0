import React, { useState } from "react";
import { useAuthStore } from "../store/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.username, form.password);
  };

  if (showRecovery) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Recuperar contraseña
        </h2>

        <p className="text-sm text-gray-600">
          Funcionalidad simulada para entorno de pruebas.
        </p>

        <Button
          type="button"
          onClick={() => setShowRecovery(false)}
          className="w-full"
        >
          Volver al login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* USUARIO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Usuario
        </label>
        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="admin"
          autoComplete="username"
          required
        />
      </div>

      {/* CONTRASEÑA */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>

        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="123"
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-600 text-sm font-medium">
          {error}
        </p>
      )}

      {/* BOTÓN */}
      <Button
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>

      {/* RECUPERAR */}
      <button
        type="button"
        onClick={() => setShowRecovery(true)}
        className="text-sm text-green-600 hover:underline w-full text-center"
      >
        ¿Olvidaste tu contraseña?
      </button>
    </form>
  );
}
