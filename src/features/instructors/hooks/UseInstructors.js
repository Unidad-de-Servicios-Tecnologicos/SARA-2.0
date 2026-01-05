/**
 * Custom hooks para gestión de instructores
 */

import { useState, useEffect, useCallback } from "react";
import { InstructorsService } from "../services/InstructorsService";

/**
 * Hook para obtener lista de instructores con filtros
 */
export function useInstructores(initialFilters = {}) {
  const [instructores, setInstructores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchInstructores = useCallback(async (searchFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorsService.getInstructores(searchFilters);
      setInstructores(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchInstructores();
  }, [fetchInstructores]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return { 
    instructores, 
    loading, 
    error, 
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchInstructores 
  };
}

/**
 * Hook para obtener detalle de un instructor
 */
export function useInstructorDetail(instructorId) {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstructor = useCallback(async () => {
    if (!instructorId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorsService.getInstructorById(instructorId);
      setInstructor(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [instructorId]);

  useEffect(() => {
    fetchInstructor();
  }, [fetchInstructor]);

  return { instructor, loading, error, refetch: fetchInstructor };
}

/**
 * Hook para obtener fichas asignadas a un instructor
 */
export function useFichasInstructor(instructorId) {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFichas = useCallback(async () => {
    if (!instructorId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorsService.getFichasAsignadas(instructorId);
      setFichas(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [instructorId]);

  useEffect(() => {
    fetchFichas();
  }, [fetchFichas]);

  return { fichas, loading, error, refetch: fetchFichas };
}

/**
 * Hook para obtener novedades de un instructor
 */
export function useNovedadesInstructor(instructorId) {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNovedades = useCallback(async () => {
    if (!instructorId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorsService.getNovedadesInstructor(instructorId);
      setNovedades(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [instructorId]);

  useEffect(() => {
    fetchNovedades();
  }, [fetchNovedades]);

  return { novedades, loading, error, refetch: fetchNovedades };
}

/**
 * Hook para obtener KPIs de instructores
 */
export function useInstructoresKPIs() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKPIs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorsService.getKPIs();
      setKpis(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  return { kpis, loading, error, refetch: fetchKPIs };
}

/**
 * Hook para catálogos de instructores
 */
export function useInstructoresCatalogos() {
  const [tiposVinculacion, setTiposVinculacion] = useState([]);
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [areas, setAreas] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCatalogos = useCallback(async () => {
    setLoading(true);
    try {
      const [
        tiposData,
        rolesData,
        estadosData,
        areasData,
        sedesData,
      ] = await Promise.all([
        InstructorsService.getTiposVinculacion(),
        InstructorsService.getRolesInstructor(),
        InstructorsService.getEstadosInstructor(),
        InstructorsService.getAreasFormacion(),
        InstructorsService.getSedes(),
      ]);
      
      setTiposVinculacion(tiposData);
      setRoles(rolesData);
      setEstados(estadosData);
      setAreas(areasData);
      setSedes(sedesData);
    } catch (err) {
      console.error("Error cargando catálogos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalogos();
  }, [fetchCatalogos]);

  return { 
    tiposVinculacion, 
    roles, 
    estados, 
    areas, 
    sedes,
    loading,
    refetch: fetchCatalogos 
  };
}

/**
 * Hook para mutaciones de instructores (crear, actualizar, eliminar)
 */
export function useInstructoresMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createInstructor = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.createInstructor(data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInstructor = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.updateInstructor(id, data);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cambiarEstado = useCallback(async (id, estado, observaciones) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.cambiarEstadoInstructor(id, estado, observaciones);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const asignarFicha = useCallback(async (instructorId, fichaId, rol) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.asignarFicha(instructorId, fichaId, rol);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const desasignarFicha = useCallback(async (instructorId, fichaId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.desasignarFicha(instructorId, fichaId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarNovedad = useCallback(async (instructorId, novedadData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.registrarNovedad(instructorId, novedadData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportInstructores = useCallback(async (format, filters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.exportInstructores(format, filters);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportInstructorDetail = useCallback(async (instructorId, format) => {
    setLoading(true);
    setError(null);
    try {
      const result = await InstructorsService.exportInstructorDetail(instructorId, format);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    loading, 
    error,
    createInstructor,
    updateInstructor,
    cambiarEstado,
    asignarFicha,
    desasignarFicha,
    registrarNovedad,
    exportInstructores,
    exportInstructorDetail,
  };
}
