import React from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";

export default function ViewReservationModal({ isOpen, onClose, reservation }) {
  if (!isOpen || !reservation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-md">
        <div className="w-full flex flex-col gap-4 text-sm">
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Detalle de reserva
            </h2>
          </div>

          <div className="space-y-2">
            <Field label="Ficha" value={reservation.ficha} />
            <Field label="Instructor" value={reservation.instructor} />
            <Field label="Programa" value={reservation.programa} />
            <Field label="Jornada" value={reservation.jornada} />
            <Field label="Competencia" value={reservation.competencia} />
            <Field label="RAP" value={reservation.rap} />
            <Field label="Ambiente" value={reservation.ambiente || reservation.environment} />
            <Field label="Fecha" value={reservation.fecha || reservation.date} />
            <Field
              label="Horario"
              value={`${reservation.horaInicio || reservation.startTime} - ${
                reservation.horaFin || reservation.endTime
              }`}
            />
            <Field label="Estado" value={reservation.estado || reservation.status} />
            {reservation.observacion && <Field label="Observación" value={reservation.observacion} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">{label}</div>
      <div className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm">
        {value || "-"}
      </div>
    </div>
  );
}
