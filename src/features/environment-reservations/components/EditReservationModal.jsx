import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { showAlert, showToast } from "@/shared/notifications";

export default function EditReservationModal({
  isOpen,
  onClose,
  reservation,
  onSave,
  existingReservations = [],
}) {
  const [formData, setFormData] = useState(() => ({
    ambiente: reservation?.ambiente || reservation?.environment || "",
    fecha: reservation?.fecha || reservation?.date || "",
    horaInicio: reservation?.horaInicio || reservation?.startTime || "",
    horaFin: reservation?.horaFin || reservation?.endTime || "",
    observacion: reservation?.observacion || "",
  }));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validar = () => {
    const { ambiente, fecha, horaInicio, horaFin } = formData;

    if (!ambiente || !fecha || !horaInicio || !horaFin) {
      showAlert.warning("Campos requeridos", "Ambiente, fecha y horas son obligatorios.");
      return false;
    }
    if (horaFin <= horaInicio) {
      showAlert.warning("Horario inválido", "La hora fin debe ser mayor que la hora inicio.");
      return false;
    }

    const hayTraslape = existingReservations.some((r) => {
      if (!reservation) return false;
      if (r.id === reservation.id) return false;
      if (r.ambiente !== ambiente || (r.fecha || r.date) !== fecha) return false;

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
        "Ya existe otra reserva para ese ambiente en el rango horario indicado.",
      );
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!reservation) return;
    if (!validar()) return;

    const confirmado = await showAlert.confirmSave(
      "¿Guardar cambios de la reserva?",
      "Se actualizarán únicamente ambiente, fecha, horario y observación.",
    );
    if (!confirmado) return;

    const updated = {
      ...reservation,
      ambiente: formData.ambiente,
      fecha: formData.fecha,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      observacion: formData.observacion,
    };

    onSave?.(updated);
    showToast.success("Reserva actualizada correctamente");
    onClose?.();
  };

  if (!isOpen || !reservation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-3xl">
        <div className="w-full flex flex-col gap-4 text-sm">
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Editar reserva de ambiente
            </h2>
          </div>

          {/* Datos no editables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Ficha
              </label>
              <input
                type="text"
                value={reservation.ficha || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={reservation.instructor || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Competencia
              </label>
              <input
                type="text"
                value={reservation.competencia || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                RAP
              </label>
              <input
                type="text"
                value={reservation.rap || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Datos editables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ambiente *
              </label>
              <input
                type="text"
                value={formData.ambiente}
                onChange={(e) => handleChange("ambiente", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observación
            </label>
            <textarea
              rows={3}
              value={formData.observacion}
              onChange={(e) => handleChange("observacion", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm"
              placeholder="Motivo o detalle del ajuste de la reserva"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
