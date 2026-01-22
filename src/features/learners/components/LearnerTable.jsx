import React, { useState } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";

// Helper para obtener config de estado
const getEstadoConfig = (estado) => {
  const config = {
    "EN FORMACIÓN": {
      label: "EN FORMACIÓN",
      bgClass:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    },
    "CERTIFICADO": {
      label: "CERTIFICADO",
      bgClass:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    },
    "RETIRADO": {
      label: "RETIRADO",
      bgClass: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    },
  };
  return config[estado] || { label: estado?.toUpperCase() || "N/A", bgClass: "bg-gray-100 text-gray-700" };
};



// Fila de aprendiz
function LearnerRow({ learner, onView, onEdit, onDelete }) {
  // Calcular juicios (si no existen, usar valores por defecto)
  const totalJuicios = learner.totalJuicios || 0;
  const juiciosNoAprobados = learner.juiciosNoAprobados || 0;
  const juiciosPorEvaluar = learner.juiciosPorEvaluar || 0;

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {learner.document}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          onClick={() => onView?.(learner)}
        >
          {learner.name}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs font-medium rounded ${getEstadoConfig(learner.state).bgClass}`}>
          {getEstadoConfig(learner.state).label}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {totalJuicios}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          juiciosNoAprobados > 0 
            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" 
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        }`}>
          {juiciosNoAprobados}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          juiciosPorEvaluar > 0 
            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" 
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        }`}>
          {juiciosPorEvaluar}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onView?.(learner)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Ver"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(learner)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(learner)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function LearnerTable({
  learners = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar aprendices basado en búsqueda
  const filteredLearners = learners;

  // Paginación
  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredLearners.slice(startIndex, endIndex);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {[
                  "Documento",
                  "Nombre",
                  "Estado",
                  "Total Juicios",
                  "No Aprobados",
                  "Por Evaluar",
                  "Acciones",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty state
  if (!learners.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Eye className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No se encontraron aprendices
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Intenta ajustar los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Documento
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Juicios
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                No Aprobados
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Por Evaluar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((learner) => (
              <LearnerRow
                key={learner.id}
                learner={learner}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredLearners.length)}{" "}
          de {filteredLearners.length} registros
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Página {currentPage}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
