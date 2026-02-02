# 🎓 Panel Lateral de Gestión de Aprendices

## Descripción

El **LearnerSidePanel** es un componente de panel lateral (drawer derecho) diseñado para mostrar información completa y estructurada de aprendices de forma optimizada.

> **Cambio importante**: Se migró de un modal flotante (`LearnerDetailModal`) a un panel lateral para mejorar la experiencia al consultar información extensa mientras se navega la tabla de aprendices.

## 🎯 Características

✅ **Panel lateral responsivo** - Se adapta a dispositivos móviles  
✅ **Tema oscuro/claro** - Compatible con dark mode  
✅ **Sin edición directa** - Solo lectura, optimizado para consulta  
✅ **Acciones rápidas** - Botones para operaciones frecuentes  
✅ **Información organizada** - Secciones claramente definidas  

## 📐 Estructura del Panel

```
┌─────────────── ENCABEZADO ───────────────┐
│ [Avatar] Nombre                           │
│          Estado [badge]                   │
│          Ficha: 3014407 | Programa: ADSO │
├──────────────────────────────────────────┤
│                                          │
│ 👤 DATOS PERSONALES (solo lectura)       │
│   • Documento, Correo, Teléfono          │
│   • Jornada, Modalidad                   │
│                                          │
│ 📚 DATOS ACADÉMICOS                      │
│   • Fechas (inicio, fin estimado)        │
│   • Trimestre actual                     │
│   • Instructor líder                     │
│   • Centro de formación                  │
│                                          │
│ 🎖️  ESTADO DE FORMACIÓN                  │
│   • Progreso del programa (%)            │
│   • RAPS: Aprobados / Pendientes / Total │
│   • Asistencia (%)                       │
│   • Alertas activas (si aplica)          │
│                                          │
│ 💼 PRÁCTICA / EMPRESA                    │
│   • Empresa, Tipo de práctica            │
│   • Estado (Activa / Finalizada)         │
│   • Botón para ver más prácticas         │
│                                          │
│ 📝 OBSERVACIONES                         │
│   • Últimas 3 observaciones              │
│   • Fecha y autor                        │
│                                          │
├──────────────── ACCIONES ────────────────┤
│ [👁] Ver RAPS                            │
│ [📅] Ver Horario                         │
│ [📋] Registrar Observación               │
│ [📄] Ver Documentos                      │
└──────────────────────────────────────────┘
```

## 🔧 Uso

### Integración Básica

```jsx
import LearnerSidePanel from '@/features/learners/components/LearnerSidePanel'

// En tu componente
const [selectedLearner, setSelectedLearner] = useState(null)
const [showPanel, setShowPanel] = useState(false)

const handleViewLearner = (learner) => {
  setSelectedLearner(learner)
  setShowPanel(true)
}

return (
  <>
    <LearnerSidePanel
      isOpen={showPanel}
      onClose={() => setShowPanel(false)}
      learner={selectedLearner}
    />
  </>
)
```

### Props del Componente

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `isOpen` | boolean | ✅ | Controla la visibilidad del panel |
| `onClose` | function | ✅ | Callback al cerrar el panel |
| `learner` | object | ✅ | Objeto con datos del aprendiz |

## 📋 Estructura de Datos Esperada

### Datos Básicos

```javascript
{
  id: number,
  name: string,              // Nombre completo
  document: string,          // Número de documento
  email: string,             // Correo institucional
  phone: string,             // Teléfono
  state: string,             // EN FORMACIÓN, EN PRÁCTICA, CERTIFICADO, RETIRADO, CANCELADO
}
```

### Datos Académicos

```javascript
{
  fichaId: string,                    // Número de ficha
  program: string,                    // Nombre del programa
  startDate: Date | string,           // Fecha de inicio
  estimatedEndDate: Date | string,    // Fecha fin estimada
  trimesterActual: string,            // Ej: "Trimestre 3"
  instructorLeader: string,           // Nombre del instructor líder
  centerFormacion: string,            // Centro de formación
}
```

### Datos Académicos Continuación

```javascript
{
  programProgress: number,            // 0-100 (% de avance)
  academicPerformance: string,        // Excelente, Bueno, Regular
  attendance: string,                 // Ej: "85%"
  juiciosAprobados: number,           // RAPS aprobados
  juiciosPorEvaluar: number,          // RAPS pendientes
  raps: Array,                        // Array de RAPS completos
}
```

### Datos de Práctica

```javascript
{
  practices: [
    {
      id: number,
      company: string,                // Nombre de la empresa
      type: string,                   // Tipo de práctica
      estado: string,                 // Activa, Finalizada
      startDate: Date | string,       // Fecha de inicio
      endDate: Date | string,         // Fecha de fin
      supervisor: string,             // Supervisor en empresa
      instructor: string,             // Instructor de seguimiento
    }
  ]
}
```

### Alertas y Observaciones

```javascript
{
  activeAlerts: [string],             // Array de alertas activas
  observations: [
    {
      title: string,                  // Título de la observación
      description: string,            // Descripción
      date: Date | string,            // Fecha de registro
      author: string,                 // Quién registró
    }
  ]
}
```

## 🎨 Estados del Aprendiz

El componente reconoce y colorea automáticamente:

| Estado | Color | Icono |
|--------|-------|-------|
| EN FORMACIÓN | 🔵 Azul | CheckCircle2 |
| EN PRÁCTICA | 🟣 Púrpura | Briefcase |
| CERTIFICADO | 🟢 Verde | CheckCircle2 |
| RETIRADO | 🔴 Rojo | X |
| CANCELADO | ⚫ Gris | X |

## 🔌 Integración con LearnersManagementPage

Ya está preconfigurado para usar este componente:

```jsx
<LearnerSidePanel
  isOpen={showDetailModal}
  onClose={() => setShowDetailModal(false)}
  learner={selectedLearner}
/>
```

## 📱 Responsividad

- **Desktop**: Ancho 384px (sm:w-96)
- **Tablet/Mobile**: Ancho completo (w-full)
- **Overlay**: Se muestra en dispositivos móviles para mejorar UX

## 🚀 Funcionalidades No Implementadas (Future)

Los botones de acciones rápidas están preparados pero requieren integración:

- **Ver RAPS**: Debe abrir pantalla/modal dedicado de RAPS
- **Ver Horario**: Debe mostrar horario de clases
- **Registrar Observación**: Debe abrir modal para registrar
- **Ver Documentos**: Debe mostrar documentos del aprendiz

```jsx
// Ejemplo de implementación
<button onClick={() => {
  navigate(`/learners/${learner.id}/raps`)
}}>
  Ver RAPS
</button>
```

## 🔒 Lo que No Tiene (Por Diseño)

❌ No edita datos personales  
❌ No elimina aprendices  
❌ No muestra formularios largos  
❌ No exporta directamente (exportación removida de este componente)  
❌ No muestra gráficos grandes  

Todo lo anterior debe accederse desde pantallas dedicadas.

## 🎯 Mejoras Futuras

1. **Cargar datos reales**: Integrar con API en lugar de mock data
2. **Historial de estado**: Mostrar cambios de estado con fechas
3. **Seguimiento de asistencia**: Gráfico de asistencia últimos 30 días
4. **Timeline de eventos**: Mostrar hitos importantes
5. **Notificaciones en tiempo real**: Alertas de cambios críticos
6. **Integración de acciones**: Conectar botones con funcionalidades

## 📚 Ejemplo Completo de Datos

```javascript
const learnerExample = {
  id: 1,
  name: "Juan Carlos López",
  document: "1234567890",
  email: "juan@sena.edu.co",
  phone: "3015551234",
  state: "EN FORMACIÓN",
  fichaId: "3014407",
  program: "ADSO",
  jornada: "Matutina",
  modalidad: "Presencial",
  startDate: "2024-01-15",
  estimatedEndDate: "2025-06-15",
  trimesterActual: "Trimestre 3",
  instructorLeader: "Ing. María García",
  centerFormacion: "Centro de Bogotá",
  programProgress: 65,
  academicPerformance: "Bueno",
  attendance: "85%",
  juiciosAprobados: 45,
  juiciosPorEvaluar: 12,
  raps: [...],
  practices: [
    {
      id: 1,
      company: "Tech Solutions SAS",
      type: "Empresarial",
      estado: "Activa",
      startDate: "2024-06-01",
      endDate: "2024-12-01",
      supervisor: "Ing. Carlos Rodríguez",
      instructor: "Ing. Ana Martínez"
    }
  ],
  activeAlerts: ["Inasistencia el 15/01", "Bajo rendimiento en RAP-05"],
  observations: [
    {
      title: "Progreso académico",
      description: "Aprendiz muestra buen desempeño en módulos de programación",
      date: "2024-01-20",
      author: "Ing. María García"
    }
  ]
}
```

## 🐛 Solución de Problemas

**P: El panel no aparece**  
R: Verifica que `isOpen={true}` y que `learner` no sea null

**P: Los datos se muestran vacíos**  
R: Asegúrate que el objeto learner tenga las propiedades esperadas

**P: El overlay no se cierra**  
R: Verifica que `onClose` está siendo llamado correctamente

---

**Versión**: 1.0  
**Creado**: Enero 2026  
**Última actualización**: Enero 2026
