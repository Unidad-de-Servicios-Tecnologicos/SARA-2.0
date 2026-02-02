import React, { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";

// Mock data para los RAPs alineado con SARA
const mockRAPs = [
  {
    id: 1,
    ficha: "2818588",
    competencia: "Desarrollo de software",
    rap: "Implementar soluciones de software según requerimientos",
    instructor: "MARÍA GÓMEZ",
    trimestre: "1",
    horasAsignadas: 40,
    estado: "Activo"
  },
  {
    id: 2,
    ficha: "2818588",
    competencia: "Análisis de requerimientos",
    rap: "Levantar y documentar requerimientos del cliente",
    instructor: "JUAN PÉREZ",
    trimestre: "1",
    horasAsignadas: 20,
    estado: "Activo"
  },
  {
    id: 3,
    ficha: "2818589",
    competencia: "Gestión logística",
    rap: "Planear rutas de abastecimiento",
    instructor: "CLAUDIA CAMPUZANO",
    trimestre: "2",
    horasAsignadas: 32,
    estado: "Activo"
  },
  {
    id: 4,
    ficha: "2818590",
    competencia: "Contabilización de operaciones",
    rap: "Registrar hechos económicos",
    instructor: "ADOLFO LEON LOPEZ",
    trimestre: "3",
    horasAsignadas: 40,
    estado: "Cerrado"
  }
];

export default function RAPModal({ isOpen, onClose, instructorName = "", fichaCode = "" }) {
  const [filtroTrimestre, setFiltroTrimestre] = useState("");

  const trimestresDisponibles = useMemo(() => {
    const valores = new Set(mockRAPs.map((r) => r.trimestre));
    return Array.from(valores).sort();
  }, []);

  const rapFiltrados = useMemo(() => {
    const nombreFiltro = instructorName?.toLowerCase().trim();
    const fichaFiltro = fichaCode?.toString().trim();

    return mockRAPs.filter((rap) => {
      if (nombreFiltro && !rap.instructor.toLowerCase().includes(nombreFiltro)) return false;
      if (fichaFiltro && !rap.ficha.toString().includes(fichaFiltro)) return false;
      if (filtroTrimestre && rap.trimestre !== filtroTrimestre) return false;
      return true;
    });
  }, [filtroTrimestre, instructorName, fichaCode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-5xl">
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="pb-4 border-b dark:border-gray-700 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resultados de Aprendizaje
              </h2>
              {instructorName && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Instructor: <span className="font-medium">{instructorName}</span>
                </p>
              )}
              {fichaCode && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ficha: <span className="font-medium">{fichaCode}</span>
                </p>
              )}
            </div>

            {/* Filtro por trimestre */}
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <label className="text-sm text-gray-600 dark:text-gray-300">Trimestre:</label>
              <select
                value={filtroTrimestre}
                onChange={(e) => setFiltroTrimestre(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
              >
                <option value="">Todos</option>
                {trimestresDisponibles.map((t) => (
                  <option key={t} value={t}>
                    Trimestre {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabla (solo lectura) */}
          <div className="mt-4 overflow-auto flex-1 max-h-[70vh]">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                    Competencia
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                    Resultado de Aprendizaje
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                    Instructor
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600 dark:text-gray-300">
                    Trimestre
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600 dark:text-gray-300">
                    Horas asignadas
                  </th>
                  <th className="px-3 py-3 text-center font-medium text-gray-600 dark:text-gray-300">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {rapFiltrados.map((rap) => (
                  <tr
                    key={rap.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-3 py-3 text-gray-900 dark:text-gray-100 max-w-xs">
                      {rap.competencia}
                    </td>
                    <td className="px-3 py-3 text-gray-900 dark:text-gray-100 max-w-xs">
                      {rap.rap}
                    </td>
                    <td className="px-3 py-3 text-gray-900 dark:text-gray-100">
                      {rap.instructor}
                    </td>
                    <td className="px-3 py-3 text-center text-gray-900 dark:text-gray-100">
                      {rap.trimestre}
                    </td>
                    <td className="px-3 py-3 text-center text-gray-900 dark:text-gray-100">
                      {rap.horasAsignadas}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          rap.estado === "Activo"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {rap.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rapFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No hay resultados de aprendizaje disponibles para los filtros seleccionados.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t dark:border-gray-700 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
