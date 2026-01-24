import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { reservationService } from '../services/reservationService';
import { Calendar, MapPin, Clock, User, Download, Plus, Trash2 } from 'lucide-react';
import { showToast, showAlert } from '@/shared/notifications';
import { downloadExcel } from '@/utils/downloadExcel';

export function ReservationAmbientePage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleFetchReservations = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (selectedDate) filters.date = selectedDate;
      if (selectedEnvironment) filters.environmentId = selectedEnvironment;

      const data = await reservationService.getAllReservations(filters);
      setReservations(data);
      showToast.success('Reservas cargadas exitosamente');
    } catch (error) {
      console.error('Error fetching reservations:', error);
      showToast.error('Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    showAlert.confirmDelete('¿Está seguro de que desea eliminar esta reserva?').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await reservationService.deleteReservation(reservationId);
          setReservations(reservations.filter((r) => r.id !== reservationId));
          showToast.success('Reserva eliminada');
        } catch (error) {
          console.error('Error deleting reservation:', error);
          showToast.error('Error al eliminar la reserva');
        }
      }
    });
  };

  const handleExport = async () => {
    if (reservations.length === 0) {
      showAlert.warning('No hay datos', 'No hay reservas para exportar');
      return;
    }

    const toastId = showToast.loading('Exportando reservas...');
    try {
      const columns = [
        { key: 'id', label: 'ID' },
        { key: 'environmentName', label: 'Ambiente' },
        { key: 'date', label: 'Fecha' },
        { key: 'startTime', label: 'Inicio' },
        { key: 'endTime', label: 'Fin' },
        { key: 'requestedBy', label: 'Solicitante' },
        { key: 'status', label: 'Estado' }
      ];

      downloadExcel(
        reservations.map(r => ({
          ...r,
          environmentName: r.environment?.name || 'N/A',
          requestedBy: r.requester?.name || 'N/A'
        })),
        columns,
        'Reporte de Reservas de Ambientes',
        `reservas_${new Date().toISOString().split('T')[0]}`,
        {
          subtitulo: 'Información detallada de las reservas de espacios',
          rowClassName: (row) => 
            row.status === 'confirmed' ? 'bg-green-50' : 
            row.status === 'pending' ? 'bg-yellow-50' : 
            'bg-red-50'
        }
      );

      showToast.dismiss(toastId);
      showToast.success(`Se descargó el archivo con ${reservations.length} reservas`);
    } catch (error) {
      console.error('Error exporting:', error);
      showToast.dismiss(toastId);
      showToast.error('Error al exportar las reservas');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reserva de Ambientes</h2>
          <p className="text-muted-foreground">Gestiona las reservas de espacios de formación</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Reserva
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Fecha</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Ambiente</label>
              <Input
                placeholder="Buscar ambiente..."
                value={selectedEnvironment}
                onChange={(e) => setSelectedEnvironment(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleFetchReservations} className="w-full">
                Buscar Reservas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservas List */}
      <div className="space-y-4">
        {loading && <div className="text-center py-8">Cargando reservas...</div>}

        {reservations.length === 0 && !loading && (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No hay reservas disponibles. Crea una nueva para comenzar.
            </CardContent>
          </Card>
        )}

        {reservations.map((reservation) => (
          <Card key={reservation.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <MapPin className="h-4 w-4" />
                  {reservation.environment}
                </CardTitle>
                <CardDescription>Reserva ID: {reservation.id}</CardDescription>
              </div>
              <Badge className={getStatusColor(reservation.status)}>
                {reservation.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Fecha
                  </span>
                  <p className="font-medium">{reservation.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Hora
                  </span>
                  <p className="font-medium">
                    {reservation.startTime} - {reservation.endTime}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Solicitante
                  </span>
                  <p className="font-medium">{reservation.requester}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Asunto</span>
                  <p className="font-medium">{reservation.subject}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => handleDeleteReservation(reservation.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
