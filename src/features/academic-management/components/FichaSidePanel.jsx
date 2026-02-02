import React from "react";
import { X, Calendar, Users, BookOpen, Clock, Activity, Eye } from "lucide-react";

export default function FichaSidePanel({
  isOpen,
  onClose,
  ficha,
  onViewLearners,
  onViewInstructors,
  onViewSchedule,
}) {
  if (!isOpen || !ficha) return null;

  const estadoConfig = {
    "EN EJECUCIÓN": {
      label: "En ejecución",
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
    "TERMINADA POR FECHA": {
      label: "Terminada",
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },
    CANCELADA: {
      label: "Cancelada",
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },
  }[ficha.state] || {
    label: ficha.state || "Sin estado",
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "bg-slate-500",
  };

  const jornada = ficha.shift || ficha.jornada || "Sin jornada";
  const modalidad = ficha.modality || ficha.modalidad || "Sin modalidad";
  const cupoMaximo = ficha.maxCapacity ?? ficha.cupoMaximo ?? 0;
  const cuposDisponibles = ficha.availableSlots ?? Math.max(cupoMaximo - (ficha.learnerCount || 0), 0);
  const trimestreActual = ficha.currentTrimester || 1;
  const avance = ficha.progress || 0;
  const totalInstructores = ficha.instructorCount || 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 z-30"
        onClick={onClose}
      />

      {/* Panel lateral */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-5 flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold truncate">Ficha {ficha.code}</h2>
              <div
                className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${estadoConfig.bg} ${estadoConfig.text} bg-opacity-90`}
              >
                <span className={`w-2 h-2 rounded-full ${estadoConfig.dot}`} />
                {estadoConfig.label}
              </div>
            </div>
            <p className="text-sm text-blue-100 truncate flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {ficha.program}
            </p>
            <p className="text-xs text-blue-100/90 mt-1">
              {jornada} • {modalidad}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-6">
          {/* Resumen académico */}
          <section>
            <h3 className="text-xs font-semibold tracking-wide text-slate-500 uppercase mb-3">
              Resumen académico
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Fechas</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {ficha.startDate} 
                    {ficha.endDate && ` – ${ficha.endDate}`}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Trimestre actual</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {trimestreActual}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Cupos</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {cuposDisponibles} / {cupoMaximo}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-slate-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Avance del programa</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${Math.min(Math.max(avance, 0), 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {avance}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Indicadores rápidos */}
          <section>
            <h3 className="text-xs font-semibold tracking-wide text-slate-500 uppercase mb-3">
              Indicadores rápidos
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500">Aprendices</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {ficha.learnerCount}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500">Instructores</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {totalInstructores}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500">Estado</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {ficha.state}
                </p>
              </div>
            </div>
          </section>

          {/* Acciones */}
          <section>
            <h3 className="text-xs font-semibold tracking-wide text-slate-500 uppercase mb-3">
              Acciones
            </h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onViewLearners?.(ficha)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Ver aprendices
              </button>
              <button
                type="button"
                onClick={() => onViewInstructors?.(ficha)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                Ver instructores
              </button>
              <button
                type="button"
                onClick={() => onViewSchedule?.(ficha)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Ver horarios
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
