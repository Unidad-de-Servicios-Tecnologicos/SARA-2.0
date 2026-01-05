/**
 * ========================================
 * MÓDULO DE DASHBOARD
 * ========================================
 * Exportaciones centralizadas del módulo
 */

// ========================================
// PÁGINAS
// ========================================
export { default as DashboardPage } from "./pages/DashboardPage";
export { default as DashboardLayout } from "./layout/DashboardLayout";
export { default as RoleResolver } from "./RoleResolver";

// ========================================
// COMPONENTES - SUBDIRECTOR
// ========================================
export { default as SubdirectorDashboard } from "./components/subdirector/SubdirectorDashboard";
export { default as SubdirectorKPIs } from "./components/subdirector/SubdirectorKPIs";
export { default as SubdirectorCharts } from "./components/subdirector/SubdirectorCharts";
export { default as InstructorsByContract } from "./components/subdirector/InstructorsByContract";
export { default as InstructorsByGender } from "./components/subdirector/InstructorsByGender";
export { default as ApprenticesByStatus } from "./components/subdirector/ApprenticesByStatus";
export { default as ApprenticesByProgram } from "./components/subdirector/ApprenticesByProgram";
export { default as FichasByProgram } from "./components/subdirector/FichasByProgram";

// ========================================
// COMPONENTES - INSTRUCTOR
// ========================================
export { default as InstructorDashboard } from "./components/instructor/InstructorDashboard";
export { default as InstructorKPIs } from "./components/instructor/InstructorKPIs";
export { default as InstructorCharts } from "./components/instructor/InstructorCharts";
export { default as ActivitiesTable } from "./components/instructor/ActivitiesTable";

// ========================================
// COMPONENTES - COMUNES
// ========================================
export { default as KPIBox } from "./components/common/KPIBox";
export { default as DashboardFilters } from "./components/common/DashboardFilters";
export { default as DrillDownModal } from "./components/common/DrillDownModal";
export { default as ChartOptionsMenu } from "./components/common/ChartOptionsMenu";

// ========================================
// SERVICIOS
// ========================================
export { default as DashboardService } from "./services/dashboardService";

// ========================================
// HOOKS
// ========================================
export { useDashboard, useKPIs } from "./hooks/useDashboard";
export { 
  useDashboardData, 
  useDashboardFilters, 
  useDashboardExport 
} from "./hooks/useDashboardInteractivity";

// ========================================
// DATOS MOCK (Solo para desarrollo)
// ========================================
export * from "./mock/dashboard.mock";
