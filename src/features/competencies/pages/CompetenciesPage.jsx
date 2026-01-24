import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Plus, Search, Edit2, Trash2, Download, Upload } from 'lucide-react';
import { useCompetencies, useItineraries } from '../hooks/useCompetencies';
import { competencyService } from '../services/competencyService';
import { showToast, showAlert } from '@/shared/notifications';
import { downloadExcel } from '@/utils/downloadExcel';

export default function CompetenciesPage() {
  const { competencies, loading: compLoading, error: compError, fetchCompetencies, deleteCompetency } = useCompetencies();
  const { itineraries, loading: itinLoading, error: itinError, fetchItineraries, deleteItinerary } = useItineraries();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('competencies');

  useEffect(() => {
    if (activeTab === 'competencies') {
      fetchCompetencies();
    } else {
      fetchItineraries();
    }
  }, [activeTab, fetchCompetencies, fetchItineraries]);

  const handleDelete = async (id, type) => {
    const nombreTipo = type === 'competencia' ? 'competencia' : 'itinerario';
    showAlert.confirmDelete(nombreTipo).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (type === 'competencia') {
            await deleteCompetency(id);
            showToast.success(`${nombreTipo} eliminada exitosamente`);
          } else {
            await deleteItinerary(id);
            showToast.success(`${nombreTipo} eliminado exitosamente`);
          }
        } catch (err) {
          console.error('Error al eliminar:', err);
          showToast.error(`Error al eliminar ${nombreTipo}`);
        }
      }
    });
  };

  const handleSearch = async () => {
    if (activeTab === 'competencies') {
      // En un caso real, usaríamos searchCompetencies
      console.log('Búsqueda:', searchTerm);
    } else {
      // En un caso real, usaríamos searchItineraries
      console.log('Búsqueda:', searchTerm);
    }
  };

  const handleExport = async (type) => {
    try {
      if (type === 'competencies') {
        if (competencies.length === 0) {
          showAlert.warning('Sin datos', 'No hay competencias para exportar');
          return;
        }

        const toastId = showToast.loading('Exportando competencias...');
        const columns = [
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' },
          { key: 'keywords', label: 'Keywords' }
        ];

        const dataForExport = competencies.map(comp => ({
          ...comp,
          keywords: Array.isArray(comp.keywords) ? comp.keywords.join(', ') : comp.keywords || ''
        }));

        downloadExcel(
          dataForExport,
          columns,
          'Reporte de Competencias',
          `competencias_${new Date().toISOString().split('T')[0]}`,
          {
            subtitulo: 'Listado completo de competencias laborales',
            fecha: new Date().toLocaleDateString('es-CO')
          }
        );

        showToast.dismiss(toastId);
        showToast.success(`Exportadas ${competencies.length} competencias`);
      } else {
        if (itineraries.length === 0) {
          showAlert.warning('Sin datos', 'No hay itinerarios para exportar');
          return;
        }

        const toastId = showToast.loading('Exportando itinerarios...');
        const columns = [
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' },
          { key: 'duration', label: 'Duración' },
          { key: 'status', label: 'Estado' }
        ];

        downloadExcel(
          itineraries,
          columns,
          'Reporte de Itinerarios',
          `itinerarios_${new Date().toISOString().split('T')[0]}`,
          {
            subtitulo: 'Listado completo de itinerarios formativos',
            fecha: new Date().toLocaleDateString('es-CO'),
            rowClassName: (row) => {
              if (row.status === 'Activo') return 'bg-green-50';
              if (row.status === 'Inactivo') return 'bg-red-50';
              return 'bg-white';
            }
          }
        );

        showToast.dismiss(toastId);
        showToast.success(`Exportados ${itineraries.length} itinerarios`);
      }
    } catch (err) {
      console.error('Error al exportar:', err);
      showToast.error('Error al exportar el archivo');
    }
  };

  const handleImport = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast.loading('Importando archivo...');
      if (type === 'competencies') {
        await competencyService.bulkImportCompetencies(file);
        await fetchCompetencies();
        showToast.success('Competencias importadas exitosamente');
      } else {
        await competencyService.bulkImportItineraries(file);
        await fetchItineraries();
        showToast.success('Itinerarios importados exitosamente');
      }
    } catch (err) {
      console.error('Error al importar:', err);
      showToast.error('Error al importar el archivo');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Itinerarios y Competencias</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Gestión de itinerarios formativos, competencias y keywords</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="competencies">Competencias</TabsTrigger>
          <TabsTrigger value="itineraries">Itinerarios</TabsTrigger>
        </TabsList>

        <TabsContent value="competencies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Competencias</CardTitle>
                  <CardDescription>Gestione las competencias y keywords del sistema</CardDescription>
                </div>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => handleImport(e, 'competencies')}
                      className="hidden"
                    />
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Importar
                    </Button>
                  </label>
                  <Button variant="outline" onClick={() => handleExport('competencies')}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Competencia
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar competencia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {compLoading && <p>Cargando competencias...</p>}
              {compError && <p className="text-red-500">{compError}</p>}

              <div className="space-y-3">
                {competencies.length > 0 ? (
                  competencies.map((competency) => (
                    <div key={competency.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">{competency.name}</p>
                        <p className="text-sm text-gray-600">{competency.description}</p>
                        {competency.keywords && (
                          <div className="mt-2 flex gap-1 flex-wrap">
                            {competency.keywords.map((kw) => (
                              <Badge key={kw} variant="secondary">{kw}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(competency.id, 'competencia')}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No hay competencias registradas</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itineraries" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Itinerarios Formativos</CardTitle>
                  <CardDescription>Gestione los itinerarios y sus competencias asociadas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => handleImport(e, 'itineraries')}
                      className="hidden"
                    />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Importar
                    </Button>
                  </label>
                  <Button variant="outline" onClick={() => handleExport('itineraries')}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Itinerario
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar itinerario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {itinLoading && <p>Cargando itinerarios...</p>}
              {itinError && <p className="text-red-500">{itinError}</p>}

              <div className="space-y-3">
                {itineraries.length > 0 ? (
                  itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">{itinerary.name}</p>
                        <p className="text-sm text-gray-600">{itinerary.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Competencias: {itinerary.competencyCount || 0}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(itinerary.id, 'itinerario')}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No hay itinerarios registrados</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
