import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { showAlert, showToast } from "@/shared/notifications";

// Modal MD - Registro de uso por QR (NO crea reserva ni horario)
export default function QRUsageModal({
  isOpen,
  onClose,
  reservation,
  onConfirm,
}) {
  const [fichaSeleccionada, setFichaSeleccionada] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [observacion, setObservacion] = useState("");

  const handleConfirm = async () => {
    if (!fichaSeleccionada) {
      showAlert.warning("Campo requerido", "Debe seleccionar la ficha asociada al uso del ambiente.");
      return;
    }

    if (!horarioSeleccionado) {
      showAlert.warning("Campo requerido", "Debe seleccionar el horario activo.");
      return;
    }

    // Aquí solo se confirma USO REAL, no se crea reserva ni horario
    const confirmado = await showAlert.confirmSave(
      "¿Confirmar uso real del ambiente?",
      "El QR solo registra que el ambiente sí está siendo utilizado en este horario.",
    );
    if (!confirmado) return;

    const payload = {
      ficha: fichaSeleccionada,
      horario: horarioSeleccionado,
      observacion,
    };

    onConfirm?.(payload);
    showToast.success("Uso del ambiente confirmado");
    onClose?.();
  };

  if (!isOpen || !reservation) return null;

  const ambienteLabel = reservation.ambiente || reservation.environment;
  const fechaLabel = reservation.fecha || reservation.date;
  const horaInicio = reservation.horaInicio || reservation.startTime;
  const horaFin = reservation.horaFin || reservation.endTime;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-md">
        <div className="w-full flex flex-col gap-4 text-sm">
          <div className="pb-3 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Registro de uso de ambiente
            </h2>
          </div>

          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            <p>
              <span className="font-semibold">Ambiente:</span> {ambienteLabel}
            </p>
            <p>
              <span className="font-semibold">Fecha:</span> {fechaLabel}
            </p>
            <p>
              <span className="font-semibold">Horario:</span> {horaInicio} - {horaFin}
            </p>
          </div>

          <div className="space-y-3 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ficha *
              </label>
              <select
                value={fichaSeleccionada}
                onChange={(e) => setFichaSeleccionada(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione una ficha</option>
                {reservation.ficha && (
                  <option value={reservation.ficha}>{reservation.ficha}</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horario *
              </label>
              <select
                value={horarioSeleccionado}
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un horario activo</option>
                <option value={`${horaInicio} - ${horaFin}`}>
                  {horaInicio} - {horaFin}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Observación
              </label>
              <textarea
                rows={3}
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm"
                placeholder="Comentario del instructor (opcional)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Confirmar uso
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
