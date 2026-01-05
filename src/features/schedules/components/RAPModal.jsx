import React from "react";
import { Dialog } from "@/components/ui/Dialog";

// Mock data para los RAPs
const mockRAPs = [
  {
    id: 1,
    ficha: "2818588",
    trimestre: "2024-4",
    programa: "GESTIÓN ADMINISTRATIVA",
    palabraClave: "Gestión documental",
    normaCompetencia: "210601006",
    competencia: "Organizar eventos que promuevan las relaciones empresariales",
    rap: "Divulgar el evento teniendo en cuenta el plan de promoción"
  },
  {
    id: 2,
    ficha: "2821641",
    trimestre: "2024-4",
    programa: "GESTIÓN ADMINISTRATIVA",
    palabraClave: "Comunicación empresarial",
    normaCompetencia: "210601007",
    competencia: "Facilitar el servicio a los clientes internos y externos",
    rap: "Proporcionar diligentemente atención y servicio al cliente"
  },
  {
    id: 3,
    ficha: "2821658",
    trimestre: "2024-4",
    programa: "GESTIÓN ADMINISTRATIVA",
    palabraClave: "Archivo y correspondencia",
    normaCompetencia: "210601008",
    competencia: "Organizar la documentación teniendo en cuenta las normas",
    rap: "Clasificar documentos según el tipo y uso de información"
  },
  {
    id: 4,
    ficha: "2821661",
    trimestre: "2024-4",
    programa: "TALENTO HUMANO",
    palabraClave: "Selección de personal",
    normaCompetencia: "210201001",
    competencia: "Preseleccionar candidatos aplicando técnicas de selección",
    rap: "Aplicar instrumentos de medición para selección de personal"
  },
  {
    id: 5,
    ficha: "2847221",
    trimestre: "2024-4",
    programa: "CONTABILIZACIÓN DE OPERACIONES",
    palabraClave: "Registros contables",
    normaCompetencia: "210303001",
    competencia: "Contabilizar operaciones de acuerdo con las normas",
    rap: "Registrar hechos económicos según normas contables vigentes"
  }
];

export default function RAPModal({ isOpen, onClose, instructorName = "" }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pb-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detalle Resultados de Aprendizajes
          </h2>
        </div>

        {instructorName && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Instructor: <span className="font-medium">{instructorName}</span>
          </p>
        )}

        {/* Table */}
        <div className="mt-4 overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Ficha
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Trimestre
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Programa
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Palabra clave
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Norma de Competencia (Sofiaplus)
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  Competencia
                </th>
                <th className="px-3 py-3 text-left font-medium text-gray-600 dark:text-gray-300">
                  RAP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockRAPs.map((rap) => (
                <tr 
                  key={rap.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100">
                    {rap.ficha}
                  </td>
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100">
                    {rap.trimestre}
                  </td>
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100">
                    {rap.programa}
                  </td>
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100">
                    {rap.palabraClave}
                  </td>
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100">
                    {rap.normaCompetencia}
                  </td>
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100 max-w-xs">
                    {rap.competencia}
                  </td>
                  <td className="px-3 py-3 text-gray-900 dark:text-gray-100 max-w-xs">
                    {rap.rap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {mockRAPs.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No hay resultados de aprendizaje disponibles
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
    </Dialog>
  );
}
