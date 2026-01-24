import React from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { MiniCalendar } from "./CalendarView";

// Mock data de instructores
const mockInstructors = [
  { id: 1, name: "CLAUDIA CAMPUZANO ESTRADA", hours: 26, events: [
    { id: 1, title: "COORDINACIÓN", day: 3, startHour: 8, endHour: 12, color: "bg-blue-500" }
  ]},
  { id: 2, name: "ADOLFO LEON LOPEZ GOMEZ", hours: 0, events: [] },
  { id: 3, name: "ALBEIRO OSPINA PENAGOS", hours: 25, events: [
    { id: 1, title: "ESTRATEGIA", day: 1, startHour: 6, endHour: 8, color: "bg-blue-500" },
    { id: 2, title: "ELABORAR DOCUMENT", day: 2, startHour: 7, endHour: 10, color: "bg-blue-500" },
    { id: 3, title: "RECONOCER", day: 4, startHour: 6, endHour: 9, color: "bg-blue-500" }
  ]},
  { id: 4, name: "MARIA FERNANDA RIOS", hours: 18, events: [
    { id: 1, title: "FORMACIÓN", day: 0, startHour: 7, endHour: 11, color: "bg-blue-500" }
  ]},
  { id: 5, name: "CARLOS ANDRES MEJIA", hours: 22, events: [
    { id: 1, title: "CAPACITACIÓN", day: 2, startHour: 8, endHour: 12, color: "bg-blue-500" }
  ]},
  { id: 6, name: "SANDRA MILENA TORRES", hours: 15, events: [] }
];

// Mock data de fichas
const mockFichas = [
  { id: 1, code: "2818588", status: "CERRADA", area: "SIN AREA", hours: 0, events: [] },
  { id: 2, code: "2821641", status: "ABIERTA", area: "SIN AREA", hours: 0, events: [
    { id: 1, title: "CLASE", day: 5, startHour: 12, endHour: 14, color: "bg-blue-500" }
  ]},
  { id: 3, code: "2821658", status: "ABIERTA", area: "SIN AREA", hours: 0, events: [] },
  { id: 4, code: "2821661", status: "ABIERTA", area: "SIN AREA", hours: 0, events: [] },
  { id: 5, code: "2821688", status: "ABIERTA", area: "SIN AREA", hours: 0, events: [] },
  { id: 6, code: "2847221", status: "ABIERTA", area: "SIN AREA", hours: 0, events: [] }
];

// Modal para ver todos los calendarios de instructores
export function AllInstructorCalendarsModal({ isOpen, onClose, area = "GESTIÓN ADMINISTRATIVA" }) {
  const total = mockInstructors.length;
  const loaded = mockInstructors.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Todos los Calendarios por Instructor - {area}
              </h2>
            </div>
          </div>

          {/* Counter */}
          <div className="text-center py-3 text-sm text-gray-600 dark:text-gray-400">
            {loaded} de {total * 10} calendarios cargados
          </div>

          {/* Grid de calendarios */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {mockInstructors.map((instructor) => (
                <MiniCalendar
                  key={instructor.id}
                  title={instructor.name}
                  hours={instructor.hours}
                  events={instructor.events}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal para ver todos los calendarios de fichas
export function AllFichaCalendarsModal({ isOpen, onClose, area = "GESTIÓN ADMINISTRATIVA" }) {
  const loaded = mockFichas.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Todos los Calendarios por Ficha - {area}
            </h2>
          </div>

          {/* Counter */}
          <div className="text-center py-3 text-sm text-gray-600 dark:text-gray-400">
            {loaded * 25} de {loaded * 25} calendarios cargados
          </div>

          {/* Grid de calendarios */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {mockFichas.map((ficha) => (
                <MiniCalendar
                  key={ficha.id}
                  title={`${ficha.code} - ${ficha.status} - ${ficha.area}`}
                  hours={ficha.hours}
                  status={ficha.status}
                  events={ficha.events}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
