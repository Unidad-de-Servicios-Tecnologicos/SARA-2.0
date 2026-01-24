import { useState } from 'react'
import { FileText, Plus, Download, Eye, Trash2, Edit2, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/Input'
import { showToast, showAlert } from '@/shared/notifications'

export default function DocumentsGenerationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Acta de Grado - Juan Carlos Rodríguez',
      template: 'Acta de Grado',
      learner: 'Juan Carlos Rodríguez',
      program: 'Administración de Empresas',
      fichaCode: 'FIC-2024-001',
      generatedDate: '2025-01-15',
      status: 'Completado',
      content: 'ACTA DE GRADO\n\nCertificamos que el aprendiz Juan Carlos Rodríguez con documento de identidad 1098765432, ha completado exitosamente el programa de Administración de Empresas...',
      fileFormat: 'PDF'
    },
    {
      id: 2,
      title: 'Certificado de Formación - María Elena García',
      template: 'Certificado de Formación',
      learner: 'María Elena García López',
      program: 'Desarrollo de Software',
      fichaCode: 'FIC-2024-002',
      generatedDate: '2025-01-10',
      status: 'Completado',
      content: 'CERTIFICADO DE FORMACIÓN\n\nCertificamos que María Elena García López ha completado el programa de Desarrollo de Software...',
      fileFormat: 'PDF'
    },
    {
      id: 3,
      title: 'Diploma de Competencias - Roberto Sánchez',
      template: 'Diploma de Competencias',
      learner: 'Roberto Sánchez Moreno',
      program: 'Manufactura',
      fichaCode: 'FIC-2024-003',
      generatedDate: '2025-01-05',
      status: 'Completado',
      content: 'DIPLOMA DE COMPETENCIAS\n\nCertificamos que Roberto Sánchez Moreno ha adquirido las siguientes competencias...',
      fileFormat: 'PDF'
    }
  ])
  const [formData, setFormData] = useState({
    learner: '',
    program: '',
    fichaCode: '',
    template: '',
    customContent: ''
  })
  const [generatedDoc, setGeneratedDoc] = useState(null)

  const templates = [
    {
      id: 'acta-grado',
      name: 'Acta de Grado',
      description: 'Documento oficial de certificación de finalización del programa',
      icon: '📜',
      category: 'Certificación',
      preview: 'ACTA DE GRADO\n\nCertificamos que el aprendiz [NOMBRE] con documento de identidad [DOCUMENTO], ha completado exitosamente el programa de [PROGRAMA] en la fecha [FECHA]...'
    },
    {
      id: 'certificado',
      name: 'Certificado de Formación',
      description: 'Certificado de participación y aprobación en el programa',
      icon: '🎓',
      category: 'Certificación',
      preview: 'CERTIFICADO DE FORMACIÓN\n\nCertificamos que [NOMBRE] ha completado el programa de [PROGRAMA] con una calificación de [CALIFICACIÓN]...'
    },
    {
      id: 'diploma',
      name: 'Diploma de Competencias',
      description: 'Diploma que certifica las competencias adquiridas',
      icon: '🏆',
      category: 'Competencias',
      preview: 'DIPLOMA DE COMPETENCIAS\n\nCertificamos que [NOMBRE] ha adquirido las siguientes competencias:\n- Competencia 1\n- Competencia 2\n- Competencia 3'
    },
    {
      id: 'constancia',
      name: 'Constancia de Formación',
      description: 'Constancia simple de participación en el programa',
      icon: '✓',
      category: 'Constancia',
      preview: 'CONSTANCIA DE FORMACIÓN\n\nPor este medio consta que [NOMBRE] participó en el programa de [PROGRAMA] del [FECHA] al [FECHA]...'
    },
    {
      id: 'acta-practica',
      name: 'Acta de Práctica Supervisada',
      description: 'Documento para certificar la realización de práctica profesional',
      icon: '📋',
      category: 'Prácticas',
      preview: 'ACTA DE PRÁCTICA SUPERVISADA\n\nCertificamos que [NOMBRE] realizó su práctica supervisada en [EMPRESA] del [FECHA] al [FECHA]...'
    },
    {
      id: 'evaluacion',
      name: 'Acta de Evaluación Final',
      description: 'Documento con resultados de evaluación final',
      icon: '📊',
      category: 'Evaluación',
      preview: 'ACTA DE EVALUACIÓN FINAL\n\nAprendiz: [NOMBRE]\nPrograma: [PROGRAMA]\nCalificación Final: [CALIFICACIÓN]\nResultado: [RESULTADO]'
    }
  ]

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.learner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fichaCode.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Handle generate document
  const handleGenerateDocument = () => {
    if (!formData.learner || !formData.program || !formData.template) {
      showAlert.warning('Por favor completa los campos requeridos')
      return
    }

    const template = templates.find(t => t.id === formData.template)
    const newDoc = {
      id: Math.max(...documents.map(d => d.id), 0) + 1,
      title: `${template.name} - ${formData.learner}`,
      template: template.name,
      learner: formData.learner,
      program: formData.program,
      fichaCode: formData.fichaCode,
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'Completado',
      content: template.preview.replace('[NOMBRE]', formData.learner).replace('[PROGRAMA]', formData.program),
      fileFormat: 'PDF'
    }

    setGeneratedDoc(newDoc)
    setDocuments([newDoc, ...documents])
    setFormData({ learner: '', program: '', fichaCode: '', template: '', customContent: '' })
    setSelectedTemplate(null)
    showToast.success('Documento generado exitosamente')
  }

  // Handle download
  const handleDownload = (doc) => {
    const element = document.createElement('a')
    const file = new Blob([doc.content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${doc.title.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Handle delete
  const handleDelete = (id) => {
    showAlert.confirmDelete('¿Estás seguro de que deseas eliminar este documento?').then(result => {
      if (result.isConfirmed) {
        setDocuments(documents.filter(d => d.id !== id))
        showToast.success('Documento eliminado')
      }
    })
  }

  const stats = {
    total: documents.length,
    completados: documents.filter(d => d.status === 'Completado').length,
    pendientes: documents.filter(d => d.status === 'Pendiente').length
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Generación de Documentos</h1>
        <p className="text-slate-600 dark:text-gray-400">Crea y descarga documentos académicos certificados</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase">Total Documentos</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase">Completados</p>
              <p className="text-2xl font-bold text-green-900">{stats.completados}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase">Pendientes</p>
              <p className="text-2xl font-bold text-amber-900">{stats.pendientes}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates Section */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Plantillas Disponibles</h2>
            <div className="space-y-2">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template)
                    setFormData({ ...formData, template: template.id })
                  }}
                  className={`w-full text-left p-3 rounded-lg border-2 transition ${
                    selectedTemplate?.id === template.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm">{template.name}</p>
                      <p className="text-xs text-slate-600 truncate">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Generation Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Preview */}
          {selectedTemplate && (
            <Card className="p-6 bg-amber-50 border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Vista Previa: {selectedTemplate.name}</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  {showPreview ? 'Cerrar' : 'Expandir'}
                </button>
              </div>
              {showPreview && (
                <div className="bg-white p-4 rounded border border-amber-200 text-sm text-slate-600 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">
                  {selectedTemplate.preview}
                </div>
              )}
            </Card>
          )}

          {/* Form */}
          {selectedTemplate && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Completar Información</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre del Aprendiz *</label>
                  <Input
                    value={formData.learner}
                    onChange={(e) => setFormData({ ...formData, learner: e.target.value })}
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Programa *</label>
                    <Input
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      placeholder="Nombre del programa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Código Ficha</label>
                    <Input
                      value={formData.fichaCode}
                      onChange={(e) => setFormData({ ...formData, fichaCode: e.target.value })}
                      placeholder="FIC-2024-001"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contenido Adicional</label>
                  <textarea
                    value={formData.customContent}
                    onChange={(e) => setFormData({ ...formData, customContent: e.target.value })}
                    placeholder="Información adicional a incluir en el documento"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
                <Button
                  onClick={handleGenerateDocument}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Generar Documento
                </Button>
              </div>
            </Card>
          )}

          {/* Generated Document */}
          {generatedDoc && (
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Documento Generado</h3>
                  <p className="text-sm text-slate-600 mt-1">{generatedDoc.title}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✓ Completado
                </span>
              </div>
              <div className="bg-white p-4 rounded border border-green-200 text-sm text-slate-600 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto mb-4">
                {generatedDoc.content}
              </div>
              <Button
                onClick={() => handleDownload(generatedDoc)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>
            </Card>
          )}

          {/* Generated Documents List */}
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Input
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'Completado', 'Pendiente'].map(status => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    onClick={() => setFilterStatus(status)}
                    size="sm"
                  >
                    {status === 'all' ? 'Todos' : status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map(doc => (
                  <div key={doc.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{doc.title}</p>
                        <p className="text-sm text-slate-600">
                          {doc.program} • {new Date(doc.generatedDate).toLocaleDateString('es-CO')}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {doc.template}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {doc.fileFormat}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setGeneratedDoc(doc)}
                          className="p-1.5 hover:bg-blue-100 rounded-md transition text-blue-600"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-1.5 hover:bg-green-100 rounded-md transition text-green-600"
                          title="Descargar"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No hay documentos generados
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
