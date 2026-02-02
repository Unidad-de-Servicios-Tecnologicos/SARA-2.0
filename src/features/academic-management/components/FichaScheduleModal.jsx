import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import SchedulesRecordPage from "@/features/schedules/pages/SchedulesRecordPage";

export default function FichaScheduleModal({ isOpen, onClose, ficha }) {
  if (!isOpen || !ficha) return null;

  const handleOpenChange = (open) => {
    if (!open) {
      onClose?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl w-full max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Horario de la ficha {ficha.code}</DialogTitle>
          <DialogDescription>
            Vista del módulo de horarios precargada con la ficha seleccionada.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex-1 overflow-y-auto">
          <SchedulesRecordPage initialFichaNumber={ficha.code} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
