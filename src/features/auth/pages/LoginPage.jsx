import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useAuthStore } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import logoSura from "@/assets/logo-sena.png";

export default function LoginPage() {
  const init = useAuthStore((s) => s.init);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* PANEL IZQUIERDO */}
      <div className="hidden md:flex relative overflow-hidden">

        {/* Imagen de fondo con animación */}
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200"
          alt="SARA Educación"
          className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900/60" />

        {/* Contenido */}
        <div className="relative z-10 p-12 flex flex-col justify-between text-white w-full">

          {/* LOGO */}
          <div className="inline-flex items-center bg-white/90 px-5 py-3 rounded-xl shadow-lg animate-float w-fit">
            <img
              src={logoSura}
              alt="Logo SURA"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* TEXTO CENTRAL */}
          <div>
            <h2 className="text-4xl font-extrabold mb-4">
              SARA
            </h2>
            <p className="text-lg text-green-100 max-w-md">
              Sistema de gestión educativa basado en datos para la toma de
              decisiones institucionales.
            </p>
          </div>

          {/* FOOTER IZQUIERDO */}
          <p className="text-sm text-green-200">
            © 2025 · SENA · Centro de Servicios y Gestión Empresarial
          </p>

        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="flex items-center justify-center px-6 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">

          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Iniciar sesión
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Accede a la plataforma SARA
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
