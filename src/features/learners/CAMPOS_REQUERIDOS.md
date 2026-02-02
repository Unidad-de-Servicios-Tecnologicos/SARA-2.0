# 📋 Checklist de Campos - Mock Data

## 🎯 Qué Campos Necesita Cada Sección

Para que el `LearnerSidePanel` funcione correctamente, asegúrate que tu objeto learner tenga estos campos:

---

## ✅ ENCABEZADO (Requerido)

```javascript
{
  name: string,          // ✓ "Juan Carlos López"
  state: string,         // ✓ "EN FORMACIÓN"
  fichaId: string,       // ✓ "3014407"
  program: string,       // ✓ "ADSO"
}
```

**¿Falta algo?** El encabezado no se mostrará correctamente.

---

## ✅ DATOS PERSONALES (Requerido)

```javascript
{
  document: string,      // ✓ "1234567890"
  email: string,         // ✓ "juan@sena.edu.co"
  phone: string,         // ✓ "3015551234" (opcional)
  jornada: string,       // ✓ "Matutina" (opcional)
  modalidad: string,     // ✓ "Presencial" (opcional)
}
```

**Fallback**: Si falta `phone`, muestra "N/A"

---

## ✅ DATOS ACADÉMICOS (Recomendado)

```javascript
{
  startDate: Date|string,        // ✓ "2024-01-15"
  estimatedEndDate: Date|string, // ✓ "2025-06-15"
  trimesterActual: string,       // ✓ "Trimestre 3"
  instructorLeader: string,      // ✓ "Ing. María García"
  centerFormacion: string,       // ✓ "Centro de Bogotá"
}
```

**Fallback**: Si falta alguno, simplemente no se muestra ese campo

---

## ✅ ESTADO DE FORMACIÓN (Importante)

### Progreso del Programa

```javascript
{
  programProgress: number,  // ✓ 65 (0-100)
}
```

**Fallback**: Si no existe, muestra 65% por defecto

### RAPS

```javascript
{
  juiciosAprobados: number,    // ✓ 45
  juiciosPorEvaluar: number,   // ✓ 12
  raps: Array,                 // ✓ Array de RAPS (se cuenta su longitud)
}
```

**Cálculo**:
```javascript
rapsTotal = raps.length + juiciosAprobados + juiciosPorEvaluar
// Ejemplo: 0 + 45 + 12 = 57
```

**Fallback**: Si faltan valores, usa 0

### Asistencia

```javascript
{
  attendance: string,  // ✓ "85%" o "85"
}
```

**Procesamiento**: `parseInt(learner.attendance) || 0`

**Color basado en %**:
- ✅ ≥80%: Verde
- ⚠️  60-79%: Naranja/Amarillo
- ❌ <60%: Rojo

### Alertas

```javascript
{
  activeAlerts: Array[string],  // ✓ ["Inasistencia el 15/01", "Bajo rendimiento"]
}
```

**Renderizado**: Máximo 2 alertas (slice(0, 2))

**Fallback**: Si no hay alertas, no muestra la sección

---

## ✅ PRÁCTICA / EMPRESA (Recomendado)

```javascript
{
  practices: [
    {
      id: number,
      company: string,        // ✓ "Tech Solutions SAS"
      type: string,           // ✓ "Empresarial"
      estado: string,         // ✓ "Activa" | "Finalizada"
      startDate: Date|string, // ✓ "2024-06-01"
      endDate: Date|string,   // ✓ "2024-12-01" (opcional)
      supervisor: string,     // ✓ "Ing. Carlos Rodríguez"
      instructor: string,     // ✓ "Ing. Ana Martínez"
    }
  ]
}
```

**Lógica**:
- Si hay prácticas: Muestra la primera
- Si hay >1 práctica: Agrega botón "Ver prácticas (2)"
- Si no hay: Muestra "No iniciada"

**Fallback**: Si falta un campo en la práctica, usa valores por defecto o N/A

---

## ✅ OBSERVACIONES (Recomendado)

```javascript
{
  observations: [
    {
      title: string,       // ✓ "Progreso académico"
      description: string, // ✓ "Aprendiz muestra buen desempeño..."
      date: Date|string,   // ✓ "2024-01-20"
      author: string,      // ✓ "Ing. María García"
    }
  ]
}
```

**Renderizado**: Máximo 3 observaciones (slice(0, 3))

**Fallback**: Si no hay observaciones, muestra "Sin observaciones registradas"

---

## 🔍 Ejemplo Completo de Learner Mock

```javascript
const mockLearner = {
  // Identificación
  id: 1,
  name: "Juan Carlos López",
  document: "1234567890",
  email: "juan@sena.edu.co",
  phone: "3015551234",
  
  // Académico
  fichaId: "3014407",
  program: "ADSO",
  state: "EN FORMACIÓN",
  
  // Información personal
  jornada: "Matutina",
  modalidad: "Presencial",
  
  // Fechas
  startDate: "2024-01-15",
  estimatedEndDate: "2025-06-15",
  
  // Datos académicos
  trimesterActual: "Trimestre 3",
  instructorLeader: "Ing. María García",
  centerFormacion: "Centro de Bogotá",
  
  // Progreso
  programProgress: 65,
  academicPerformance: "Bueno",
  
  // Asistencia
  attendance: "85%",
  attendance_records: [
    { date: "2024-01-20", hour: "08:00", status: "Presente" },
    { date: "2024-01-19", hour: "08:00", status: "Ausente" },
    // ... más registros
  ],
  
  // RAPS
  juiciosAprobados: 45,
  juiciosPorEvaluar: 12,
  raps: [
    // ... array con todos los RAPS
  ],
  
  // Alertas
  activeAlerts: [
    "Inasistencia el 15/01",
    "Bajo rendimiento en RAP-05"
  ],
  
  // Prácticas
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
  
  // Observaciones
  observations: [
    {
      title: "Progreso académico",
      description: "Aprendiz muestra buen desempeño en módulos de programación",
      date: "2024-01-20",
      author: "Ing. María García"
    },
    {
      title: "Asistencia",
      description: "Faltó sin justificación a 2 sesiones",
      date: "2024-01-18",
      author: "Ing. Ana Martínez"
    }
  ],
  
  // Otros (no usados en panel, pero útiles)
  fichas: [],
  state_history: [],
  comites: []
};
```

---

## 🚀 Checklist para Actualizar Mock Data

### Paso 1: Verificar Campos Básicos
- [ ] `name` existe
- [ ] `document` existe
- [ ] `email` existe
- [ ] `state` existe (EN FORMACIÓN, EN PRÁCTICA, CERTIFICADO, RETIRADO, CANCELADO)
- [ ] `fichaId` existe
- [ ] `program` existe

### Paso 2: Agregar Datos Académicos
- [ ] `startDate` agregado
- [ ] `estimatedEndDate` agregado
- [ ] `trimesterActual` agregado
- [ ] `instructorLeader` agregado
- [ ] `centerFormacion` agregado

### Paso 3: Agregar Progreso
- [ ] `programProgress` agregado (0-100)
- [ ] `juiciosAprobados` agregado
- [ ] `juiciosPorEvaluar` agregado
- [ ] `attendance` es string con formato "85%"

### Paso 4: Agregar Alertas
- [ ] `activeAlerts` es array
- [ ] Máximo 2 alertas visibles

### Paso 5: Agregar Prácticas
- [ ] `practices` es array
- [ ] Primera práctica tiene: company, type, estado, startDate

### Paso 6: Agregar Observaciones
- [ ] `observations` es array
- [ ] Cada observación tiene: title, description, date, author

---

## 🔧 Script para Actualizar Mock Data

```javascript
// src/data/mockData.js

export const mockLearners = [
  {
    id: 1,
    name: "Juan Carlos López",
    document: "1234567890",
    email: "juan@sena.edu.co",
    phone: "3015551234",
    fichaId: "3014407",
    program: "ADSO",
    state: "EN FORMACIÓN",
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
    raps: [],
    activeAlerts: ["Inasistencia el 15/01"],
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
    observations: [
      {
        title: "Progreso académico",
        description: "Aprendiz muestra buen desempeño",
        date: "2024-01-20",
        author: "Ing. María García"
      }
    ],
    attendance_records: [],
    fichas: [],
    state_history: []
  },
  // ... más aprendices
];
```

---

## ⚠️ Advertencias Comunes

### ❌ Problema: Estado no reconocido
```javascript
// ❌ MAL
state: "Activo"  // No coincide con configuración

// ✅ BIEN
state: "EN FORMACIÓN"  // Coincide exactamente
```

### ❌ Problema: Asistencia no se muestra en color
```javascript
// ❌ MAL
attendance: 85  // número

// ✅ BIEN
attendance: "85%"  // string con %
```

### ❌ Problema: Fechas mal formateadas
```javascript
// ❌ MAL
startDate: "2024/01/15"  // Formato incorrecto

// ✅ BIEN
startDate: "2024-01-15"  // ISO format
// O
startDate: new Date("2024-01-15")  // Date object
```

### ❌ Problema: Arrays vacíos sin respuesta
```javascript
// ❌ MAL
practices: undefined

// ✅ BIEN
practices: []  // Array vacío siempre
```

### ❌ Problema: Números como strings
```javascript
// ❌ MAL
programProgress: "65"  // String

// ✅ BIEN
programProgress: 65  // Número
```

---

## 📊 Estados Válidos

```javascript
const VALID_STATES = [
  "EN FORMACIÓN",
  "EN PRÁCTICA",
  "CERTIFICADO",
  "RETIRADO",
  "CANCELADO"
];

// Verifica que tu objeto use uno de estos
console.assert(
  VALID_STATES.includes(learner.state),
  `Estado inválido: ${learner.state}`
);
```

---

## ✨ Tips para Mock Data Realista

1. **Fechas consistentes**: Si empezó el 15/01/2024, la fin estimada debe ser posterior
2. **Trimestre relacionado**: Trimestre 3 significa aprox 6-9 meses de formación
3. **RAPS coherentes**: No puede tener 45 aprobados si son menos de 45 RAPS totales
4. **Asistencia realista**: Entre 70% y 100% es normal
5. **Prácticas correlacionadas**: Si está "EN PRÁCTICA", debe haber una práctica activa

---

**Documento de referencia**  
**Última actualización**: Enero 2026
