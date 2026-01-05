import React, { useState } from "react";
import ConfirmEditInstructorModal from "./ConfirmEditInstructorModal";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import { X, Edit, Save, Lock } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";
import { useInstructoresMutations } from "../hooks/UseInstructors";

const getInitialForm = (instructor) => ({
  documento: instructor?.documento || "",
  tipoDocumento: instructor?.tipoDocumento || "CC",
  nombre: instructor?.nombre || "",
  apellidos: instructor?.apellidos || "",
  email: instructor?.email || "",
  celular: instructor?.celular || "",
  tipoVinculacion: instructor?.tipoVinculacion || "planta",
  rol: instructor?.rol || "tecnico",
  estado: instructor?.estado || "activo",
  areaId: instructor?.area?.id || "",
  sedeId: instructor?.sede?.id || "",
  fechaIngreso: instructor?.fechaIngreso || "",
  fechaFinContrato: instructor?.fechaFinContrato || "",
  formacionAcademica: instructor?.formacionAcademica || "",
  cargaHorariaAsignada: instructor?.cargaHoraria?.asignada || 40,
});

// Componente interno que se resetea con key
function shallowEqual(objA, objB) {
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}

function getFormChanges(initial, current) {
  const changes = {};
  Object.keys(initial).forEach((key) => {
    if (initial[key] !== current[key]) {
      changes[key] = { old: initial[key] || "", new: current[key] || "" };
    }
  });
  return changes;
}

function EditInstructorForm({ instructor, onClose, onSuccess, catalogos, isOpen }) {
  const [form, setForm] = useState(() => getInitialForm(instructor));
  const { updateInstructor, loading } = useInstructoresMutations();
  const initialForm = getInitialForm(instructor);
  const isModified = !shallowEqual(form, initialForm);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Si es área o sede, guardar como número
    if (name === "areaId" || name === "sedeId") {
      setForm((prev) => ({
        ...prev,
        [name]: value ? parseInt(value, 10) : ""
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "number" ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones obligatorias
    if (!form.nombre.trim() || !form.apellidos.trim()) {
      showAlert.warning("Campos requeridos", "Nombre y apellidos son obligatorios");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      showAlert.warning("Campos requeridos", "Ingrese un email válido");
      return;
    }
    if (!form.tipoVinculacion) {
      showAlert.warning("Campos requeridos", "Seleccione el tipo de vinculación");
      return;
    }
    if (!form.rol) {
      showAlert.warning("Campos requeridos", "Seleccione el rol");
      return;
    }
    if (!form.areaId) {
      showAlert.warning("Campos requeridos", "Seleccione el área de formación");
      return;
    }
    if (!form.sedeId) {
      showAlert.warning("Campos requeridos", "Seleccione la sede");
      return;
    }
    if (!isModified) {
      showToast.info("No hay cambios para guardar");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirm(false);
    try {
      await updateInstructor(instructor.id, form);
      showToast.success("Instructor actualizado exitosamente");
      onSuccess?.();
    } catch {
      showToast.error("Error al actualizar instructor");
    }
  };

  if (!instructor) return null;

  const changes = getFormChanges(initialForm, form);

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>
          Editar Instructor
        </DialogTitle>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shrink-0">
              <Edit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {instructor.nombre} {instructor.apellidos}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Documento (no editable) */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo Doc. 🔒
              </label>
              <input
                type="text"
                value={form.tipoDocumento}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm cursor-not-allowed"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Documento 🔒
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.documento}
                  disabled
                  title="El documento no puede modificarse"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                No editable - Identificador único
              </p>
            </div>
          </div>

          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombres *
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Email y Celular */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Celular
              </label>
              <input
                type="tel"
                name="celular"
                value={form.celular}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Vinculación, Rol y Estado */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vinculación
              </label>
              <select
                name="tipoVinculacion"
                value={form.tipoVinculacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Seleccionar...</option>
                {catalogos?.tiposVinculacion?.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rol
              </label>
              <select
                name="rol"
                value={form.rol}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm cursor-not-allowed"
              >
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estado
              </label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Área y Sede */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Área de Formación
              </label>
              <select
                name="areaId"
                value={form.areaId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Seleccionar...</option>
                {catalogos?.areas?.map((a) => (
                  <option key={a.id} value={a.id}>{a.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sede
              </label>
              <select
                name="sedeId"
                value={form.sedeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Seleccionar...</option>
                {catalogos?.sedes?.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fechas y carga horaria */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha Ingreso
              </label>
              <input
                type="date"
                name="fechaIngreso"
                value={form.fechaIngreso}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fin Contrato
              </label>
              <input
                type="date"
                name="fechaFinContrato"
                value={form.fechaFinContrato || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Carga Horaria
              </label>
              <input
                type="number"
                name="cargaHorariaAsignada"
                value={form.cargaHorariaAsignada}
                onChange={handleChange}
                min="1"
                max="48"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Formación académica */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Formación Académica
            </label>
            <textarea
              name="formacionAcademica"
              value={form.formacionAcademica}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !isModified}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      <ConfirmEditInstructorModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSave}
        changes={changes}
        instructor={instructor}
      />
    </Dialog>
  );
}

// Wrapper que usa key para resetear el form cuando cambia instructor
export default function EditInstructorModal({ isOpen, onClose, instructor, onSuccess, catalogos }) {
  if (!instructor) return null;
  
  return (
    <EditInstructorForm
      key={instructor.id}
      instructor={instructor}
      onClose={onClose}
      onSuccess={onSuccess}
      catalogos={catalogos}
      isOpen={isOpen}
    />
  );
}
