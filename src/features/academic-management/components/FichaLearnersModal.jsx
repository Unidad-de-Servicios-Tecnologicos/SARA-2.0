import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import LearnersManagementPage from "@/features/learners/pages/LearnersManagementPage";

export default function FichaLearnersModal({ isOpen, onClose, ficha }) {
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
          <DialogTitle>Aprendices de la ficha {ficha.code}</DialogTitle>
          <DialogDescription>
            Vista del módulo de aprendices filtrado por la ficha seleccionada.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex-1 overflow-y-auto">
          <LearnersManagementPage initialFichaId={ficha.code} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
