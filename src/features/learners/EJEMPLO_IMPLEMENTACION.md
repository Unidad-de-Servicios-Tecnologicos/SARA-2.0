# 📋 Ejemplo: LearnerSidePanel con Acciones

Esta guía muestra cómo implementar el panel lateral con las acciones rápidas funcionales.

## 🎯 Versión Mejorada: LearnerSidePanelWithActions

Existe una versión alternativa `LearnerSidePanelWithActions.jsx` que permite pasarle callbacks para cada acción.

### Props adicionales

```jsx
<LearnerSidePanel
  isOpen={showPanel}
  onClose={() => setShowPanel(false)}
  learner={selectedLearner}
  // Callbacks para acciones
  onViewRaps={handleViewRaps}
  onViewSchedule={handleViewSchedule}
  onRegisterObservation={handleRegisterObservation}
  onViewDocuments={handleViewDocuments}
/>
```

## 📋 Implementación Completa

### 1. En LearnersManagementPage.jsx

```jsx
import { useState } from 'react'
import LearnerSidePanelWithActions from '../components/LearnerSidePanelWithActions'
import { useNavigate } from 'react-router-dom'

export default function LearnersManagementPage() {
  const navigate = useNavigate()
  const [selectedLearner, setSelectedLearner] = useState(null)
  const [showDetailPanel, setShowDetailPanel] = useState(false)

  // Handlers para acciones rápidas
  const handleViewRaps = () => {
    if (!selectedLearner) return
    // Opción 1: Abrir en nueva ventana
    navigate(`/learners/${selectedLearner.id}/raps`)
    
    // Opción 2: O abrir un modal
    // setShowRapsModal(true)
  }

  const handleViewSchedule = () => {
    if (!selectedLearner) return
    navigate(`/learners/${selectedLearner.id}/schedule`)
  }

  const handleRegisterObservation = () => {
    if (!selectedLearner) return
    // Abrir modal de observaciones
    setShowObservationModal(true)
  }

  const handleViewDocuments = () => {
    if (!selectedLearner) return
    navigate(`/learners/${selectedLearner.id}/documents`)
  }

  const handleViewLearner = (learner) => {
    setSelectedLearner(learner)
    setShowDetailPanel(true)
  }

  return (
    <div>
      {/* Tabla de aprendices */}
      <LearnerTable
        learners={filteredLearners}
        onView={handleViewLearner}
        // ... otras props
      />

      {/* Panel lateral mejorado */}
      <LearnerSidePanelWithActions
        isOpen={showDetailPanel}
        onClose={() => setShowDetailPanel(false)}
        learner={selectedLearner}
        onViewRaps={handleViewRaps}
        onViewSchedule={handleViewSchedule}
        onRegisterObservation={handleRegisterObservation}
        onViewDocuments={handleViewDocuments}
      />
    </div>
  )
}
```

## 🎨 Personalizaciones Posibles

### 1. Cambiar estilos de botones

```jsx
// En LearnerSidePanelWithActions.jsx
const variants = {
  primary: "text-blue-600 hover:bg-blue-50 border border-blue-200",
  success: "text-green-600 hover:bg-green-50 border border-green-200",
  warning: "text-orange-600 hover:bg-orange-50 border border-orange-200",
  danger: "text-red-600 hover:bg-red-50 border border-red-200",
};

// Usar en botones
<ActionButton
  icon={Eye}
  label="Ver RAPS"
  onClick={onViewRaps}
  variant="success"  // Cambiar variante
/>
```

### 2. Deshabilitar botones según estado

```jsx
// En LearnerSidePanelWithActions.jsx
<button
  onClick={onViewRaps}
  disabled={!learner.raps || learner.raps.length === 0}
  className={`
    w-full flex items-center justify-center gap-2 px-4 py-2.5
    text-sm font-medium rounded-lg transition-colors
    ${!learner.raps || learner.raps.length === 0
      ? 'opacity-50 cursor-not-allowed bg-gray-100'
      : 'hover:bg-blue-50 border border-blue-200'
    }
  `}
>
  <Eye className="w-4 h-4" />
  Ver RAPS
</button>
```

### 3. Agregar tooltips

```jsx
import { Tooltip } from '@/components/ui/Tooltip'

<Tooltip content="Ver todos los RAPS del aprendiz">
  <ActionButton
    icon={Eye}
    label="Ver RAPS"
    onClick={onViewRaps}
  />
</Tooltip>
```

## 🔗 Rutas Sugeridas

```javascript
// Rutas para navegación desde acciones rápidas
/learners/:id/raps              // Ver RAPS del aprendiz
/learners/:id/schedule          // Ver horario
/learners/:id/observations      // Registrar/ver observaciones
/learners/:id/documents         // Ver documentos
/learners/:id/practice-tracking // Seguimiento de práctica
```

## 📱 Ejemplo: Modal de Observación

```jsx
// components/ObservationModal.jsx
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'

export default function ObservationModal({ 
  isOpen, 
  onClose, 
  learner,
  onSave 
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      title,
      description,
      learnerId: learner.id,
      date: new Date().toISOString(),
      author: 'Current User' // Obtener usuario actual
    })
    setTitle('')
    setDescription('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Registrar Observación</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Aprendiz: {learner?.name}
            </label>
          </div>
          
          <Input
            placeholder="Título de la observación"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <textarea
            placeholder="Descripción detallada"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded-lg resize-none"
            rows={4}
          />
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Observación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

## 🔄 Flujo Completo

```
Usuario hace clic en "Ver aprendiz"
    ↓
Se abre LearnerSidePanel
    ↓
Usuario hace clic en "Ver RAPS"
    ↓
Se ejecuta onViewRaps()
    ↓
Navega a /learners/{id}/raps O abre modal
    ↓
Muestra página/modal con RAPS detallados
```

## ✅ Checklist de Implementación

- [ ] Crear componente `LearnerSidePanelWithActions`
- [ ] Actualizar `LearnersManagementPage` con handlers
- [ ] Crear páginas para cada acción (RAPS, Schedule, etc.)
- [ ] Implementar modal de observaciones
- [ ] Conectar con API para guardar observaciones
- [ ] Agregar confirmaciones de acciones críticas
- [ ] Probar en móvil y desktop
- [ ] Agregar loading states
- [ ] Documentar en componentes

## 🐛 Posibles Mejoras

1. **Loading States**: Mostrar spinner mientras se carga información
2. **Error Handling**: Mostrar mensajes de error si falla una acción
3. **Confirmaciones**: Pedir confirmación antes de acciones críticas
4. **Historial**: Guardar historial de observaciones
5. **Notificaciones**: Alertar a instructores de cambios importantes
6. **Bulk Actions**: Permitir acciones sobre múltiples aprendices
7. **Filtros avanzados**: En las vistas de RAPS, horarios, etc.
8. **Exportación**: Exportar información individual

---

**Última actualización**: Enero 2026
