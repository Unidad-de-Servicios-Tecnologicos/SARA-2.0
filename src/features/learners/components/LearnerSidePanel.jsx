import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Eye,
  FileText,
  ClipboardList,
} from "lucide-react";
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
    "EN PRÁCTICA": {
      label: "En Práctica",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-400",
      icon: Briefcase,
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
    "CANCELADO": {
      label: "Cancelado",
      bg: "bg-gray-100 dark:bg-gray-900/30",
      text: "text-gray-700 dark:text-gray-400",
      icon: X,
    },
  };
  return configs[estado] || configs["EN FORMACIÓN"];
};

/* =======================
   COMPONENTE PANEL LATERAL
======================= */
export default function LearnerSidePanel({
  isOpen,
  onClose,
  learner,
  onViewRaps,
  onViewSchedule,
  onRegisterObservation,
  onViewDocuments,
}) {
  if (!learner) return null;

  // Handlers para acciones rápidas
  const handleViewRaps = () => {
    if (onViewRaps) {
      onViewRaps(learner);
    } else {
      showToast.info(`Ver RAPS de ${learner.name}`);
    }
  };

  const handleViewSchedule = () => {
    if (onViewSchedule) {
      onViewSchedule(learner);
    } else {
      showToast.info(`Ver horario de ${learner.name}`);
    }
  };

  const handleRegisterObservation = () => {
    if (onRegisterObservation) {
      onRegisterObservation(learner);
    } else {
      showToast.info(`Registrar observación para ${learner.name}`);
    }
  };

  const handleViewDocuments = () => {
    if (onViewDocuments) {
      onViewDocuments(learner);
    } else {
      showToast.info(`Ver documentos de ${learner.name}`);
    }
  };

  const estadoConfig = getEstadoConfig(learner.state);
  const EstadoIcon = estadoConfig.icon;

  // Calcular totales de RAPS
  const rapsAprobados = learner.juiciosAprobados || 0;
  const rapsPendientes = learner.juiciosPorEvaluar || 0;
  const rapsTotal = (learner.raps?.length || 0) + rapsAprobados + rapsPendientes;

  // Formato de porcentaje de asistencia
  const asistencia = parseInt(learner.attendance) || 0;

  return (
    <>
      {/* Panel lateral */}
      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-white dark:bg-gray-900 shadow-2xl z-30 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ===== ENCABEZADO ===== */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 z-50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {learner.name?.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                  {learner.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${estadoConfig.bg} ${estadoConfig.text}`}
                  >
                    <EstadoIcon className="w-3 h-3" />
                    {estadoConfig.label}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Información rápida del encabezado */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Ficha:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{learner.fichaId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Programa:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{learner.program}</span>
            </div>
          </div>
        </div>

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <div className="divide-y dark:divide-gray-700">
          {/* ===== SECCIÓN: DATOS PERSONALES ===== */}
          <section className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Datos Personales
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Documento:</span>
                <span className="font-medium text-gray-900 dark:text-white">{learner.document}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Correo:</span>
                <span className="font-medium text-gray-900 dark:text-white truncate">
                  {learner.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Teléfono:</span>
                <span className="font-medium text-gray-900 dark:text-white">{learner.phone || "N/A"}</span>
              </div>
              {learner.jornada && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Jornada:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{learner.jornada}</span>
                </div>
              )}
              {learner.modalidad && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Modalidad:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{learner.modalidad}</span>
                </div>
              )}
            </div>
          </section>

          {/* ===== SECCIÓN: DATOS ACADÉMICOS ===== */}
          <section className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              Datos Académicos
            </h3>
            <div className="space-y-2 text-sm">
              {learner.startDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Inicio:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(learner.startDate).toLocaleDateString("es-CO")}
                  </span>
                </div>
              )}
              {learner.estimatedEndDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fin estimado:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(learner.estimatedEndDate).toLocaleDateString("es-CO")}
                  </span>
                </div>
              )}
              {learner.trimesterActual && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Trimestre:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {learner.trimesterActual}
                  </span>
                </div>
              )}
              {learner.instructorLeader && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Instructor líder:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {learner.instructorLeader}
                  </span>
                </div>
              )}
              {learner.centerFormacion && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Centro de formación:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {learner.centerFormacion}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* ===== SECCIÓN: ESTADO DE FORMACIÓN ===== */}
          <section className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-gray-500" />
              Estado de Formación
            </h3>
            
            {/* Progreso del programa */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Avance del programa</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {learner.programProgress || 65}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${learner.programProgress || 65}%` }}
                />
              </div>
            </div>

            {/* RAPS */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                  {rapsAprobados}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Aprobados</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2">
                <div className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                  {rapsPendientes}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Pendientes</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {rapsTotal}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
              </div>
            </div>

            {/* Asistencia */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Asistencia</span>
                <span className={`text-sm font-semibold ${
                  asistencia >= 80 ? 'text-green-600 dark:text-green-400' :
                  asistencia >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {asistencia}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    asistencia >= 80 ? 'bg-green-600 dark:bg-green-500' :
                    asistencia >= 60 ? 'bg-yellow-600 dark:bg-yellow-500' :
                    'bg-red-600 dark:bg-red-500'
                  }`}
                  style={{ width: `${asistencia}%` }}
                />
              </div>
            </div>

            {/* Alertas */}
            {(learner.activeAlerts || []).length > 0 && (
              <div className="mt-3 space-y-2">
                {learner.activeAlerts.slice(0, 2).map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/40"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-red-700 dark:text-red-300">{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ===== SECCIÓN: PRÁCTICA / EMPRESA ===== */}
          <section className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              Práctica / Empresa
            </h3>

            {learner.practices && learner.practices.length > 0 ? (
              <div className="space-y-2">
                {learner.practices[0] ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Empresa:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {learner.practices[0].company}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Tipo:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {learner.practices[0].type || "Empresarial"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Estado:</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        learner.practices[0].estado === "Activa"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {learner.practices[0].estado}
                      </span>
                    </div>
                    {learner.practices[0].startDate && (
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Inicio:</span>
                        <span>{new Date(learner.practices[0].startDate).toLocaleDateString("es-CO")}</span>
                      </div>
                    )}
                  </>
                ) : null}
                {(learner.practices.length > 1) && (
                  <button className="w-full text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2">
                    Ver prácticas ({learner.practices.length})
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">No iniciada</p>
            )}
          </section>

          {/* ===== SECCIÓN: ALERTAS Y OBSERVACIONES ===== */}
          <section className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gray-500" />
              Observaciones
            </h3>

            {learner.observations && learner.observations.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {learner.observations.slice(0, 3).map((obs, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-900 dark:text-white font-medium mb-1">{obs.title}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{obs.description}</p>
                    <div className="flex justify-between text-gray-500 dark:text-gray-500 text-xs">
                      <span>{new Date(obs.date).toLocaleDateString("es-CO")}</span>
                      <span>{obs.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">Sin observaciones registradas</p>
            )}
          </section>

          {/* ===== SECCIÓN: ACCIONES RÁPIDAS ===== */}
          <section className="p-4 space-y-2 sticky bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            <button 
              onClick={handleViewRaps}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              Ver RAPS
            </button>
            <button 
              onClick={handleViewSchedule}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Ver Horario
            </button>
            <button 
              onClick={handleRegisterObservation}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              Registrar Observación
            </button>
            <button 
              onClick={handleViewDocuments}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              Ver Documentos
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
