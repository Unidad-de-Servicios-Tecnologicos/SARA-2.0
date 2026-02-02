import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Calendar, Clock, User } from "lucide-react";

export default function ScheduleModal({ isOpen, onClose, learner }) {
  if (!learner) return null;

  const schedule = [
    { day: "Lunes", time: "08:00 - 12:00", subject: "Programación en Python", instructor: "Ing. María García" },
    { day: "Lunes", time: "13:00 - 17:00", subject: "Bases de Datos", instructor: "Ing. Carlos López" },
    { day: "Martes", time: "08:00 - 12:00", subject: "Desarrollo Web", instructor: "Ing. Ana Martínez" },
    { day: "Martes", time: "13:00 - 17:00", subject: "Programación en Python", instructor: "Ing. María García" },
    { day: "Miércoles", time: "08:00 - 12:00", subject: "Bases de Datos", instructor: "Ing. Carlos López" },
    { day: "Miércoles", time: "13:00 - 17:00", subject: "Desarrollo Web", instructor: "Ing. Ana Martínez" },
    { day: "Jueves", time: "08:00 - 12:00", subject: "Programación en Python", instructor: "Ing. María García" },
    { day: "Jueves", time: "13:00 - 17:00", subject: "Prácticas", instructor: "Instructor de Práctica" },
    { day: "Viernes", time: "08:00 - 12:00", subject: "Evaluaciones", instructor: "Equipo de Instructores" },
  ];

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Horario de {learner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información de la jornada */}
          <div className="p-4 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Jornada</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                  {learner.jornada || "Matutina"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Instructor Líder</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                  {learner.instructorLeader || "Ing. María García"}
                </p>
              </div>
            </div>
          </div>

          {/* Horario por días */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {daysOfWeek.map((day) => (
              <div key={day}>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {day}
                </h4>
                <div className="space-y-2 ml-4">
                  {schedule
                    .filter((s) => s.day === day)
                    .map((slot, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white dark:bg-gray-800 border-l-4 border-l-blue-500 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {slot.subject}
                          </h5>
                          <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {slot.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          {slot.instructor}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
