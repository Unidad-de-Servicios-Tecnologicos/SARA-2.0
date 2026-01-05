import { useState, useEffect, useCallback } from "react";
import { showToast } from "@/shared/notifications";

/**
 * Hook para manejar la actualización automática de datos del dashboard
 * @param {Function} fetchData - Función que obtiene los datos
 * @param {number} intervalMs - Intervalo de actualización en milisegundos (default: 60000 = 1 min)
 * @param {boolean} enabled - Si está habilitada la actualización automática
 */
export function useDashboardData(fetchData, intervalMs = 60000, enabled = true) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData?.();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Error al actualizar datos");
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  // Carga inicial
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Auto-refresh
  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      refresh();
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [enabled, intervalMs, refresh]);

  // Formatear última actualización
  const formatLastUpdated = () => {
    if (!lastUpdated) return null;
    
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    
    if (diff < 60) return "Hace unos segundos";
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
    
    return lastUpdated.toLocaleString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short"
    });
  };

  return {
    data,
    isLoading,
    error,
    lastUpdated: formatLastUpdated(),
    refresh,
  };
}

/**
 * Hook para manejar filtros del dashboard
 */
export function useDashboardFilters() {
  const [activeFilter, setActiveFilter] = useState("month");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const getDateRange = useCallback((filter) => {
    const now = new Date();
    let start, end;

    switch (filter) {
      case "today":
        start = new Date(now.setHours(0, 0, 0, 0));
        end = new Date();
        break;
      case "week":
        start = new Date(now.setDate(now.getDate() - now.getDay()));
        end = new Date();
        break;
      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date();
        break;
      case "quarter": {
        const quarter = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), quarter * 3, 1);
        end = new Date();
        break;
      }
      case "year":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date();
        break;
      default:
        start = null;
        end = null;
    }

    return { start, end };
  }, []);

  const handleFilterChange = useCallback((filter, customRange) => {
    setActiveFilter(filter);
    
    if (filter === "custom" && customRange) {
      setDateRange({
        start: new Date(customRange.start),
        end: new Date(customRange.end)
      });
    } else {
      setDateRange(getDateRange(filter));
    }
  }, [getDateRange]);

  return {
    activeFilter,
    dateRange,
    handleFilterChange,
  };
}

/**
 * Hook para exportar datos del dashboard
 */
export function useDashboardExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = useCallback(async (format, data, filename = "dashboard-report") => {
    setIsExporting(true);
    
    try {
      const { ExportService } = await import("@/features/instructors/services/ExportService");
      
      switch (format) {
        case "csv":
          exportToCSV(data, filename);
          showToast.success("Dashboard exportado a CSV correctamente");
          break;
        case "excel":
          await ExportService.exportDashboardExcel(data, filename);
          showToast.success("Dashboard exportado a Excel correctamente");
          break;
        case "pdf":
          await ExportService.exportDashboardPDF(data, filename);
          showToast.success("Dashboard exportado a PDF correctamente");
          break;
        default:
          throw new Error("Formato no soportado");
      }
    } catch (error) {
      console.error("Error exportando:", error);
      showToast.error(error.message || "Error al exportar. Por favor intente de nuevo.");
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { exportData, isExporting };
}

// Funciones de exportación (simuladas - en producción usar librerías como xlsx, jspdf, etc.)
function exportToCSV(data, filename) {
  // Simular exportación CSV
  const csvContent = "data:text/csv;charset=utf-8,";
  const blob = new Blob([csvContent + "Columna1,Columna2\nValor1,Valor2"], { type: "text/csv" });
  downloadBlob(blob, `${filename}.csv`);
  console.log("Exportando a CSV:", filename);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
