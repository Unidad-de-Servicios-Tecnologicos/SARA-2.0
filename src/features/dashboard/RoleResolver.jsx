import SubdirectorDashboard from "./components/subdirector/SubdirectorDashboard";
import { useDashboardNav } from "./store/useDashboardNav";
import { SchedulesGeneralPage } from "@/features/schedules";
import { RecordsListPage } from "@/features/records";
import { InstructorsListPage } from "@/features/instructors";
import LearnersManagementPage from "@/features/learners/pages/LearnersManagementPage";
import AcademicPerformancePage from "@/features/learners/pages/AcademicPerformancePage";
import AcademicManagementPage from "@/features/academic-management/pages/AcademicManagementPage";
import AttendanceManagementPage from "@/features/attendance/pages/AttendanceManagementPage";
import EnvironmentSchedulesPage from "@/features/environment-schedules/pages/EnvironmentSchedulesPage";
import EnvironmentReservationsPage from "@/features/environment-reservations/pages/EnvironmentReservationsPage";
import CompaniesManagementPage from "@/features/companies/pages/CompaniesManagementPage";
import PracticesManagementPage from "@/features/practices/pages/PracticesManagementPage";
import DocumentsGenerationPage from "@/features/documents/pages/DocumentsGenerationPage";
import MonitoringPage from "@/features/monitoring/pages/MonitoringPage";
import AnalyticsPage from "@/features/analytics/pages/AnalyticsPage";
import {
  Building2, 
  Users, 
  UserCheck, 
  CalendarCheck, 
  FileText, 
  Diamond, 
  Briefcase,
  Settings,
  Construction
} from "lucide-react";

// Componente placeholder para módulos en desarrollo
function ComingSoonPage({ title, icon: Icon, description }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
      <div className="p-4 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-6">
        {Icon && <Icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {description}
      </p>
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg">
        <Construction className="w-5 h-5" />
        <span className="font-medium">En desarrollo</span>
      </div>
    </div>
  );
}

export default function RoleResolver() {
  const currentModule = useDashboardNav((s) => s.currentModule);

  // Renderizar módulo según navegación
  const renderModule = () => {
    switch (currentModule) {
      case "horarios":
        return <SchedulesGeneralPage />;
      
      case "ambientes":
        return <EnvironmentSchedulesPage />;
      
      case "instructores":
        return <InstructorsListPage />;
      
      case "aprendices":
        return <LearnersManagementPage />;
      
      case "fichas":
        return <AcademicManagementPage />;
      
      case "reservas":
        return <EnvironmentReservationsPage />;
      
      case "rendimiento":
        return <AcademicPerformancePage />;
      
      case "asistencia":
        return <AttendanceManagementPage />;
      
      case "empresas":
        return <CompaniesManagementPage />;
      
      case "practicas":
        return <PracticesManagementPage />;
      
      case "documentos":
        return <DocumentsGenerationPage />;
      
      case "seguimiento":
        return <MonitoringPage />;
      
      case "analytics":
        return <AnalyticsPage />;
      
      case "configuracion":
        return (
          <ComingSoonPage 
            title="Configuración" 
            icon={Settings}
            description="Configura las opciones del sistema, usuarios y permisos."
          />
        );
      
      case "dashboard":
      default:
        return <SubdirectorDashboard />;
    }
  };

  return renderModule();
}
