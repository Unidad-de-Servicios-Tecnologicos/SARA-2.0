import { FileText, Users, AlertTriangle, ClipboardCheck, ArrowUpRight } from "lucide-react";
import { useDashboardNav } from "@/features/dashboard/store/useDashboardNav";

const iconMap = {
  "Fichas": { 
    icon: FileText, 
    bgColor: "bg-blue-100 dark:bg-blue-900/30", 
    iconColor: "text-blue-500",
    module: "records",
    tooltip: "Ver Fichas"
  },
  "Instructores": { 
    icon: Users, 
    bgColor: "bg-green-100 dark:bg-green-900/30", 
    iconColor: "text-green-500",
    module: "instructors",
    tooltip: "Ver Instructores"
  },
  "RAP con No Aprobado": { 
    icon: AlertTriangle, 
    bgColor: "bg-orange-100 dark:bg-orange-900/30", 
    iconColor: "text-orange-500",
    module: "activities",
    tooltip: "Ver Actividades"
  },
  "Resultados por evaluar": { 
    icon: ClipboardCheck, 
    bgColor: "bg-green-100 dark:bg-green-900/30", 
    iconColor: "text-green-500",
    module: "activities",
    tooltip: "Ver Evaluaciones"
  },
};

export default function KPIBox({ label, value, trend, trendUp }) {
  const setModule = useDashboardNav((s) => s.setCurrentModule);
  const config = iconMap[label] || { 
    icon: FileText, 
    bgColor: "bg-gray-100 dark:bg-gray-700", 
    iconColor: "text-gray-500",
    module: "dashboard",
    tooltip: "Ver detalle"
  };
  const Icon = config.icon;

  const handleClick = () => {
    if (config.module) {
      setModule(config.module);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col items-center justify-center group hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer relative"
      title={config.tooltip}
    >
      {/* Indicador de navegación */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={14} className="text-blue-500" />
      </div>

      <div className={`w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className={config.iconColor} size={24} />
      </div>
      
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center">{label}</p>
      
      {/* Indicador de tendencia opcional */}
      {trend !== undefined && (
        <div className={`mt-2 flex items-center gap-1 text-xs ${trendUp ? "text-green-500" : "text-red-500"}`}>
          <span>{trendUp ? "↑" : "↓"}</span>
          <span>{trend}%</span>
        </div>
      )}
    </button>
  )
}
