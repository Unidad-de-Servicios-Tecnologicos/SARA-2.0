import React from "react";
import { useLocation } from "react-router-dom";
import { Users, AlertCircle } from "lucide-react";

export default function LearnerDetailPage() {
  const location = useLocation();
  const ficha = location.state?.ficha;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Users className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Aprendices
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {ficha ? `Ficha ${ficha.numero} - ${ficha.programa?.nombre}` : "Gestión de aprendices"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Página en desarrollo
            </h2>
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Esta sección está en proceso de implementación.
            {ficha && ` Mostrará la lista de aprendices para la ficha ${ficha.numero}.`}
          </p>

          {ficha && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Información de la ficha:
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Código:</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{ficha.numero}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Aprendices:</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    {ficha.aprendicesActivos} / {ficha.aprendicesTotal}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
