import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import {
  X,
  User,
  Briefcase,
  Building2,
  GraduationCap,
  Calendar,
  Clock,
  Edit,
  Download,
} from "lucide-react";
import { ExportService } from "../services/ExportService";
import { showToast } from "@/shared/notifications";

// Configuración de estados
const getEstadoConfig = (estado) => {
  const configs = {
    activo: {
      label: "Activo",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
    },
    inactivo: {
      label: "Inactivo",
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-700 dark:text-gray-400",
    },
    licencia: {
      label: "Licencia",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
    },
    vacaciones: {
      label: "Vacaciones",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
    },
  };
  return configs[estado] || configs.activo;
};

const getVinculacionConfig = (tipo) => {
  const configs = {
    planta: {
      label: "Planta",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
    },
    contrato: {
      label: "Contratista",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-400",
    },
  };
  return configs[tipo] || configs.planta;
};

export default function InstructorInfoModal({
  isOpen,
  onClose,
  instructor,
  onEdit,
}) {
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

  const estadoConfig = getEstadoConfig(instructor.estado);
  const vinculacionConfig = getVinculacionConfig(instructor.tipoVinculacion);

  const ocupacion = instructor.cargaHoraria?.ocupada
    ? Math.round((instructor.cargaHoraria.ocupada / instructor.cargaHoraria.asignada) * 100)
    : 0;

  const getOcupacionColor = () => {
    if (ocupacion >= 100) return "text-red-600 bg-red-100 dark:bg-red-900/30";
    if (ocupacion >= 80) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
    return "text-green-600 bg-green-100 dark:bg-green-900/30";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {instructor.nombre} {instructor.apellidos}
        </h2>

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {instructor.nombre?.charAt(0)}
              {instructor.apellidos?.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {instructor.nombre} {instructor.apellidos}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Documento: {instructor.documento}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${estadoConfig.bg} ${estadoConfig.text}`}>
                  {estadoConfig.label}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${vinculacionConfig.bg} ${vinculacionConfig.text}`}>
                  {vinculacionConfig.label}
                </span>
              </div>
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
        <div className="flex-1 overflow-y-auto pt-4 space-y-6">
          {/* Datos personales */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Datos Personales
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Documento
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {instructor.tipoDocumento} {instructor.documento}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Correo
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {instructor.email}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Celular
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {instructor.celular || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Información laboral */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              Información Laboral
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Rol
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {instructor.rol}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Especialidad
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {instructor.especialidad || "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Sede
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.sede?.nombre || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Área
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.area?.nombre || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              Fechas
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Fecha Ingreso
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {instructor.fechaIngreso
                    ? new Date(instructor.fechaIngreso).toLocaleDateString("es-CO")
                    : "N/A"}
                </p>
              </div>
              {instructor.tipoVinculacion === "contrato" && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Fin Contrato
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.fechaFinContrato
                      ? new Date(instructor.fechaFinContrato).toLocaleDateString("es-CO")
                      : "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Carga Horaria */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              Carga Horaria
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {instructor.cargaHoraria?.ocupada || 0} / {instructor.cargaHoraria?.asignada || 40} horas
                </span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded ${getOcupacionColor()}`}>
                  {ocupacion}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    ocupacion >= 100
                      ? "bg-red-500"
                      : ocupacion >= 80
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(ocupacion, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>
                  Disponible: {(instructor.cargaHoraria?.asignada || 40) - (instructor.cargaHoraria?.ocupada || 0)}h
                </span>
                <span>Fichas: {instructor.fichasAsignadas?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
