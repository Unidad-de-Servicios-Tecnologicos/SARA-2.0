import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Download, Trash2, RefreshCw, Clock, HardDrive, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { useBackup, useBackupSchedule, useBackupStorage, useBackupRetention } from '../hooks/useBackup';
import { showToast, showAlert } from '@/shared/notifications';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración y Backup</h1>
        <p className="text-gray-600 mt-2">Gestione respaldos automáticos, retención y recuperación de datos</p>
      </div>

      <Tabs defaultValue="backups" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backups">Respaldos</TabsTrigger>
          <TabsTrigger value="schedule">Programación</TabsTrigger>
          <TabsTrigger value="storage">Almacenamiento</TabsTrigger>
          <TabsTrigger value="retention">Retención</TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-6">
          <BackupsTab />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ScheduleTab />
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <StorageTab />
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <RetentionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BackupsTab() {
  const { backups, loading, error, fetchHistory, createBackup, deleteBackup, downloadBackup } = useBackup();
  const [backupType, setBackupType] = useState('full');

  useEffect(() => {
    fetchHistory(20);
  }, [fetchHistory]);

  const handleCreateBackup = async () => {
    try {
      showToast.loading('Creando respaldo...');
      await createBackup(backupType);
      showToast.success('Respaldo creado exitosamente');
      await fetchHistory(20);
    } catch (err) {
      showToast.error(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (backupId) => {
    showAlert.confirmDelete('¿Está seguro que desea eliminar este respaldo?').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBackup(backupId);
          showToast.success('Respaldo eliminado');
        } catch (err) {
          showToast.error(`Error: ${err.message}`);
        }
      }
    });
  };
showToast.loading('Descargando respaldo...');
      await downloadBackup(backupId, fileName);
      showToast.success('Respaldo descargado exitosamente');
    } catch (err) {
      showToast.error
      await downloadBackup(backupId, fileName);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Respaldos del Sistema</CardTitle>
        <CardDescription>Cree, descargue y gestione respaldos manuales</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="space-y-4 pb-6 border-b dark:border-gray-700">
          <div>
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tipo de Respaldo</label>
            <div className="mt-2 flex gap-2">
              <Button
                variant={backupType === 'full' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBackupType('full')}
              >
                Completo
              </Button>
              <Button
                variant={backupType === 'incremental' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBackupType('incremental')}
              >
                Incremental
              </Button>
              <Button
                variant={backupType === 'differential' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBackupType('differential')}
              >
                Diferencial
              </Button>
            </div>
          </div>

          <Button onClick={handleCreateBackup} disabled={loading} className="w-full">
            {loading ? 'Creando respaldo...' : 'Crear Respaldo Ahora'}
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Historial de Respaldos</h3>
          {loading && <p className="text-gray-900 dark:text-gray-100">Cargando respaldos...</p>}
          {backups.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {backups.map((backup) => (
                <div key={backup.id} className="p-3 border dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{backup.name}</p>
                        <Badge variant={backup.status === 'success' ? 'default' : 'destructive'}>
                          {backup.status}
                        </Badge>
                        <Badge variant="outline">{backup.type}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(backup.timestamp).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        Tamaño: {(backup.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(backup.id, backup.name)}
                        title="Descargar"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(backup.id)}
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay respaldos disponibles</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleTab() {
  const { config, nextBackup, loading, error, fetchScheduleConfig, updateSchedule, enableAutomatic, disableAutomatic } = useBackupSchedule();
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('02:00');

  useEffect(() => {
    fetchScheduleConfig();
  }, [fetchScheduleConfig]);

  const handleUpdateSchedule = async () => {
    trshowToast.success('Horario actualizado');
      await fetchScheduleConfig();
    } catch (err) {
      showToast.error(`Error: ${err.message}`);
    }
  };

  const handleToggleAutomatic = async () => {
    try {
      if (config?.automaticBackup) {
        await disableAutomatic();
        showToast.success('Respaldos automáticos deshabilitados');
      } else {
        await enableAutomatic();
        showToast.success('Respaldos automáticos habilitados');
      }
      await fetchScheduleConfig();
    } catch (err) {
      showToast.error fetchScheduleConfig();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Clock className="h-5 w-5" />
          Programación de Respaldos
        </CardTitle>
        <CardDescription>Configure respaldos automáticos programados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {config && (
          <>
            <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">Respaldos Automáticos</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    {config.automaticBackup ? 'Habilitados' : 'Deshabilitados'}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={handleToggleAutomatic}
                  disabled={loading}
                >
                  {config.automaticBackup ? 'Deshabilitar' : 'Habilitar'}
                </Button>
              </div>
            </div>

            {config.automaticBackup && (
              <div className="space-y-4 pb-6 border-b dark:border-gray-700">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Frecuencia</label>
                  <div className="mt-2 flex gap-2">
                    {['hourly', 'daily', 'weekly', 'monthly'].map((freq) => (
                      <Button
                        key={freq}
                        variant={frequency === freq ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFrequency(freq)}
                      >
                        {freq === 'hourly' && 'Cada hora'}
                        {freq === 'daily' && 'Diario'}
                        {freq === 'weekly' && 'Semanal'}
                        {freq === 'monthly' && 'Mensual'}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Hora del Respaldo</label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleUpdateSchedule} disabled={loading} className="w-full">
                  Guardar Programación
                </Button>
              </div>
            )}

            {nextBackup && (
              <div className="p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-sm text-green-900 dark:text-green-100">
                  <strong>Próximo respaldo programado:</strong> {new Date(nextBackup.scheduledTime).toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function StorageTab() {
  const { storageInfo, loading, error, fetchStorageInfo } = useBackupStorage();

  useEffect(() => {
    fetchStorageInfo();
  }, [fetchStorageInfo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <HardDrive className="h-5 w-5" />
          Almacenamiento
        </CardTitle>
        <CardDescription>Información sobre el uso del almacenamiento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {loading && <p className="text-gray-900 dark:text-gray-100">Cargando información de almacenamiento...</p>}

        {storageInfo && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">TOTAL</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {(storageInfo.totalStorage / 1024 / 1024 / 1024).toFixed(2)} GB
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-2">USADO</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {(storageInfo.usedStorage / 1024 / 1024 / 1024).toFixed(2)} GB
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">DISPONIBLE</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {(storageInfo.availableStorage / 1024 / 1024 / 1024).toFixed(2)} GB
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Uso de Almacenamiento</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${(storageInfo.usedStorage / storageInfo.totalStorage) * 100}%`
                  }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {((storageInfo.usedStorage / storageInfo.totalStorage) * 100).toFixed(1)}% utilizado
              </p>
            </div>

            <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Detalles</p>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p>Respaldos: {storageInfo.backupCount || 0}</p>
                <p>Tamaño promedio: {((storageInfo.usedStorage / (storageInfo.backupCount || 1)) / 1024 / 1024).toFixed(2)} MB</p>
                <p>Destino: {storageInfo.destination || 'Local'}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RetentionTab() {
  const { policy, loading, error, fetchPolicy, updatePolicy, cleanup } = useBackupRetention();
  const [retentionDays, setRetentionDays] = useState(null);
  const [maxBackups, setMaxBackups] = useState(null);

  useEffect(() => {
    fetchPolicy();
  }, [fetchPolicy]);

  useEffect(() => {
    if (policy && retentionDays === null && maxBackups === null) {
      setRetentionDays(policy.retentionDays || 30);
      setMaxBackups(policy.maxBackups || 50);
    }
  }, [policy, retentionDays, maxBackups]);

  const handleUpdatePolicy = async () => {
    try {
      await updatePolicy({ retentionDays, maxBackups });
      alert('Política de retención actualizada');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleCleanup = async () => {
    if (confirm('¿Está seguro que desea limpiar los respaldos antiguos?')) {
      try {
        const result = await cleanup();
        alert(`Limpieza completada: ${result.deletedCount} respaldos eliminados`);
        await fetchPolicy();
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Shield className="h-5 w-5" />
          Política de Retención
        </CardTitle>
        <CardDescription>Controle la conservación automática de respaldos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {policy && (
          <>
            <div className="space-y-4 pb-6 border-b">
              <div>
                <label className="text-sm font-semibold text-gray-600">Retener respaldos por (días)</label>
                <Input
                  type="number"
                  min="1"
                  max="730"
                  value={retentionDays ?? 30}
                  onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Mantener respaldos hasta 2 años atrás</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Máximo de respaldos a guardar</label>
                <Input
                  type="number"
                  min="1"
                  max="500"
                  value={maxBackups ?? 50}
                  onChange={(e) => setMaxBackups(parseInt(e.target.value))}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Número máximo de respaldos simultáneos</p>
              </div>

              <Button onClick={handleUpdatePolicy} disabled={loading} className="w-full">
                Guardar Política
              </Button>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-orange-900">Limpieza de Respaldos Antiguos</p>
                  <p className="text-sm text-orange-700 mt-1">
                    Eliminar respaldos que hayan excedido la política de retención
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCleanup}
                  disabled={loading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Limpiar
                </Button>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-900">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="text-sm font-semibold">Estado de Cumplimiento</span>
              </div>
              <p className="text-xs text-green-700 mt-2">
                {policy.isCompliant
                  ? 'La política está siendo aplicada correctamente'
                  : 'Hay respaldos que exceden la política'}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
