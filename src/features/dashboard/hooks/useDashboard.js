import { useState, useEffect, useCallback } from "react";
import DashboardService from "../services/DashboardService";

/**
 * Hook personalizado para manejar los datos del dashboard
 * Preparado para conexión con backend - actualmente usa datos mock
 */
export function useDashboard() {
  const [data, setData] = useState({
    kpis: [],
    instructorsContract: [],
    instructorsGender: [],
    apprenticesStatus: [],
    apprenticesProgram: [],
    fichas: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Cargar todos los datos del dashboard
   */
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await DashboardService.getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error("Error al cargar datos del dashboard:", err);
      setError(err.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Recargar datos del dashboard
   */
  const refresh = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    ...data,
    loading,
    error,
    refresh,
  };
}

/**
 * Hook para obtener solo los KPIs
 */
export function useKPIs() {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setLoading(true);
        const data = await DashboardService.getSubdirectorKPIs();
        setKpis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  return { kpis, loading, error };
}

export default useDashboard;