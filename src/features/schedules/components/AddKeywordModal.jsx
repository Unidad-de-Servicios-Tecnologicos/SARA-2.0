import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
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

// Modal para activar palabra clave de la ficha (simple: Ficha + Itinerario)
export function AddKeywordFichaModal({ isOpen, onClose }) {
  const [ficha, setFicha] = useState("");
  const [itinerario, setItinerario] = useState("");

  const handleSave = () => {
    if (ficha && itinerario) {
      const dataToSave = { ficha, itinerario };
      // Cerrar el dialog primero
      onClose();
      setFicha("");
      setItinerario("");
      
      // Mostrar confirmación después de cerrar el dialog
      setTimeout(async () => {
        const confirmed = await showAlert.confirmSave("¿Desea guardar la palabra clave?");
        if (confirmed) {
          console.log("Guardando palabra clave de ficha:", dataToSave);
          await showAlert.success("¡Guardado!", "Palabra clave guardada correctamente");
        }
      }, 100);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="pb-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Activar Palabra Clave
          </h2>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ficha
            </label>
            <input
              type="text"
              value={ficha}
              onChange={(e) => setFicha(e.target.value)}
              placeholder="Ingrese el número de ficha"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Itinerario
            </label>
            <input
              type="text"
              value={itinerario}
              onChange={(e) => setItinerario(e.target.value)}
              placeholder="Ingrese el itinerario"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={!ficha || !itinerario}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// Modal para registrar palabra clave del instructor (Instructor + Itinerario con dropdown)
export function AddKeywordInstructorModal({ isOpen, onClose, instructorName = "" }) {
  const [instructor, setInstructor] = useState(instructorName);
  const [itinerario, setItinerario] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSave = () => {
    if (instructor && itinerario) {
      const dataToSave = { instructor, itinerario };
      // Cerrar el dialog primero
      onClose();
      setInstructor("");
      setItinerario("");
      
      // Mostrar confirmación después de cerrar el dialog
      setTimeout(async () => {
        const confirmed = await showAlert.confirmSave("¿Desea registrar la palabra clave del instructor?");
        if (confirmed) {
          console.log("Guardando palabra clave de instructor:", dataToSave);
          await showAlert.success("¡Guardado!", "Palabra clave del instructor guardada correctamente");
        }
      }, 100);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="pb-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Registrar Palabras Clave
          </h2>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instructor
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="Nombre del instructor"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Itinerario
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-left flex items-center justify-between"
            >
              <span className={itinerario ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                {itinerario || "Seleccione un itinerario"}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                {itinerarios.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setItinerario(item);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-900 dark:text-white text-sm transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={!instructor || !itinerario}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default AddKeywordFichaModal;
