/**
 * ========================================
 * MÓDULO DE HORARIOS (SCHEDULES)
 * ========================================
 * Exportaciones centralizadas del módulo
 */

// ========================================
// PÁGINAS
// ========================================
export { default as SchedulesGeneralPage } from "./pages/SchedulesGeneralPage";
export { default as SchedulesInstructorPage } from "./pages/SchedulesInstructorPage";
export { default as SchedulesRecordPage } from "./pages/SchedulesRecordPage";
export { default as SchedulesAmbientePage } from "./pages/SchedulesAmbientePage";

// ========================================
// COMPONENTES
// ========================================
export { default as CalendarView, MiniCalendar } from "./components/CalendarView";
export { default as RAPModal } from "./components/RAPModal";
export { default as AddScheduleModal } from "./components/AddScheduleModal";
export { AddKeywordFichaModal, AddKeywordInstructorModal } from "./components/AddKeywordModal";
export { AllInstructorCalendarsModal, AllFichaCalendarsModal } from "./components/AllCalendarsModal";
export { default as AsignarTitularModal } from "./components/AsignarTitularModal";
export { default as EntregaFichaModal } from "./components/EntregaFichaModal";
export { default as RendimientoAcademicoModal } from "./components/RendimientoAcademicoModal";
export { default as RegistrarFichaModal } from "./components/RegistrarFichaModal";
export { default as SearchInstructor } from "./components/SearchInstructor";
export { default as SearchRecord } from "./components/SearchRecord";
export { default as SearchAmbiente } from "./components/SearchAmbiente";

// ========================================
// SERVICIOS
// ========================================
export { default as SchedulesService } from "./services/SchedulesService";

// ========================================
// HOOKS
// ========================================
export {
  useSchedules,
  useInstructors,
  useInstructorSchedule,
  useFichas,
  useFichaSchedule,
  useAmbientes,
  useAmbienteSchedule,
  useRAPs,
  usePeriodos,
  useItinerarios,
  useRendimientoAcademico,
  useAllCalendars,
  useScheduleMutations,
} from "./hooks/UseSchedules";

// ========================================
// DATOS MOCK (Solo para desarrollo)
// ========================================
export * from "./mock/schedules.mock";
