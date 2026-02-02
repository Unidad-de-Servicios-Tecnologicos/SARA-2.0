import { useState } from 'react'
import { Plus, Eye, Pencil, Ban, QrCode, Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import RegisterReservationModal from '@/features/environment-reservations/components/RegisterReservationModal'
import EditReservationModal from '@/features/environment-reservations/components/EditReservationModal'
import ViewReservationModal from '@/features/environment-reservations/components/ViewReservationModal'
import CancelReservationModal from '@/features/environment-reservations/components/CancelReservationModal'
import QRUsageModal from '@/features/environment-reservations/components/QRUsageModal'
import { EnvironmentReservationsService } from '@/features/environment-reservations/services/EnvironmentReservationsService'

export default function EnvironmentReservationsPage() {
  const [viewMode, setViewMode] = useState('ambiente') // ambiente | instructor | ficha

  const initialReservations = EnvironmentReservationsService.getReservations()

  const [reservations, setReservations] = useState(initialReservations)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [isQROpen, setIsQROpen] = useState(false)

  const handleCreateReservation = (data) => {
    const nextId = reservations.length ? Math.max(...reservations.map((r) => r.id)) + 1 : 1
    const nueva = {
      id: nextId,
      ...data,
    }
    setReservations((prev) => [...prev, nueva])
  }

  const handleUpdateReservation = (updated) => {
    setReservations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
  }

  const handleCancelReservation = (cancelData) => {
    if (!selectedReservation) return
    setReservations((prev) =>
      prev.map((r) =>
        r.id === selectedReservation.id
          ? { ...r, estado: 'CANCELADA', observacion: cancelData.observacion, motivoCancelacion: cancelData.motivo }
          : r,
      ),
    )
  }

  const handleConfirmUsage = (usageData) => {
    if (!selectedReservation) return
    setReservations((prev) =>
      prev.map((r) =>
        r.id === selectedReservation.id
          ? { ...r, estado: 'UTILIZADA', observacionUso: usageData.observacion }
          : r,
      ),
    )
  }

  const filteredReservations = [...reservations].sort((a, b) => {
    if (viewMode === 'ambiente') return a.ambiente.localeCompare(b.ambiente)
    if (viewMode === 'instructor') return a.instructor.localeCompare(b.instructor)
    if (viewMode === 'ficha') return a.ficha.localeCompare(b.ficha)
    return 0
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reserva de Ambientes</h1>
        <p className="text-slate-600 dark:text-gray-400">
          Gestión académica de reservas de ambientes. La creación, edición y cancelación se realiza mediante modales.
        </p>
      </div>
      {/* Barra de acciones y vista */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => setViewMode('ambiente')}
            className={`px-4 py-2 text-sm font-medium ${
              viewMode === 'ambiente'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Por ambiente
          </button>
          <button
            type="button"
            onClick={() => setViewMode('instructor')}
            className={`px-4 py-2 text-sm font-medium border-l border-slate-200 ${
              viewMode === 'instructor'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Por instructor
          </button>
          <button
            type="button"
            onClick={() => setViewMode('ficha')}
            className={`px-4 py-2 text-sm font-medium border-l border-slate-200 ${
              viewMode === 'ficha'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Por ficha
          </button>
        </div>

        <Button
          onClick={() => setIsRegisterOpen(true)}
          className="inline-flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Registrar reserva
        </Button>
      </div>

      {/* Reservas */}
        <Card className="bg-white">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Mis Reservas</h2>
            <p className="text-sm text-slate-600">Total: {filteredReservations.length} reservas</p>
          </div>

          {filteredReservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Ficha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Instructor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Ambiente</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fecha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Hora</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Competencia</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">RAP</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{reservation.ficha}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.instructor}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.ambiente}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.fecha}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {reservation.horaInicio} - {reservation.horaFin}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.competencia}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{reservation.rap}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.estado === 'CONFIRMADA'
                            ? 'bg-green-100 text-green-800'
                            : reservation.estado === 'CANCELADA'
                            ? 'bg-red-100 text-red-800'
                            : reservation.estado === 'UTILIZADA'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reservation.estado === 'CONFIRMADA' && <Check className="w-3 h-3" />}
                          {reservation.estado === 'PENDIENTE' && <Clock className="w-3 h-3" />}
                          {reservation.estado === 'CANCELADA' && <Ban className="w-3 h-3" />}
                          {reservation.estado === 'UTILIZADA' && <Check className="w-3 h-3" />}
                          {reservation.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedReservation(reservation)
                              setIsViewOpen(true)
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-md transition text-slate-700"
                            title="Ver detalle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedReservation(reservation)
                              setIsEditOpen(true)
                            }}
                            className="p-1.5 hover:bg-blue-100 rounded-md transition text-blue-600"
                            title="Editar reserva"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedReservation(reservation)
                              setIsCancelOpen(true)
                            }}
                            className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600"
                            title="Cancelar / liberar reserva"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedReservation(reservation)
                              setIsQROpen(true)
                            }}
                            className="p-1.5 hover:bg-emerald-100 rounded-md transition text-emerald-600"
                            title="Registro de uso por QR"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                        </div>
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

        {/* Modales oficiales del módulo */}
        <RegisterReservationModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSave={handleCreateReservation}
          existingReservations={reservations}
        />

        <EditReservationModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          reservation={selectedReservation}
          onSave={handleUpdateReservation}
          existingReservations={reservations}
        />

        <ViewReservationModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          reservation={selectedReservation}
        />

        <CancelReservationModal
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          reservation={selectedReservation}
          onConfirm={handleCancelReservation}
        />

        <QRUsageModal
          isOpen={isQROpen}
          onClose={() => setIsQROpen(false)}
          reservation={selectedReservation}
          onConfirm={handleConfirmUsage}
        />
    </div>
  )
}
