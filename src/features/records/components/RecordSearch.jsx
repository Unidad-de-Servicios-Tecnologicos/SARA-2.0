import React from "react";
import { Search, Filter, X } from "lucide-react";

export default function RecordSearch({ 
  search, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters,
  catalogos = {},
  showFilters = false,
  onToggleFilters
}) {
  const { estados = [], programas = [], sedes = [], jornadas = [], fases = [] } = catalogos;

  const hasActiveFilters = filters.estado || filters.programaId || filters.sedeId || filters.jornada || filters.fase;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por número de ficha, programa o instructor..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
            showFilters || hasActiveFilters
              ? "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
              : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Panel de filtros expandible */}
      {showFilters && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estado
              </label>
              <select
                value={filters.estado || ""}
                onChange={(e) => onFilterChange({ estado: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todos</option>
                {estados.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.label}</option>
                ))}
              </select>
            </div>

            {/* Programa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Programa
              </label>
              <select
                value={filters.programaId || ""}
                onChange={(e) => onFilterChange({ programaId: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todos</option>
                {programas.map(programa => (
                  <option key={programa.id} value={programa.id}>{programa.nombre}</option>
                ))}
              </select>
            </div>

            {/* Sede */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sede
              </label>
              <select
                value={filters.sedeId || ""}
                onChange={(e) => onFilterChange({ sedeId: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todas</option>
                {sedes.map(sede => (
                  <option key={sede.id} value={sede.id}>{sede.nombre}</option>
                ))}
              </select>
            </div>

            {/* Jornada */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Jornada
              </label>
              <select
                value={filters.jornada || ""}
                onChange={(e) => onFilterChange({ jornada: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todas</option>
                {jornadas.map(jornada => (
                  <option key={jornada.id} value={jornada.id}>{jornada.label}</option>
                ))}
              </select>
            </div>

            {/* Fase */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fase
              </label>
              <select
                value={filters.fase || ""}
                onChange={(e) => onFilterChange({ fase: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todas</option>
                {fases.map(fase => (
                  <option key={fase.id} value={fase.id}>{fase.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
