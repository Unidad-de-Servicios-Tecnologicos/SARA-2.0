import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { UserCheck } from "lucide-react";
import { showAlert } from "@/shared/notifications";

// Lista de instructores disponibles (mock)
const instructoresDisponibles = [
  "CLAUDIA CAMPUZANO ESTRADA",
  "ADOLFO LEON LOPEZ GOMEZ",
  "ALBEIRO OSPINA PENAGOS",
  "MARIA FERNANDA RIOS",
  "CARLOS ANDRES MEJIA",
  "SANDRA MILENA TORRES",
  "JUAN PABLO GARCIA",
  "LAURA VALENTINA DIAZ",
];

export default function AsignarTitularModal({ isOpen, onClose, fichaCode = "" }) {
  const [ficha, setFicha] = useState(fichaCode || "");
  const [instructor, setInstructor] = useState("");
  const [fechaAsignacion, setFechaAsignacion] = useState("");
  const [observacion, setObservacion] = useState("");
  const asignacionesRef = useRef([]);

  // Mantener sincronizada la ficha mostrada con la que llega desde Gestión de Horarios
  useEffect(() => {
    if (isOpen) {
      setFicha(fichaCode || "");
    }
  }, [isOpen, fichaCode]);

  const handleSave = async () => {
    if (!ficha) {
      showAlert.warning("Ficha requerida", "No se ha seleccionado una ficha.");
      return;
    }

    if (!instructor) {
      showAlert.warning("Instructor requerido", "Debe seleccionar un instructor.");
      return;
    }

    if (!fechaAsignacion) {
      showAlert.warning("Fecha requerida", "Debe registrar la fecha de asignación.");
      return;
    }

    const yaTieneTitular = asignacionesRef.current.includes(ficha);
    if (yaTieneTitular) {
      showAlert.warning(
        "Titular existente",
        `La ficha ${fichaCode} ya tiene un instructor titular asignado.`
      );
      return;
    }

    const dataToSave = {
      ficha,
      instructor,
      rol: "Titular",
      fechaAsignacion,
      observacion,
    };

    onClose();

    setTimeout(async () => {
      const confirmed = await showAlert.confirm(
        "Confirmar asignación",
        `¿Desea asignar a ${instructor} como titular de la ficha ${ficha}?`,
        "Asignar"
      );

      if (confirmed) {
        asignacionesRef.current.push(ficha);
        console.log("Asignando titular:", dataToSave);
        await showAlert.success(
          "¡Titular asignado!",
          `${instructor} ha sido asignado como titular correctamente.`
        );
      }
    }, 100);

    setFicha(fichaCode || "");
    setInstructor("");
    setFechaAsignacion("");
    setObservacion("");
  };

  const handleCancel = () => {
    setInstructor("");
    setFechaAsignacion("");
    setObservacion("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-md">
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <UserCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Asignar instructor titular
              </h2>
            </div>
          </div>

          {/* Formulario */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ficha
              </label>
              <input
                type="text"
                value={ficha || "Sin ficha seleccionada"}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor *
              </label>
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un instructor</option>
                {instructoresDisponibles.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            {/* Rol oculto (Titular) */}
            <input type="hidden" value="Titular" readOnly />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha de asignación *
              </label>
              <input
                type="date"
                value={fechaAsignacion}
                onChange={(e) => setFechaAsignacion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Observación
              </label>
              <textarea
                rows={3}
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Observaciones adicionales sobre la asignación"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Asignar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
