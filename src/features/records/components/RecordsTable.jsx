import React, { useState, useEffect } from "react";
import { 
  Eye, 
  Users, 
  Calendar, 
  Clock,
  Building2,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import RecordsActionsMenu from "./RecordsActionsMenu";

// Helper para obtener color y label de estado
const getEstadoConfig = (estado) => {
  const config = {
    activa: { 
      color: "green", 
      label: "Activa",
      bgClasses: "bg-green-100 dark:bg-green-900/30",
      textClasses: "text-green-700 dark:text-green-300"
    },
    en_formacion: { 
      color: "blue", 
      label: "En Formación",
      bgClasses: "bg-blue-100 dark:bg-blue-900/30",
      textClasses: "text-blue-700 dark:text-blue-300"
    },
    en_etapa_productiva: { 
      color: "purple", 
      label: "Etapa Productiva",
      bgClasses: "bg-purple-100 dark:bg-purple-900/30",
      textClasses: "text-purple-700 dark:text-purple-300"
    },
    suspendida: { 
      color: "yellow", 
      label: "Suspendida",
      bgClasses: "bg-yellow-100 dark:bg-yellow-900/30",
      textClasses: "text-yellow-700 dark:text-yellow-300"
    },
    finalizada: { 
      color: "gray", 
      label: "Finalizada",
      bgClasses: "bg-gray-100 dark:bg-gray-700",
      textClasses: "text-gray-900 dark:text-white font-medium"
    },
    cancelada: { 
      color: "red", 
      label: "Cancelada",
      bgClasses: "bg-red-100 dark:bg-red-900/30",
      textClasses: "text-red-700 dark:text-red-300"
    },
  };
  return config[estado] || { 
    color: "gray", 
    label: estado,
    bgClasses: "bg-gray-100 dark:bg-gray-700",
    textClasses: "text-gray-900 dark:text-white font-medium"
  };
};

// Helper para obtener label de jornada
const getJornadaLabel = (jornada) => {
  const labels = {
    diurna: "Diurna",
    nocturna: "Nocturna",
    mixta: "Mixta",
    fines_semana: "Fines de Semana",
  };
  return labels[jornada] || jornada;
};

// Componente de tarjeta para vista móvil
function RecordCard({ ficha, onViewDetail }) {
  const estadoConfig = getEstadoConfig(ficha.estado);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {ficha.numero}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${estadoConfig.bgClasses} ${estadoConfig.textClasses}`}>
              {estadoConfig.label}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {ficha.programa?.nombre}
          </p>
        </div>
        <button
          onClick={() => onViewDetail(ficha)}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <User className="w-4 h-4" />
          <span className="truncate">{ficha.instructorTitular?.nombre || "Sin asignar"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Building2 className="w-4 h-4" />
          <span>{ficha.sede?.nombre}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>{ficha.aprendicesActivos} aprendices</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{getJornadaLabel(ficha.jornada)}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
        <RecordsActionsMenu ficha={ficha} onViewDetail={onViewDetail} />
      </div>
    </div>
  );
}

// Componente de tabla para vista desktop
function RecordTable({ fichas, onViewDetail }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Código Ficha
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Programa
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Estado
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Jornada
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Aprendices
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {fichas.map((ficha) => {
            const estadoConfig = getEstadoConfig(ficha.estado);
            
            return (
              <tr 
                key={ficha.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {ficha.numero}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                      {ficha.programa?.nombre}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ficha.sede?.nombre}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${estadoConfig.bgClasses} ${estadoConfig.textClasses}`}>
                    {estadoConfig.label}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {getJornadaLabel(ficha.jornada)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {ficha.aprendicesActivos}
                    </span>
                    <span className="text-xs text-gray-500">/ {ficha.aprendicesTotal}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center">
                    <RecordsActionsMenu ficha={ficha} onViewDetail={onViewDetail} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Componente principal de lista de fichas
export default function RecordsTable({ fichas, loading, onViewDetail }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular paginación
  const totalPages = Math.ceil((fichas?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFichas = fichas?.slice(startIndex, startIndex + itemsPerPage) || [];

  // Reset página cuando cambian las fichas
  useEffect(() => {
    setCurrentPage(1);
  }, [fichas?.length]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500 dark:text-gray-400">Cargando fichas...</span>
        </div>
      </div>
    );
  }

  if (!fichas || fichas.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No se encontraron fichas
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Intenta ajustar los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Vista desktop */}
      <div className="hidden lg:block">
        <RecordTable fichas={paginatedFichas} onViewDetail={onViewDetail} />
      </div>

      {/* Vista móvil */}
      <div className="lg:hidden p-4 space-y-4">
        {paginatedFichas.map((ficha) => (
          <RecordCard key={ficha.id} ficha={ficha} onViewDetail={onViewDetail} />
        ))}
      </div>

      {/* Footer con paginación */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando <span className="font-medium text-gray-900 dark:text-white">{startIndex + 1}</span> - <span className="font-medium text-gray-900 dark:text-white">{Math.min(startIndex + itemsPerPage, fichas.length)}</span> de <span className="font-medium text-gray-900 dark:text-white">{fichas.length}</span> fichas
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
