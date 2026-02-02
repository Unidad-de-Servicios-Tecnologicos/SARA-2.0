import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Award, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function RapsModal({ isOpen, onClose, learner }) {
  if (!learner) return null;

  const rapsAprobados = learner.juiciosAprobados || 0;
  const rapsPendientes = learner.juiciosPorEvaluar || 0;
  const rapsTotal = (learner.raps?.length || 0) + rapsAprobados + rapsPendientes;

  const mockRaps = [
    { id: 1, nombre: "RAP-01: Introducción a la programación", estado: "Aprobado", calificacion: 4.5 },
    { id: 2, nombre: "RAP-02: Variables y tipos de datos", estado: "Aprobado", calificacion: 4.2 },
    { id: 3, nombre: "RAP-03: Estructuras de control", estado: "Aprobado", calificacion: 4.8 },
    { id: 4, nombre: "RAP-04: Funciones", estado: "Aprobado", calificacion: 4.0 },
    { id: 5, nombre: "RAP-05: Arreglos y listas", estado: "Pendiente", calificacion: null },
    { id: 6, nombre: "RAP-06: Orientación a objetos", estado: "Por evaluar", calificacion: null },
  ];

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "Aprobado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            Aprobado
          </span>
        );
      case "Pendiente":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
            <AlertCircle className="w-4 h-4" />
            Pendiente
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
            <Clock className="w-4 h-4" />
            Por evaluar
          </span>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            RAPS de {learner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de RAPS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-linear-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-700">{rapsAprobados}</span>
                <span className="text-xs text-green-600 font-medium">Aprobados</span>
              </div>
            </div>
            <div className="p-4 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-yellow-700">{rapsPendientes}</span>
                <span className="text-xs text-yellow-600 font-medium">Pendientes</span>
              </div>
            </div>
            <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-700">{rapsTotal}</span>
                <span className="text-xs text-blue-600 font-medium">Total</span>
              </div>
            </div>
          </div>

          {/* Lista de RAPS */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {mockRaps.map((rap) => (
              <div
                key={rap.id}
                className="p-4 border-l-4 border-l-blue-500 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {rap.nombre}
                    </h4>
                  </div>
                  {getEstadoBadge(rap.estado)}
                </div>
                {rap.calificacion && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Calificación</span>
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {rap.calificacion}/5.0
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-green-500 to-green-400 rounded-full"
                        style={{ width: `${(rap.calificacion / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Footer */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Nota:</strong> Los RAPS (Resultados de Aprendizaje Programados) son los logros que el aprendiz debe alcanzar en su proceso de formación.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
