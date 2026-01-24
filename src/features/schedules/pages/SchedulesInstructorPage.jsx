import React, { useState } from "react";
import { 
  FileText, 
  Plus, 
  Users, 
  Calendar,
  CalendarDays,
  FileSpreadsheet,
  CalendarPlus
} from "lucide-react";
import SearchInstructor from "../components/SearchInstructor";
import CalendarView from "../components/CalendarView";
import RAPModal from "../components/RAPModal";
import { AddKeywordFichaModal, AddKeywordInstructorModal } from "../components/AddKeywordModal";
import { AllInstructorCalendarsModal, AllFichaCalendarsModal } from "../components/AllCalendarsModal";
import RegistrarFichaModal from "../components/RegistrarFichaModal";
import { showToast } from "@/shared/notifications";
import { downloadExcel } from '@/utils/downloadExcel';

export default function SchedulesInstructorPage() {
  const [searchValue, setSearchValue] = useState("");
  const [periodo, setPeriodo] = useState("2024 - 4");
  const [hasSearched, setHasSearched] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Estados de modales
  const [showRAPModal, setShowRAPModal] = useState(false);
  const [showKeywordFichaModal, setShowKeywordFichaModal] = useState(false);
  const [showKeywordInstructorModal, setShowKeywordInstructorModal] = useState(false);
  const [showAllInstructorsModal, setShowAllInstructorsModal] = useState(false);
  const [showAllFichasModal, setShowAllFichasModal] = useState(false);
  const [showRegistrarFichaModal, setShowRegistrarFichaModal] = useState(false);

  // Datos de horas programadas (mock)
  const horasProgramadas = {
    titulada: 0,
    complementaria: 0,
    novedades: 0
  };

  const handleSearch = () => {
    console.log("Buscando instructor:", searchValue, "Periodo:", periodo);
    setHasSearched(true);
  };

  // Handler para descargar horario
  const handleDownloadSchedule = async () => {
    try {
      setIsExporting(true);
      const toastId = showToast.loading('Exportando horario del instructor...');
      
      // Datos de ejemplo del horario del instructor
      const scheduleData = [
        {
          instructor: searchValue || "Instructor",
          dia: "Lunes",
          horaInicio: "08:00",
          horaFin: "10:00",
          competencia: "Desarrollo de aplicaciones",
          ambiente: "Lab 1"
        },
        {
          instructor: searchValue || "Instructor",
          dia: "Miércoles",
          horaInicio: "14:00",
          horaFin: "16:00",
          competencia: "Programación avanzada",
          ambiente: "Lab 2"
        }
      ];

      const columns = [
        { key: 'instructor', label: 'Instructor' },
        { key: 'dia', label: 'Día' },
        { key: 'horaInicio', label: 'Hora Inicio' },
        { key: 'horaFin', label: 'Hora Fin' },
        { key: 'competencia', label: 'Competencia' },
        { key: 'ambiente', label: 'Ambiente' }
      ];

      downloadExcel(
        scheduleData,
        columns,
        `Horario del Instructor - ${searchValue || 'General'}`,
        `horario_instructor_${searchValue || 'general'}_${new Date().toISOString().split('T')[0]}`,
        {
          subtitulo: `Período: ${periodo}`,
          fecha: new Date().toLocaleDateString('es-CO')
        }
      );

      showToast.dismiss(toastId);
      showToast.success("Horario del Instructor descargado exitosamente");
    } catch (error) {
      showToast.error(error.message || "Error al exportar el horario");
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Iconos de funcionalidad
  const actionButtons = [
    {
      id: "download-schedule",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      label: "Descargar Horario (Excel)",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/50",
      onClick: handleDownloadSchedule
    },
    {
      id: "registrar-ficha",
      icon: <CalendarPlus className="w-5 h-5" />,
      label: "Registrar Ficha",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-900/30",
      hoverColor: "hover:bg-teal-100 dark:hover:bg-teal-900/50",
      onClick: () => setShowRegistrarFichaModal(true)
    },
    {
      id: "raps",
      icon: <FileText className="w-5 h-5" />,
      label: "Detalles de RAPs",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/50",
      onClick: () => setShowRAPModal(true)
    },
    {
      id: "keyword-ficha",
      icon: <Plus className="w-5 h-5" />,
      label: "Activar palabra clave de la ficha",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/30",
      hoverColor: "hover:bg-pink-100 dark:hover:bg-pink-900/50",
      onClick: () => setShowKeywordFichaModal(true)
    },
    {
      id: "keyword-instructor",
      icon: <Users className="w-5 h-5" />,
      label: "Activar palabra clave del instructor",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
      onClick: () => setShowKeywordInstructorModal(true)
    },
    {
      id: "all-instructors",
      icon: <Calendar className="w-5 h-5" />,
      label: "Visualizar todos los calendarios de instructores",
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-700",
      onClick: () => setShowAllInstructorsModal(true)
    },
    {
      id: "all-fichas",
      icon: <CalendarDays className="w-5 h-5" />,
      label: "Visualizar todos los calendarios de fichas",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/30",
      hoverColor: "hover:bg-red-100 dark:hover:bg-red-900/50",
      onClick: () => setShowAllFichasModal(true)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <SearchInstructor
        value={searchValue}
        onChange={setSearchValue}
        periodo={periodo}
        onPeriodoChange={setPeriodo}
        onSearch={handleSearch}
      />

      {/* Botones de acción y horas programadas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Iconos de funcionalidad */}
          <div className="flex flex-wrap gap-2">
            {actionButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={btn.onClick}
                disabled={btn.id === "download-schedule" ? isExporting : false}
                className={`p-3 rounded-lg ${btn.bgColor} ${btn.hoverColor} ${btn.color} transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isExporting && btn.id === "download-schedule" ? "animate-pulse" : ""
                }`}
                title={btn.label}
              >
                {isExporting && btn.id === "download-schedule" ? (
                  <div className="animate-spin">{btn.icon}</div>
                ) : (
                  btn.icon
                )}
              </button>
            ))}
          </div>

          {/* Horas programadas */}
          <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
            <div>
              Horas Programadas (Titulada): <span className="font-medium text-gray-900 dark:text-white">{horasProgramadas.titulada}</span>
            </div>
            <div>
              Horas Programadas (Complementaria): <span className="font-medium text-gray-900 dark:text-white">{horasProgramadas.complementaria}</span>
            </div>
            <div>
              Horas Programadas (Novedades): <span className="font-medium text-blue-600 dark:text-blue-400">{horasProgramadas.novedades}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendario */}
      {hasSearched && (
        <CalendarView 
          title={`Horario de ${searchValue || "Instructor"}`}
          showViewSelector={true}
        />
      )}

      {!hasSearched && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Ingrese el nombre de un instructor y haga clic en buscar para ver su horario
          </p>
        </div>
      )}

      {/* Modales */}
      <RAPModal 
        isOpen={showRAPModal} 
        onClose={() => setShowRAPModal(false)}
        instructorName={searchValue}
      />
      
      <AddKeywordFichaModal
        isOpen={showKeywordFichaModal}
        onClose={() => setShowKeywordFichaModal(false)}
      />
      
      <AddKeywordInstructorModal
        isOpen={showKeywordInstructorModal}
        onClose={() => setShowKeywordInstructorModal(false)}
        instructorName={searchValue}
      />
      
      <AllInstructorCalendarsModal
        isOpen={showAllInstructorsModal}
        onClose={() => setShowAllInstructorsModal(false)}
      />
      
      <AllFichaCalendarsModal
        isOpen={showAllFichasModal}
        onClose={() => setShowAllFichasModal(false)}
      />
      
      <RegistrarFichaModal
        isOpen={showRegistrarFichaModal}
        onClose={() => setShowRegistrarFichaModal(false)}
        instructorName={searchValue}
      />
    </div>
  );
}
