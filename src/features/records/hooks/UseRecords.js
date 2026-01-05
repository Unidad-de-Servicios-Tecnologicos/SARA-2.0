/**
 * Custom hooks para gestión de fichas
 */

import { useState, useEffect, useCallback } from "react";
import { RecordsService } from "../services/RecordsService";

/**
 * Hook para obtener lista de fichas con filtros
 */
export function useFichas(initialFilters = {}) {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchFichas = useCallback(async (searchFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await RecordsService.getFichas(searchFilters);
      setFichas(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFichas();
  }, [fetchFichas]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return { 
    fichas, 
    loading, 
    error, 
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchFichas 
  };
}

/**
 * Hook para obtener detalle de una ficha
 */
export function useFichaDetail(fichaId) {
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFicha = useCallback(async () => {
    if (!fichaId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await RecordsService.getFichaById(fichaId);
      setFicha(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fichaId]);

  useEffect(() => {
    fetchFicha();
  }, [fetchFicha]);

  return { ficha, loading, error, refetch: fetchFicha };
}

/**
 * Hook para obtener aprendices de una ficha
 */
export function useAprendicesFicha(fichaId) {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAprendices = useCallback(async () => {
    if (!fichaId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await RecordsService.getAprendicesByFicha(fichaId);
      setAprendices(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [fichaId]);

  useEffect(() => {
    fetchAprendices();
  }, [fetchAprendices]);

  return { aprendices, loading, error, refetch: fetchAprendices };
}

/**
 * Hook para obtener RAPs de una ficha
 */
export function useRAPsFicha(fichaId) {
  const [raps, setRaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRAPs = useCallback(async () => {
    if (!fichaId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await RecordsService.getRAPsByFicha(fichaId);
      setRaps(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [fichaId]);

  useEffect(() => {
    fetchRAPs();
  }, [fetchRAPs]);

  return { raps, loading, error, refetch: fetchRAPs };
}

/**
 * Hook para obtener novedades de una ficha
 */
export function useNovedadesFicha(fichaId) {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNovedades = useCallback(async () => {
    if (!fichaId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await RecordsService.getNovedadesByFicha(fichaId);
      setNovedades(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [fichaId]);

  useEffect(() => {
    fetchNovedades();
  }, [fetchNovedades]);

  return { novedades, loading, error, refetch: fetchNovedades };
}

/**
 * Hook para obtener KPIs de fichas
 */
export function useRecordsKPIs() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKPIs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await RecordsService.getKPIs();
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
 * Hook para catálogos - Incluye todos los catálogos según documento SARA
 */
export function useCatalogos() {
  const [programas, setProgramas] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [centros, setCentros] = useState([]);
  const [estados, setEstados] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [fases, setFases] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [trimestres, setTrimestres] = useState([]);
  const [tiposVinculacion, setTiposVinculacion] = useState([]);
  const [rolesInstructor, setRolesInstructor] = useState([]);
  const [estadosEtapaProductiva, setEstadosEtapaProductiva] = useState([]);
  const [tiposEtapaProductiva, setTiposEtapaProductiva] = useState([]);
  const [estadosAprendiz, setEstadosAprendiz] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCatalogos = useCallback(async () => {
    setLoading(true);
    try {
      const [
        programasData,
        sedesData,
        centrosData,
        estadosData,
        jornadasData,
        modalidadesData,
        fasesData,
        nivelesData,
        trimestresData,
        tiposVinculacionData,
        rolesInstructorData,
        estadosEtapaProductivaData,
        tiposEtapaProductivaData,
        estadosAprendizData,
        instructoresData,
      ] = await Promise.all([
        RecordsService.getProgramas(),
        RecordsService.getSedes(),
        RecordsService.getCentros(),
        RecordsService.getEstadosFicha(),
        RecordsService.getJornadas(),
        RecordsService.getModalidades(),
        RecordsService.getFases(),
        RecordsService.getNiveles(),
        RecordsService.getTrimestres(),
        RecordsService.getTiposVinculacion(),
        RecordsService.getRolesInstructor(),
        RecordsService.getEstadosEtapaProductiva(),
        RecordsService.getTiposEtapaProductiva(),
        RecordsService.getEstadosAprendiz(),
        RecordsService.getInstructores(),
      ]);
      
      setProgramas(programasData);
      setSedes(sedesData);
      setCentros(centrosData);
      setEstados(estadosData);
      setJornadas(jornadasData);
      setModalidades(modalidadesData);
      setFases(fasesData);
      setNiveles(nivelesData);
      setTrimestres(trimestresData);
      setTiposVinculacion(tiposVinculacionData);
      setRolesInstructor(rolesInstructorData);
      setEstadosEtapaProductiva(estadosEtapaProductivaData);
      setTiposEtapaProductiva(tiposEtapaProductivaData);
      setEstadosAprendiz(estadosAprendizData);
      setInstructores(instructoresData);
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
    programas, 
    sedes, 
    centros,
    estados, 
    jornadas, 
    modalidades, 
    fases,
    niveles,
    trimestres,
    tiposVinculacion,
    rolesInstructor,
    estadosEtapaProductiva,
    tiposEtapaProductiva,
    estadosAprendiz,
    instructores,
    loading,
    refetch: fetchCatalogos 
  };
}

/**
 * Hook para mutaciones de fichas
 */
export function useRecordsMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeMutation = async (mutationFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await mutationFn();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Crear ficha
  const createFicha = useCallback(async (data) => {
    return executeMutation(() => RecordsService.createFicha(data));
  }, []);

  // Actualizar ficha
  const updateFicha = useCallback(async (id, data) => {
    return executeMutation(() => RecordsService.updateFicha(id, data));
  }, []);

  // Cambiar estado de ficha
  const cambiarEstado = useCallback(async (id, nuevoEstado, observaciones) => {
    return executeMutation(() => RecordsService.cambiarEstadoFicha(id, nuevoEstado, observaciones));
  }, []);

  // Agregar aprendiz
  const addAprendiz = useCallback(async (fichaId, aprendizData) => {
    return executeMutation(() => RecordsService.addAprendizToFicha(fichaId, aprendizData));
  }, []);

  // Actualizar estado de aprendiz
  const updateAprendizEstado = useCallback(async (fichaId, aprendizId, estado, motivo) => {
    return executeMutation(() => RecordsService.updateAprendizEstado(fichaId, aprendizId, estado, motivo));
  }, []);

  // Registrar novedad
  const registrarNovedad = useCallback(async (fichaId, novedadData) => {
    return executeMutation(() => RecordsService.registrarNovedad(fichaId, novedadData));
  }, []);

  // Exportar fichas
  const exportFichas = useCallback(async (format, filters) => {
    return executeMutation(() => RecordsService.exportFichas(format, filters));
  }, []);

  // Exportar detalle
  const exportFichaDetail = useCallback(async (ficha, format) => {
    return executeMutation(() => RecordsService.exportFichaDetail(ficha, format));
  }, []);

  return {
    loading,
    error,
    createFicha,
    updateFicha,
    cambiarEstado,
    addAprendiz,
    updateAprendizEstado,
    registrarNovedad,
    exportFichas,
    exportFichaDetail,
  };
}

export default {
  useFichas,
  useFichaDetail,
  useAprendicesFicha,
  useRAPsFicha,
  useNovedadesFicha,
  useRecordsKPIs,
  useCatalogos,
  useRecordsMutations,
};
