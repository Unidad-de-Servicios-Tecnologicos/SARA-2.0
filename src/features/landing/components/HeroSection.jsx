import React from "react";
import { BarChart3, Users, TrendingUp, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-linear-to-br from-green-50 via-white to-emerald-50 py-24 px-6 overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Plataforma institucional • SENA
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            SARA
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-500 mt-2">
              Gestión educativa basada en datos
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Centraliza la información académica y mejora la toma de decisiones
            institucionales con indicadores claros y en tiempo real.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/auth/login"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg shadow-green-600/25 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Acceder al sistema
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
            >
              Ver funcionalidades
            </a>
          </div>
        </div>

        {/* Card visual mejorada */}
        <div className="hidden md:block animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 p-6 border border-gray-100">
            {/* Header del card */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Dashboard</p>
                  <p className="text-xs text-gray-500">Vista en tiempo real</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">En vivo</span>
            </div>
            
            {/* Mini gráfico */}
            <div className="h-32 bg-linear-to-t from-green-50 to-white rounded-lg flex items-end justify-around p-4 mb-4">
              <div className="w-6 bg-green-300 rounded-t animate-bar-1" style={{height: '40%'}} />
              <div className="w-6 bg-green-400 rounded-t animate-bar-2" style={{height: '65%'}} />
              <div className="w-6 bg-green-500 rounded-t animate-bar-3" style={{height: '85%'}} />
              <div className="w-6 bg-green-600 rounded-t animate-bar-4" style={{height: '70%'}} />
              <div className="w-6 bg-emerald-500 rounded-t animate-bar-5" style={{height: '90%'}} />
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">97</p>
                <p className="text-xs text-gray-500">Fichas</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">106</p>
                <p className="text-xs text-gray-500">Instructores</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-green-600">+12%</p>
                <p className="text-xs text-gray-500">Crecimiento</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
