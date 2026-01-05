import SubdirectorDashboard from "./components/subdirector/SubdirectorDashboard";
import { useDashboardNav } from "./store/useDashboardNav";
import { SchedulesGeneralPage } from "@/features/schedules";
import { RecordsListPage } from "@/features/records";
import { InstructorsListPage } from "@/features/instructors";
import { 
  Building2, 
  Users, 
  UserCheck, 
  CalendarCheck, 
  FileText, 
  Diamond, 
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
        return (
          <ComingSoonPage 
            title="Gestión de Ambientes" 
            icon={Building2}
            description="Administra los ambientes de formación, su disponibilidad y características."
          />
        );
      
      case "instructores":
        return <InstructorsListPage />;
      
      case "aprendices":
        return (
          <ComingSoonPage 
            title="Gestión de Aprendices" 
            icon={UserCheck}
            description="Administra la información de los aprendices, estados y seguimiento académico."
          />
        );
      
      case "fichas":
        return <RecordsListPage />;
      
      case "reservas":
        return (
          <ComingSoonPage 
            title="Gestión de Reservas" 
            icon={CalendarCheck}
            description="Reserva ambientes de formación y gestiona la disponibilidad de espacios."
          />
        );
      
      case "documentos":
        return (
          <ComingSoonPage 
            title="Gestión de Documentos" 
            icon={FileText}
            description="Genera y administra documentos académicos, actas y reportes."
          />
        );
      
      case "practicas":
        return (
          <ComingSoonPage 
            title="Gestión de Prácticas" 
            icon={Diamond}
            description="Administra la etapa productiva, empresas, seguimientos e inducciones."
          />
        );
      
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
