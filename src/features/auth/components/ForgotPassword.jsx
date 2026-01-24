import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { showToast, showAlert } from '@/shared/notifications';

export default function ForgotPassword({ onBack }) {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      showAlert.warning("Validación", "Ingresa un correo válido");
      return;
    }

    setLoading(true);
    try {
      // Simulamos el envío de código
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast.success("Correo enviado", "Revisa tu bandeja de entrada para el código");
      setStep(2);
    } catch {
      showToast.error("Error al enviar correo");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      showAlert.warning("Validación", "Ingresa un código válido de 6 dígitos");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Código simulado: 123456
      if (code !== "123456") {
        showAlert.error("Error", "Código incorrecto. Intenta con 123456 para demo");
        return;
      }
      
      showToast.success("Código verificado", "Ahora crea tu nueva contraseña");
      setStep(3);
    } catch {
      showToast.error("Error al verificar código");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!password || password.length < 8) {
      showAlert.warning("Validación", "La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      showAlert.warning("Validación", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showAlert.success("¡Éxito!", "Tu contraseña ha sido actualizada. Por favor inicia sesión");
      onBack();
    } catch {
      showToast.error("Error al actualizar contraseña");
    } finally {
      setLoading(false);
    }
  };

  // PASO 1: Ingreso de correo
  if (step === 1) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
            <Mail className="text-blue-600" size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Recuperar contraseña</h2>
          <p className="text-sm text-gray-600 mt-1">
            Ingresa tu correo institucional para recibir instrucciones
          </p>
        </div>

        <form onSubmit={handleSendEmail} className="space-y-4">
          <Input
            type="email"
            placeholder="usuario@misena.edu.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Enviando..." : "Enviar código"}
          </Button>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </form>
      </div>
    );
  }

  // PASO 2: Verificar código
  if (step === 2) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Verifica tu código</h2>
          <p className="text-sm text-gray-600 mt-1">
            Hemos enviado un código a {email}
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código de 6 dígitos
            </label>
            <Input
              type="text"
              placeholder="123456"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Código de prueba: 123456
            </p>
          </div>

          <Button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Verificando..." : "Verificar código"}
          </Button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </form>
      </div>
    );
  }

  // PASO 3: Nueva contraseña
  if (step === 3) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Nueva contraseña</h2>
          <p className="text-sm text-gray-600 mt-1">
            Crea una contraseña segura
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Mín. 8 caracteres, mayúscula, minúscula, número
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </Button>

          <button
            type="button"
            onClick={() => {
              setStep(1);
              setEmail("");
              setCode("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full"
          >
            <ArrowLeft size={16} />
            Empezar de nuevo
          </button>
        </form>
      </div>
    );
  }
}
