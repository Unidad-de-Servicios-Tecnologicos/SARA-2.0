import React from "react";
import { Users, Clock, ChevronRight } from "lucide-react";
import { useFichasInstructor } from "../hooks/UseInstructors";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";

export default function InstructorFichasModal({ isOpen, onClose, instructor }) {
  const { fichas, loading: loadingFichas } = useFichasInstructor(instructor?.id);
  if (!isOpen || !instructor) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogTitle>
          Fichas de {instructor.nombre} {instructor.apellidos}
        </DialogTitle>
        {loadingFichas ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : fichas?.length > 0 ? (
          fichas.map((ficha) => (
            <div
              key={ficha.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mb-2"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Ficha {ficha.numero}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ficha.programa} • {ficha.jornada}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{ficha.horasAsignadas}h</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">
            (Sin fichas asignadas)
          </div>
        )}
      </div>
    </Dialog>
  );
}
