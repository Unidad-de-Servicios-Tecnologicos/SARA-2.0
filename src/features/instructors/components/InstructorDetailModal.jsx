import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  MapPin,
  GraduationCap,
  BookOpen,
  Clock,
  FileText,
  History,
  AlertCircle,
  Edit,
  Download,
  ChevronRight,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useFichasInstructor, useNovedadesInstructor } from "../hooks/UseInstructors";
import { ExportService } from "../services/ExportService";
import { showToast } from "@/shared/notifications";

// Configuración de estados
const getEstadoConfig = (estado) => {
  const configs = {
    activo: { 
      label: "Activo", 
      bg: "bg-green-100 dark:bg-green-900/30", 
      text: "text-green-700 dark:text-green-400",
      icon: CheckCircle2
    },
    inactivo: { 
      label: "Inactivo", 
      bg: "bg-gray-100 dark:bg-gray-800", 
      text: "text-gray-700 dark:text-gray-400",
      icon: XCircle
    },
    licencia: { 
      label: "Licencia", 
      bg: "bg-yellow-100 dark:bg-yellow-900/30", 
      text: "text-yellow-700 dark:text-yellow-400",
      icon: AlertTriangle
    },
    vacaciones: { 
      label: "Vacaciones", 
      bg: "bg-blue-100 dark:bg-blue-900/30", 
      text: "text-blue-700 dark:text-blue-400",
      icon: Calendar
    },
    incapacidad: { 
      label: "Incapacidad", 
      bg: "bg-red-100 dark:bg-red-900/30", 
      text: "text-red-700 dark:text-red-400",
      icon: AlertCircle
    },
  };
  return configs[estado] || configs.activo;
};

const getVinculacionConfig = (tipo) => {
  const configs = {
    planta: { label: "Planta", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
    contrato: { label: "Contratista", bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400" },
  };
  return configs[tipo] || configs.planta;
};

// Tabs
const TABS = [
  { id: "info", label: "Información", icon: User },
  { id: "fichas", label: "Fichas Asignadas", icon: Users },
  { id: "novedades", label: "Novedades", icon: AlertCircle },
  { id: "historial", label: "Historial", icon: History },
];

export default function InstructorDetailModal({ isOpen, onClose, instructor, onEdit }) {
  const [activeTab, setActiveTab] = useState("info");
  const [isExporting, setIsExporting] = useState(false);
  const { fichas, loading: loadingFichas } = useFichasInstructor(instructor?.id);
  const { novedades, loading: loadingNovedades } = useNovedadesInstructor(instructor?.id);

  if (!instructor) return null;

  // Función para exportar instructor
  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await ExportService.exportInstructorPDF(instructor, fichas);
      showToast.success("Instructor exportado correctamente");
    } catch (error) {
      showToast.error(error.message || "Error al exportar");
    } finally {
      setIsExporting(false);
    }
  };

  const estadoConfig = getEstadoConfig(instructor.estado);
  const vinculacionConfig = getVinculacionConfig(instructor.tipoVinculacion);
  const EstadoIcon = estadoConfig.icon;

  const ocupacion = instructor.cargaHoraria?.ocupada 
    ? Math.round((instructor.cargaHoraria.ocupada / instructor.cargaHoraria.asignada) * 100)
    : 0;

  const getOcupacionColor = () => {
    if (ocupacion >= 100) return "text-red-600 bg-red-100";
    if (ocupacion >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const renderInfoTab = () => (
    <div className="space-y-6">
      {/* Datos personales */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          Datos Personales
        </h4>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Documento</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {instructor.tipoDocumento} {instructor.documento}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Nombre Completo</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {instructor.nombre} {instructor.apellidos}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Correo</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{instructor.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Celular</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{instructor.celular || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vinculación */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-500" />
          Vinculación
        </h4>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Tipo Vinculación</span>
              <span className={`block text-sm px-2 py-0.5 rounded-full ${vinculacionConfig.bg} ${vinculacionConfig.text} w-fit mt-0.5`}>
                {vinculacionConfig.label}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Rol</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{instructor.rol}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Sede</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{instructor.sede?.nombre || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Área</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{instructor.area?.nombre || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fechas */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          Fechas
        </h4>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Fecha Ingreso</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {instructor.fechaIngreso ? new Date(instructor.fechaIngreso).toLocaleDateString("es-CO") : "N/A"}
            </p>
          </div>
          {instructor.tipoVinculacion === "contrato" && (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Fin Contrato</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {instructor.fechaFinContrato ? new Date(instructor.fechaFinContrato).toLocaleDateString("es-CO") : "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Carga Horaria */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
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
                ocupacion >= 100 ? "bg-red-500" : ocupacion >= 80 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(ocupacion, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Disponible: {(instructor.cargaHoraria?.asignada || 40) - (instructor.cargaHoraria?.ocupada || 0)}h</span>
            <span>Fichas: {instructor.fichasAsignadas?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Formación académica */}
      {instructor.formacionAcademica && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            Formación Académica
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">{instructor.formacionAcademica}</p>
          </div>
        </div>
      )}

      {/* Competencias */}
      {instructor.competencias?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            Competencias ({instructor.competencias.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {instructor.competencias.map((comp, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderFichasTab = () => (
    <div className="space-y-3">
      {loadingFichas ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : fichas?.length > 0 ? (
        fichas.map((ficha) => (
          <div
            key={ficha.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Ficha {ficha.numero}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {ficha.programa} • {ficha.jornada}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{ficha.horasAsignadas}h</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Sin fichas asignadas</p>
        </div>
      )}
    </div>
  );

  const renderNovedadesTab = () => (
    <div className="space-y-3">
      {loadingNovedades ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : novedades?.length > 0 ? (
        novedades.map((novedad) => (
          <div
            key={novedad.id}
            className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                novedad.tipo === "licencia" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                novedad.tipo === "vacaciones" ? "bg-blue-100 dark:bg-blue-900/30" :
                novedad.tipo === "incapacidad" ? "bg-red-100 dark:bg-red-900/30" :
                "bg-gray-100 dark:bg-gray-700"
              }`}>
                <AlertCircle className={`w-4 h-4 ${
                  novedad.tipo === "licencia" ? "text-yellow-600" :
                  novedad.tipo === "vacaciones" ? "text-blue-600" :
                  novedad.tipo === "incapacidad" ? "text-red-600" :
                  "text-gray-600"
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {novedad.tipo}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(novedad.fechaInicio).toLocaleDateString("es-CO")}
                    {novedad.fechaFin && ` - ${new Date(novedad.fechaFin).toLocaleDateString("es-CO")}`}
                  </span>
                </div>
                {novedad.observaciones && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {novedad.observaciones}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Sin novedades registradas</p>
        </div>
      )}
    </div>
  );

  const renderHistorialTab = () => (
    <div className="space-y-3">
      {instructor.historialAsignaciones?.length > 0 ? (
        instructor.historialAsignaciones.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <History className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.accion}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.detalle}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(item.fecha).toLocaleDateString("es-CO")}
            </span>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <History className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Sin historial registrado</p>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogTitle>
          {instructor.nombre} {instructor.apellidos}
        </DialogTitle>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {instructor.nombre?.charAt(0)}{instructor.apellidos?.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${estadoConfig.bg} ${estadoConfig.text}`}>
                  <EstadoIcon className="w-3 h-3" />
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
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
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
          {activeTab === "info" && renderInfoTab()}
          {activeTab === "fichas" && renderFichasTab()}
          {activeTab === "novedades" && renderNovedadesTab()}
          {activeTab === "historial" && renderHistorialTab()}
        </div>
      </div>
    </Dialog>
  );
}
