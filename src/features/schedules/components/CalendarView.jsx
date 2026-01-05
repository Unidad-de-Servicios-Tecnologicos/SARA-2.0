import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const diasSemana = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];
const horas = Array.from({ length: 14 }, (_, i) => i + 6); // 6am a 7pm

// Mock de eventos para demostración
const mockEvents = [
  {
    id: 1,
    title: "ESTRATEGIA DOCUMENT",
    ficha: "3146149",
    day: 2, // martes
    startHour: 6,
    endHour: 8,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "ELABORAR RECURSOS",
    ficha: "3214633",
    day: 3, // miércoles
    startHour: 7,
    endHour: 10,
    color: "bg-blue-600"
  },
  {
    id: 3,
    title: "RECONOCER LOS PEÑAZOS",
    ficha: "3214633",
    day: 4, // jueves
    startHour: 6,
    endHour: 9,
    color: "bg-blue-500"
  }
];

export default function CalendarView({ 
  events = mockEvents, 
  showViewSelector = true,
  compact = false
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // Sept 2025
  const [view, setView] = useState("week");

  const getWeekDates = () => {
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const formatDateRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"];
    return `${start.getDate()} – ${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isWeekend = (dayIndex) => dayIndex >= 5;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg ${compact ? '' : 'shadow-sm border border-gray-200 dark:border-gray-700'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${compact ? 'py-2' : 'p-4 border-b dark:border-gray-700'}`}>
        {showViewSelector && (
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {["week", "day", "list", "month", "year"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  view === v 
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <span className={`font-semibold text-gray-900 dark:text-white ${compact ? 'text-sm' : 'text-lg'}`}>
            {formatDateRange()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-3 py-2 text-xs font-medium bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className={`overflow-auto ${compact ? 'max-h-64' : 'max-h-125'}`}>
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
            <tr>
              <th className="w-16 p-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                all-day
              </th>
              {weekDates.map((date, index) => (
                <th
                  key={index}
                  className={`p-2 text-center border-b dark:border-gray-700 ${
                    isWeekend(index) ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                  }`}
                >
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {diasSemana[index]}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {date.getDate()}/{date.getMonth() + 1}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora} className="border-b dark:border-gray-800">
                <td className="p-2 text-xs text-gray-500 dark:text-gray-400 text-right align-top border-r dark:border-gray-700">
                  {hora}
                </td>
                {weekDates.map((_, dayIndex) => {
                  const event = events.find(
                    (e) => e.day === dayIndex && e.startHour <= hora && e.endHour > hora
                  );
                  const isEventStart = event && event.startHour === hora;

                  return (
                    <td
                      key={dayIndex}
                      className={`relative border-r dark:border-gray-800 h-8 ${
                        isWeekend(dayIndex) ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                      }`}
                    >
                      {event && isEventStart && (
                        <div
                          className={`absolute inset-x-0 mx-1 ${event.color} text-white text-xs p-1 rounded-t overflow-hidden z-5`}
                          style={{
                            height: `${(event.endHour - event.startHour) * 32}px`
                          }}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-80">{event.ficha}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente para mini calendario (usado en vistas de múltiples calendarios)
export function MiniCalendar({ 
  title, 
  hours = 0, 
  events = []
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));
  const [view, setView] = useState("week");

  const getWeekDates = () => {
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();
  const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"];

  const formatDateRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    return `${start.getDate()} – ${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header con nombre y horas */}
      <div className="px-3 py-2 border-b dark:border-gray-700 flex items-center justify-between">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate max-w-45">
          {title}
        </h4>
        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
          hours > 0 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
        }`}>
          {hours} horas
        </span>
      </div>

      {/* Navigation */}
      <div className="px-3 py-2 flex items-center justify-between border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {formatDateRange()}
        </span>
        <div className="flex gap-1">
          {["week", "month"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                view === v 
                  ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white" 
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Grid */}
      <div className="overflow-auto max-h-40">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="w-10 p-1 text-gray-400 text-right">all-day</th>
              {diasSemana.map((dia, i) => (
                <th key={i} className={`p-1 text-center ${i >= 5 ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                  <div className="text-gray-500 dark:text-gray-400">{dia}</div>
                  <div className="text-gray-900 dark:text-white">{weekDates[i]?.getDate()}/{(weekDates[i]?.getMonth() || 0) + 1}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[6, 7, 8, 9, 10, 11, 12].map((hora) => (
              <tr key={hora} className="border-t dark:border-gray-700">
                <td className="p-1 text-gray-400 text-right">{hora}</td>
                {weekDates.map((_, dayIndex) => {
                  const event = events.find(
                    (e) => e.day === dayIndex && e.startHour <= hora && e.endHour > hora
                  );
                  return (
                    <td 
                      key={dayIndex} 
                      className={`h-5 ${dayIndex >= 5 ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                    >
                      {event && event.startHour === hora && (
                        <div 
                          className="bg-blue-500 text-white text-[8px] p-0.5 rounded truncate"
                          style={{ height: `${(event.endHour - event.startHour) * 20}px` }}
                        >
                          {event.title}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
