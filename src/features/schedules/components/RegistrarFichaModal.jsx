import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Search, Calendar, Clock, MapPin, BookOpen } from "lucide-react";
import { showAlert } from "@/shared/notifications";

export default function RegistrarFichaModal({ isOpen, onClose, instructorName = "" }) {
  const [searchFicha, setSearchFicha] = useState("");
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "07:00",
    horaFin: "13:00",
    ambiente: "",
    diasSemana: [],
    observaciones: ""
  });

  // Mock de fichas disponibles
  const fichasDisponibles = [
    { id: 1, numero: "2889927", programa: "Análisis y Desarrollo de Software", jornada: "Diurna", fase: "Ejecución" },
    { id: 2, numero: "2889928", programa: "Producción Multimedia", jornada: "Nocturna", fase: "Lectiva" },
    { id: 3, numero: "2889929", programa: "Gestión Administrativa", jornada: "Mixta", fase: "Ejecución" },
    { id: 4, numero: "2889930", programa: "Contabilidad y Finanzas", jornada: "Diurna", fase: "Lectiva" },
    { id: 5, numero: "2889931", programa: "Mercadeo", jornada: "Nocturna", fase: "Productiva" },
  ];

  const diasSemanaOptions = [
    { id: "lunes", label: "L" },
    { id: "martes", label: "M" },
    { id: "miercoles", label: "M" },
    { id: "jueves", label: "J" },
    { id: "viernes", label: "V" },
    { id: "sabado", label: "S" },
    { id: "domingo", label: "D" },
  ];

  const filteredFichas = fichasDisponibles.filter(
    ficha => ficha.numero.includes(searchFicha) || 
             ficha.programa.toLowerCase().includes(searchFicha.toLowerCase())
  );

  const handleDiaToggle = (diaId) => {
    setFormData(prev => ({
      ...prev,
      diasSemana: prev.diasSemana.includes(diaId)
        ? prev.diasSemana.filter(d => d !== diaId)
        : [...prev.diasSemana, diaId]
    }));
  };

  const handleSave = () => {
    if (!selectedFicha) {
      showAlert.warning("Seleccione una ficha", "Debe seleccionar una ficha para registrar");
      return;
    }

    if (!formData.fechaInicio || !formData.fechaFin) {
      showAlert.warning("Fechas requeridas", "Debe ingresar las fechas de inicio y fin");
      return;
    }

    if (formData.diasSemana.length === 0) {
      showAlert.warning("Días requeridos", "Debe seleccionar al menos un día de la semana");
      return;
    }

    // Cerrar modal primero
    onClose();

    // Mostrar confirmación después
    setTimeout(() => {
      showAlert.success(
        "Ficha registrada",
        `La ficha ${selectedFicha.numero} ha sido asignada al instructor correctamente`
      );
    }, 100);
  };

  const handleClose = () => {
    setSearchFicha("");
    setSelectedFicha(null);
    setFormData({
      fechaInicio: "",
      fechaFin: "",
      horaInicio: "07:00",
      horaFin: "13:00",
      ambiente: "",
      diasSemana: [],
      observaciones: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
          <CalendarPlus className="w-5 h-5 text-teal-600" />
          Registrar Ficha al Instructor
        </h2>
      </div>

      <div className="space-y-6">
        {/* Info del instructor */}
        {instructorName && (
          <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <span className="font-medium">Instructor:</span> {instructorName}
            </p>
          </div>
        )}

        {/* Buscador de ficha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar Ficha
          </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por número de ficha o programa..."
                value={searchFicha}
                onChange={(e) => setSearchFicha(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Lista de fichas */}
            <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg">
              {filteredFichas.map((ficha) => (
                <div
                  key={ficha.id}
                  onClick={() => setSelectedFicha(ficha)}
                  className={`p-3 cursor-pointer border-b last:border-b-0 transition-colors ${
                    selectedFicha?.id === ficha.id
                      ? "bg-teal-50 dark:bg-teal-900/30"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Ficha {ficha.numero}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {ficha.programa}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                        {ficha.jornada}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        {ficha.fase}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredFichas.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No se encontraron fichas
                </div>
              )}
            </div>
        </div>

        {/* Formulario de programación */}
        {selectedFicha && (
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Programación para Ficha {selectedFicha.numero}
              </h4>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha Inicio
                  </label>
                  <Input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha Fin
                  </label>
                  <Input
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Horario */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Hora Inicio
                  </label>
                  <Input
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Hora Fin
                  </label>
                  <Input
                    type="time"
                    value={formData.horaFin}
                    onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Ambiente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Ambiente
                </label>
                <Input
                  type="text"
                  placeholder="Ej: Ambiente 401, Laboratorio TIC"
                  value={formData.ambiente}
                  onChange={(e) => setFormData({ ...formData, ambiente: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Días de la semana */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Días de la Semana
                </label>
                <div className="flex gap-2 flex-wrap">
                  {diasSemanaOptions.map((dia) => (
                    <button
                      key={dia.id}
                      type="button"
                      onClick={() => handleDiaToggle(dia.id)}
                      translate="no"
                      className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full font-medium text-sm transition-colors ${
                        formData.diasSemana.includes(dia.id)
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <span className="notranslate">{dia.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observaciones
                </label>
                <textarea
                  rows={2}
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Observaciones adicionales..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              variant="outline"
              onClick={handleClose}
              className="dark:border-gray-600 dark:text-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!selectedFicha}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <CalendarPlus className="w-4 h-4 mr-2" />
              Registrar Ficha
            </Button>
          </div>
      </div>
    </Dialog>
  );
}
