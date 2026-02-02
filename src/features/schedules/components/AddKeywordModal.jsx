import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { ChevronDown } from "lucide-react";
import { showAlert } from "@/shared/notifications";

// Lista de itinerarios/programas disponibles
const itinerarios = [
  "ASISTENCIA ADMINISTRATIVA",
  "CONTABILIZACIÓN DE OPERACIONES COMERCIALES",
  "CONTROL DE MOVILIDAD",
  "GESTIÓN DE PROPIEDAD HORIZONTAL",
  "TALENTO HUMANO",
  "GESTIÓN EMPRESARIAL",
  "GESTIÓN INTEGRADA DE LA CALIDAD",
  "GESTIÓN INTEGRAL DEL TRANSPORTE",
  "GESTIÓN BANCARIA",
  "GESTIÓN INTEGRAL DEL RIESGO",
  "INFORMACION Y SERVICIO AL CLIENTE",
  "INTEGRACIÓN DE OPERACIONES LOGÍSTICAS",
  "MANEJO DE MONTACARGAS",
  "RECURSOS HUMANOS",
  "SERVICIOS COMERCIALES",
  "TRANSPORTE DE CARGA",
  "TRANSPORTE MASIVO DE PASAJEROS",
  "GESTIÓN ADMINISTRATIVA",
  "ANÁLISIS Y DESARROLLO DE SOFTWARE",
  "GESTIÓN LOGÍSTICA"
];

// Registro simple en memoria para evitar activaciones duplicadas en la misma sesión
const activacionesRef = {
  current: []
};

// Modal para activar palabra clave (Itinerario) según SARA
export function AddKeywordFichaModal({ isOpen, onClose, defaultEntidad = "" }) {
  const [tipoActivacion, setTipoActivacion] = useState("Ficha");
  const [entidadSeleccionada, setEntidadSeleccionada] = useState(defaultEntidad);
  const [itinerariosSeleccionados, setItinerariosSeleccionados] = useState([]);
  const [trimestre, setTrimestre] = useState("");
  const [aplicarATodos, setAplicarATodos] = useState(false);

  const handleToggleItinerario = (item) => {
    setItinerariosSeleccionados((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSave = async () => {
    if (!entidadSeleccionada) {
      showAlert.warning("Campo requerido", "Debe seleccionar la ficha.");
      return;
    }

    if (itinerariosSeleccionados.length === 0) {
      showAlert.warning("Campo requerido", "Debe seleccionar al menos un itinerario.");
      return;
    }

    if (!trimestre) {
      showAlert.warning("Campo requerido", "Debe seleccionar el trimestre.");
      return;
    }

    const clave = {
      tipo: tipoActivacion,
      entidad: entidadSeleccionada,
      itinerarios: [...itinerariosSeleccionados].sort(),
      trimestre
    };

    const yaExiste = activacionesRef.current.some(
      (a) =>
        a.tipo === clave.tipo &&
        a.entidad === clave.entidad &&
        a.trimestre === clave.trimestre &&
        JSON.stringify(a.itinerarios) === JSON.stringify(clave.itinerarios)
    );

    if (yaExiste) {
      showAlert.warning(
        "Activación duplicada",
        "Ya existe una activación para esta ficha, itinerarios y trimestre."
      );
      return;
    }

    activacionesRef.current.push(clave);

    onClose();

    setTimeout(async () => {
      const confirmed = await showAlert.confirmSave("¿Desea activar la palabra clave?");
      if (confirmed) {
        console.log("Activar palabra clave (ficha):", {
          ...clave,
          aplicarATodos
        });
        await showAlert.success("¡Activado!", "Palabra clave activada correctamente.");
      }
    }, 100);

    setEntidadSeleccionada("");
    setItinerariosSeleccionados([]);
    setTrimestre("");
    setAplicarATodos(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-md">
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activar palabra clave
            </h2>
          </div>

          {/* Form */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de activación *
              </label>
              <select
                value={tipoActivacion}
                onChange={(e) => setTipoActivacion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="Ficha">Ficha</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ficha / Instructor *
              </label>
              <input
                type="text"
                value={entidadSeleccionada}
                onChange={(e) => setEntidadSeleccionada(e.target.value)}
                placeholder="Ingrese el número de ficha"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Itinerario *
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg max-h-40 overflow-y-auto">
                {itinerarios.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  >
                    <input
                      type="checkbox"
                      checked={itinerariosSeleccionados.includes(item)}
                      onChange={() => handleToggleItinerario(item)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

            <div className="flex items-center gap-2">
              <input
                id="aplicar-todos-ficha"
                type="checkbox"
                checked={aplicarATodos}
                onChange={(e) => setAplicarATodos(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="aplicar-todos-ficha"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Aplicar a todos
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-6 mt-6 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={handleSave}
              disabled={!entidadSeleccionada || itinerariosSeleccionados.length === 0 || !trimestre}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Activar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal para registrar palabra clave del instructor (Instructor + Itinerario) según SARA
export function AddKeywordInstructorModal({ isOpen, onClose, instructorName = "" }) {
  const [tipoActivacion] = useState("Instructor");
  const [entidadSeleccionada, setEntidadSeleccionada] = useState(instructorName || "");
  const [itinerariosSeleccionados, setItinerariosSeleccionados] = useState([]);
  const [trimestre, setTrimestre] = useState("");
  const [aplicarATodos, setAplicarATodos] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleItinerario = (item) => {
    setItinerariosSeleccionados((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSave = async () => {
    if (!entidadSeleccionada) {
      showAlert.warning("Campo requerido", "Debe seleccionar el instructor.");
      return;
    }

    if (itinerariosSeleccionados.length === 0) {
      showAlert.warning("Campo requerido", "Debe seleccionar al menos un itinerario.");
      return;
    }

    if (!trimestre) {
      showAlert.warning("Campo requerido", "Debe seleccionar el trimestre.");
      return;
    }

    const clave = {
      tipo: tipoActivacion,
      entidad: entidadSeleccionada,
      itinerarios: [...itinerariosSeleccionados].sort(),
      trimestre
    };

    const yaExiste = activacionesRef.current.some(
      (a) =>
        a.tipo === clave.tipo &&
        a.entidad === clave.entidad &&
        a.trimestre === clave.trimestre &&
        JSON.stringify(a.itinerarios) === JSON.stringify(clave.itinerarios)
    );

    if (yaExiste) {
      showAlert.warning(
        "Activación duplicada",
        "Ya existe una activación para este instructor, itinerarios y trimestre."
      );
      return;
    }

    activacionesRef.current.push(clave);

    onClose();

    setTimeout(async () => {
      const confirmed = await showAlert.confirmSave("¿Desea activar la palabra clave del instructor?");
      if (confirmed) {
        console.log("Activar palabra clave (instructor):", {
          ...clave,
          aplicarATodos
        });
        await showAlert.success("¡Activado!", "Palabra clave del instructor activada correctamente.");
      }
    }, 100);

    setItinerariosSeleccionados([]);
    setTrimestre("");
    setAplicarATodos(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-md">
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activar palabra clave
            </h2>
          </div>

          {/* Form */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de activación *
              </label>
              <select
                value={tipoActivacion}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ficha / Instructor *
              </label>
              <input
                type="text"
                value={entidadSeleccionada}
                onChange={(e) => setEntidadSeleccionada(e.target.value)}
                placeholder="Nombre del instructor"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Itinerario *
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-left flex items-center justify-between"
              >
                <span className={itinerariosSeleccionados.length ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                  {itinerariosSeleccionados.length
                    ? `${itinerariosSeleccionados.length} itinerario(s) seleccionado(s)`
                    : "Seleccione uno o más itinerarios"}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {itinerarios.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={itinerariosSeleccionados.includes(item)}
                        onChange={() => handleToggleItinerario(item)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

            <div className="flex items-center gap-2">
              <input
                id="aplicar-todos-instructor"
                type="checkbox"
                checked={aplicarATodos}
                onChange={(e) => setAplicarATodos(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="aplicar-todos-instructor"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Aplicar a todos
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-6 mt-6 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={handleSave}
              disabled={!entidadSeleccionada || itinerariosSeleccionados.length === 0 || !trimestre}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Activar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddKeywordFichaModal;
