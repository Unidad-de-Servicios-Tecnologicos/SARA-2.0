import { Eye, Building2, User, Calendar, History } from 'lucide-react'
import { DetailModal } from '@/components/ui/DetailModal'

/* =======================
   COMPONENTE MODAL
======================= */
export function PracticeDetailModal({
  open,
  onOpenChange,
  practice,
  onEdit,
  onDownload
}) {
  if (!practice) return null

  /* =======================
     CONFIGURACIÓN DE TABS
  ======================= */
  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      data={practice}
      avatar={{
        initials: practice.learnerName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        color: 'from-green-500 to-emerald-600'
      }}
      badges={[
        { label: practice.estado, variant: practice.estado === 'Completada' ? 'success' : 'warning' },
        { label: practice.tipo, variant: 'info' }
      ]}
      tabs={[
        {
          id: 'general',
          label: 'General',
          icon: <Eye className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información de Práctica</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Aprendiz</p>
                    <p className="font-semibold text-slate-900">{practice.learnerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Documento</p>
                    <p className="font-semibold text-slate-900">{practice.learnerDocument}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Ficha</p>
                    <p className="font-semibold text-slate-900">{practice.fichaId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Programa</p>
                    <p className="font-semibold text-slate-900">{practice.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Tipo Práctica</p>
                    <p className="font-semibold text-slate-900">{practice.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Estado</p>
                    <p className={`font-semibold ${
                      practice.estado === 'Completada' ? 'text-green-600' :
                      practice.estado === 'En Proceso' ? 'text-blue-600' : 'text-slate-600'
                    }`}>
                      {practice.estado}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'empresa',
          label: 'Empresa',
          icon: <Building2 className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información de la Empresa</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Empresa</p>
                    <p className="font-semibold text-slate-900">{practice.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">NIT</p>
                    <p className="font-semibold text-slate-900">{practice.companyNIT}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Dirección</p>
                    <p className="font-semibold text-slate-900">{practice.companyAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Teléfono</p>
                    <p className="font-semibold text-slate-900">{practice.companyPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Contacto</p>
                    <p className="font-semibold text-slate-900">{practice.companyContact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="font-semibold text-slate-900">{practice.companyEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'supervisor',
          label: 'Supervisor',
          icon: <User className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información del Supervisor</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Nombre</p>
                    <p className="font-semibold text-slate-900">{practice.supervisorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cargo</p>
                    <p className="font-semibold text-slate-900">{practice.supervisorPosition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="font-semibold text-slate-900">{practice.supervisorEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Teléfono</p>
                    <p className="font-semibold text-slate-900">{practice.supervisorPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'cronograma',
          label: 'Cronograma',
          icon: <Calendar className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Fechas de Práctica</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Inicio</p>
                    <p className="font-semibold text-slate-900">{practice.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Finalización</p>
                    <p className="font-semibold text-slate-900">{practice.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Duración (horas)</p>
                    <p className="font-semibold text-slate-900">{practice.totalHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Horas Completadas</p>
                    <p className="font-semibold text-slate-900">{practice.completedHours}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'historial',
          label: 'Historial',
          icon: <History className="w-4 h-4" />,
          content: (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Historial de Cambios</h3>
              <div className="space-y-3">
                {practice.historial?.map((hist, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-l-2 border-green-300 pl-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 -ml-5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-2">{hist.fecha}</p>
                      <p className="font-medium text-slate-900">{hist.evento}</p>
                      <p className="text-sm text-slate-600 mt-1">Por: {hist.usuario}</p>
                    </div>
                  </div>
                )) || <p className="text-slate-600">Sin historial</p>}
              </div>
            </div>
          )
        }
      ]}
      onEdit={onEdit}
      onDownload={onDownload}
    />
  )
}

export default PracticeDetailModal
