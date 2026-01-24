import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Plus, Search, Edit2, Trash2, Download, Upload, FolderOpen, File, Users } from 'lucide-react';
import { useTeams, useTeamById, useTeamFiles } from '../hooks/useTeams';
import { showToast, showAlert } from '@/shared/notifications';

export default function TeamsPage() {
  const { teams, loading: teamsLoading, error: teamsError, fetchTeams, deleteTeam } = useTeams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [activeTab, setActiveTab] = useState('teams');

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleDelete = async (teamId) => {
    showAlert.confirmDelete('¿Está seguro que desea eliminar este equipo?').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTeam(teamId);
          showToast.success('Equipo eliminado');
        } catch (err) {
          console.error('Error al eliminar:', err);
          showToast.error('Error al eliminar el equipo');
        }
      }
    });
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      console.log('Búsqueda:', searchTerm);
      showToast.info('Buscando equipos...');
    } else {
      showAlert.warning('Por favor ingresa un término de búsqueda');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Equipos y Archivos</h1>
        <p className="text-gray-600 mt-2">Gestión de equipos, miembros y almacenamiento colaborativo</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teams">Equipos</TabsTrigger>
          <TabsTrigger value="files">Archivos</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Equipos</CardTitle>
                  <CardDescription>Gestione los equipos de trabajo por curso</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Equipo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar equipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {teamsLoading && <p>Cargando equipos...</p>}
              {teamsError && <p className="text-red-500">{teamsError}</p>}

              <div className="space-y-3">
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <div
                      key={team.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => {
                        setSelectedTeamId(team.id);
                        setActiveTab('files');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {team.name}
                          </p>
                          <p className="text-sm text-gray-600">{team.description}</p>
                          <div className="mt-2 flex gap-2">
                            <Badge variant="outline">{team.memberCount || 0} miembros</Badge>
                            <Badge variant="secondary">{team.courseCode}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(team.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No hay equipos registrados</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          {selectedTeamId ? (
            <TeamFilesContent teamId={selectedTeamId} />
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Seleccione un equipo para ver sus archivos</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TeamFilesContent({ teamId }) {
  const { team, members, loading: teamLoading, fetchTeam } = useTeamById(teamId);
  const { files, folderPath, storageInfo, uploadFile, downloadFile, deleteFile } = useTeamFiles(teamId);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadFile(file);
    } catch (err) {
      console.error('Error al subir archivo:', err);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      // Aquí iríamos a llamar createFolder del hook
      setFolderName('');
      setShowCreateFolder(false);
    } catch (err) {
      console.error('Error al crear carpeta:', err);
    }
  };

  if (teamLoading) return <p>Cargando...</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">{team?.name}</CardTitle>
          <CardDescription>Gestione archivos y carpetas del equipo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {storageInfo && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm">
                Almacenamiento usado: <strong>{storageInfo.usedStorage}</strong> de{' '}
                <strong>{storageInfo.totalQuota}</strong>
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(storageInfo.usedStorage / storageInfo.totalQuota) * 100}%`
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <label className="cursor-pointer flex-1">
              <input type="file" onChange={handleFileUpload} className="hidden" />
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Subir Archivo
              </Button>
            </label>
            <Button
              variant="outline"
              onClick={() => setShowCreateFolder(!showCreateFolder)}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Nueva Carpeta
            </Button>
          </div>

          {showCreateFolder && (
            <div className="flex gap-2 p-3 bg-gray-50 rounded-lg">
              <Input
                placeholder="Nombre de la carpeta..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <Button onClick={handleCreateFolder} size="sm">
                Crear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowCreateFolder(false);
                  setFolderName('');
                }}
              >
                Cancelar
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600">Ruta: {folderPath}</p>
            {files && files.length > 0 ? (
              files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {file.type === 'folder' ? (
                      <FolderOpen className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <File className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {file.type === 'folder'
                          ? 'Carpeta'
                          : `${(file.size / 1024).toFixed(2)} KB`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {file.type === 'file' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(file.id, file.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">Carpeta vacía</p>
            )}
          </div>
        </CardContent>
      </Card>

      {members && members.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Users className="h-5 w-5" />
              Miembros del Equipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.userId} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                  <Badge>{member.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
