import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import { Save } from "lucide-react";

export default function ConfirmEditInstructorModal({ isOpen, onClose, onConfirm, changes, instructor }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Save className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <DialogTitle>Confirmar edición</DialogTitle>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            ¿Deseas guardar los siguientes cambios para <b>{instructor?.nombre} {instructor?.apellidos}</b>?
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
            {changes && Object.entries(changes).map(([key, value]) => (
              <li key={key}><b>{key}:</b> {value.old} → <span className="text-blue-600">{value.new}</span></li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
          <button
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            onClick={onConfirm}
          >
            <Save className="w-4 h-4" /> Guardar Cambios
          </button>
        </div>
      </div>
    </Dialog>
  );
}
