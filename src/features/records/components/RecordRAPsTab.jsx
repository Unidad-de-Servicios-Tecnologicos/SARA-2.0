import React from "react";
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp
} from "lucide-react";

// Helper para obtener config de estado de RAP
const getEstadoRAPConfig = (estado) => {
  const config = {
    completado: { color: "green", label: "Completado", icon: CheckCircle2 },
    en_progreso: { color: "blue", label: "En Progreso", icon: Clock },
    pendiente: { color: "gray", label: "Pendiente", icon: AlertCircle },
  };
  return config[estado] || { color: "gray", label: estado, icon: BookOpen };
};

export default function RecordRAPsTab({ raps, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500 dark:text-gray-400">Cargando RAPs...</span>
      </div>
    );
  }

  // Calcular estadísticas
  const totalHorasAsignadas = raps.reduce((sum, r) => sum + r.horasAsignadas, 0);
  const totalHorasEjecutadas = raps.reduce((sum, r) => sum + r.horasEjecutadas, 0);
  const porcentajeAvance = totalHorasAsignadas > 0 
    ? ((totalHorasEjecutadas / totalHorasAsignadas) * 100).toFixed(0) 
    : 0;

  const stats = {
    completados: raps.filter(r => r.estado === "completado").length,
    enProgreso: raps.filter(r => r.estado === "en_progreso").length,
    pendientes: raps.filter(r => r.estado === "pendiente").length,
  };

  return (
    <div className="space-y-4">
      {/* Resumen de avance */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Avance General de RAPs</span>
            </div>
            <p className="text-4xl font-bold">{porcentajeAvance}%</p>
            <p className="text-blue-100 text-sm mt-1">
              {totalHorasEjecutadas} de {totalHorasAsignadas} horas ejecutadas
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.completados}</p>
              <p className="text-xs text-blue-100">Completados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.enProgreso}</p>
              <p className="text-xs text-blue-100">En Progreso</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.pendientes}</p>
              <p className="text-xs text-blue-100">Pendientes</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${porcentajeAvance}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de RAPs */}
      <div className="space-y-3">
        {raps.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-500 dark:text-gray-400">
            No hay RAPs registrados para esta ficha
          </div>
        ) : (
          raps.map((rap) => {
            const estadoConfig = getEstadoRAPConfig(rap.estado);
            const Icon = estadoConfig.icon;
            const avance = rap.horasAsignadas > 0 
              ? ((rap.horasEjecutadas / rap.horasAsignadas) * 100).toFixed(0) 
              : 0;
            
            return (
              <div 
                key={rap.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                        {rap.codigo}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-${estadoConfig.color}-100 dark:bg-${estadoConfig.color}-900/30 text-${estadoConfig.color}-700 dark:text-${estadoConfig.color}-300`}>
                        <Icon className="w-3 h-3" />
                        {estadoConfig.label}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {rap.nombre}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Competencia: {rap.competencia}
                    </p>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {avance}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {rap.horasEjecutadas}/{rap.horasAsignadas}h
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${estadoConfig.color}-500 rounded-full transition-all duration-500`}
                      style={{ width: `${avance}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
