import { Eye, MapPin, Users, FileText, History } from 'lucide-react'
import { DetailModal } from '@/components/ui/DetailModal'

/* =======================
   COMPONENTE MODAL
======================= */
export function CompanyDetailModal({
  open,
  onOpenChange,
  company,
  onEdit,
  onDownload
}) {
  if (!company) return null

  /* =======================
     CONFIGURACIÓN DE TABS
  ======================= */
  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      data={company}
      avatar={{
        initials: company.name
          .split(' ')
          .slice(0, 2)
          .map(w => w[0])
          .join('')
          .toUpperCase(),
        color: 'from-orange-500 to-red-600'
      }}
      badges={[
        { label: company.estado === 'Activa' ? 'Activa' : 'Inactiva', variant: company.estado === 'Activa' ? 'success' : 'warning' },
        { label: company.sector, variant: 'info' }
      ]}
      tabs={[
        {
          id: 'informacion',
          label: 'Información',
          icon: <Eye className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Datos de la Empresa</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Nombre</p>
                    <p className="font-semibold text-slate-900">{company.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">NIT</p>
                    <p className="font-semibold text-slate-900">{company.nit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Sector</p>
                    <p className="font-semibold text-slate-900">{company.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Tamaño</p>
                    <p className="font-semibold text-slate-900">{company.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="font-semibold text-slate-900">{company.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Teléfono</p>
                    <p className="font-semibold text-slate-900">{company.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'ubicacion',
          label: 'Ubicación',
          icon: <MapPin className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Dirección</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Dirección</p>
                    <p className="font-semibold text-slate-900">{company.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Ciudad</p>
                    <p className="font-semibold text-slate-900">{company.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Departamento</p>
                    <p className="font-semibold text-slate-900">{company.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Código Postal</p>
                    <p className="font-semibold text-slate-900">{company.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'contacto',
          label: 'Contacto Principal',
          icon: <Users className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Contacto Principal</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Nombre</p>
                    <p className="font-semibold text-slate-900">{company.contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cargo</p>
                    <p className="font-semibold text-slate-900">{company.contactPosition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="font-semibold text-slate-900">{company.contactEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Teléfono</p>
                    <p className="font-semibold text-slate-900">{company.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'practicas',
          label: 'Prácticas',
          icon: <FileText className="w-4 h-4" />,
          content: (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Prácticas en Curso</h3>
              <div className="space-y-3">
                {company.activePractices?.map((practice) => (
                  <div key={practice.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-slate-900">{practice.learnerName}</p>
                        <p className="text-sm text-slate-600">Documento: {practice.learnerDocument}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        practice.estado === 'En Proceso' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {practice.estado}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Inicio</p>
                        <p className="font-medium text-slate-900">{practice.startDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Finalización</p>
                        <p className="font-medium text-slate-900">{practice.endDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Horas</p>
                        <p className="font-medium text-slate-900">{practice.hours}</p>
                      </div>
                    </div>
                  </div>
                )) || <p className="text-slate-600">Sin prácticas activas</p>}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Registro de Cambios</h3>
              <div className="space-y-3">
                {company.changeLog?.map((log, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-l-2 border-orange-300 pl-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 -ml-5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-2">{log.date}</p>
                      <p className="font-medium text-slate-900">{log.change}</p>
                      <p className="text-sm text-slate-600 mt-1">Por: {log.user}</p>
                    </div>
                  </div>
                )) || <p className="text-slate-600">Sin cambios registrados</p>}
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

export default CompanyDetailModal
