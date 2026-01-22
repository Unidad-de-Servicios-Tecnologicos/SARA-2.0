import React, { useMemo } from "react";
import FormModal from "@/components/ui/FormModal";
import { mockFichas } from "@/features/records/mock/records.mock";

export default function LearnerFormModal({ isOpen, onClose, learner, onSave }) {
  // Generar opciones de fichas desde el módulo de records
  // El programa se obtiene automáticamente de la ficha seleccionada
  const fichaOptions = useMemo(() => {
    return mockFichas.map((ficha) => ({
      value: ficha.numero,
      label: `${ficha.numero} - ${ficha.programa?.nombre || "Sin programa"}`,
    }));
  }, []);

  // Definir los campos del formulario
  const LEARNER_FIELDS = [
    {
      name: "document",
      label: "Documento",
      type: "text",
      placeholder: "Número de documento",
      required: true,
      disabled: learner ? true : false, // Se deshabilita cuando es edición
    },
    {
      name: "name",
      label: "Nombre Completo",
      type: "text",
      placeholder: "Nombre del aprendiz",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
      required: true,
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "tel",
      placeholder: "Número de teléfono",
      required: false,
    },
    {
      name: "fichaId",
      label: "Ficha",
      type: "select",
      placeholder: "Seleccione una ficha",
      required: true,
      options: fichaOptions,
      helperText: "El programa se asigna automáticamente según la ficha",
    },
    {
      name: "state",
      label: "Estado",
      type: "select",
      required: false,
      options: [
        { value: "EN FORMACIÓN", label: "En Formación" },
        { value: "CERTIFICADO", label: "Certificado" },
        { value: "RETIRADO", label: "Retirado" },
        { value: "CONDICIONADO", label: "Condicionado" },
        { value: "APLAZADO", label: "Aplazado" },
      ],
      defaultValue: "EN FORMACIÓN",
    },
  ];

  // Manejar el guardado y asignar el programa automáticamente según la ficha seleccionada
  const handleSave = (data) => {
    // Buscar la ficha seleccionada para obtener el programa asociado
    const selectedFicha = mockFichas.find((f) => f.numero === data.fichaId);
    if (selectedFicha && selectedFicha.programa) {
      data.program = selectedFicha.programa.nombre;
    }
    onSave(data);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      record={learner}
      onSave={handleSave}
      title={learner ? "Editar Aprendiz" : "Crear Nuevo Aprendiz"}
      fields={LEARNER_FIELDS}
      submitButtonText={learner ? "Guardar Cambios" : "Crear Aprendiz"}
    />
  );
}
