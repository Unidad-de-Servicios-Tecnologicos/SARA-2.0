import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { AlertCircle, CheckCircle2, Clock, Zap, Link2, Webhook } from 'lucide-react';
import { useSofia, useGemini, useSync, useWebhooks } from '../hooks/useIntegrations';
import { showToast, showAlert } from '@/shared/notifications';

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Integraciones y Sincronización</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Gestione conexiones con sistemas externos: SOFIA Plus, Google Gemini, Webhooks</p>
      </div>

      <Tabs defaultValue="sofia" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sofia">SOFIA Plus</TabsTrigger>
          <TabsTrigger value="gemini">Google Gemini</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="sync">Sincronización</TabsTrigger>
        </TabsList>

        <TabsContent value="sofia" className="space-y-6">
          <SofiaTab />
        </TabsContent>

        <TabsContent value="gemini" className="space-y-6">
          <GeminiTab />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <WebhooksTab />
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <SyncTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SofiaTab() {
  const { config, status, lastSync, loading, error, fetchConfig, testConnection, sync } = useSofia();

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleTest = async () => {
    try {
      const result = await testConnection();
      showToast.success(`Conexión ${result.status}: ${result.message}`);
    } catch (err) {
      showToast.error(`Error: ${err.message}`);
    }
  };

  const handleSync = async () => {
    try {
      await sync('all');
      showToast.success('Sincronización iniciada');
    } catch (err) {
      showToast.error(`Error: ${err.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Link2 className="h-5 w-5" />
          SOFIA Plus
        </CardTitle>
        <CardDescription>Gestione la integración con SOFIA Plus del SENA</CardDescription>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">URL de SOFIA</label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{config.sofiaUrl || 'No configurado'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Estado de Conexión</label>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      status?.connected ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-sm">
                    {status?.connected ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>

            {lastSync && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Última sincronización:</strong> {new Date(lastSync.timestamp).toLocaleString()}
                </p>
                <p className="text-xs text-blue-700 mt-1">{lastSync.status}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleTest} disabled={loading}>
                {loading ? 'Probando...' : 'Probar Conexión'}
              </Button>
              <Button onClick={handleSync} disabled={loading} variant="outline">
                {loading ? 'Sincronizando...' : 'Sincronizar Ahora'}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function GeminiTab() {
  const { config, status, loading, error, fetchConfig, testConnection, generateContent } = useGemini();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleTest = async () => {
    try {
      const result = await testConnection();
      alert(`Conexión ${result.status}: ${result.message}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    try {
      const result = await generateContent(prompt, 'text');
      setGeneratedContent(result.content);
      showToast.success('Contenido generado exitosamente');
    } catch (err) {
      showToast.error(`Error: ${err.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Zap className="h-5 w-5" />
          Google Gemini
        </CardTitle>
        <CardDescription>Generación automática de contenido con IA</CardDescription>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Modelo</label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{config.model || 'gemini-pro'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Estado</label>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      status?.available ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-sm">
                    {status?.available ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Prompt</label>
                <Input
                  placeholder="Escriba el prompt para generar contenido..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                {loading ? 'Generando...' : 'Generar Contenido'}
              </Button>

              {generatedContent && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Contenido Generado:</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{generatedContent}</p>
                </div>
              )}

              <Button variant="outline" onClick={handleTest} disabled={loading}>
                Probar Conexión
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function WebhooksTab() {
  const { webhooks, loading, error, fetchWebhooks, deleteWebhook } = useWebhooks();
  const [newWebhook, setNewWebhook] = useState({ url: '', events: '' });

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const handleDelete = async (webhookId) => {
    showAlert.confirmDelete('¿Está seguro que desea eliminar este webhook?').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteWebhook(webhookId);
          showToast.success('Webhook eliminado');
        } catch (err) {
          showToast.error(`Error: ${err.message}`);
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Webhook className="h-5 w-5" />
          Webhooks
        </CardTitle>
        <CardDescription>Gestione webhooks para integración con sistemas externos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="space-y-3 pb-6 border-b dark:border-gray-700">
          <div>
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">URL del Webhook</label>
            <Input
              placeholder="https://..."
              value={newWebhook.url}
              onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Eventos (separados por coma)</label>
            <Input
              placeholder="activity.created, course.updated"
              value={newWebhook.events}
              onChange={(e) => setNewWebhook({ ...newWebhook, events: e.target.value })}
              className="mt-2"
            />
          </div>
          <Button disabled={loading}>Crear Webhook</Button>
        </div>

        <div className="space-y-3">
          {loading && <p className="text-gray-900 dark:text-gray-100">Cargando webhooks...</p>}
          {webhooks.length > 0 ? (
            webhooks.map((webhook) => (
              <div key={webhook.id} className="p-3 border dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{webhook.url}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {webhook.events?.join(', ')}
                    </p>
                    <Badge className="mt-2" variant={webhook.active ? 'default' : 'secondary'}>
                      {webhook.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(webhook.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay webhooks configurados</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SyncTab() {
  const { syncStatus, syncHistory, loading, fetchSyncStatus, startSync, fetchHistory } = useSync();

  useEffect(() => {
    fetchSyncStatus();
    fetchHistory();
  }, [fetchSyncStatus, fetchHistory]);

  const handleStartSync = async () => {
    try {
      await startSync('full');
      alert('Sincronización iniciada');
      setTimeout(() => {
        fetchSyncStatus();
      }, 2000);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Clock className="h-5 w-5" />
          Sincronización General
        </CardTitle>
        <CardDescription>Controle el estado y historial de sincronización</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {syncStatus && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">EN PROGRESO</span>
                </div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {syncStatus.inProgress ? 'Sí' : 'No'}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">ÉXITOS</span>
                </div>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{syncStatus.successCount}</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">ERRORES</span>
                </div>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{syncStatus.errorCount}</p>
              </div>
            </div>

            <Button
              onClick={handleStartSync}
              disabled={loading || syncStatus.inProgress}
              className="w-full"
            >
              {loading ? 'Iniciando...' : syncStatus.inProgress ? 'Sincronizando...' : 'Iniciar Sincronización'}
            </Button>
          </>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Historial de Sincronización</h3>
          {syncHistory && syncHistory.length > 0 ? (
            syncHistory.map((item, idx) => (
              <div key={idx} className="p-3 border dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{item.type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant={item.status === 'success' ? 'default' : 'destructive'}>
                    {item.status}
                  </Badge>
                </div>
                {item.message && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">{item.message}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay sincronizaciones realizadas</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
