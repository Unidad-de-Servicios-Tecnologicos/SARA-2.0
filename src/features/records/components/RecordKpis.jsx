import React from "react";
import { 
  ClipboardList, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function RecordKpis({ kpis, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!kpis) return null;

  const cards = [
    {
      title: "Total Fichas",
      value: kpis.totalFichas,
      icon: ClipboardList,
      color: "blue",
      subtitle: `${kpis.fichasActivas} activas`,
    },
    {
      title: "En Formación",
      value: kpis.fichasEnFormacion,
      icon: BookOpen,
      color: "indigo",
      subtitle: `${kpis.fichasProductiva} en productiva`,
    },
    {
      title: "Total Aprendices",
      value: kpis.totalAprendices,
      icon: Users,
      color: "green",
      subtitle: `${kpis.aprendicesActivos} activos`,
    },
    {
      title: "Tasa Deserción",
      value: `${kpis.tasaDesercion}%`,
      icon: kpis.tasaDesercion > 10 ? TrendingUp : TrendingDown,
      color: kpis.tasaDesercion > 10 ? "red" : "green",
      subtitle: kpis.tasaDesercion > 10 ? "Por encima del límite" : "Dentro del rango",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      icon: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      icon: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      icon: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      icon: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/30",
    },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const colors = colorClasses[card.color];
        
        return (
          <div 
            key={index} 
            className={`${colors.bg} rounded-xl p-4 border border-gray-100 dark:border-gray-700`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {card.subtitle}
                </p>
              </div>
              <div className={`p-2 ${colors.iconBg} rounded-lg`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Componente de resumen de estados
export function RecordStatusSummary({ kpis }) {
  if (!kpis) return null;

  const statuses = [
    { label: "Activas", value: kpis.fichasActivas, icon: CheckCircle2, color: "green" },
    { label: "En Formación", value: kpis.fichasEnFormacion, icon: BookOpen, color: "blue" },
    { label: "Etapa Productiva", value: kpis.fichasProductiva, icon: Clock, color: "purple" },
    { label: "Suspendidas", value: kpis.fichasSuspendidas, icon: AlertTriangle, color: "yellow" },
    { label: "Finalizadas", value: kpis.fichasFinalizadas, icon: CheckCircle2, color: "gray" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Resumen por Estado
      </h3>
      <div className="space-y-3">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          const percentage = kpis.totalFichas > 0 
            ? ((status.value / kpis.totalFichas) * 100).toFixed(0) 
            : 0;
          
          return (
            <div key={index} className="flex items-center gap-3">
              <Icon className={`w-4 h-4 text-${status.color}-500`} />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{status.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{status.value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${status.color}-500 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
