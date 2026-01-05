/**
 * ========================================
 * HOOKS DE HORARIOS - USE SCHEDULES
 * ========================================
 * 
 * Hooks personalizados para manejar el estado y las operaciones
 * del módulo de horarios. Preparados para conexión con backend.
 */

import { useState, useEffect, useCallback } from "react";
import SchedulesService from "../services/SchedulesService";

/**
 * Hook principal para gestión de horarios
 * Maneja el estado global del módulo de horarios
 */
export function useSchedules() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Ejecutar una operación con manejo de loading y errores
   */
  const executeOperation = useCallback(async (operation) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      setError(err.message || "Error en la operación");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, executeOperation };
}

/**
 * Hook para buscar y obtener instructores
 */
export function useInstructors(initialFilters = {}) {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstructors = useCallback(async (searchFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await SchedulesService.getInstructors(searchFilters);
      setInstructors(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstructors(initialFilters);
  }, [fetchInstructors, initialFilters]);

  return { instructors, loading, error, refetch: fetchInstructors };
}

/**
 * Hook para horario de un instructor específico
 */
export function useInstructorSchedule(instructorId, periodo = "2024-4") {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = useCallback(async () => {
    if (!instructorId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await SchedulesService.getInstructorSchedule(instructorId, periodo);
      setSchedule(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [instructorId, periodo]);

  useEffect(() => {
    if (instructorId) {
      fetchSchedule();
    }
  }, [instructorId, periodo, fetchSchedule]);

  return { schedule, loading, error, refetch: fetchSchedule };
}

/**
 * Hook para buscar y obtener fichas
 */
export function useFichas(initialFilters = {}) {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFichas = useCallback(async (searchFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await SchedulesService.getFichas(searchFilters);
      setFichas(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFichas(initialFilters);
  }, [fetchFichas, initialFilters]);

  return { fichas, loading, error, refetch: fetchFichas };
}

/**
 * Hook para horario de una ficha específica
 */
export function useFichaSchedule(fichaNumero, periodo = "2024-4") {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = useCallback(async () => {
    if (!fichaNumero) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await SchedulesService.getFichaSchedule(fichaNumero, periodo);
      setSchedule(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fichaNumero, periodo]);

  useEffect(() => {
    if (fichaNumero) {
      fetchSchedule();
    }
  }, [fichaNumero, periodo, fetchSchedule]);

  return { schedule, loading, error, refetch: fetchSchedule };
}

/**
 * Hook para sedes y ambientes
 */
export function useAmbientes() {
  const [sedes, setSedes] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSedes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SchedulesService.getSedes();
      setSedes(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAmbientesBySede = useCallback(async (sedeId) => {
    if (!sedeId) {
      setAmbientes([]);
      return [];
    }
    
    setLoading(true);
    try {
      const data = await SchedulesService.getAmbientesBySede(sedeId);
      setAmbientes(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSedes();
  }, [fetchSedes]);

  return { sedes, ambientes, loading, error, fetchAmbientesBySede };
}

/**
 * Hook para horario de un ambiente
 */
export function useAmbienteSchedule(sedeNombre, ambienteNumero) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = useCallback(async () => {
    if (!sedeNombre || !ambienteNumero) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await SchedulesService.getAmbienteSchedule(sedeNombre, ambienteNumero);
      setSchedule(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [sedeNombre, ambienteNumero]);

  useEffect(() => {
    if (sedeNombre && ambienteNumero) {
      fetchSchedule();
    }
  }, [sedeNombre, ambienteNumero, fetchSchedule]);

  return { schedule, loading, error, refetch: fetchSchedule };
}

/**
 * Hook para RAPs
 */
export function useRAPs(fichaNumero = null, instructorId = null) {
  const [raps, setRaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRAPs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (fichaNumero) {
        data = await SchedulesService.getRAPsByFicha(fichaNumero);
      } else if (instructorId) {
        data = await SchedulesService.getRAPsByInstructor(instructorId);
      } else {
        data = [];
      }
      setRaps(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [fichaNumero, instructorId]);

  useEffect(() => {
    if (fichaNumero || instructorId) {
      fetchRAPs();
    }
  }, [fichaNumero, instructorId, fetchRAPs]);

  return { raps, loading, error, refetch: fetchRAPs };
}

/**
 * Hook para periodos académicos
 */
export function usePeriodos() {
  const [periodos, setPeriodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeriodos = async () => {
      setLoading(true);
      try {
        const data = await SchedulesService.getPeriodos();
        setPeriodos(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPeriodos();
  }, []);

  return { periodos, loading };
}

/**
 * Hook para itinerarios (palabras clave)
 */
export function useItinerarios() {
  const [itinerarios, setItinerarios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItinerarios = async () => {
      setLoading(true);
      try {
        const data = await SchedulesService.getItinerarios();
        setItinerarios(data);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerarios();
  }, []);

  return { itinerarios, loading };
}

/**
 * Hook para rendimiento académico
 */
export function useRendimientoAcademico(fichaNumero) {
  const [rendimiento, setRendimiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRendimiento = useCallback(async () => {
    if (!fichaNumero) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await SchedulesService.getRendimientoAcademico(fichaNumero);
      setRendimiento(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fichaNumero]);

  useEffect(() => {
    if (fichaNumero) {
      fetchRendimiento();
    }
  }, [fichaNumero, fetchRendimiento]);

  return { rendimiento, loading, error, refetch: fetchRendimiento };
}

/**
 * Hook para calendarios múltiples
 */
export function useAllCalendars(type = "instructors", area = null) {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCalendars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (type === "instructors") {
        data = await SchedulesService.getAllInstructorCalendars(area);
      } else {
        data = await SchedulesService.getAllFichaCalendars(area);
      }
      setCalendars(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [type, area]);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  return { calendars, loading, error, refetch: fetchCalendars };
}

/**
 * Hook para operaciones de mutación (guardar, actualizar, eliminar)
 */
export function useScheduleMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeMutation = useCallback(async (mutationFn) => {
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
  }, []);

  // Registrar ficha
  const registrarFicha = useCallback(async (data) => {
    return executeMutation(() => SchedulesService.registrarFicha(data));
  }, [executeMutation]);

  // Activar palabra clave de ficha
  const activarPalabraClaveFicha = useCallback(async (data) => {
    return executeMutation(() => SchedulesService.activarPalabraClaveFicha(data));
  }, [executeMutation]);

  // Activar palabra clave de instructor
  const activarPalabraClaveInstructor = useCallback(async (data) => {
    return executeMutation(() => SchedulesService.activarPalabraClaveInstructor(data));
  }, [executeMutation]);

  // Guardar plan de trabajo
  const guardarPlanTrabajo = useCallback(async (data) => {
    return executeMutation(() => SchedulesService.guardarPlanTrabajo(data));
  }, [executeMutation]);

  // Asignar titular
  const asignarTitular = useCallback(async (data) => {
    return executeMutation(() => SchedulesService.asignarTitular(data));
  }, [executeMutation]);

  // Registrar entrega de ficha
  const registrarEntregaFicha = useCallback(async (data) => {
    return executeMutation(() => SchedulesService.registrarEntregaFicha(data));
  }, [executeMutation]);

  // Descargar horario Excel
  const downloadScheduleExcel = useCallback(async (tipo, id) => {
    return executeMutation(() => SchedulesService.downloadScheduleExcel(tipo, id));
  }, [executeMutation]);

  // Descargar lista de aprendices
  const downloadListaAprendices = useCallback(async (fichaNumero) => {
    return executeMutation(() => SchedulesService.downloadListaAprendices(fichaNumero));
  }, [executeMutation]);

  return {
    loading,
    error,
    registrarFicha,
    activarPalabraClaveFicha,
    activarPalabraClaveInstructor,
    guardarPlanTrabajo,
    asignarTitular,
    registrarEntregaFicha,
    downloadScheduleExcel,
    downloadListaAprendices,
  };
}

export default useSchedules;
