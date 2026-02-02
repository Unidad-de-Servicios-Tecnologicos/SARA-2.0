import React, { useState } from "react";
import { Calendar, Building2 } from "lucide-react";
import SearchAmbiente from "../components/SearchAmbiente";
import CalendarView from "../components/CalendarView";
import ReserveAmbienteModal from "../components/ReserveAmbienteModal";

export default function SchedulesAmbientePage() {
  const [sede, setSede] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [horasProgramadas, setHorasProgramadas] = useState(0);
  const [showReserveModal, setShowReserveModal] = useState(false);

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

      {/* Horas programadas y acción de reserva */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-gray-600 dark:text-gray-400">
          Horas Programadas: <span className="font-semibold text-gray-900 dark:text-white">{horasProgramadas}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowReserveModal(true)}
          disabled={!ambiente}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reservar ambiente
        </button>
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

      <ReserveAmbienteModal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
        ambienteLabel={ambiente ? `${ambiente} - ${sede}` : ""}
      />
    </div>
  );
}
