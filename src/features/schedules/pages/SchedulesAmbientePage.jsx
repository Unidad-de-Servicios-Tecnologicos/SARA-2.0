import React, { useState } from "react";
import { Calendar, Building2 } from "lucide-react";
import SearchAmbiente from "../components/SearchAmbiente";
import CalendarView from "../components/CalendarView";

export default function SchedulesAmbientePage() {
  const [sede, setSede] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [horasProgramadas, setHorasProgramadas] = useState(0);

  const handleSearch = () => {
    console.log("Buscando ambiente:", ambiente, "Sede:", sede);
    setHasSearched(true);
    // Simular horas programadas
    setHorasProgramadas(Math.floor(Math.random() * 40));
  };

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <SearchAmbiente
        sede={sede}
        onSedeChange={setSede}
        ambiente={ambiente}
        onAmbienteChange={setAmbiente}
        onSearch={handleSearch}
      />

      {/* Horas programadas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">
            Horas Programadas: <span className="font-semibold text-gray-900 dark:text-white">{horasProgramadas}</span>
          </p>
        </div>
      </div>

      {/* Calendario */}
      {hasSearched && (
        <CalendarView 
          title={`Horario del Ambiente ${ambiente} - ${sede}`}
          showViewSelector={true}
        />
      )}

      {!hasSearched && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Building2 className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Seleccione una sede y un ambiente, luego haga clic en consultar para ver la disponibilidad
          </p>
        </div>
      )}
    </div>
  );
}
