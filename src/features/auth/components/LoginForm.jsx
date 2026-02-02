import React, { useState } from "react";
import { useAuthStore } from "../store/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ROLES, ROLE_METADATA } from "@/config/permissions";
import { showAlert } from '@/shared/notifications';
import ForgotPassword from "./ForgotPassword";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const [form, setForm] = useState({ username: "", password: "", role: "ADMINISTRADOR" });
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      showAlert.warning('Validación', 'Por favor completa todos los campos')
      return
    }
    // 👇 PASAR EL ROL SELECCIONADO AL LOGIN
    login(form.username, form.password, form.role);
  };

  // Mostrar componente de recuperación de contraseña
  if (showRecovery) {
    return <ForgotPassword onBack={() => setShowRecovery(false)} />;
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

      {/* 👇 SELECTOR DE ROL (MULTIROL) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔐 Selecciona tu rol
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(ROLES).map(([, value]) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm({ ...form, role: value })}
              className={`p-2 text-xs font-medium rounded-lg border transition-all ${
                form.role === value
                  ? "border-green-600 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-lg">{ROLE_METADATA[value]?.icon || "•"}</div>
              <div className="truncate">{ROLE_METADATA[value]?.label || value}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {ROLE_METADATA[form.role]?.description}
        </p>
      </div>

      {/* ERROR */}
      {/* Error manejado por el store mediante toast automático */}

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
