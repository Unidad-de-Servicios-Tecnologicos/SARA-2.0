import React, { useState } from "react";
import InstructorTable from "../components/InstructorTable";
import InstructorDetailModal from "../components/InstructorDetailModal";
import InstructorActivitiesModal from "../components/InstructorActivitiesModal";
import InstructorFichasModal from "../components/InstructorFichasModal";
import EditInstructorModal from "../components/EditInstructorModal";
import {
  useInstructores,
  useInstructoresMutations,
  useInstructoresCatalogos
} from "../hooks/UseInstructors";
import { showToast, showAlert } from "@/shared/notifications";
import { downloadReport } from "@/utils/downloadReports";
import { Button } from "../../../components/ui/button";
import { Plus, Download, FileText } from "lucide-react";
import CreateInstructorModal from '../components/CreateInstructorModal';

export default function InstructorsListPage() {
  // Estados locales
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [activitiesInstructor, setActivitiesInstructor] = useState(null);
  const [showFichasModal, setShowFichasModal] = useState(false);
  const [fichasInstructor, setFichasInstructor] = useState(null);
  // Estados para edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInstructor, setEditInstructor] = useState(null);

  // Hooks de datos
  const { instructores, loading, refetch } = useInstructores();
  const { cambiarEstado } = useInstructoresMutations();
  const catalogos = useInstructoresCatalogos();

  // Función para ver detalle de instructor
  const handleViewDetail = (instructor) => {
    console.log('Abriendo modal de detalle para instructor:', instructor.nombre);
    setSelectedInstructor(instructor);
    setShowDetailModal(true);
  };

  // Función para cerrar modal de detalle
  const handleCloseDetail = () => {
    setShowDetailModal(false);
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
      {/* Botones de acción */}
      <div className="flex gap-2 justify-between">
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportData('excel')}
            className="flex items-center gap-2"
            title="Descargar en Excel"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportData('pdf')}
            className="flex items-center gap-2"
            title="Descargar en PDF"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </Button>
        </div>
      </div>

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

      {/* Modal fichas */}
      <InstructorFichasModal
        isOpen={showFichasModal}
        onClose={() => setShowFichasModal(false)}
        instructor={fichasInstructor}
      />

      {/* Modal actividades */}
      <InstructorActivitiesModal
        isOpen={showActivitiesModal}
        onClose={() => setShowActivitiesModal(false)}
        instructor={activitiesInstructor}
      />

      {/* Modal de detalle */}
      {showDetailModal && selectedInstructor && (
        <InstructorDetailModal
          isOpen={showDetailModal}
          onClose={handleCloseDetail}
          instructor={selectedInstructor}
          onRefresh={refreshAll}
          onEdit={(instructor) => {
            setShowDetailModal(false);
            setEditInstructor(instructor);
            setShowEditModal(true);
          }}
        />
      )}

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
