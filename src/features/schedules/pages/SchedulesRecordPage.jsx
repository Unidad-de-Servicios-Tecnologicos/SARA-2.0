import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { 
  FileSpreadsheet, 
  List, 
  BarChart3, 
  FileText, 
  FilePlus, 
  Plus, 
  Calendar, 
  CalendarDays,
  UserCheck,
  FileCheck
} from "lucide-react";
import SearchRecord from "../components/SearchRecord";
import CalendarView from "../components/CalendarView";
import RAPModal from "../components/RAPModal";
import AddScheduleModal from "../components/AddScheduleModal";
import { AddKeywordFichaModal } from "../components/AddKeywordModal";
import { AllInstructorCalendarsModal, AllFichaCalendarsModal } from "../components/AllCalendarsModal";
import AsignarTitularModal from "../components/AsignarTitularModal";
import EntregaFichaModal from "../components/EntregaFichaModal";
import RendimientoAcademicoModal from "../components/RendimientoAcademicoModal";
import { showToast, showAlert } from "@/shared/notifications";
import { downloadReport } from '@/utils/downloadReports';

export default function SchedulesRecordPage() {
  const { fichaNumero } = useParams(); // Obtener número de ficha de la ruta
  const location = useLocation();
  const initialSearchValue = fichaNumero || location.state?.initialSearchValue || location.state?.ficha?.numero || "";
  
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [periodo, setPeriodo] = useState("2024 - 4");
  const [hasSearched, setHasSearched] = useState(!!initialSearchValue);
  const [isExporting, setIsExporting] = useState(false);
  
  // Estados de modales
  const [showRAPModal, setShowRAPModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showKeywordFichaModal, setShowKeywordFichaModal] = useState(false);
  const [showAllInstructorsModal, setShowAllInstructorsModal] = useState(false);
  const [showAllFichasModal, setShowAllFichasModal] = useState(false);
  const [showAsignarTitularModal, setShowAsignarTitularModal] = useState(false);
  const [showEntregaFichaModal, setShowEntregaFichaModal] = useState(false);
  const [showRendimientoModal, setShowRendimientoModal] = useState(false);

  // Si viene de una ficha específica, hacer búsqueda automática
  useEffect(() => {
    if (initialSearchValue && !hasSearched) {
      setSearchValue(initialSearchValue);
      setHasSearched(true);
    }
  }, [initialSearchValue, hasSearched]);

  // Datos de horas programadas (mock)
  const horasProgramadas = {
    titulada: 0,
    complementaria: 0,
    novedades: 0
  };

  const handleSearch = () => {
    console.log("Buscando ficha:", searchValue, "Periodo:", periodo);
    setHasSearched(true);
  };

  const handleDownload = async (type, format = 'excel') => {
    try {
      setIsExporting(true);
      
      if (type === "horario") {
        const toastId = showToast.loading(`Preparando ${format.toUpperCase()}...`);
        
        // Datos de ejemplo del horario de ficha
        const scheduleData = [
          {
            ficha: searchValue || "Ficha",
            dia: "Lunes",
            horaInicio: "08:00",
            horaFin: "10:00",
            competencia: "Desarrollo de aplicaciones",
            instructor: "Juan Pérez"
          },
          {
            ficha: searchValue || "Ficha",
            dia: "Miércoles",
            horaInicio: "14:00",
            horaFin: "16:00",
            competencia: "Programación avanzada",
            instructor: "María García"
          }
        ];

        const columns = [
          { key: 'ficha', label: 'Ficha' },
          { key: 'dia', label: 'Día' },
          { key: 'horaInicio', label: 'Hora Inicio' },
          { key: 'horaFin', label: 'Hora Fin' },
          { key: 'competencia', label: 'Competencia' },
          { key: 'instructor', label: 'Instructor' }
        ];

        downloadReport(
          scheduleData,
          columns,
          `Horario - Ficha ${searchValue || 'General'}`,
          `horario_${searchValue || 'ficha'}_${new Date().toISOString().split('T')[0]}`,
          format,
          {
            subtitulo: `Período: ${periodo}`,
          }
        );

        showToast.dismiss(toastId);
        showToast.success("Horario descargado exitosamente");
      } else if (type === "aprendices") {
        const toastId = showToast.loading(`Preparando ${format.toUpperCase()}...`);
        
        // Datos de ejemplo de aprendices
        const aprendicesData = [
          {
            documento: "1234567890",
            nombre: "Juan",
            apellidos: "Pérez López",
            email: "juan@example.com",
            telefono: "3101234567",
            estado: "Activo"
          },
          {
            documento: "0987654321",
            nombre: "María",
            apellidos: "García Rodríguez",
            email: "maria@example.com",
            telefono: "3109876543",
            estado: "Activo"
          }
        ];

        const columns = [
          { key: 'documento', label: 'Documento' },
          { key: 'nombre', label: 'Nombre' },
          { key: 'apellidos', label: 'Apellidos' },
          { key: 'email', label: 'Email' },
          { key: 'telefono', label: 'Teléfono' },
          { key: 'estado', label: 'Estado' }
        ];

        downloadReport(
          aprendicesData,
          columns,
          `Aprendices - Ficha ${searchValue || 'General'}`,
          `aprendices_${searchValue || 'ficha'}_${new Date().toISOString().split('T')[0]}`,
          format,
          {
            subtitulo: `Período: ${periodo}`,
            rowClassName: (row) => row.estado === 'Activo' ? 'bg-green-50' : 'bg-gray-50'
          }
        );

        showToast.dismiss(toastId);
        showToast.success("Lista de aprendices descargada exitosamente");
      }
    } catch (error) {
      showToast.error(error.message || `Error al exportar ${type}`);
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Botones de acción según la documentación (11 botones)
  const actionButtons = [
    {
      id: "excel",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      label: "Descargar Horario (Excel)",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/50",
      onClick: () => handleDownload("horario")
    },
    {
      id: "lista",
      icon: <List className="w-5 h-5" />,
      label: "Descargar Lista de Aprendices",
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-700",
      onClick: () => handleDownload("aprendices")
    },
    {
      id: "acta",
      icon: <FileCheck className="w-5 h-5" />,
      label: "Entrega de Ficha",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
      onClick: () => setShowEntregaFichaModal(true)
    },
    {
      id: "rendimiento",
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Rendimiento Académico",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      hoverColor: "hover:bg-orange-100 dark:hover:bg-orange-900/50",
      onClick: () => setShowRendimientoModal(true)
    },
    {
      id: "raps",
      icon: <FileText className="w-5 h-5" />,
      label: "Detalle de RAPs",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/50",
      onClick: () => setShowRAPModal(true)
    },
    {
      id: "plan-trabajo",
      icon: <FilePlus className="w-5 h-5" />,
      label: "Plan de Trabajo",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
      onClick: () => setShowScheduleModal(true)
    },
    {
      id: "keyword-ficha",
      icon: <Plus className="w-5 h-5" />,
      label: "Activar Palabra Clave",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/30",
      hoverColor: "hover:bg-pink-100 dark:hover:bg-pink-900/50",
      onClick: () => setShowKeywordFichaModal(true)
    },
    {
      id: "asignar-titular",
      icon: <UserCheck className="w-5 h-5" />,
      label: "Asignar Titular",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-900/30",
      hoverColor: "hover:bg-teal-100 dark:hover:bg-teal-900/50",
      onClick: () => setShowAsignarTitularModal(true)
    },
    {
      id: "all-instructors",
      icon: <Calendar className="w-5 h-5" />,
      label: "Ver Calendarios de Instructores",
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-700",
      onClick: () => setShowAllInstructorsModal(true)
    },
    {
      id: "all-fichas",
      icon: <CalendarDays className="w-5 h-5" />,
      label: "Ver Todos los Calendarios",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/30",
      hoverColor: "hover:bg-red-100 dark:hover:bg-red-900/50",
      onClick: () => setShowAllFichasModal(true)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <SearchRecord
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
                disabled={(btn.id === "excel" || btn.id === "lista") ? isExporting : false}
                className={`p-3 rounded-lg ${btn.bgColor} ${btn.hoverColor} ${btn.color} transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isExporting && (btn.id === "excel" || btn.id === "lista") ? "animate-pulse" : ""
                }`}
                title={btn.label}
              >
                {isExporting && (btn.id === "excel" || btn.id === "lista") ? (
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
          title={`Horario de Ficha ${searchValue}`}
          showViewSelector={true}
        />
      )}

      {!hasSearched && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Ingrese el número de la ficha y haga clic en consultar para ver su horario
          </p>
        </div>
      )}

      {/* Modales */}
      <RAPModal 
        isOpen={showRAPModal} 
        onClose={() => setShowRAPModal(false)}
      />
      
      <AddScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
      
      <AddKeywordFichaModal
        isOpen={showKeywordFichaModal}
        onClose={() => setShowKeywordFichaModal(false)}
      />
      
      <AllInstructorCalendarsModal
        isOpen={showAllInstructorsModal}
        onClose={() => setShowAllInstructorsModal(false)}
      />
      
      <AllFichaCalendarsModal
        isOpen={showAllFichasModal}
        onClose={() => setShowAllFichasModal(false)}
      />
      
      <AsignarTitularModal
        isOpen={showAsignarTitularModal}
        onClose={() => setShowAsignarTitularModal(false)}
        fichaCode={searchValue}
      />
      
      <EntregaFichaModal
        isOpen={showEntregaFichaModal}
        onClose={() => setShowEntregaFichaModal(false)}
        fichaCode={searchValue}
      />
      
      <RendimientoAcademicoModal
        isOpen={showRendimientoModal}
        onClose={() => setShowRendimientoModal(false)}
        fichaCode={searchValue}
      />
    </div>
  );
}
