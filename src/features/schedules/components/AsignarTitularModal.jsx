import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { ChevronDown, Search, UserCheck } from "lucide-react";
import { showAlert } from "@/shared/notifications";

// Lista de instructores disponibles (mock)
const instructoresDisponibles = [
  { id: 1, name: "CLAUDIA CAMPUZANO ESTRADA", cargo: "Instructor", especialidad: "Gestión Administrativa" },
  { id: 2, name: "ADOLFO LEON LOPEZ GOMEZ", cargo: "Instructor", especialidad: "Contabilidad" },
  { id: 3, name: "ALBEIRO OSPINA PENAGOS", cargo: "Instructor", especialidad: "Talento Humano" },
  { id: 4, name: "MARIA FERNANDA RIOS", cargo: "Instructor", especialidad: "Emprendimiento" },
  { id: 5, name: "CARLOS ANDRES MEJIA", cargo: "Instructor", especialidad: "Gestión Empresarial" },
  { id: 6, name: "SANDRA MILENA TORRES", cargo: "Instructor", especialidad: "Logística" },
  { id: 7, name: "JUAN PABLO GARCIA", cargo: "Instructor", especialidad: "Análisis y Desarrollo de Software" },
  { id: 8, name: "LAURA VALENTINA DIAZ", cargo: "Instructor", especialidad: "Gestión Documental" },
];

export default function AsignarTitularModal({ isOpen, onClose, fichaCode = "" }) {
  const [search, setSearch] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const filteredInstructors = instructoresDisponibles.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(search.toLowerCase()) ||
      instructor.especialidad.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!selectedInstructor) {
      showAlert.warning("Selección requerida", "Por favor seleccione un instructor para asignar como titular.");
      return;
    }

    const instructorToSave = { ...selectedInstructor };
    const fichaToSave = fichaCode;
    
    // Cerrar el dialog primero
    onClose();
    setSelectedInstructor(null);
    setSearch("");

    // Mostrar confirmación después de cerrar el dialog
    setTimeout(async () => {
      const confirmed = await showAlert.confirm(
        "Confirmar asignación",
        `¿Desea asignar a ${instructorToSave.name} como titular de la ficha ${fichaToSave || "seleccionada"}?`,
        "Asignar"
      );

      if (confirmed) {
        console.log("Asignando titular:", instructorToSave, "a ficha:", fichaToSave);
        await showAlert.success(
          "¡Titular asignado!",
          `${instructorToSave.name} ha sido asignado como titular correctamente.`
        );
      }
    }, 100);
  };

  const handleCancel = () => {
    setSelectedInstructor(null);
    setSearch("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} hideCloseButton>
      <DialogContent hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <UserCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Asignar Instructor Titular
              </h2>
              {fichaCode && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ficha: {fichaCode}
                </p>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar instructor por nombre o especialidad..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Lista de instructores */}
          <div className="mt-4 max-h-64 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            {filteredInstructors.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No se encontraron instructores
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredInstructors.map((instructor) => (
                  <button
                    key={instructor.id}
                    type="button"
                    onClick={() => setSelectedInstructor(instructor)}
                    className={`w-full p-4 text-left transition-colors ${
                      selectedInstructor?.id === instructor.id
                        ? "bg-teal-50 dark:bg-teal-900/30 border-l-4 border-teal-500"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <p className={`font-medium ${
                      selectedInstructor?.id === instructor.id
                        ? "text-teal-700 dark:text-teal-300"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {instructor.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {instructor.cargo} • {instructor.especialidad}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Instructor seleccionado */}
          {selectedInstructor && (
            <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
              <p className="text-sm text-teal-700 dark:text-teal-300">
                <span className="font-medium">Seleccionado:</span> {selectedInstructor.name}
              </p>
            </div>
          )}

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
              disabled={!selectedInstructor}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Asignar Titular
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
