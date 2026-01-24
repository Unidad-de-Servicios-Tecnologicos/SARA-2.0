import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Settings, BookOpen, FileText, Shield, Zap, History, Check } from 'lucide-react';
import { showToast, showAlert } from '@/shared/notifications';

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState('');

  const showSuccess = (message) => {
    setSaveSuccess(message);
    showToast.success('Configuración actualizada exitosamente');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración del Sistema</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Administre parámetros, reglas y configuraciones</p>
          </div>
        </div>
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs">Acceso: Administrador del Sistema</Badge>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3 text-green-700 dark:text-green-300">
          <Check className="h-5 w-5" />
          <span className="font-medium text-sm">{saveSuccess}</span>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 border dark:border-gray-700">
          <TabsTrigger value="general" className="rounded-md flex gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">General</span>
          </TabsTrigger>
          <TabsTrigger value="academic" className="rounded-md flex gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Académica</span>
          </TabsTrigger>
          <TabsTrigger value="rules" className="rounded-md flex gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Reglas</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="rounded-md flex gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-md flex gap-1">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Integraciones</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="rounded-md flex gap-1">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Auditoría</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <ConfigGeneralTab onSave={showSuccess} />
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <ConfigAcademicTab onSave={showSuccess} />
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <ConfigRulesTab onSave={showSuccess} />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <ConfigRolesTab onSave={showSuccess} />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <ConfigIntegrationsTab onSave={showSuccess} />
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <ConfigAuditTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ConfigGeneralTab({ onSave }) {
  const [config, setConfig] = useState({
    institutionName: 'Centro de Servicios y Gestión Empresarial - SENA',
    academicPeriod: '2026-1',
    startDate: '2026-01-15',
    endDate: '2026-06-30',
  });

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!config.institutionName || !config.academicPeriod) {
      showAlert.warning('Campos incompletos', 'Por favor completa los campos obligatorios');
      return;
    }
    onSave('✓ Configuración General actualizada');
    showToast.success('Configuración General guardada');
  };

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Configuración General
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Nombre Institucional</label>
          <input
            type="text"
            value={config.institutionName}
            onChange={(e) => handleChange('institutionName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Período Académico</label>
          <input
            type="text"
            value={config.academicPeriod}
            onChange={(e) => handleChange('academicPeriod', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Fecha Inicio</label>
            <input
              type="date"
              value={config.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Fecha Cierre</label>
            <input
              type="date"
              value={config.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
          <button className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
            Cancelar
          </button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-sm">
            💾 Guardar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfigAcademicTab({ onSave }) {
  const [catalogs, setCatalogs] = useState({
    programTypes: ['Técnico', 'Tecnólogo', 'Profesional'],
    modalities: ['Presencial', 'Virtual', 'Mixta'],
  });

  const [selectedCatalog, setSelectedCatalog] = useState('programTypes');
  const [newValue, setNewValue] = useState('');

  const handleAddValue = () => {
    if (!newValue.trim()) {
      showAlert.warning('Campo vacío', 'Por favor ingresa un valor');
      return;
    }
    setCatalogs(prev => ({
      ...prev,
      [selectedCatalog]: [...prev[selectedCatalog], newValue],
    }));
    setNewValue('');
    showToast.success('Valor agregado exitosamente');
  };

  const handleRemoveValue = (index) => {
    setCatalogs(prev => ({
      ...prev,
      [selectedCatalog]: prev[selectedCatalog].filter((_, i) => i !== index),
    }));
    showToast.success('Valor eliminado exitosamente');
  };

  const handleSave = () => {
    onSave('✓ Catálogos Académicos actualizados');
    showToast.success('Catálogos guardados exitosamente');
  };

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="bg-linear-to-r from-emerald-50 to-green-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Configuración Académica
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Catálogo</label>
          <select
            value={selectedCatalog}
            onChange={(e) => setSelectedCatalog(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm"
          >
            <option value="programTypes">Tipos de Programas</option>
            <option value="modalities">Modalidades de Formación</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">Valores:</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {catalogs[selectedCatalog].map((value, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-900 dark:text-gray-100">{value}</span>
                <button onClick={() => handleRemoveValue(index)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs font-medium">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Nuevo valor"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm"
            />
            <button onClick={handleAddValue} className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg text-sm whitespace-nowrap hover:bg-emerald-700">
              Agregar
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
          <button className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancelar
          </button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg text-sm hover:bg-emerald-700">
            💾 Guardar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfigRulesTab({ onSave }) {
  const [rules, setRules] = useState({
    minGrade: 3.0,
    minAttendance: 80,
    maxAbsences: 5,
  });

  const handleChange = (field, value) => {
    setRules(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const handleSave = () => {
    if (rules.minGrade < 0 || rules.minAttendance < 0 || rules.maxAbsences < 0) {
      showAlert.warning('Valores inválidos', 'Los valores no pueden ser negativos');
      return;
    }
    if (rules.minAttendance > 100) {
      showAlert.warning('Valor fuera de rango', 'La asistencia mínima no puede ser mayor al 100%');
      return;
    }
    onSave('✓ Reglas de Negocio actualizadas');
    showToast.success('Reglas guardadas exitosamente');
  };

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="bg-linear-to-r from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          Reglas de Negocio
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Calificación Mínima</label>
            <input
              type="number"
              step="0.1"
              value={rules.minGrade}
              onChange={(e) => handleChange('minGrade', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Asistencia Mínima (%)</label>
            <input
              type="number"
              value={rules.minAttendance}
              onChange={(e) => handleChange('minAttendance', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Máximo de Inasistencias</label>
          <input
            type="number"
            value={rules.maxAbsences}
            onChange={(e) => handleChange('maxAbsences', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
          <button className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancelar
          </button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg text-sm hover:bg-orange-700">
            💾 Guardar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfigRolesTab({ onSave }) {
  const [roles, setRoles] = useState({
    admin: true,
    coordinator: true,
    instructor: true,
    learner: true,
  });

  const handleToggle = (role) => {
    setRoles(prev => ({ ...prev, [role]: !prev[role] }));
  };

  const handleSave = () => {
    onSave('✓ Roles y Permisos actualizados');
    showToast.success('Roles y permisos guardados exitosamente');
  };

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Gestión de Roles
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {Object.entries(roles).map(([role, active]) => (
          <div key={role} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 capitalize">{role}</span>
            <button
              onClick={() => handleToggle(role)}
              className={`px-3 py-1 rounded-lg font-medium text-xs ${
                active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}
            >
              {active ? 'Activo' : 'Inactivo'}
            </button>
          </div>
        ))}

        <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
          <button className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancelar
          </button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg text-sm hover:bg-purple-700">
            💾 Guardar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfigIntegrationsTab({ onSave }) {
  const [integrations, setIntegrations] = useState({
    sofia: { active: true, url: 'https://sofia.sena.edu.co/api' },
    gemini: { active: false, url: '' },
  });

  const handleToggle = (key) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active },
    }));
  };

  const handleSave = () => {
    onSave('✓ Integraciones actualizadas');
    showToast.success('Integraciones guardadas exitosamente');
  };

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="bg-linear-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          Configuración de Integraciones
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {Object.entries(integrations).map(([key, config]) => (
          <div key={key} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{key === 'sofia' ? 'SOFIA Plus' : 'Google Gemini'}</span>
              <button
                onClick={() => handleToggle(key)}
                className={`px-3 py-1 rounded-lg font-medium text-xs ${
                  config.active ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}
              >
                {config.active ? 'Desactivar' : 'Activar'}
              </button>
            </div>
            {config.active && (
              <input
                type="url"
                value={config.url}
                className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded text-xs"
              />
            )}
          </div>
        ))}

        <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
          <button className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancelar
          </button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-cyan-600 text-white font-medium rounded-lg text-sm hover:bg-cyan-700">
            💾 Guardar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfigAuditTab() {
  const logs = [
    { id: 1, user: 'admin@sena.edu.co', action: 'Actualizar', field: 'Período', oldValue: '2025-2', newValue: '2026-1', date: '24/01/2026' },
    { id: 2, user: 'coordinator@sena.edu.co', action: 'Agregar', field: 'Tipo Curso', oldValue: '-', newValue: 'Especialización', date: '24/01/2026' },
  ];

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="bg-linear-to-r from-slate-50 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <History className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          Auditoría y Control de Cambios
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto text-xs">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-gray-100">Usuario</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-gray-100">Acción</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-gray-100">Campo</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-gray-100">Anterior</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-gray-100">Nuevo</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-gray-100">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="py-2 px-2 text-gray-900 dark:text-gray-100">{log.user}</td>
                  <td className="py-2 px-2 text-gray-900 dark:text-gray-100">{log.action}</td>
                  <td className="py-2 px-2 text-gray-900 dark:text-gray-100">{log.field}</td>
                  <td className="py-2 px-2"><code className="bg-red-50 dark:bg-red-900/30 px-1 rounded text-red-700 dark:text-red-300">{log.oldValue}</code></td>
                  <td className="py-2 px-2"><code className="bg-green-50 dark:bg-green-900/30 px-1 rounded text-green-700 dark:text-green-300">{log.newValue}</code></td>
                  <td className="py-2 px-2 text-gray-600 dark:text-gray-400">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
