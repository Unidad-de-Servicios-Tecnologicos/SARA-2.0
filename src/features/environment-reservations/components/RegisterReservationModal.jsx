import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { showAlert, showToast } from "@/shared/notifications";
import { mockInstructores } from "@/features/instructors/mock/instructors.mock";
import { mockRAPs } from "@/features/schedules/mock/schedules.mock";

// Derivar mocks de fichas e instructores desde el módulo de Instructores
const fichasFromInstructors = mockInstructores.flatMap((instructor) =>
  (instructor.fichasAsignadas || []).map((ficha) => ({
    codigo: ficha.numero,
    programa: ficha.programa,
    jornada: ficha.jornada,
    entregada: true, // Se asume ENTREGADA en mocks; el backend validará el estado real
  })),
);

const fichasMock = Array.from(
  new Map(fichasFromInstructors.map((f) => [f.codigo, f])).values(),
);

const instructoresMock = mockInstructores.map((instructor) => ({
  nombre: `${instructor.nombre} ${instructor.apellidos}`,
  activo: instructor.estado === "activo",
  fichas: (instructor.fichasAsignadas || []).map((f) => f.numero),
}));

// Derivar competencias y RAP desde el módulo de Horarios (mockRAPs)
const competenciasMock = Array.from(new Set(mockRAPs.map((r) => r.competencia)));

const rapMock = mockRAPs.map((r) => ({
  codigo: `${r.normaCompetencia || "RAP"}-${r.id}`,
  descripcion: r.rap,
  competencia: r.competencia,
  activo: true,
}));

const ambientesMock = [
  { nombre: "LAB-401 - Software", activo: true },
  { nombre: "Aula 210 - Gestión", activo: true },
  { nombre: "Ambiente Inactivo", activo: false },
];

const initialFormState = {
  ficha: "",
  programa: "",
  jornada: "",
  instructor: "",
  competencia: "",
  rap: "",
  ambiente: "",
  fecha: "",
  horaInicio: "",
  horaFin: "",
};

export default function RegisterReservationModal({
  isOpen,
  onClose,
  onSave,
  existingReservations = [],
}) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFichaChange = (codigoFicha) => {
    const ficha = fichasMock.find((f) => f.codigo === codigoFicha) || null;
    const instructorAsignado =
      instructoresMock.find((i) => i.fichas.includes(codigoFicha)) || null;
    setFormData((prev) => ({
      ...prev,
      ficha: codigoFicha,
      programa: ficha?.programa || "",
      jornada: ficha?.jornada || "",
      // Cuando se selecciona la ficha, se trae automáticamente el instructor asignado
      instructor: instructorAsignado?.nombre || "",
    }));
  };

  const validarNegocio = () => {
    const {
      ficha,
      instructor,
      competencia,
      rap,
      ambiente,
      fecha,
      horaInicio,
      horaFin,
    } = formData;

    // Requeridos
    if (!ficha || !instructor || !competencia || !rap || !ambiente || !fecha || !horaInicio || !horaFin) {
      showAlert.warning("Campos requeridos", "Todos los campos marcados con * son obligatorios.");
      return false;
    }

    if (horaFin <= horaInicio) {
      showAlert.warning("Horario inválido", "La hora fin debe ser mayor que la hora inicio.");
      return false;
    }

    // Ficha entregada
    const fichaInfo = fichasMock.find((f) => f.codigo === ficha);
    if (!fichaInfo || !fichaInfo.entregada) {
      showAlert.warning("Ficha no entregada", "La ficha seleccionada debe estar ENTREGADA para poder reservar.");
      return false;
    }

    // Instructor asignado y activo
    const instructorInfo = instructoresMock.find((i) => i.nombre === instructor);
    if (!instructorInfo) {
      showAlert.warning("Instructor no válido", "Debe seleccionar un instructor asignado a la ficha.");
      return false;
    }
    if (!instructorInfo.activo) {
      showAlert.warning("Instructor inactivo", "El instructor seleccionado no está activo en el sistema.");
      return false;
    }
    if (!instructorInfo.fichas.includes(ficha)) {
      showAlert.warning("Instructor no asignado", "El instructor seleccionado no está asignado a la ficha.");
      return false;
    }

    // RAP activo
    const rapInfo = rapMock.find((r) => r.codigo === rap);
    if (!rapInfo || !rapInfo.activo) {
      showAlert.warning("RAP inactivo", "El RAP seleccionado debe estar ACTIVO.");
      return false;
    }

    // Ambiente activo
    const ambienteInfo = ambientesMock.find((a) => a.nombre === ambiente);
    if (!ambienteInfo || !ambienteInfo.activo) {
      showAlert.warning("Ambiente inactivo", "El ambiente seleccionado debe estar ACTIVO.");
      return false;
    }

    // Sin traslapes (solo validación básica en frontend)
    const hayTraslape = existingReservations.some((r) => {
      if (r.ambiente !== ambiente || r.fecha !== fecha) return false;
      const inicioNuevo = horaInicio;
      const finNuevo = horaFin;
      const inicioExistente = r.horaInicio || r.startTime;
      const finExistente = r.horaFin || r.endTime;
      if (!inicioExistente || !finExistente) return false;
      return !(finNuevo <= inicioExistente || inicioNuevo >= finExistente);
    });

    if (hayTraslape) {
      showAlert.warning(
        "Traslape de reserva",
        "Ya existe una reserva para ese ambiente en el rango horario seleccionado.",
      );
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validarNegocio()) return;

    const fichaInfo = fichasMock.find((f) => f.codigo === formData.ficha) || {};
    const rapInfo = rapMock.find((r) => r.codigo === formData.rap) || {};

    const payload = {
      ficha: formData.ficha,
      programa: fichaInfo.programa || formData.programa,
      jornada: fichaInfo.jornada || formData.jornada,
      instructor: formData.instructor,
      competencia: formData.competencia,
      rap: formData.rap,
      rapDescripcion: rapInfo.descripcion || "",
      ambiente: formData.ambiente,
      fecha: formData.fecha,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      estado: "PROGRAMADA",
    };

    const confirmado = await showAlert.confirmSave(
      "¿Registrar esta reserva de ambiente?",
      "Se validarán disponibilidad y condiciones académicas definidas por SARA.",
    );
    if (!confirmado) return;

    onSave?.(payload);
    showToast.success("Reserva registrada correctamente");
    setFormData(initialFormState);
    onClose?.();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setFormData(initialFormState);
          onClose?.();
        }
      }}
      hideCloseButton
    >
      <DialogContent hideCloseButton className="max-w-3xl">
        <div className="w-full flex flex-col gap-4">
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Registrar reserva de ambiente
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ficha *
              </label>
              <select
                value={formData.ficha}
                onChange={(e) => handleFichaChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione una ficha</option>
                {fichasMock.map((f) => (
                  <option key={f.codigo} value={f.codigo}>
                    {f.codigo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor *
              </label>
              {/* Solo mostrar instructores asignados a la ficha seleccionada; si no hay ficha, mostrar todos */}
              {(() => {
                const instructoresFiltrados = formData.ficha
                  ? instructoresMock.filter((i) => i.fichas.includes(formData.ficha))
                  : instructoresMock;

                return (
              <select
                value={formData.instructor}
                onChange={(e) => handleChange("instructor", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un instructor</option>
                    {instructoresFiltrados.map((i) => (
                      <option key={i.nombre} value={i.nombre}>
                        {i.nombre}
                      </option>
                    ))}
              </select>
                );
              })()}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Programa
              </label>
              <input
                type="text"
                value={formData.programa}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Jornada
              </label>
              <input
                type="text"
                value={formData.jornada}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Competencia *
              </label>
              <select
                value={formData.competencia}
                onChange={(e) => handleChange("competencia", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione una competencia</option>
                {competenciasMock.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                RAP *
              </label>
              <select
                value={formData.rap}
                onChange={(e) => handleChange("rap", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un RAP</option>
                {rapMock.map((r) => (
                  <option key={r.codigo} value={r.codigo}>
                    {r.codigo} - {r.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ambiente *
              </label>
              <select
                value={formData.ambiente}
                onChange={(e) => handleChange("ambiente", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un ambiente</option>
                {ambientesMock.map((a) => (
                  <option key={a.nombre} value={a.nombre}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => handleChange("fecha", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hora inicio *
                </label>
                <input
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => handleChange("horaInicio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hora fin *
                </label>
                <input
                  type="time"
                  value={formData.horaFin}
                  onChange={(e) => handleChange("horaFin", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormState);
                onClose?.();
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
