import React, { useState } from "react";
import InstructorTable from "../components/InstructorTable";
import InstructorSidePanel from "../components/InstructorSidePanel";
import InstructorActivitiesModal from "../components/InstructorActivitiesModal";
import InstructorFichasModal from "../components/InstructorFichasModal";
import InstructorSchedulePreview from "../components/InstructorSchedulePreview";
import EditInstructorModal from "../components/EditInstructorModal";
import {
  useInstructores,
  useInstructoresMutations,
  useInstructoresCatalogos
} from "../hooks/UseInstructors";
import { showToast, showAlert } from "@/shared/notifications";
import { downloadReport } from "@/utils/downloadReports";
import { Button } from "../../../components/ui/button";
import CreateInstructorModal from "../components/CreateInstructorModal";

export default function InstructorsListPage() {
  // Estados para panel lateral
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Estados para modales
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [activitiesInstructor, setActivitiesInstructor] = useState(null);
  const [showFichasModal, setShowFichasModal] = useState(false);
  const [fichasInstructor, setFichasInstructor] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleContext, setScheduleContext] = useState({ instructor: null, ficha: null });

  // Estados para edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInstructor, setEditInstructor] = useState(null);

  // Hooks de datos
  const { instructores, loading, refetch } = useInstructores();
  const { cambiarEstado } = useInstructoresMutations();
  const catalogos = useInstructoresCatalogos();

  // Función para abrir panel lateral
  const handleViewDetail = (instructor) => {
    setSelectedInstructor(instructor);
    setShowSidePanel(true);
  };

  // Función para cerrar panel lateral
  const handleCloseSidePanel = () => {
    setShowSidePanel(false);
    setSelectedInstructor(null);
  };

  // Función para refrescar datos
  const refreshAll = () => {
    refetch();
  };

  const handleExportData = async (format) => {
    if (!instructores?.length) {
      showAlert.warning('No hay datos para exportar')
      return
    }

    const toastId = showToast.loading(`Preparando ${format.toUpperCase()}...`)
    
    try {
      const dataToExport = instructores.map(instructor => ({
        documento: instructor.documento || instructor.id || '',
        nombre: instructor.nombre || '',
        email: instructor.email || '',
        especialidad: instructor.especialidad || '',
        telefono: instructor.telefono || '',
        estado: instructor.estado === 1 ? 'Activo' : 'Inactivo'
      }))

      const columns = [
        { key: 'documento', label: 'Documento' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'email', label: 'Email' },
        { key: 'especialidad', label: 'Especialidad' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'estado', label: 'Estado' }
      ]

      await downloadReport(
        dataToExport,
        columns,
        'Gestión de Instructores',
        `instructores_${new Date().toISOString().split('T')[0]}`,
        format,
        {
          subtitulo: 'Información detallada de instructores registrados',
          rowClassName: (row) => {
            if (row.estado === 'Activo') return 'bg-green-50'
            if (row.estado === 'Inactivo') return 'bg-red-50'
            return 'bg-white'
          }
        }
      )

      showToast.dismiss(toastId)
      showToast.success(`${dataToExport.length} registros exportados exitosamente`)
    } catch (error) {
      showToast.dismiss(toastId)
      showToast.error('Error al exportar los datos')
      console.error('Export error:', error)
    }
  }

  return (
    <div className="relative space-y-6">
      {/* Tabla de instructores */}
      <InstructorTable
        instructores={instructores}
        loading={loading}
        onView={handleViewDetail}
        onFichas={(instructor) => {
          setFichasInstructor(instructor);
          setShowFichasModal(true);
        }}
        onActividad={(instructor) => {
          setActivitiesInstructor(instructor);
          setShowActivitiesModal(true);
        }}
        onExportExcel={() => handleExportData("excel")}
        onToggleEstado={async (instructorId, nuevoEstado) => {
          try {
            await cambiarEstado(instructorId, nuevoEstado ? "activo" : "inactivo");
            showToast.success(`Estado cambiado a ${nuevoEstado ? "activo" : "inactivo"}`);
            refreshAll();
          } catch {
            showToast.error("Error al cambiar estado");
          }
        }}
      />

      {/* Panel lateral de información */}
      <InstructorSidePanel
        isOpen={showSidePanel}
        onClose={handleCloseSidePanel}
        instructor={selectedInstructor}
        onViewFichas={() => {
          setFichasInstructor(selectedInstructor);
          setShowFichasModal(true);
        }}
        onViewActivities={() => {
          setActivitiesInstructor(selectedInstructor);
          setShowActivitiesModal(true);
        }}
      />

      {/* Modal fichas */}
      <InstructorFichasModal
        isOpen={showFichasModal}
        onClose={() => setShowFichasModal(false)}
        instructor={fichasInstructor}
        onViewSchedule={(ficha) => {
          setScheduleContext({ instructor: fichasInstructor, ficha });
          setShowScheduleModal(true);
        }}
      />

      {/* Modal actividades */}
      <InstructorActivitiesModal
        isOpen={showActivitiesModal}
        onClose={() => setShowActivitiesModal(false)}
        instructor={activitiesInstructor}
      />

      {/* Modal de horario de ficha */}
      <InstructorSchedulePreview
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        instructor={scheduleContext.instructor}
        ficha={scheduleContext.ficha}
      />

      {/* Modal de edición */}
      {showEditModal && editInstructor && (
        <EditInstructorModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          instructor={editInstructor}
          onSuccess={() => {
            setShowEditModal(false);
            refreshAll();
          }}
          catalogos={catalogos}
        />
      )}
    </div>
  );
}
