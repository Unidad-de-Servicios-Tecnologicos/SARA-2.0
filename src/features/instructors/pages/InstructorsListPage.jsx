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
import { showToast } from "@/shared/notifications";

import { Button } from "../../../components/ui/button";

import { Plus } from "lucide-react";

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
