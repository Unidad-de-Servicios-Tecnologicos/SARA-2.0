import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useCourses } from '../hooks/useCourses';
import { courseService } from '../services/courseService';
import { Search, Plus, Download, Edit, Trash2, Check, X } from 'lucide-react';
import { showToast, showAlert } from '@/shared/notifications';
import { downloadExcel } from '@/utils/downloadExcel';

export function CoursesPage() {
  const { courses, loading, error, deleteCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      showAlert.warning('Campo vacío', 'Por favor ingresa un término de búsqueda');
      return;
    }
    try {
      showToast.loading('Buscando cursos...');
      const results = await courseService.searchCourses(searchTerm);
      console.log('Search results:', results);
      showToast.success('Búsqueda completada');
    } catch (error) {
      console.error('Search error:', error);
      showToast.error('Error al buscar cursos');
    }
  };

  const handleDownloadSchedule = async (courseId) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        showAlert.warning('No encontrado', 'No se encontró el curso');
        return;
      }

      const toastId = showToast.loading('Descargando horario...');
      const blob = await courseService.downloadCourseSchedule(courseId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `horario_${course.code}_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      showToast.dismiss(toastId);
      showToast.success('Horario descargado exitosamente');
    } catch (error) {
      console.error('Download error:', error);
      showToast.error('Error al descargar el horario');
    }
  };

  const handleDownloadStudents = async (courseId) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        showAlert.warning('No encontrado', 'No se encontró el curso');
        return;
      }

      const toastId = showToast.loading('Descargando lista de estudiantes...');
      const studentData = await courseService.getStudentsByCourse(courseId);
      
      if (!studentData || studentData.length === 0) {
        showAlert.info('Sin datos', 'No hay estudiantes en este curso');
        showToast.dismiss(toastId);
        return;
      }

      const columns = [
        { key: 'document', label: 'Documento' },
        { key: 'firstName', label: 'Nombre' },
        { key: 'lastName', label: 'Apellido' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Teléfono' },
        { key: 'enrollmentDate', label: 'Fecha Inscripción' }
      ];

      downloadExcel(
        studentData,
        columns,
        `Estudiantes - ${course.name}`,
        `estudiantes_${course.code}_${new Date().toISOString().split('T')[0]}`,
        {
          subtitulo: `Curso: ${course.code}`,
          fecha: new Date().toLocaleDateString('es-CO')
        }
      );

      showToast.dismiss(toastId);
      showToast.success(`Descargado ${studentData.length} estudiantes`);
    } catch (error) {
      console.error('Download error:', error);
      showToast.error('Error al descargar la lista de estudiantes');
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Gestión de Cursos</h2>
          <p className="text-muted-foreground dark:text-gray-400">Administra todos los cursos del sistema</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Curso
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar curso por código o nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Cursos List */}
      <div className="grid gap-4">
        {loading && <div className="text-center py-8">Cargando cursos...</div>}
        {error && <div className="text-red-500 py-8">{error}</div>}

        {courses.length === 0 && !loading && (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No hay cursos registrados. Crea uno nuevo para comenzar.
            </CardContent>
          </Card>
        )}

        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-gray-900 dark:text-white">{course.name}</CardTitle>
                <CardDescription>{course.code}</CardDescription>
              </div>
              <Badge>{course.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Programa:</span>
                  <p className="font-medium">{course.program}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Estudiantes:</span>
                  <p className="font-medium">{course.studentCount || 0}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadSchedule(course.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Horario
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadStudents(course.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Estudiantes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => {
                    showAlert.confirmDelete('curso').then((result) => {
                      if (result.isConfirmed) {
                        deleteCourse(course.id);
                        showToast.success('Curso eliminado exitosamente');
                      }
                    });
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
