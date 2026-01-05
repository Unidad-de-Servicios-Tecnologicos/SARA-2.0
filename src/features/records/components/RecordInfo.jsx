import React from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  BookOpen,
  Building2,
  GraduationCap,
  FileText,
  TrendingUp
} from "lucide-react";

// Helper para obtener color y label de estado
const getEstadoConfig = (estado) => {
  const config = {
    activa: { color: "green", label: "Activa", bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300" },
    en_formacion: { color: "blue", label: "En Formación", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300" },
    en_etapa_productiva: { color: "purple", label: "Etapa Productiva", bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
    suspendida: { color: "yellow", label: "Suspendida", bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300" },
    finalizada: { color: "gray", label: "Finalizada", bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300" },
    cancelada: { color: "red", label: "Cancelada", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300" },
  };
  return config[estado] || { color: "gray", label: estado, bg: "bg-gray-100", text: "text-gray-700" };
};

// Helper para formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return "No definida";
  return new Date(dateString).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export default function RecordInfo({ ficha, loading }) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!ficha) return null;

  const estadoConfig = getEstadoConfig(ficha.estado);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header con número de ficha y estado */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold">{ficha.numero}</span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${estadoConfig.bg} ${estadoConfig.text}`}>
                {estadoConfig.label}
              </span>
            </div>
            <p className="text-blue-100 text-lg">{ficha.programa?.nombre}</p>
            <p className="text-blue-200 text-sm mt-1">
              Código: {ficha.programa?.codigo} | Nivel: {ficha.programa?.nivel}
            </p>
          </div>
          
          {/* Avance general */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 min-w-48">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Avance General</span>
            </div>
            <div className="text-3xl font-bold">{ficha.avanceRAPs}%</div>
            <div className="h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${ficha.avanceRAPs}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Información detallada */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Instructor Titular */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Instructor Titular</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {ficha.instructorTitular?.nombre || "Sin asignar"}
              </p>
              {ficha.instructorTitular?.email && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {ficha.instructorTitular.email}
                </p>
              )}
            </div>
          </div>

          {/* Sede */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg shrink-0">
              <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sede</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {ficha.sede?.nombre}
              </p>
            </div>
          </div>

          {/* Ambiente */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shrink-0">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ambiente</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {ficha.ambiente || "No asignado"}
              </p>
            </div>
          </div>

          {/* Jornada y Modalidad */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg shrink-0">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jornada / Modalidad</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {ficha.jornada} / {ficha.modalidad}
              </p>
            </div>
          </div>

          {/* Fase actual */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg shrink-0">
              <GraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fase Actual</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {ficha.fase}
              </p>
            </div>
          </div>

          {/* Aprendices */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg shrink-0">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aprendices</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {ficha.aprendicesActivos} activos de {ficha.aprendicesTotal}
              </p>
              {ficha.aprendicesDesertados > 0 && (
                <p className="text-xs text-red-500">
                  {ficha.aprendicesDesertados} desertados
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Cronograma
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fecha Inicio</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(ficha.fechaInicio)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fin Etapa Lectiva</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(ficha.fechaFinLectiva)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fin Etapa Productiva</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(ficha.fechaFinProductiva)}
              </p>
            </div>
          </div>
        </div>

        {/* Horas */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Horas de Formación
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  {ficha.horasEjecutadas} de {ficha.horasProgramadas} horas
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {((ficha.horasEjecutadas / ficha.horasProgramadas) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(ficha.horasEjecutadas / ficha.horasProgramadas) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones */}
        {ficha.observaciones && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Observaciones
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              {ficha.observaciones}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
