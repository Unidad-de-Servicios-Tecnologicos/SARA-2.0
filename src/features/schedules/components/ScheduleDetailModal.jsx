import React from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Calendar, Clock, MapPin, BookOpen, FileText } from "lucide-react";

export default function ScheduleDetailModal({ isOpen, onClose, event }) {
  if (!isOpen || !event) return null;

  const handleOpenChange = (open) => {
    if (!open) onClose?.();
  };

  const horas = `${event.startHour ?? ""}:00 - ${event.endHour ?? ""}:00`;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-3xl">
        <div className="w-full flex flex-col gap-4">
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Detalle del horario
            </h2>
            {event.instructor && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Instructor: <span className="font-medium">{event.instructor}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Fecha</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {event.fecha || "Por definir"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Horas</p>
                <p className="font-medium text-gray-900 dark:text-white">{horas}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Ficha</p>
                <p className="font-medium text-gray-900 dark:text-white">{event.ficha || ""}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Ambiente</p>
                <p className="font-medium text-gray-900 dark:text-white">{event.ambiente || "Por definir"}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:col-span-2">
              <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Competencia / RAP</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {event.competencia || event.title || "Por definir"}
                </p>
                {event.rap && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">RAP: {event.rap}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t dark:border-gray-700 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
