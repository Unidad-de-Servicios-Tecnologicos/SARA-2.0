import { useState, useEffect } from "react";
import { Menu, Clock } from "lucide-react";
import { useDashboardNav } from "../store/useDashboardNav";

// Mapeo de módulos a títulos
const moduleTitles = {
  dashboard: "Dashboard",
  horarios: "Gestión de Horarios",
  ambientes: "Gestión de Ambientes",
  instructores: "Gestión de Instructores",
  aprendices: "Gestión de Aprendices",
  fichas: "Gestión de Fichas",
  reservas: "Gestión de Reservas",
  documentos: "Gestión de Documentos",
  practicas: "Gestión de Prácticas",
  configuracion: "Configuración",
  records: "Gestión de Fichas",
  activities: "Gestión de Actividades",
};

export default function DashboardHeader({ onMenuToggle, onMobileMenuToggle }) {
  const currentModule = useDashboardNav((s) => s.currentModule);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora cada minuto (sin segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Cada 60 segundos
    return () => clearInterval(timer);
  }, []);

  // Formatear fecha y hora
  const formatDateTime = () => {
    const options = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    const date = currentTime.toLocaleDateString('es-CO', options);
    // Formato 12 horas con AM/PM sin segundos
    let hours = currentTime.getHours();
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12
    const time = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    return { date, time };
  };

  const { date, time } = formatDateTime();

  // Título dinámico según el módulo
  const title = moduleTitles[currentModule] || "Dashboard";

  return (
    <header className="bg-white dark:bg-gray-800 px-4 md:px-6 py-3 border-b dark:border-gray-700 flex justify-between items-center shrink-0">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Menú móvil - solo visible en pantallas pequeñas */}
        <button 
          onClick={onMobileMenuToggle}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
          title="Abrir menú"
        >
          <Menu size={24} />
        </button>

        {/* Menú desktop - solo visible en pantallas grandes */}
        <button 
          onClick={onMenuToggle}
          className="hidden lg:flex text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
          title="Expandir/Contraer menú"
        >
          <Menu size={24} />
        </button>

        <div className="border-l dark:border-gray-600 pl-2 md:pl-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        </div>
      </div>

      {/* Fecha y Hora en tiempo real */}
      <div className="flex items-center gap-2 text-right">
        <Clock size={16} className="text-gray-400 hidden sm:block" />
        <div className="w-24 md:w-28">
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{date}</p>
          <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</p>
        </div>
      </div>
    </header>
  );
}
