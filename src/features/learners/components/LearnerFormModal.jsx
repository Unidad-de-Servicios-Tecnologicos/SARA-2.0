import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { showToast } from "@/shared/notifications";
import { mockFichas } from "@/features/records/mock/records.mock";

export default function LearnerFormModal({ isOpen, onClose, learner, onSave }) {
  // Estado del formulario
  const [formData, setFormData] = useState({
    documentType: "CC",
    documentNumber: "",
    names: "",
    surnames: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    program: "",
    fichaNumber: "",
    journada: "",
    modality: "",
    trimestre: 1,
    initialState: "EN FORMACIÓN",
    institutionalEmail: "",
    personalEmail: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // Opciones de selects
  const documentTypes = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "TI", label: "Tarjeta de Identidad" },
    { value: "CE", label: "Cédula de Extranjería" },
    { value: "PA", label: "Pasaporte" },
  ];

  const fichaOptions = useMemo(() => {
    return mockFichas.map((ficha) => ({
      value: ficha.numero,
      label: `${ficha.numero} - ${ficha.programa?.nombre || "Sin programa"}`,
      programa: ficha.programa?.nombre,
    }));
  }, []);

  const journadaOptions = [
    { value: "Matutina", label: "Matutina" },
    { value: "Vespertina", label: "Vespertina" },
    { value: "Nocturna", label: "Nocturna" },
    { value: "Mixta", label: "Mixta" },
  ];

  const modalityOptions = [
    { value: "Presencial", label: "Presencial" },
    { value: "Virtual", label: "Virtual" },
    { value: "Híbrida", label: "Híbrida" },
  ];

  const genderOptions = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
    { value: "Otro", label: "Otro" },
  ];

  const maritalStatusOptions = [
    { value: "Soltero", label: "Soltero/a" },
    { value: "Casado", label: "Casado/a" },
    { value: "Viudo", label: "Viudo/a" },
    { value: "Divorciado", label: "Divorciado/a" },
    { value: "Unión libre", label: "Unión libre" },
  ];

  // Manejar cambios de input
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a editar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Manejar cambio de ficha
  const handleFichaChange = (fichaNumber) => {
    const selectedFicha = fichaOptions.find(f => f.value === fichaNumber);
    setFormData(prev => ({
      ...prev,
      fichaNumber,
      program: selectedFicha?.programa || "",
    }));
    setValidationMessage("");
  };

  // Validaciones
  const validateForm = () => {
    const newErrors = {};
    const newValidations = {};

    // Validaciones obligatorias
    if (!formData.documentType) newErrors.documentType = "Seleccione tipo de documento";
    if (!formData.documentNumber) newErrors.documentNumber = "Número de documento requerido";
    if (!formData.names) newErrors.names = "Nombres requeridos";
    if (!formData.surnames) newErrors.surnames = "Apellidos requeridos";
    if (!formData.birthDate) newErrors.birthDate = "Fecha de nacimiento requerida";
    if (!formData.program) newErrors.program = "Programa requerido";
    if (!formData.fichaNumber) newErrors.fichaNumber = "Ficha requerida";
    if (!formData.journada) newErrors.journada = "Jornada requerida";
    if (!formData.modality) newErrors.modality = "Modalidad requerida";
    if (!formData.institutionalEmail) newErrors.institutionalEmail = "Correo institucional requerido";
    if (!formData.phone) newErrors.phone = "Teléfono requerido";

    // Validaciones de formato
    if (formData.institutionalEmail && !formData.institutionalEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.institutionalEmail = "Correo inválido";
    }
    if (formData.phone && isNaN(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Teléfono debe ser numérico";
    }

    // Validación de duplicidad (simulada)
    if (formData.documentNumber) {
      // En producción, esto vendría del servidor
      newValidations.documentDuplicate = false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast.warning("Por favor completa los campos obligatorios");
      return;
    }

    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      onSave({
        ...formData,
        id: Math.random(),
      });
      showToast.success(`Aprendiz ${formData.names} ${formData.surnames} registrado exitosamente`);
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Aprendiz</DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Los campos marcados con <span className="text-red-600">*</span> son obligatorios.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DATOS PERSONALES */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Datos Personales
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Tipo de documento <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => handleInputChange("documentType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione...</option>
                  {documentTypes.map(dt => (
                    <option key={dt.value} value={dt.value}>{dt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Número de documento <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                  placeholder="Ej: 1234567890"
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.documentNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.documentNumber && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.documentNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Nombres <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.names}
                  onChange={(e) => handleInputChange("names", e.target.value)}
                  placeholder="Ej: Juan Carlos"
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.names ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.names && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.names}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Apellidos <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.surnames}
                  onChange={(e) => handleInputChange("surnames", e.target.value)}
                  placeholder="Ej: López García"
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.surnames ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.surnames && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.surnames}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Fecha de nacimiento <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.birthDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.birthDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Género
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione...</option>
                  {genderOptions.map(g => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                Estado civil
              </label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione...</option>
                {maritalStatusOptions.map(ms => (
                  <option key={ms.value} value={ms.value}>{ms.label}</option>
                ))}
              </select>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* DATOS ACADÉMICOS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              Datos Académicos
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Programa <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.program}
                  disabled
                  placeholder="Se asigna según la ficha"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Se asigna automáticamente según la ficha</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Ficha <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.fichaNumber}
                  onChange={(e) => handleFichaChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.fichaNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Seleccione una ficha...</option>
                  {fichaOptions.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                {errors.fichaNumber && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fichaNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Jornada <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.journada}
                  onChange={(e) => handleInputChange("journada", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.journada ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  {journadaOptions.map(j => (
                    <option key={j.value} value={j.value}>{j.label}</option>
                  ))}
                </select>
                {errors.journada && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.journada}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Modalidad <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.modality}
                  onChange={(e) => handleInputChange("modality", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.modality ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  {modalityOptions.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                {errors.modality && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.modality}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Trimestre inicial
                </label>
                <select
                  value={formData.trimestre}
                  onChange={(e) => handleInputChange("trimestre", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => (
                    <option key={t} value={t}>Trimestre {t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Estado inicial
                </label>
                <select
                  value={formData.initialState}
                  onChange={(e) => handleInputChange("initialState", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EN FORMACIÓN">En Formación</option>
                  <option value="CONDICIONADO">Condicionado</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* DATOS DE CONTACTO */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              Datos de Contacto
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Correo institucional <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.institutionalEmail}
                  onChange={(e) => handleInputChange("institutionalEmail", e.target.value)}
                  placeholder="nombre@sena.edu.co"
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.institutionalEmail ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.institutionalEmail && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.institutionalEmail}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Correo personal
                </label>
                <input
                  type="email"
                  value={formData.personalEmail}
                  onChange={(e) => handleInputChange("personalEmail", e.target.value)}
                  placeholder="correo@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Teléfono <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Ej: 3015551234"
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Calle, número, ciudad"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Mensaje de validación */}
          {validationMessage && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-xs text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {validationMessage}
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Registrando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Registrar Aprendiz
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
