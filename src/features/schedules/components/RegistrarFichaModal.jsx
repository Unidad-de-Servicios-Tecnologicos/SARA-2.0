import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { CalendarPlus } from "lucide-react";
import { showAlert } from "@/shared/notifications";

// Mock de fichas activas disponibles
const fichasDisponibles = [
  { id: 1, numero: "2889927", programa: "Análisis y Desarrollo de Software", trimestre: "1" },
  { id: 2, numero: "2889928", programa: "Producción Multimedia", trimestre: "2" },
  { id: 3, numero: "2889929", programa: "Gestión Administrativa", trimestre: "3" },
  { id: 4, numero: "2889930", programa: "Contabilidad y Finanzas", trimestre: "4" },
  { id: 5, numero: "2889931", programa: "Mercadeo", trimestre: "1" },
];

const MAX_HORAS_SEMANALES = 40;

export default function RegistrarFichaModal({ isOpen, onClose, instructorName = "" }) {
  const [selectedFichaId, setSelectedFichaId] = useState("");
  const [rol, setRol] = useState("titular");
  const [horasAsignadas, setHorasAsignadas] = useState("");
  const [trimestre, setTrimestre] = useState("");

  // Registro simple en memoria para evitar duplicados en la misma sesión
  const asignacionesRef = useRef([]);

  const fichaSeleccionada = fichasDisponibles.find((f) => String(f.id) === String(selectedFichaId));

  const handleSave = async () => {
    if (!instructorName) {
      showAlert.warning("Instructor requerido", "No hay un instructor seleccionado para la asignación.");
      return;
    }

    if (!selectedFichaId) {
      showAlert.warning("Ficha requerida", "Debe seleccionar una ficha activa.");
      return;
    }

    if (!rol) {
      showAlert.warning("Rol requerido", "Debe seleccionar el rol en la ficha.");
      return;
    }

    const horas = Number(horasAsignadas);
    if (!horas || horas <= 0) {
      showAlert.warning("Horas inválidas", "Las horas asignadas deben ser mayores a 0.");
      return;
    }

    if (horas > MAX_HORAS_SEMANALES) {
      showAlert.warning(
        "Límite de horas",
        `Las horas asignadas no pueden superar ${MAX_HORAS_SEMANALES} horas semanales.`,
      );
      return;
    }

    if (!trimestre) {
      showAlert.warning("Trimestre requerido", "Debe seleccionar el trimestre.");
      return;
    }

    const fichaNumero = fichaSeleccionada?.numero || "";

    // Validación simple en memoria: no duplicar ficha-instructor
    const existeAsignacion = asignacionesRef.current.some(
      (a) => a.instructor === instructorName && a.ficha === fichaNumero,
    );

    if (existeAsignacion) {
      showAlert.warning(
        "Asignación duplicada",
        `La ficha ${fichaNumero} ya está asignada al instructor ${instructorName}.`,
      );
      return;
    }

    // Validación simple: solo un titular por ficha en esta sesión
    if (rol === "titular") {
      const yaTieneTitular = asignacionesRef.current.some(
        (a) => a.ficha === fichaNumero && a.rol === "titular",
      );

      if (yaTieneTitular) {
        showAlert.warning(
          "Titular existente",
          `La ficha ${fichaNumero} ya tiene un instructor titular registrado.`,
        );
        return;
      }
    }

    const nuevaAsignacion = {
      instructor: instructorName,
      ficha: fichaNumero,
      programa: fichaSeleccionada?.programa || "",
      rol,
      horasAsignadas: horas,
      trimestre,
    };

    asignacionesRef.current = [...asignacionesRef.current, nuevaAsignacion];

    onClose();

    setTimeout(async () => {
      const confirmado = await showAlert.confirm(
        "Confirmar registro",
        `¿Desea registrar la ficha ${fichaNumero} al instructor ${instructorName}?`,
        "Registrar",
      );

      if (confirmado) {
        console.log("Asignación ficha-instructor:", nuevaAsignacion);
        await showAlert.success(
          "Ficha registrada",
          `La ficha ${fichaNumero} ha sido registrada para el instructor ${instructorName}.`,
        );
      }
    }, 100);

    setSelectedFichaId("");
    setRol("titular");
    setHorasAsignadas("");
    setTrimestre("");
  };

  const handleCancel = () => {
    setSelectedFichaId("");
    setRol("titular");
    setHorasAsignadas("");
    setTrimestre("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-3xl">
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="pb-4 border-b dark:border-gray-700 flex items-center gap-2">
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <CalendarPlus className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Registrar ficha al instructor
              </h2>
              {instructorName && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Instructor: <span className="font-medium">{instructorName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Formulario */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {/* Instructor (label) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={instructorName || "Sin instructor seleccionado"}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Ficha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ficha *
              </label>
              <select
                value={selectedFichaId}
                onChange={(e) => {
                  const nuevaFichaId = e.target.value;
                  setSelectedFichaId(nuevaFichaId);
                  const ficha = fichasDisponibles.find((f) => String(f.id) === String(nuevaFichaId));
                  setTrimestre(ficha?.trimestre || "");
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione una ficha activa</option>
                {fichasDisponibles.map((ficha) => (
                  <option key={ficha.id} value={ficha.id}>
                    {ficha.numero} - {ficha.programa}
                  </option>
                ))}
              </select>
            </div>

            {/* Programa (autocompletado según ficha) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Programa
              </label>
              <input
                type="text"
                value={fichaSeleccionada?.programa || "Seleccione una ficha"}
                disabled
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              />
            </div>

            {/* Rol en la ficha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rol en la ficha *
              </label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="titular">Titular</option>
                <option value="apoyo">Apoyo</option>
              </select>
            </div>

            {/* Horas asignadas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Horas asignadas *
              </label>
              <input
                type="number"
                min="1"
                value={horasAsignadas}
                onChange={(e) => setHorasAsignadas(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Máximo permitido: {MAX_HORAS_SEMANALES} horas semanales.
              </p>
            </div>

            {/* Trimestre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Trimestre *
              </label>
              <select
                value={trimestre}
                onChange={(e) => setTrimestre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un trimestre</option>
                <option value="1">Trimestre 1</option>
                <option value="2">Trimestre 2</option>
                <option value="3">Trimestre 3</option>
                <option value="4">Trimestre 4</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Registrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
