import React from "react";
import { Users, Clock, ChevronRight, BookOpen, Award } from "lucide-react";
import { useFichasInstructor } from "../hooks/UseInstructors";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";

/* =======================
   COMPONENTE MODAL
======================= */
export default function InstructorFichasModal({ isOpen, onClose, instructor }) {
  const { fichas, loading: loadingFichas } = useFichasInstructor(instructor?.id);
  
  if (!isOpen || !instructor) return null;

  /* =======================
     RENDER
  ======================= */
  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Fichas de {instructor.nombre} {instructor.apellidos}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {fichas?.length || 0} ficha(s) asignada(s)
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loadingFichas ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : fichas && fichas.length > 0 ? (
            <div className="space-y-3">
              {fichas.map((ficha) => (
                <div
                  key={ficha.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Ficha {ficha.numero}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {ficha.programa}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{ficha.horasAsignadas}h</span>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      {ficha.jornada}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Sin fichas asignadas
              </p>
            </div>
          )}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
