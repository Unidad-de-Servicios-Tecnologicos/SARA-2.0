import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import QRUsageModal from "@/features/environment-reservations/components/QRUsageModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showAlert } from "@/shared/notifications";
import { ambientesMock, environmentReservationsMock } from "@/features/environment-reservations/services/EnvironmentReservationsService";

function obtenerHoraActualHHMM() {
  const ahora = new Date();
  const hh = String(ahora.getHours()).padStart(2, "0");
  const mm = String(ahora.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function estaDentroDeRangoConTolerancia(horaInicio, horaFin, horaActual, minutosTolerancia = 15) {
  // Simplificación: trabajamos en HH:MM y convertimos a minutos desde medianoche
  const aMin = (h) => {
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm;
  };

  const inicio = aMin(horaInicio) - minutosTolerancia;
  const fin = aMin(horaFin) + minutosTolerancia;
  const actual = aMin(horaActual);

  return actual >= inicio && actual <= fin;
}

export default function EnvironmentQRPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(true);

  const ambiente = useMemo(
    () => ambientesMock.find((a) => a.id === id),
    [id],
  );

  const reservaActiva = useMemo(() => {
    if (!ambiente) return null;
    const hoy = new Date().toISOString().split("T")[0];
    const horaActual = obtenerHoraActualHHMM();

    return (
      environmentReservationsMock.find((r) => {
        if (r.ambienteId !== ambiente.id) return false;
        if (r.fecha !== hoy) return false;
        if (r.estado !== "CONFIRMADA" && r.estado !== "PROGRAMADA") return false;
        return estaDentroDeRangoConTolerancia(r.horaInicio, r.horaFin, horaActual, 15);
      }) || null
    );
  }, [ambiente]);

  if (!ambiente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="p-6 max-w-md w-full text-center">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">Ambiente no encontrado</h1>
          <p className="text-sm text-slate-600">
            El código QR no corresponde a un ambiente válido en SARA.
          </p>
        </Card>
      </div>
    );
  }

  if (!reservaActiva) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="p-6 max-w-md w-full text-center space-y-2">
          <h1 className="text-lg font-semibold text-slate-900 mb-1">Sin reserva activa</h1>
          <p className="text-sm text-slate-600">
            No se encontró una reserva académica activa para el ambiente
            <span className="font-semibold"> {ambiente.nombre} </span>
            en este momento.
          </p>
        </Card>
      </div>
    );
  }

  const handleConfirmUso = () => {
    // Aquí solo se confirmaría Uso Real en backend.
    showAlert.success(
      "Uso del ambiente confirmado",
      "Se registró el uso real del ambiente asociado a la reserva.",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <QRUsageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        reservation={reservaActiva}
        onConfirm={handleConfirmUso}
      />
    </div>
  );
}
