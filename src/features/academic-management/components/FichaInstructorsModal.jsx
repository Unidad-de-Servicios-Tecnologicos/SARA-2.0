import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import InstructorsListPage from "@/features/instructors/pages/InstructorsListPage";

export default function FichaInstructorsModal({ isOpen, onClose, ficha }) {
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
          <DialogTitle>Instructores relacionados con la ficha {ficha.code}</DialogTitle>
          <DialogDescription>
            Vista del módulo de instructores. En futuras integraciones se podrá filtrar por esta ficha.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex-1 overflow-y-auto">
          <InstructorsListPage />
        </div>
      </DialogContent>
    </Dialog>
  );
}
