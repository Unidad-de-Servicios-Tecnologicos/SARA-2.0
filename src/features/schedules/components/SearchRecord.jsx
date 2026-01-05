import React from "react";
import { Search } from "lucide-react";

export default function SearchRecord({ 
  value, 
  onChange, 
  periodo, 
  onPeriodoChange, 
  onSearch 
}) {
  const periodos = [
    "2024 - 1",
    "2024 - 2", 
    "2024 - 3",
    "2024 - 4",
    "2025 - 1",
    "2025 - 2",
    "2025 - 3"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Campo de búsqueda */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número de la ficha
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ingresa el número de la ficha"
            className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* Selector de periodo */}
        <div className="w-full md:w-40">
          <select
            value={periodo}
            onChange={(e) => onPeriodoChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
          >
            {periodos.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Botón de consultar */}
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Consultar
        </button>
      </div>
    </div>
  );
}
