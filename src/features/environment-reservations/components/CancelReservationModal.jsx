import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { showAlert, showToast } from "@/shared/notifications";

export default function CancelReservationModal({
  isOpen,
  onClose,
  reservation,
  onConfirm,
}) {
  const [formData, setFormData] = useState({ motivo: "", observacion: "" });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    if (!formData.motivo.trim()) {
      showAlert.warning("Campo requerido", "El motivo de la cancelación es obligatorio.");
      return;
    }

    const confirmado = await showAlert.confirmDelete(
      "¿Cancelar esta reserva de ambiente?",
      "La reserva no se eliminará, solo cambiará su estado a CANCELADA.",
    );

    if (!confirmado) return;

    const payload = {
      motivo: formData.motivo,
      observacion: formData.observacion,
    };

    onConfirm?.(payload);
    showToast.success("Reserva cancelada correctamente");
    setFormData({ motivo: "", observacion: "" });
    onClose?.();
  };

  if (!isOpen || !reservation) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setFormData({ motivo: "", observacion: "" });
          onClose?.();
        }
      }}
      hideCloseButton
    >
      <DialogContent hideCloseButton className="max-w-md">
        <div className="w-full flex flex-col gap-4 text-sm">
          <div className="pb-3 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cancelar / liberar reserva
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Esta acción marca la reserva como CANCELADA. No se eliminan registros.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-semibold">Ficha:</span> {reservation.ficha}
              </div>
              <div>
                <span className="font-semibold">Instructor:</span> {reservation.instructor}
              </div>
              <div>
                <span className="font-semibold">Ambiente:</span> {reservation.ambiente || reservation.environment}
              </div>
              <div>
                <span className="font-semibold">Fecha:</span> {reservation.fecha || reservation.date} ({
                  reservation.horaInicio || reservation.startTime
                }
                -{reservation.horaFin || reservation.endTime})
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Motivo de cancelación *
              </label>
              <select
                value={formData.motivo}
                onChange={(e) => handleChange("motivo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un motivo</option>
                <option value="Reprogramación de clase">Reprogramación de clase</option>
                <option value="Mantenimiento del ambiente">Mantenimiento del ambiente</option>
                <option value="Inasistencia de aprendices">Inasistencia de aprendices</option>
                <option value="Otro">Otro</option>
              </select>
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
                placeholder="Detalle adicional de la cancelación (opcional)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={() => {
                setFormData({ motivo: "", observacion: "" });
                onClose?.();
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Confirmar cancelación
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
