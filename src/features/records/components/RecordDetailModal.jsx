import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import { 
  X, 
  Users, 
  BookOpen, 
  Bell, 
  FileText,
  Download,
  Edit,
  FileSpreadsheet,
  File,
  ChevronDown
} from "lucide-react";
import RecordInfo from "./RecordInfo";
import RecordAprendicesTab from "./RecordAprendicesTab";
import RecordRAPsTab from "./RecordRAPsTab";
import RecordNovedadesTab from "./RecordNovedadesTab";
import EditFichaModal from "./EditFichaModal";
import { useAprendicesFicha, useRAPsFicha, useNovedadesFicha, useRecordsMutations, useCatalogos } from "../hooks/UseRecords";
import { showToast } from "@/shared/notifications";

const tabs = [
  { id: "info", label: "Información", icon: FileText },
  { id: "aprendices", label: "Aprendices", icon: Users },
  { id: "raps", label: "RAPs", icon: BookOpen },
  { id: "novedades", label: "Novedades", icon: Bell },
];

export default function RecordDetailModal({ isOpen, onClose, ficha, onRefresh }) {
  const [activeTab, setActiveTab] = useState("info");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Cargar datos según la pestaña activa
  const { aprendices, loading: loadingAprendices, refetch: refetchAprendices } = useAprendicesFicha(
    activeTab === "aprendices" ? ficha?.id : null
  );
  const { raps, loading: loadingRAPs } = useRAPsFicha(
    activeTab === "raps" ? ficha?.id : null
  );
  const { novedades, loading: loadingNovedades, refetch: refetchNovedades } = useNovedadesFicha(
    activeTab === "novedades" ? ficha?.id : null
  );
  
  const { exportFichaDetail } = useRecordsMutations();
  const catalogos = useCatalogos();

  const handleExport = async (format) => {
    try {
      setIsExporting(true);
      await exportFichaDetail(ficha, format);
      showToast.success(`Ficha exportada a ${format.toUpperCase()} correctamente`);
      setShowExportMenu(false);
    } catch (error) {
      showToast.error(error.message || `Error al exportar a ${format}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    onRefresh?.();
  };

  // Función para refrescar aprendices y datos globales
  const handleAprendizChange = () => {
    refetchAprendices();
    onRefresh?.(); // También actualiza KPIs y lista de fichas
  };

  if (!ficha) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogTitle>
          Ficha {ficha.numero}
        </DialogTitle>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {ficha.programa}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Ficha: {ficha.numero}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className={`p-2 rounded-lg transition-colors relative ${
                isExporting 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title="Exportar"
            >
              <Download className={`w-5 h-5 ${isExporting ? "animate-spin" : ""}`} />
              
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-1 z-50 min-w-40">
                  <button
                    onClick={() => handleExport("pdf")}
                    disabled={isExporting}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="w-4 h-4 text-red-500" />
                    Exportar a PDF
                  </button>
                  <button
                    onClick={() => handleExport("excel")}
                    disabled={isExporting}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-green-500" />
                    Exportar a Excel
                  </button>
                  <button
                    onClick={() => handleExport("csv")}
                    disabled={isExporting}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <File className="w-4 h-4 text-blue-500" />
                    Exportar a CSV
                  </button>
                </div>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.id === "aprendices" && ficha.aprendicesActivos && (
                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                    isActive 
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}>
                    {ficha.aprendicesActivos}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Contenido de tabs */}
        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          {activeTab === "info" && (
            <RecordInfo ficha={ficha} />
          )}
          
          {activeTab === "aprendices" && (
            <RecordAprendicesTab 
              aprendices={aprendices} 
              loading={loadingAprendices}
              fichaId={ficha.id}
              onRefresh={handleAprendizChange}
            />
          )}
          
          {activeTab === "raps" && (
            <RecordRAPsTab 
              raps={raps} 
              loading={loadingRAPs}
            />
          )}
          
          {activeTab === "novedades" && (
            <RecordNovedadesTab 
              novedades={novedades} 
              loading={loadingNovedades}
              fichaId={ficha.id}
              onRefresh={refetchNovedades}
            />
          )}
        </div>

        {/* Modal de edición */}
        <EditFichaModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          ficha={ficha}
          onSuccess={handleEditSuccess}
          catalogos={catalogos}
        />
      </div>
    </Dialog>
  );
}
