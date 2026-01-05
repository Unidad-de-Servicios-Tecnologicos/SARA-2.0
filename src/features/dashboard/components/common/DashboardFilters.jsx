import { useState } from "react";
import { Calendar, Download, RefreshCw, ChevronDown, FileSpreadsheet, FileText, File } from "lucide-react";

const timeFilters = [
  { id: "today", label: "Hoy" },
  { id: "week", label: "Esta Semana" },
  { id: "month", label: "Este Mes" },
  { id: "quarter", label: "Trimestre" },
  { id: "year", label: "Este Año" },
  { id: "custom", label: "Personalizado" },
];

export default function DashboardFilters({ 
  onFilterChange, 
  onExport, 
  onRefresh, 
  lastUpdated,
  isLoading = false,
  isExporting = false
}) {
  const [activeFilter, setActiveFilter] = useState("month");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDates, setCustomDates] = useState({ start: "", end: "" });

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === "custom") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      onFilterChange?.(filterId, null);
    }
  };

  const handleCustomDateApply = () => {
    if (customDates.start && customDates.end) {
      onFilterChange?.("custom", customDates);
      setShowDatePicker(false);
    }
  };

  const handleExport = (format) => {
    onExport?.(format);
    setShowExportMenu(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filtros de tiempo */}
        <div className="flex flex-wrap items-center gap-2">
          <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Período:</span>
          
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                activeFilter === filter.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Selector de fechas personalizado */}
        {showDatePicker && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <input
              type="date"
              value={customDates.start}
              onChange={(e) => setCustomDates(prev => ({ ...prev, start: e.target.value }))}
              className="px-2 py-1 text-sm border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={customDates.end}
              onChange={(e) => setCustomDates(prev => ({ ...prev, end: e.target.value }))}
              className="px-2 py-1 text-sm border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <button
              onClick={handleCustomDateApply}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Aplicar
            </button>
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Última actualización */}
          {lastUpdated && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Actualizado: {lastUpdated}
            </span>
          )}

          {/* Botón Refrescar */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ${
              isLoading ? "animate-spin" : ""
            }`}
            title="Actualizar datos"
          >
            <RefreshCw size={18} />
          </button>

          {/* Botón Exportar con menú */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className={`flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isExporting ? "animate-pulse" : ""
              }`}
            >
              <Download size={18} className={isExporting ? "animate-spin" : ""} />
              <span className="text-sm font-medium">Exportar</span>
              <ChevronDown size={14} />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-1 z-50 min-w-40">
                <button
                  onClick={() => handleExport("pdf")}
                  disabled={isExporting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText size={16} className={`text-red-500 ${isExporting ? "animate-spin" : ""}`} />
                  Exportar a PDF
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  disabled={isExporting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileSpreadsheet size={16} className={`text-green-500 ${isExporting ? "animate-spin" : ""}`} />
                  Exportar a Excel
                </button>
                <button
                  onClick={() => handleExport("csv")}
                  disabled={isExporting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <File size={16} className={`text-blue-500 ${isExporting ? "animate-spin" : ""}`} />
                  Exportar a CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
