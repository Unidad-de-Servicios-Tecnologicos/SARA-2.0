import React from "react";
import { ChevronDown } from "lucide-react";

// Lista de sedes
const sedes = [
  { value: "", label: "Selecciona una opción" },
  { value: "CESGE", label: "CESGE" },
  { value: "SIN SEDE", label: "SIN SEDE" },
  { value: "VIRTUAL", label: "VIRTUAL" },
  { value: "IUSH", label: "IUSH" },
  { value: "CDA", label: "CDA" }
];

// Lista de ambientes por sede
const ambientesPorSede = {
  "CESGE": ["201", "202", "203", "205", "401", "402", "403", "404", "405", "406", "501", "502", "503", "504", "505", "506", "601", "602"],
  "VIRTUAL": ["VIRTUAL-1", "VIRTUAL-2", "VIRTUAL-3"],
  "IUSH": ["A101", "A102", "A103", "B201", "B202"],
  "CDA": ["CDA-1", "CDA-2", "CDA-3"],
  "SIN SEDE": ["N/A"]
};

export default function SearchAmbiente({ 
  sede, 
  onSedeChange, 
  ambiente, 
  onAmbienteChange, 
  onSearch 
}) {
  const ambientesDisponibles = sede ? ambientesPorSede[sede] || [] : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Selector de Sede */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sede
          </label>
          <div className="relative">
            <select
              value={sede}
              onChange={(e) => {
                onSedeChange(e.target.value);
                onAmbienteChange(""); // Reset ambiente cuando cambia sede
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white appearance-none"
            >
              {sedes.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Selector de Ambiente */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número de Ambiente
          </label>
          <div className="relative">
            <select
              value={ambiente}
              onChange={(e) => onAmbienteChange(e.target.value)}
              disabled={!sede}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Selecciona una opción</option>
              {ambientesDisponibles.map((amb) => (
                <option key={amb} value={amb}>{amb}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Botón de consultar */}
        <button
          onClick={onSearch}
          disabled={!sede || !ambiente}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Consultar
        </button>
      </div>
    </div>
  );
}
