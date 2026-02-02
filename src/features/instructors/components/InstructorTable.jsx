import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  Activity,
  CalendarCheck,
  FileText,
  Info,
  Edit2,
  Trash2,
  Download
} from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/button";

// Helper para obtener config de contrato/vinculación
const getContratoConfig = (tipo) => {
  const config = {
    planta: { label: "PLANTA", bgClass: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
    contratista: { label: "CONTRATISTA", bgClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
    contrato: { label: "CONTRATISTA", bgClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
  };
  return config[tipo] || { label: tipo?.toUpperCase() || "N/A", bgClass: "bg-gray-100 text-gray-700" };
};

// Componente Toggle de estado

function EstadoToggle({ activo, onChange, instructorId }) {
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggle = () => {
    setIsSwitching(true);
    onChange?.(instructorId, !activo);
    setTimeout(() => setIsSwitching(false), 800); // feedback visual rápido
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isSwitching ? "bg-gray-700" : activo ? "bg-gray-500" : "bg-gray-400 dark:bg-gray-600"}`}
      aria-pressed={activo}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          activo ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// Componente de carga horaria eliminado por requerimiento

// Fila de instructor
function InstructorRow({ instructor, onView, onFichas, onActividad, onToggleEstado }) {
  const isActivo = instructor.estado === "activo";

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* Documento */}
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {instructor.documento}
        </span>
      </td>
      {/* Nombre */}
      <td className="px-4 py-3">
        <span 
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer" 
          onClick={() => onView?.(instructor)}
        >
          {instructor.nombre} {instructor.apellidos}
        </span>
      </td>
      {/* Rol */}
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">
          INSTRUCTOR
        </span>
      </td>
      {/* Contrato */}
      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs font-medium rounded ${getContratoConfig(instructor.tipoVinculacion).bgClass}`}>
          {getContratoConfig(instructor.tipoVinculacion).label}
        </span>
      </td>
      {/* Área */}
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {instructor.area?.nombre || "ETAPA PRODUCTIVA"}
        </span>
      </td>
      {/* Carga Horaria eliminada por requerimiento */}
      {/* Estado (Toggle) */}
      <td className="px-4 py-3">
        <EstadoToggle 
          activo={isActivo} 
          onChange={onToggleEstado}
          instructorId={instructor.id}
        />
      </td>
      {/* Acciones */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onActividad?.(instructor)}
            className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Ver actividades"
          >
            Actividad
          </button>
          <button
            type="button"
            onClick={() => onFichas?.(instructor)}
            className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Ver fichas asignadas"
          >
            Fichas
          </button>
          <button
            type="button"
            onClick={() => onView?.(instructor)}
            className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Ver información"
          >
            Info
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function InstructorTable({
  instructores = [],
  loading,
  onView,
  onFichas,
  onActividad,
   onExportExcel,
  onToggleEstado,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Filtrar instructores basado en búsqueda por cédula o nombre completo
  const filteredInstructores = instructores.filter(instructor => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const nombreCompleto = `${instructor.nombre} ${instructor.apellidos}`.toLowerCase();
    return (
      nombreCompleto.includes(term) ||
      instructor.documento.toLowerCase().includes(term)
    );
  });

  // Paginación
  const totalPages = Math.ceil(filteredInstructores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredInstructores.slice(startIndex, endIndex);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {["Documento", "Nombre", "Rol", "Contrato", "Área", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
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
  if (!instructores.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No se encontraron instructores
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Intenta ajustar los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Búsqueda y descarga */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <Input
              type="text"
              placeholder="Buscar por nombre o documento..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
          </div>
          <Button
            onClick={() => onExportExcel?.()}
            variant="outline"
            size="sm"
            title="Descargar en Excel"
          >
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

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
                Rol
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contrato
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Área
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((instructor) => (
              <InstructorRow
                key={instructor.id}
                instructor={instructor}
                onView={onView}
                onFichas={onFichas}
                onActividad={onActividad}
                onToggleEstado={onToggleEstado}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredInstructores.length)} de {filteredInstructores.length} registros
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
