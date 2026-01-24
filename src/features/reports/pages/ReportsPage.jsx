import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useReports } from '../hooks/useReports';
import { Download, FileText, Users, BookOpen, BarChart3, Calendar, Award } from 'lucide-react';
import { showToast, showAlert } from '@/shared/notifications';
import { downloadExcel } from '@/utils/downloadExcel';

const REPORT_TYPES = [
  {
    id: 'student-performance',
    name: 'Rendimiento Estudiantil',
    description: 'Reportes de desempeño académico de estudiantes',
    icon: Users,
  },
  {
    id: 'attendance',
    name: 'Asistencia',
    description: 'Reportes de asistencia por estudiante y curso',
    icon: Calendar,
  },
  {
    id: 'competencies',
    name: 'Competencias',
    description: 'Reportes de competencias por estudiante',
    icon: Award,
  },
  {
    id: 'practices',
    name: 'Prácticas Formativas',
    description: 'Reportes de seguimiento de prácticas',
    icon: BarChart3,
  },
  {
    id: 'courses',
    name: 'Cursos',
    description: 'Reportes de cursos por programa',
    icon: BookOpen,
  },
  {
    id: 'schedule',
    name: 'Horarios',
    description: 'Reportes de horarios y programación',
    icon: Calendar,
  },
  {
    id: 'instructors',
    name: 'Instructores',
    description: 'Reportes de actividad de instructores',
    icon: Users,
  },
  {
    id: 'instructor-activity',
    name: 'Actividad de Instructores',
    description: 'Reportes detallados de actividades',
    icon: BarChart3,
  },
];

export function ReportsPage() {
  const { report, loading, error, fetchReport, exportReport } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleFetchReport = async (reportType) => {
    setSelectedReport(reportType);
    try {
      showToast.loading('Generando reporte...');
      const filters = {};
      if (dateRange.start) filters.startDate = dateRange.start;
      if (dateRange.end) filters.endDate = dateRange.end;

      await fetchReport(reportType, filters);
      showToast.success('Reporte generado exitosamente');
    } catch (error) {
      console.error('Error fetching report:', error);
      showToast.error('Error al generar el reporte');
    }
  };

  const handleExport = async (format) => {
    try {
      if (!selectedReport || !report) {
        showAlert.warning('Sin datos', 'Por favor genera un reporte antes de exportar');
        return;
      }

      const toastId = showToast.loading('Exportando reporte...');
      const filters = {};
      if (dateRange.start) filters.startDate = dateRange.start;
      if (dateRange.end) filters.endDate = dateRange.end;

      if (format === 'excel') {
        // Preparar datos para Excel
        const reportData = Array.isArray(report) ? report : [report];
        
        if (reportData.length === 0) {
          showAlert.warning('Sin datos', 'No hay datos para exportar');
          showToast.dismiss(toastId);
          return;
        }

        // Detectar columnas automáticamente de los datos
        const columns = reportData.length > 0
          ? Object.keys(reportData[0]).map(key => ({
              key: key,
              label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
            }))
          : [];

        const reportTitle = REPORT_TYPES.find(r => r.id === selectedReport)?.name || 'Reporte';
        
        downloadExcel(
          reportData,
          columns,
          reportTitle,
          `reporte_${selectedReport}_${new Date().toISOString().split('T')[0]}`,
          {
            subtitulo: reportTitle,
            fecha: new Date().toLocaleDateString('es-CO'),
            fechaInicio: dateRange.start,
            fechaFin: dateRange.end
          }
        );

        showToast.dismiss(toastId);
        showToast.success(`Reporte exportado en Excel (${reportData.length} registros)`);
      } else {
        // Para otros formatos, usar el servicio original
        await exportReport(selectedReport, format, filters);
        showToast.dismiss(toastId);
        showToast.success(`Reporte exportado en ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error('Error exporting report:', error);
      showToast.error('Error al exportar el reporte');
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Centro de Reportes</h2>
          <p className="text-muted-foreground dark:text-gray-400">Genera reportes y exporta datos en múltiples formatos</p>
        </div>
      </div>

      {/* Filtros de Fecha */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Fecha Inicio</label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-gray-200">Fecha Fin</label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reportes Disponibles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reportes Disponibles</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REPORT_TYPES.map((reportType) => {
            const Icon = reportType.icon;
            const isSelected = selectedReport === reportType.id;

            return (
              <Card
                key={reportType.id}
                className={`cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardHeader
                  onClick={() => handleFetchReport(reportType.id)}
                  className="pb-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <CardTitle className="text-base text-gray-900 dark:text-white">{reportType.name}</CardTitle>
                        <CardDescription>{reportType.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reportes Seleccionado */}
      {selectedReport && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">
                {REPORT_TYPES.find((r) => r.id === selectedReport)?.name}
              </CardTitle>
              <CardDescription>
                Opciones de descarga y exportación
              </CardDescription>
            </div>
            {!loading && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleExport('excel')}
                  variant="outline"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
                <Button
                  onClick={() => handleExport('word')}
                  variant="outline"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Word
                </Button>
                <Button
                  onClick={() => handleExport('pdf')}
                  variant="outline"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {loading && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Generando reporte...</p>
              </div>
            )}

            {error && (
              <div className="text-red-500 py-8">
                <p>Error: {error}</p>
              </div>
            )}

            {report && !loading && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Reporte generado exitosamente. Use los botones de descarga para exportar el reporte en el formato deseado.
                  </p>
                </div>

                {/* Vista previa de datos */}
                {Array.isArray(report) && report.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          {Object.keys(report[0]).map((key) => (
                            <th key={key} className="text-left py-2 px-4 font-semibold">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {report.slice(0, 5).map((row, idx) => (
                          <tr key={idx} className="border-b">
                            {Object.values(row).map((value, idx) => (
                              <td key={idx} className="py-2 px-4">
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {report.length > 5 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Mostrando 5 de {report.length} registros
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
