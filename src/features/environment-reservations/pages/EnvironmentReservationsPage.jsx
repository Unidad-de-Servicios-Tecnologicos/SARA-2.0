import { useState } from 'react'
import { Camera, Plus, Trash2, Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/card'
import { showToast, showAlert } from '@/shared/notifications'

export default function EnvironmentReservationsPage() {
  const [qrInput, setQrInput] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState(null)
  const [reservations, setReservations] = useState([])
  const [showQRReader, setShowQRReader] = useState(false)
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    purpose: ''
  })

  // Mock QR codes
  const qrCodes = {
    'QR-101-CESGE': {
      id: '101',
      name: 'Aula 101',
      sede: 'CESGE',
      capacity: 30,
      type: 'Aula'
    },
    'QR-401-CESGE': {
      id: '401',
      name: 'Laboratorio 401',
      sede: 'CESGE',
      capacity: 25,
      type: 'Laboratorio'
    },
    'QR-201-IUSH': {
      id: '201',
      name: 'Aula 201',
      sede: 'IUSH',
      capacity: 35,
      type: 'Aula'
    }
  }

  const mockReservations = [
    {
      id: 1,
      environment: 'Aula 101',
      sede: 'CESGE',
      date: '2025-01-22',
      startTime: '08:00',
      endTime: '10:00',
      purpose: 'Clase de Administración Empresarial',
      instructor: 'Miguel Ángel Castaño',
      status: 'CONFIRMADA'
    },
    {
      id: 2,
      environment: 'Laboratorio 401',
      sede: 'CESGE',
      date: '2025-01-22',
      startTime: '14:00',
      endTime: '16:00',
      purpose: 'Práctica de Sistemas',
      instructor: 'Laura García López',
      status: 'PENDIENTE'
    }
  ]

  const handleQRRead = () => {
    // Simular lectura de QR
    if (qrInput && qrCodes[qrInput]) {
      setSelectedEnvironment(qrCodes[qrInput])
      setShowQRReader(false)
      setQrInput('')
      showToast.success('Código QR reconocido')
    } else {
      showAlert.warning('QR no reconocido. Intenta con: QR-101-CESGE, QR-401-CESGE o QR-201-IUSH')
    }
  }

  const handleSaveReservation = () => {
    if (!selectedEnvironment || !formData.startTime || !formData.endTime || !formData.purpose) {
      showAlert.warning('Por favor completa todos los campos')
      return
    }

    const newReservation = {
      id: reservations.length + 1,
      environment: selectedEnvironment.name,
      sede: selectedEnvironment.sede,
      date: new Date().toISOString().split('T')[0],
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      instructor: 'Usuario Actual',
      status: 'PENDIENTE'
    }

    setReservations([...reservations, newReservation])
    setSelectedEnvironment(null)
    setFormData({ startTime: '', endTime: '', purpose: '' })
    showToast.success('Reserva guardada correctamente')
  }

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter(r => r.id !== id))
  }

  const allReservations = [...mockReservations, ...reservations]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reserva de Ambientes</h1>
        <p className="text-slate-600 dark:text-gray-400">Escanea códigos QR para reservar espacios de formación</p>
      </div>

      {/* Panel de Escaneo QR */}
        <Card className="mb-6 p-6 bg-white">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Escanear Código QR</h2>
          
          {!showQRReader && !selectedEnvironment && (
            <div className="text-center py-8">
              <Button
                onClick={() => setShowQRReader(true)}
                size="lg"
                className="flex items-center gap-2 mx-auto"
              >
                <Camera className="w-5 h-5" />
                Leer QR
              </Button>
              <p className="text-sm text-slate-600 mt-4">O ingresa el código manualmente</p>
            </div>
          )}

          {showQRReader && (
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg border-2 border-dashed border-slate-300">
                <p className="text-center text-slate-600 py-12">
                  📷 Cámara del dispositivo se activaría aquí
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="O ingresa el código QR manualmente"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQRRead()}
                />
                <Button onClick={handleQRRead}>Procesar</Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowQRReader(false)}
                className="w-full"
              >
                Cerrar Cámara
              </Button>
            </div>
          )}

          {/* Ambiente Seleccionado */}
          {selectedEnvironment && (
            <div className="space-y-4 border-t border-slate-200 pt-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 mb-2">Ambiente Seleccionado</p>
                <p className="text-lg font-semibold text-slate-900">{selectedEnvironment.name}</p>
                <p className="text-sm text-slate-600">
                  {selectedEnvironment.sede} | Capacidad: {selectedEnvironment.capacity} personas
                </p>
              </div>

              {/* Formulario de Reserva */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hora de Inicio</label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hora de Finalización</label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Propósito de la Reserva</label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    placeholder="Describe el propósito de la reserva"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveReservation}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Guardar Reserva
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedEnvironment(null)
                    setFormData({ startTime: '', endTime: '', purpose: '' })
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Reservas Activas */}
        <Card className="bg-white">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Mis Reservas</h2>
            <p className="text-sm text-slate-600">Total: {allReservations.length} reservas</p>
          </div>

          {allReservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Ambiente</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Sede</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fecha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Hora</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Propósito</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Instructor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {allReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{reservation.environment}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.sede}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {reservation.startTime} - {reservation.endTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.purpose}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.instructor}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.status === 'CONFIRMADA' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reservation.status === 'CONFIRMADA' ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {!mockReservations.find(r => r.id === reservation.id) && (
                          <button
                            onClick={() => handleDeleteReservation(reservation.id)}
                            className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-600">
              No hay reservas registradas
            </div>
          )}
        </Card>
    </div>
  )
}
