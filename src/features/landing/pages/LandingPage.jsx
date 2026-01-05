import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

const features = [
  { title: "Dashboard Inteligente", description: "Visualiza KPIs en tiempo real con gráficos interactivos", iconName: "BarChart3" },
  { title: "Gestión de Personal", description: "Administra instructores, contratos y asignaciones", iconName: "Users" },
  { title: "Control de Calidad", description: "Seguimiento formativo y evaluación continua", iconName: "CheckCircle" },
  { title: "Optimización de Tiempos", description: "Procesos ágiles y automatizados", iconName: "Clock" },
  { title: "Análisis Predictivo", description: "Datos e indicadores para decisiones estratégicas", iconName: "TrendingUp" },
  { title: "Roles Personalizados", description: "Accesos seguros según perfil de usuario", iconName: "Briefcase" },
];

const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />

      <section id="features" className="py-24 bg-gray-50/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SARA integra herramientas diseñadas para optimizar la gestión educativa del SENA
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
