import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import {
  X,
  BookOpen,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Zap,
  Target,
  Edit,
  Download,
} from "lucide-react";
import { ExportService } from "../services/ExportService";
import { showToast } from "@/shared/notifications";

/* =======================
   CONFIGURACIÓN DE ESTADOS
======================= */
const getEstadoConfig = (estado) => {
  const configs = {
    "en curso": {
      label: "En Curso",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: Clock,
    },
    completado: {
      label: "Completado",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      icon: CheckCircle2,
    },
    pausado: {
      label: "Pausado",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
      icon: AlertCircle,
    },
  };
  return configs[estado] || configs["en curso"];
};

/* =======================
   TABS DEL MODAL
======================= */
const TABS = [
  { id: "resumen", label: "Resumen", icon: BarChart3 },
  { id: "detalle", label: "Detalle", icon: BookOpen },
  { id: "horarios", label: "Horarios", icon: Clock },
  { id: "aprendices", label: "Aprendices", icon: Users },
];

/* =======================
   COMPONENTE MODAL
======================= */
export default function InstructorActivitiesDetailModal({
  isOpen,
  onClose,
  activity,
  instructor,
  onEdit,
}) {
  const [activeTab, setActiveTab] = useState("resumen");
  const [isExporting, setIsExporting] = useState(false);

  if (!activity || !instructor) return null;

  /* =======================
     EXPORTAR
  ======================= */
  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await ExportService.exportActivityPDF(activity, instructor);
      showToast.success("Actividad exportada correctamente");
    } catch (error) {
      showToast.error(error.message || "Error al exportar");
    } finally {
      setIsExporting(false);
    }
  };

  const estadoConfig = getEstadoConfig(activity.estado);
  const EstadoIcon = estadoConfig.icon;

  // Calcular progreso
  const progreso = activity.horasCompletadas
    ? Math.round((activity.horasCompletadas / activity.horasTotal) * 100)
    : 0;

  /* =======================
     TAB RESUMEN
  ======================= */
  const renderResumenTab = () => (
    <div className="space-y-6">
      {/* Información general */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gray-500" />
          Información General
        </h4>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Nombre Actividad
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.nombre}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Tipo Actividad
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
              {activity.tipo}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Fecha Inicio
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(activity.fechaInicio).toLocaleDateString("es-CO")}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Fecha Fin
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.fechaFin
                ? new Date(activity.fechaFin).toLocaleDateString("es-CO")
                : "Sin fecha"}
            </p>
          </div>
        </div>
      </div>

      {/* Carga horaria */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          Carga Horaria
        </h4>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {activity.horasCompletadas || 0} / {activity.horasTotal || 0} horas
            </span>
            <span className="text-sm font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {progreso}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${Math.min(progreso, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Horas/Semana: {activity.horasSemana}</span>
            <span>Duración: {activity.duracionSemanas} semanas</span>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-gray-500" />
          Estadísticas
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Aprendices Inscritos
            </span>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {activity.aprendicesInscritos || 0}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Completado
            </span>
            <p className="text-2xl font-bold text-green-600 mt-1">{progreso}%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Calificación Promedio
            </span>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {activity.calificacionPromedio || "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Asistencia
            </span>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {activity.asistencia || "0"}%
            </p>
          </div>
        </div>
      </div>

      {/* Descripción */}
      {activity.descripcion && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Descripción
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {activity.descripcion}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  /* =======================
     TAB DETALLE
  ======================= */
  const renderDetalleTab = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Objetivos
        </h5>
        <ul className="space-y-2">
          {(activity.objetivos || []).map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Target className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Contenidos
        </h5>
        <ul className="space-y-2">
          {(activity.contenidos || []).map((con, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <BookOpen className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Metodología
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {activity.metodologia || "No especificada"}
        </p>
      </div>
    </div>
  );

  /* =======================
     TAB HORARIOS
  ======================= */
  const renderHorariosTab = () => (
    <div className="space-y-3">
      {(activity.horarios || []).length > 0 ? (
        activity.horarios.map((horario, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {horario.dia}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Salón: {horario.salon}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {horario.horaInicio} - {horario.horaFin}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">
            Sin horarios registrados
          </p>
        </div>
      )}
    </div>
  );

  /* =======================
     TAB APRENDICES
  ======================= */
  const renderAprendicesTab = () => (
    <div className="space-y-3">
      {(activity.aprendices || []).length > 0 ? (
        activity.aprendices.map((aprendiz) => (
          <div
            key={aprendiz.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold">
                {aprendiz.nombre?.charAt(0)}{aprendiz.apellido?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {aprendiz.nombre} {aprendiz.apellido}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {aprendiz.documento}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  aprendiz.asistencia >= 80
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                }`}
              >
                {aprendiz.asistencia}%
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">
            Sin aprendices inscritos
          </p>
        </div>
      )}
    </div>
  );

  /* =======================
     RENDER
  ======================= */
  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {activity.nombre}
        </h2>

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              <Zap className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {instructor.nombre} {instructor.apellidos}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${estadoConfig.bg} ${estadoConfig.text}`}
                >
                  <EstadoIcon className="w-3 h-3" />
                  {estadoConfig.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onEdit?.(activity)}
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

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700 mt-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-600 text-orange-600 dark:text-orange-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "resumen" && renderResumenTab()}
          {activeTab === "detalle" && renderDetalleTab()}
          {activeTab === "horarios" && renderHorariosTab()}
          {activeTab === "aprendices" && renderAprendicesTab()}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
