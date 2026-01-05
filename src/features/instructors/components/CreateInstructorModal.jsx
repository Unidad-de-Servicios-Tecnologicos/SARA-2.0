import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import { X, UserPlus, Save } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";
import { useInstructoresMutations } from "../hooks/UseInstructors";

const initialForm = {
  documento: "",
  tipoDocumento: "CC",
  nombre: "",
  apellidos: "",
  email: "",
  celular: "",
  tipoVinculacion: "planta",
  rol: "instructor",
  areaId: "",
  sedeId: "",
  fechaIngreso: "",
  fechaFinContrato: "",
  formacionAcademica: "",
  cargaHorariaAsignada: 40,
};

export default function CreateInstructorModal({ isOpen, onClose, onSuccess, catalogos }) {
  const [form, setForm] = useState(initialForm);
  const { createInstructor, loading } = useInstructoresMutations();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.documento.trim()) {
      showToast.warning("El documento es obligatorio");
      return;
    }
    if (!form.nombre.trim() || !form.apellidos.trim()) {
      showToast.warning("Nombre y apellidos son obligatorios");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      showToast.warning("Ingrese un email válido");
      return;
    }
    if (!form.areaId) {
      showToast.warning("Seleccione un área de formación");
      return;
    }
    if (!form.sedeId) {
      showToast.warning("Seleccione una sede");
      return;
    }

    const confirmed = await showAlert.confirmSave(
      `Se creará el instructor ${form.nombre} ${form.apellidos}`
    );

    if (!confirmed) return;

    try {
      await createInstructor(form);
      showToast.success("Instructor creado exitosamente");
      onSuccess?.();
      handleClose();
    } catch {
      showToast.error("Error al crear instructor");
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} hideCloseButton>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>
          Nuevo Instructor
        </DialogTitle>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complete la información del instructor
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Documento */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo Doc. *
              </label>
              <select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="PEP">PEP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                name="documento"
                value={form.documento}
                onChange={handleChange}
                placeholder="Ej: 79123456"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
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
                placeholder="Nombres"
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
                placeholder="Apellidos"
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
                placeholder="correo@sena.edu.co"
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
                placeholder="3001234567"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Vinculación y Rol */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Vinculación *
              </label>
              <select
                name="tipoVinculacion"
                value={form.tipoVinculacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                {catalogos?.tiposVinculacion?.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rol *
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
          </div>

          {/* Área y Sede */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Área de Formación *
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
                Sede *
              </label>
              <select
                name="sedeId"
                value={form.sedeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Seleccionar...</option>
                {/* Solo mostrar sedes válidas según catálogo de horarios */}
                {catalogos?.sedes
                  ?.filter((s) => [
                    "CESGE",
                    "SIN SEDE",
                    "VIRTUAL",
                    "IUSH",
                    "CDA"
                  ].includes(s.nombre))
                  .map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
              </select>
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha de Ingreso
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
                Fin de Contrato
              </label>
              <input
                type="date"
                name="fechaFinContrato"
                value={form.fechaFinContrato}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Solo para contratistas
              </p>
            </div>
          </div>

          {/* Carga horaria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Carga Horaria Semanal (horas)
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
              placeholder="Título profesional, universidad, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Guardar Instructor
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
