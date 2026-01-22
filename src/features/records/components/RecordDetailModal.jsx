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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
        {/* Header */}
        <div style={{ flexShrink: 0, borderBottom: '1px solid var(--border-color)', padding: '1.5rem', backgroundColor: 'var(--bg-color)' }}>
          <DialogTitle>
            Ficha {ficha.numero}
          </DialogTitle>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: '1rem', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0, flex: 1 }}>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-color)' }}>
                  {ficha.programa?.nombre}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Ficha: {ficha.numero}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
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
        </div>

        {/* Tabs */}
        <div style={{ flexShrink: 0, borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', overflowX: 'auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                    color: isActive ? '#2563eb' : '#6b7280',
                    whiteSpace: 'nowrap',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === "aprendices" && ficha.aprendicesActivos && (
                    <span style={{
                      padding: '0.375rem 0.375rem',
                      fontSize: '0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#dbeafe' : '#f3f4f6',
                      color: isActive ? '#2563eb' : '#4b5563'
                    }}>
                      {ficha.aprendicesActivos}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido de tabs */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', minHeight: 0 }}>
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
