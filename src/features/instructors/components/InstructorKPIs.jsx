import React from "react";
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

function KPICard({ title, value, subtitle, icon, color, trend }) {
  const IconComponent = icon;
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <IconComponent className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span className="text-xs text-green-500">{trend}</span>
        </div>
      )}
    </div>
  );
};

export default function InstructorKPIs({ kpis, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!kpis) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <KPICard
        title="Total Instructores"
        value={kpis.totalInstructores}
        icon={Users}
        color="blue"
      />
      <KPICard
        title="Activos"
        value={kpis.instructoresActivos}
        subtitle={`${((kpis.instructoresActivos / kpis.totalInstructores) * 100).toFixed(0)}% del total`}
        icon={UserCheck}
        color="green"
      />
      <KPICard
        title="Planta"
        value={kpis.instructoresPlanta}
        icon={Briefcase}
        color="purple"
      />
      <KPICard
        title="Contratistas"
        value={kpis.instructoresContratistas}
        icon={Briefcase}
        color="blue"
      />
      <KPICard
        title="Ocupación Promedio"
        value={`${kpis.promedioOcupacion}%`}
        icon={Clock}
        color={kpis.promedioOcupacion > 80 ? "yellow" : "green"}
      />
      <KPICard
        title="Sobrecarga"
        value={kpis.instructoresSobrecarga}
        subtitle="> 85% ocupación"
        icon={AlertTriangle}
        color="red"
      />
    </div>
  );
}
