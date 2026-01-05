import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import AddAprendizModal from "./AddAprendizModal";

// Helper para obtener config de estado de aprendiz
const getEstadoAprendizConfig = (estado) => {
  const config = {
    activo: { color: "green", label: "Activo", icon: CheckCircle2 },
    desertado: { color: "red", label: "Desertado", icon: XCircle },
    condicionado: { color: "yellow", label: "Condicionado", icon: AlertTriangle },
    retirado: { color: "gray", label: "Retirado", icon: XCircle },
    aplazado: { color: "orange", label: "Aplazado", icon: AlertTriangle },
  };
  return config[estado] || { color: "gray", label: estado, icon: User };
};

export default function RecordAprendicesTab({ aprendices, loading, fichaId, onRefresh }) {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar aprendices por búsqueda
  const filteredAprendices = (aprendices || []).filter(a => 
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.documento.includes(search) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredAprendices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAprendices = filteredAprendices.slice(startIndex, startIndex + itemsPerPage);

  // Reset página cuando cambia búsqueda - TODOS los hooks deben ir antes de cualquier return
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Estadísticas
  const stats = {
    total: (aprendices || []).length,
    activos: (aprendices || []).filter(a => a.estado === "activo").length,
    desertados: (aprendices || []).filter(a => a.estado === "desertado").length,
    condicionados: (aprendices || []).filter(a => a.estado === "condicionado").length,
  };

  // El return condicional debe ir DESPUÉS de todos los hooks
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500 dark:text-gray-400">Cargando aprendices...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activos}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Activos</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.condicionados}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Condicionados</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.desertados}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Desertados</p>
        </div>
      </div>

      {/* Barra de búsqueda y acciones */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, documento o email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      {/* Lista de aprendices */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {paginatedAprendices.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No se encontraron aprendices
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {paginatedAprendices.map((aprendiz) => {
              const estadoConfig = getEstadoAprendizConfig(aprendiz.estado);
              const Icon = estadoConfig.icon;
              
              return (
                <div 
                  key={aprendiz.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {aprendiz.nombre}
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-${estadoConfig.color}-100 dark:bg-${estadoConfig.color}-900/30 text-${estadoConfig.color}-700 dark:text-${estadoConfig.color}-300`}>
                            <Icon className="w-3 h-3" />
                            {estadoConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          CC: {aprendiz.documento}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {aprendiz.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {aprendiz.celular}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {aprendiz.asistencia}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Asistencia
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredAprendices.length)} de {filteredAprendices.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal agregar aprendiz */}
      <AddAprendizModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        fichaId={fichaId}
        onSuccess={onRefresh}
      />
    </div>
  );
}
