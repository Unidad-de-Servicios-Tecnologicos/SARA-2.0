import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import {
  X,
  User,
  Mail,
  Phone,
  FileText,
  History,
  BookOpen,
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
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
    "EN FORMACIÓN": {
      label: "En Formación",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: CheckCircle2,
    },
    "CERTIFICADO": {
      label: "Certificado",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      icon: CheckCircle2,
    },
    "RETIRADO": {
      label: "Retirado",
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      icon: X,
    },
  };
  return configs[estado] || configs["EN FORMACIÓN"];
};

/* =======================
   TABS DEL MODAL
======================= */
// Tabs
const TABS = [
  { id: "informacion", label: "Información", icon: User },
  { id: "fichas", label: "Fichas Asignadas", icon: BookOpen },
  { id: "practicas", label: "Prácticas", icon: Briefcase },
  { id: "seguimiento", label: "Seguimiento", icon: Award },
  { id: "historial", label: "Historial", icon: History },
];

/* =======================
   COMPONENTE MODAL
======================= */
export default function LearnerDetailModal({
  isOpen,
  onClose,
  learner,
  onEdit,
}) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [isExporting, setIsExporting] = useState(false);

  if (!learner) return null;

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await ExportService.exportLearnerPDF(learner);
      showToast.success("Aprendiz exportado correctamente");
    } catch (error) {
      showToast.error(error.message || "Error al exportar");
    } finally {
      setIsExporting(false);
    }
  };

  const estadoConfig = getEstadoConfig(learner.state);
  const EstadoIcon = estadoConfig.icon;

  /* =======================
     TAB INFORMACIÓN
  ======================= */
  const renderInformacionTab = () => (
    <div className="space-y-6">
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
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {learner.document}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Nombre Completo
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {learner.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Correo
              </span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {learner.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Celular
              </span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {learner.phone || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información académica */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-500" />
          Información Académica
        </h4>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Ficha ID
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {learner.fichaId}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Programa
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {learner.program}
            </p>
          </div>
        </div>
      </div>

      {/* Desempeño */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-500" />
          Desempeño
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Desempeño Académico
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  learner.academicPerformance === "Excelente"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : learner.academicPerformance === "Bueno"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {learner.academicPerformance}
              </span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Asistencia
            </span>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {learner.attendance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* =======================
     TAB FICHAS ASIGNADAS
  ======================= */
  const renderFichasTab = () => (
    <div className="space-y-3">
      {learner.fichas && learner.fichas.length > 0 ? (
        learner.fichas.map((ficha) => (
          <div
            key={ficha.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {ficha.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {ficha.jornada} • {ficha.estado}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {ficha.estado}
            </span>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Sin fichas asignadas</p>
        </div>
      )}
    </div>
  );

  /* =======================
     TAB PRÁCTICAS
  ======================= */
  const renderPracticasTab = () => (
    <div className="space-y-3">
      {learner.practices && learner.practices.length > 0 ? (
        learner.practices.map((practice) => (
          <div
            key={practice.id}
            className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {practice.company}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {practice.supervisor}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  practice.estado === "Completada"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {practice.estado}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <span>Inicio: {new Date(practice.startDate).toLocaleDateString("es-CO")}</span>
              <span>Fin: {new Date(practice.endDate).toLocaleDateString("es-CO")}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Sin prácticas registradas</p>
        </div>
      )}
    </div>
  );

  /* =======================
     TAB SEGUIMIENTO
  ======================= */
  const renderSeguimientoTab = () => (
    <div className="space-y-3">
      {learner.attendance_records && learner.attendance_records.length > 0 ? (
        learner.attendance_records.map((record, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  record.status === "Presente"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                <Clock
                  className={`w-4 h-4 ${
                    record.status === "Presente"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(record.date).toLocaleDateString("es-CO")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {record.hour}
                </p>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              record.status === "Presente"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {record.status}
            </span>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">Sin registros de asistencia</p>
        </div>
      )}
    </div>
  );

  /* =======================
     TAB HISTORIAL
  ======================= */
  const renderHistorialTab = () => (
    <div className="space-y-3">
      {learner.state_history && learner.state_history.length > 0 ? (
        learner.state_history.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <History className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.action}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </p>
            </div>
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
      <DialogContent hideCloseButton>
        <div className="w-full max-w-4xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-4 border-b dark:border-gray-700 gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                {learner.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {learner.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {learner.document}
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
                onClick={() => onEdit?.(learner)}
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

        {/* =======================
           RENDER
        ======================= */}
        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700 px-4 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
          {activeTab === "informacion" && renderInformacionTab()}
          {activeTab === "fichas" && renderFichasTab()}
          {activeTab === "practicas" && renderPracticasTab()}
          {activeTab === "seguimiento" && renderSeguimientoTab()}
          {activeTab === "historial" && renderHistorialTab()}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
