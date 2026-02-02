import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  BookOpen,
  Clock,
  Eye,
  Activity,
  Award,
  FileText,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const getEstadoConfig = (estado) => {
  const configs = {
    activo: {
      label: "Activo",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      dot: "bg-green-500",
    },
    inactivo: {
      label: "Inactivo",
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-700 dark:text-gray-400",
      dot: "bg-gray-500",
    },
    licencia: {
      label: "En Licencia",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
      dot: "bg-yellow-500",
    },
    vacaciones: {
      label: "Vacaciones",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    incapacidad: {
      label: "Incapacidad",
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      dot: "bg-red-500",
    },
  };
  return configs[estado?.toLowerCase()] || configs.activo;
};

const getVinculacionConfig = (tipo) => {
  const configs = {
    planta: {
      label: "Planta",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    contratista: {
      label: "Contratista",
      color: "text-orange-600 dark:text-orange-400",
    },
  };
  return configs[tipo?.toLowerCase()] || configs.planta;
};

export default function InstructorSidePanel({
  isOpen,
  onClose,
  instructor,
  onViewFichas,
  onViewActivities,
}) {
  if (!isOpen || !instructor) return null;

  const estadoConfig = getEstadoConfig(instructor.estado);
  const vinculacionConfig = getVinculacionConfig(instructor.tipoVinculacion);

  const initials = `${instructor.nombre?.charAt(0) || ""}${
    instructor.apellidos?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-transparent z-20"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-white dark:bg-gray-900 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 border-b border-blue-700/30">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold truncate">
                  {instructor.nombre} {instructor.apellidos}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${estadoConfig.bg} ${estadoConfig.text}`}>
                    <span className={`w-2 h-2 rounded-full ${estadoConfig.dot}`} />
                    {estadoConfig.label}
                  </div>
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  {instructor.area?.nombre || "Sin área"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Datos Personales */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
              Datos Personales
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Tipo y Número de Documento
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.tipoDocumento} {instructor.documento}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Correo Institucional
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {instructor.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Teléfono
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.celular}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Vinculación
                  </p>
                  <p className={`text-sm font-medium ${vinculacionConfig.color}`}>
                    {vinculacionConfig.label}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Datos Académicos */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
              Datos Académicos
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Área de Formación
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.area?.nombre || "Sin asignación"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Formación Académica
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.formacionAcademica || "Sin información"}
                  </p>
                </div>
              </div>

              {instructor.certificaciones && instructor.certificaciones.length > 0 && (
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Certificaciones
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {instructor.certificaciones.map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                        >
                          <Award className="w-3 h-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Resumen Operativo */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
              Resumen Operativo
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Fichas Asignadas */}
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Fichas Asignadas
                    </p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {instructor.fichasAsignadas?.length || 0}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-400 opacity-50" />
                </div>
              </div>

              {/* Horas Semanales */}
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Horas Semanales
                    </p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      {instructor.cargaHoraria?.asignada || 0}h
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-400 opacity-50" />
                </div>
              </div>

              {/* Ocupación */}
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Ocupación
                  </p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    {instructor.cargaHoraria?.porcentajeOcupacion || 0}%
                  </p>
                </div>
              </div>

              {/* Disponible */}
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Horas Disponibles
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {instructor.cargaHoraria?.disponible || 0}h
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Acciones */}
          <section className="space-y-2">
            <Button
              onClick={() => {
                onViewFichas?.();
                onClose();
              }}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver Fichas Asignadas
            </Button>
            <Button
              onClick={() => {
                onViewActivities?.();
                onClose();
              }}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Activity className="w-4 h-4" />
              Ver Actividades
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
