import React, { useState, useCallback } from "react";
import { 
  ClipboardList, 
  Plus, 
  Download, 
  RefreshCw,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  File
} from "lucide-react";
import RecordKpis from "../components/RecordKpis";
import RecordSearch from "../components/RecordSearch";
import RecordsTable from "../components/RecordsTable";
import RecordDetailModal from "../components/RecordDetailModal";
import CreateFichaModal from "../components/CreateFichaModal";
import { useFichas, useRecordsKPIs, useCatalogos, useRecordsMutations } from "../hooks/UseRecords";
import { showToast } from "@/shared/notifications";

export default function RecordsListPage() {
  // Estados locales
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Hooks de datos
  const { fichas, loading, filters, updateFilters, clearFilters, refetch } = useFichas();
  const { kpis, loading: loadingKpis, refetch: refetchKpis } = useRecordsKPIs();
  const catalogos = useCatalogos();
  const { exportFichas, loading: exporting } = useRecordsMutations();

  // Función centralizada para refrescar todos los datos
  const refreshAll = useCallback(() => {
    refetch();
    refetchKpis();
  }, [refetch, refetchKpis]);

  // Manejar búsqueda
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    updateFilters({ search: term });
  }, [updateFilters]);

  // Manejar cambio de filtros
  const handleFilterChange = useCallback((newFilters) => {
    updateFilters(newFilters);
  }, [updateFilters]);

  // Limpiar filtros
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    clearFilters();
  }, [clearFilters]);

  // Ver detalle de ficha
  const handleViewDetail = useCallback((ficha) => {
    setSelectedFicha(ficha);
    setShowDetailModal(true);
  }, []);

  // Cerrar modal de detalle
  const handleCloseDetail = useCallback(() => {
    setShowDetailModal(false);
    setSelectedFicha(null);
  }, []);

  // Exportar fichas
  const handleExport = useCallback(async (format) => {
    try {
      await exportFichas(format, filters);
      showToast.success(`Fichas exportadas a ${format.toUpperCase()} correctamente`);
      setShowExportMenu(false);
    } catch (error) {
      showToast.error(error.message || "Error al exportar");
    }
  }, [exportFichas, filters]);

  // Refrescar datos
  const handleRefresh = useCallback(() => {
    refreshAll();
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 3000);
  }, [refreshAll]);

  return (
    <div className="relative space-y-6">
      {/* Notificación de actualización */}
      {notificationVisible && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          ✓ Datos actualizados
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <ClipboardList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestión de Fichas
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Administra las fichas de formación
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ${
              loading ? "animate-spin" : ""
            }`}
            title="Actualizar datos"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          
          {/* Botón Exportar estilo dashboard */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={exporting}
              className={`flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                exporting ? "animate-pulse" : ""
              }`}
            >
              <Download className={`w-4 h-4 ${exporting ? "animate-spin" : ""}`} />
              <span className="text-sm font-medium">Exportar</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-1 z-50 min-w-40">
                <button
                  onClick={() => handleExport("pdf")}
                  disabled={exporting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className={`w-4 h-4 text-red-500 ${exporting ? "animate-spin" : ""}`} />
                  Exportar a PDF
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  disabled={exporting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileSpreadsheet className={`w-4 h-4 text-green-500 ${exporting ? "animate-spin" : ""}`} />
                  Exportar a Excel
                </button>
                <button
                  onClick={() => handleExport("csv")}
                  disabled={exporting}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <File className={`w-4 h-4 text-blue-500 ${exporting ? "animate-spin" : ""}`} />
                  Exportar a CSV
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Ficha</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <RecordKpis kpis={kpis} loading={loadingKpis} />

      {/* Búsqueda y filtros */}
      <RecordSearch
        search={searchTerm}
        onSearchChange={handleSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        catalogos={catalogos}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Tabla de fichas */}
      <RecordsTable
        fichas={fichas}
        loading={loading}
        onViewDetail={handleViewDetail}
      />

      {/* Modal de detalle */}
      {showDetailModal && selectedFicha && (
        <RecordDetailModal
          isOpen={showDetailModal}
          onClose={handleCloseDetail}
          ficha={selectedFicha}
          onRefresh={refreshAll}
        />
      )}

      {/* Modal crear ficha */}
      <CreateFichaModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={refreshAll}
        catalogos={catalogos}
      />
    </div>
  );
}
