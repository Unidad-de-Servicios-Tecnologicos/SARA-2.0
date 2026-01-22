import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Clock, FileText, CheckCircle, AlertCircle, Edit, Download, X } from "lucide-react";
import { mockActividadesInstructor } from "../mock/instructors.mock";
import { ExportService } from "../services/ExportService";
import { showToast } from "@/shared/notifications";

// Estado badge helper
const getEstadoBadge = (estado) => {
  const config = {
    "en curso": { 
      className: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      icon: AlertCircle
    },
    "completado": { 
      className: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      icon: CheckCircle
    },
    "pausado": { 
      className: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      icon: Clock
    },
  };
  return config[estado] || config["en curso"];
};

export default function InstructorActivitiesModal({ isOpen, onClose, instructor, onEdit }) {
  const [filterEstado, setFilterEstado] = useState("todas");
  const [isExporting, setIsExporting] = useState(false);

  if (!instructor) return null;

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await ExportService.exportInstructorPDF(instructor);
      showToast.success("Información exportada correctamente");
    } catch (error) {
      showToast.error(error.message || "Error al exportar");
    } finally {
      setIsExporting(false);
    }
  };

  // Obtener actividades del instructor
  const actividades = mockActividadesInstructor[instructor.id] || [];
  
  // Filtrar actividades
  const actividadesFiltradas = filterEstado === "todas" 
    ? actividades 
    : actividades.filter(a => a.estado === filterEstado);

  // Estadísticas
  const stats = {
    total: actividades.length,
    enCurso: actividades.filter(a => a.estado === "en curso").length,
    completadas: actividades.filter(a => a.estado === "completado").length,
    horasSemanales: actividades.reduce((sum, a) => sum + a.horasSemana, 0),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton={true}>
      <DialogContent hideCloseButton={true}>
        <div className="w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pl-6 pr-3 py-6 pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {instructor.nombre?.charAt(0)}
              {instructor.apellidos?.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {instructor.nombre} {instructor.apellidos}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Documento: {instructor.documento}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onEdit?.(instructor)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              disabled={isExporting}
              className={`p-2 rounded-lg transition-colors ${
                isExporting
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title="Exportar"
            >
              <Download className={`w-5 h-5 ${isExporting ? "animate-spin" : ""}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Tarjetas de estadísticas */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Actividades</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">En Curso</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.enCurso}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Completadas</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.completadas}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Horas/Semana</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.horasSemanales}</p>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
              Filtrar por estado:
            </label>
            <div className="flex gap-2 flex-wrap">
              {["todas", "en curso", "completado", "pausado"].map((estado) => (
                <button
                  key={estado}
                  onClick={() => setFilterEstado(estado)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterEstado === estado
                      ? "bg-blue-600 text-white dark:bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {estado === "todas" ? "Todas" : estado.charAt(0).toUpperCase() + estado.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tabla de actividades */}
          <div className="px-6 py-4">
            {actividadesFiltradas.length > 0 ? (
              <div className="space-y-3">
                {actividadesFiltradas.map((actividad) => {
                  const EstadoIcon = getEstadoBadge(actividad.estado).icon;
                  return (
                    <div
                      key={actividad.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:bg-gray-700/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {actividad.titulo}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getEstadoBadge(actividad.estado).className}`}>
                              <EstadoIcon className="w-3 h-3" />
                              {actividad.estado.charAt(0).toUpperCase() + actividad.estado.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {actividad.descripcion}
                          </p>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <FileText className="w-4 h-4" />
                              <span>Ficha: {actividad.ficha}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{actividad.horasSemana} horas/semana</span>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                              Desde: {new Date(actividad.fecha).toLocaleDateString('es-CO')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {actividades.length === 0 
                    ? "No hay actividades registradas para este instructor"
                    : "No hay actividades que coincidan con el filtro seleccionado"}
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
