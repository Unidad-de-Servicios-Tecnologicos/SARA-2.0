import React from "react";
import FormModal from "@/components/ui/FormModal";

const INSTRUCTOR_FIELDS = [
  {
    name: "document",
    label: "Documento",
    type: "text",
    placeholder: "Número de documento",
    required: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    placeholder: "Nombre del instructor",
    required: true,
  },
  {
    name: "apellidos",
    label: "Apellidos",
    type: "text",
    placeholder: "Apellidos del instructor",
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
    name: "telefono",
    label: "Teléfono",
    type: "tel",
    placeholder: "Número de teléfono",
    required: false,
  },
  {
    name: "especialidad",
    label: "Especialidad",
    type: "text",
    placeholder: "Área de especialidad",
    required: false,
  },
  {
    name: "estado",
    label: "Estado",
    type: "select",
    required: false,
    options: [
      { value: "activo", label: "Activo" },
      { value: "inactivo", label: "Inactivo" },
      { value: "licencia", label: "Licencia" },
    ],
    defaultValue: "activo",
  },
  {
    name: "experiencia",
    label: "Años de Experiencia",
    type: "text",
    placeholder: "Ej: 5",
    required: false,
  },
];

export default function InstructorFormModal({ isOpen, onClose, instructor, onSave }) {
  // Ajustar los campos si es edición
  const fields = INSTRUCTOR_FIELDS.map((field) => ({
    ...field,
    disabled: instructor && field.name === "document" ? true : field.disabled,
  }));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      record={instructor}
      onSave={onSave}
      title={instructor ? "Editar Instructor" : "Crear Nuevo Instructor"}
      fields={fields}
      submitButtonText={instructor ? "Guardar Cambios" : "Crear Instructor"}
    />
  );
}
