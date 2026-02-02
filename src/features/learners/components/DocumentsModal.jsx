import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { FileText, Download, Eye, Calendar, HardDrive } from "lucide-react";

export default function DocumentsModal({ isOpen, onClose, learner }) {
  if (!learner) return null;

  const documents = [
    {
      id: 1,
      name: "Certificado de matrícula",
      type: "PDF",
      date: "2024-01-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Documento de identidad",
      type: "PDF",
      date: "2024-01-15",
      size: "1.2 MB",
    },
    {
      id: 3,
      name: "Comprobante de pago",
      type: "PDF",
      date: "2024-01-20",
      size: "0.8 MB",
    },
    {
      id: 4,
      name: "Antecedentes penales",
      type: "PDF",
      date: "2024-01-18",
      size: "1.5 MB",
    },
    {
      id: 5,
      name: "Autorización de datos",
      type: "PDF",
      date: "2024-01-15",
      size: "0.5 MB",
    },
  ];

  const getFileIcon = () => {
    return <FileText className="w-5 h-5" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Documentos de {learner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border-l-4 border-l-blue-500 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm wrap-break-word">
                      {doc.name}
                    </h4>
                    <div className="flex flex-col gap-1.5 mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-medium">
                          {doc.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {doc.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {doc.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    title="Ver documento"
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    title="Descargar"
                    className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No hay documentos registrados
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
