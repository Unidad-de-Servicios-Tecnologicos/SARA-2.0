import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Eye, Download, Phone, Mail, MapPin, Briefcase, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/Input'
import { showToast, showAlert } from '@/shared/notifications'
import { downloadReport } from '@/utils/downloadReports'

export default function CompaniesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([
    {
      id: 1,
      nit: '860000000-1',
      name: 'GRUPO EMPRESARIAL NACIONAL S.A.',
      address: 'Carrera 7 #45-89, Bogotá',
      city: 'Bogotá',
      phone: '(1) 2500100',
      email: 'contacto@grupoempresarial.com.co',
      sector: 'Servicios Financieros',
      contact: 'Diana Martínez',
      capacity: 25,
      description: 'Empresa líder en servicios financieros y consultoría empresarial',
      active: true
    },
    {
      id: 2,
      nit: '800200314-2',
      name: 'SOLUCIONES TECNOLÓGICAS INNOVARE',
      address: 'Avenida Calle 100 #12-50, Bogotá',
      city: 'Bogotá',
      phone: '(1) 5520500',
      email: 'info@innovare.co',
      sector: 'Tecnología',
      contact: 'Carlos Rodríguez',
      capacity: 30,
      description: 'Desarrollo de software y soluciones tecnológicas empresariales',
      active: true
    },
    {
      id: 3,
      nit: '890820000-3',
      name: 'INDUSTRIAS MANUFACTURERAS BOGOTÁ',
      address: 'Cra. 15 #95-30, Bogotá',
      city: 'Bogotá',
      phone: '(1) 6340020',
      email: 'rrhh@indusmanu.com',
      sector: 'Manufactura',
      contact: 'Patricia González',
      capacity: 40,
      description: 'Producción de productos manufacturados de alta calidad',
      active: true
    },
    {
      id: 4,
      nit: '802003001-1',
      name: 'CONSULTORES EMPRESARIALES LTDA',
      address: 'Calle 82 #11-52, Bogotá',
      city: 'Bogotá',
      phone: '(1) 5419800',
      email: 'consultoría@ceml.co',
      sector: 'Consultoría',
      contact: 'Roberto Sánchez',
      capacity: 15,
      description: 'Asesoría empresarial y gestión organizacional',
      active: true
    }
  ])
  const [formData, setFormData] = useState({
    nit: '',
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    sector: '',
    contact: '',
    capacity: '',
    description: ''
  })
  const [editingId, setEditingId] = useState(null)

  // Filter companies based on search
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.nit.includes(searchTerm) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle form submission
  const handleSaveCompany = () => {
    if (!formData.nit || !formData.name || !formData.email) {
      showAlert.warning('Campos incompletos', 'Por favor completa los campos requeridos (NIT, Nombre, Email)')
      return
    }

    if (editingId) {
      // Edit existing company
      setCompanies(companies.map(c =>
        c.id === editingId ? { ...c, ...formData } : c
      ))
      setEditingId(null)
      showToast.success('Empresa actualizada exitosamente')
    } else {
      // Add new company
      const newCompany = {
        id: Math.max(...companies.map(c => c.id)) + 1,
        ...formData,
        active: true
      }
      setCompanies([...companies, newCompany])
      showToast.success('Empresa registrada exitosamente')
    }

    // Reset form
    setFormData({
      nit: '',
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      sector: '',
      contact: '',
      capacity: '',
      description: ''
    })
    setShowForm(false)
  }

  // Handle edit
  const handleEdit = (company) => {
    setFormData(company)
    setEditingId(company.id)
    setShowForm(true)
    setSelectedCompany(null)
  }

  // Handle delete
  const handleDelete = (id) => {
    showAlert.confirmDelete('empresa').then((result) => {
      if (result.isConfirmed) {
        setCompanies(companies.filter(c => c.id !== id))
        setSelectedCompany(null)
        showToast.success('Empresa eliminada exitosamente')
      }
    })
  }

  // Handle view details
  const handleViewDetails = (company) => {
    setSelectedCompany(company)
  }

  // Export to multiple formats
  const handleExportData = async (format) => {
    if (!filteredCompanies?.length) {
      showAlert.warning('No hay datos para exportar')
      return
    }

    const toastId = showToast.loading(`Preparando ${format.toUpperCase()}...`)
    
    try {
      const dataToExport = filteredCompanies.map(company => ({
        nit: company.nit || '',
        nombre: company.name || '',
        ciudad: company.city || '',
        direccion: company.address || '',
        telefono: company.phone || '',
        email: company.email || '',
        sector: company.sector || '',
        contacto: company.contact || '',
        capacidad: company.capacity || '',
        estado: company.active ? 'Activo' : 'Inactivo'
      }))

      const columns = [
        { key: 'nit', label: 'NIT' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'ciudad', label: 'Ciudad' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'email', label: 'Email' },
        { key: 'sector', label: 'Sector' },
        { key: 'contacto', label: 'Contacto' },
        { key: 'estado', label: 'Estado' }
      ]

      await downloadReport(
        dataToExport,
        columns,
        'Gestión de Empresas',
        `empresas_${new Date().toISOString().split('T')[0]}`,
        format,
        {
          subtitulo: 'Información detallada de empresas registradas',
          rowClassName: (row) => {
            if (row.estado === 'Activo') return 'bg-green-50'
            if (row.estado === 'Inactivo') return 'bg-red-50'
            return 'bg-white'
          }
        }
      )

      showToast.dismiss(toastId)
      showToast.success(`${dataToExport.length} registros exportados exitosamente`)
    } catch (error) {
      showToast.dismiss(toastId)
      showToast.error('Error al exportar los datos')
      console.error('Export error:', error)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Gestión de Empresas de Prácticas</h1>
        <p className="text-slate-600">Administra el registro de empresas para prácticas y pasantías</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase">Total Empresas</p>
              <p className="text-2xl font-bold text-blue-900">{companies.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase">Activas</p>
              <p className="text-2xl font-bold text-green-900">{companies.filter(c => c.active).length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase">Ciudades</p>
              <p className="text-2xl font-bold text-purple-900">{new Set(companies.map(c => c.city)).size}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-xs font-semibold text-orange-600 uppercase">Capacidad Total</p>
              <p className="text-2xl font-bold text-orange-900">{companies.reduce((sum, c) => sum + (parseInt(c.capacity) || 0), 0)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search and Actions */}
          <Card className="mb-6 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre, NIT o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowForm(!showForm)
                    setEditingId(null)
                    setFormData({
                      nit: '',
                      name: '',
                      address: '',
                      city: '',
                      phone: '',
                      email: '',
                      sector: '',
                      contact: '',
                      capacity: '',
                      description: ''
                    })
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Empresa
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportData('excel')}
                    className="flex items-center gap-2"
                    title="Descargar en Excel"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Excel</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportData('pdf')}
                    className="flex items-center gap-2"
                    title="Descargar en PDF"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Form */}
          {showForm && (
            <Card className="mb-6 p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {editingId ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">NIT *</label>
                  <Input
                    value={formData.nit}
                    onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                    placeholder="Ej: 860000000-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre Empresa *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dirección</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Dirección completa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ciudad</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ciudad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sector</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar sector</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Manufactura">Manufactura</option>
                    <option value="Servicios Financieros">Servicios Financieros</option>
                    <option value="Consultoría">Consultoría</option>
                    <option value="Comercio">Comercio</option>
                    <option value="Educación">Educación</option>
                    <option value="Salud">Salud</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(1) 2500100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contacto</label>
                  <Input
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Nombre del contacto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Capacidad (aprendices)</label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="Número de aprendices"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Información adicional sobre la empresa"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleSaveCompany}
                  className="flex items-center gap-2"
                >
                  Guardar Empresa
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          )}

          {/* Companies List */}
          <Card className="bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">NIT</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Ciudad</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Sector</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map(company => (
                      <tr key={company.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{company.nit}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{company.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{company.city}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                            {company.sector}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{company.email}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button
                            onClick={() => handleViewDetails(company)}
                            className="p-1.5 hover:bg-blue-100 rounded-md transition text-blue-600 inline-block"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(company)}
                            className="p-1.5 hover:bg-amber-100 rounded-md transition text-amber-600 inline-block"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600 inline-block"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                        No se encontraron empresas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Side Panel - Company Details */}
        {selectedCompany && (
          <div className="lg:col-span-1">
            <Card className="bg-white sticky top-4">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Detalles</h3>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Nombre</p>
                    <p className="text-slate-900 font-semibold">{selectedCompany.name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">NIT</p>
                    <p className="text-slate-900">{selectedCompany.nit}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Sector</p>
                    <p className="text-slate-900">{selectedCompany.sector}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Dirección</p>
                    <p className="text-slate-900 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      {selectedCompany.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Ciudad</p>
                    <p className="text-slate-900">{selectedCompany.city}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Teléfono</p>
                    <p className="text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      {selectedCompany.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Email</p>
                    <p className="text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {selectedCompany.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Contacto</p>
                    <p className="text-slate-900">{selectedCompany.contact}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Capacidad</p>
                    <p className="text-slate-900">{selectedCompany.capacity} aprendices</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Descripción</p>
                    <p className="text-sm text-slate-600">{selectedCompany.description}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Estado</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedCompany.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedCompany.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <Button
                      onClick={() => handleEdit(selectedCompany)}
                      className="flex-1 flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(selectedCompany.id)
                      }}
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
