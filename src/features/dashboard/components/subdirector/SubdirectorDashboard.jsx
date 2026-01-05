import { useState, useCallback } from "react";
import SubdirectorKPIs from "./SubdirectorKPIs";
import SubdirectorCharts from "./SubdirectorCharts";
import DashboardFilters from "../common/DashboardFilters";
import { useDashboardData, useDashboardFilters, useDashboardExport } from "../../hooks/useDashboardInteractivity";

// Simular fetch de datos del dashboard
const fetchDashboardData = async () => {
  // En producción: llamar al API real
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fichas: 97,
        instructores: 106,
        rapNoAprobado: 3951,
        resultadosPorEvaluar: 0,
        lastSync: new Date().toISOString()
      });
    }, 500);
  });
};

export default function SubdirectorDashboard() {
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Hook de datos con auto-refresh cada 5 minutos
  const { 
    isLoading, 
    lastUpdated, 
    refresh 
  } = useDashboardData(fetchDashboardData, 300000, true);

  // Hook de filtros
  const { handleFilterChange } = useDashboardFilters();

  // Hook de exportación
  const { exportData, isExporting } = useDashboardExport();

  // Manejar cambio de filtro
  const onFilterChange = useCallback((filter, customRange) => {
    handleFilterChange(filter, customRange);
    // En producción: refrescar datos con el nuevo filtro
    console.log("Filtro cambiado:", filter, customRange);
  }, [handleFilterChange]);

  // Manejar exportación
  const onExport = useCallback((format) => {
    exportData(format, null, `dashboard-report-${new Date().toISOString().split('T')[0]}`);
  }, [exportData]);

  // Manejar refresh manual
  const onRefresh = useCallback(() => {
    refresh();
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 3000);
  }, [refresh]);

  return (
    <div className="relative">
      {/* Notificación de actualización */}
      {notificationVisible && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          ✓ Datos actualizados
        </div>
      )}

      {/* Indicador de carga */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-200 overflow-hidden z-40">
          <div className="h-full w-1/3 bg-blue-500 animate-pulse"></div>
        </div>
      )}

      {/* Filtros y acciones */}
      <DashboardFilters 
        onFilterChange={onFilterChange}
        onExport={onExport}
        onRefresh={onRefresh}
        lastUpdated={lastUpdated}
        isLoading={isLoading || isExporting}
        isExporting={isExporting}
      />

      {/* KPIs */}
      <SubdirectorKPIs />

      {/* Gráficos */}
      <SubdirectorCharts />
    </div>
  );
}
