/**
 * ========================================
 * DATOS MOCK - MÓDULO DE HORARIOS
 * ========================================
 * Estos datos serán reemplazados por respuestas del backend
 * cuando esté disponible la API.
 */

// ========================================
// INSTRUCTORES
// ========================================
export const mockInstructors = [
  { 
    id: 1, 
    documento: "1017123456",
    name: "CLAUDIA CAMPUZANO ESTRADA", 
    area: "Gestión Administrativa",
    contrato: "PLANTA",
    horasTitulada: 20,
    horasComplementaria: 4,
    horasNovedades: 0
  },
  { 
    id: 2, 
    documento: "71234567",
    name: "ADOLFO LEON LOPEZ GOMEZ", 
    area: "Contabilidad",
    contrato: "CONTRATISTA",
    horasTitulada: 18,
    horasComplementaria: 6,
    horasNovedades: 2
  },
  { 
    id: 3, 
    documento: "43567890",
    name: "ALBEIRO OSPINA PENAGOS", 
    area: "Talento Humano",
    contrato: "PLANTA",
    horasTitulada: 22,
    horasComplementaria: 2,
    horasNovedades: 0
  },
  { 
    id: 4, 
    documento: "32456789",
    name: "MARIA FERNANDA RIOS CARDONA", 
    area: "Emprendimiento",
    contrato: "CONTRATISTA",
    horasTitulada: 16,
    horasComplementaria: 8,
    horasNovedades: 0
  },
  { 
    id: 5, 
    documento: "98765432",
    name: "CARLOS ANDRES MEJIA VALENCIA", 
    area: "Gestión Empresarial",
    contrato: "PLANTA",
    horasTitulada: 24,
    horasComplementaria: 0,
    horasNovedades: 4
  },
];

// ========================================
// FICHAS
// ========================================
export const mockFichas = [
  {
    id: 1,
    numero: "2818588",
    programa: "GESTIÓN ADMINISTRATIVA",
    nivel: "TECNÓLOGO",
    jornada: "DIURNA",
    estado: "EN FORMACIÓN",
    fechaInicio: "2024-02-15",
    fechaFin: "2026-02-15",
    totalAprendices: 28,
    instructor: "CLAUDIA CAMPUZANO ESTRADA",
    horasTitulada: 32,
    horasComplementaria: 8,
    horasNovedades: 0
  },
  {
    id: 2,
    numero: "2821641",
    programa: "CONTABILIZACIÓN DE OPERACIONES COMERCIALES",
    nivel: "TÉCNICO",
    jornada: "NOCTURNA",
    estado: "EN FORMACIÓN",
    fechaInicio: "2024-03-01",
    fechaFin: "2025-09-01",
    totalAprendices: 32,
    instructor: "ADOLFO LEON LOPEZ GOMEZ",
    horasTitulada: 28,
    horasComplementaria: 4,
    horasNovedades: 2
  },
  {
    id: 3,
    numero: "2821658",
    programa: "ANÁLISIS Y DESARROLLO DE SOFTWARE",
    nivel: "TECNÓLOGO",
    jornada: "MIXTA",
    estado: "EN FORMACIÓN",
    fechaInicio: "2024-01-20",
    fechaFin: "2026-01-20",
    totalAprendices: 25,
    instructor: "CARLOS ANDRES MEJIA VALENCIA",
    horasTitulada: 40,
    horasComplementaria: 0,
    horasNovedades: 0
  },
  {
    id: 4,
    numero: "2847221",
    programa: "TALENTO HUMANO",
    nivel: "TECNÓLOGO",
    jornada: "DIURNA",
    estado: "CERRADA",
    fechaInicio: "2023-02-10",
    fechaFin: "2025-02-10",
    totalAprendices: 30,
    instructor: "ALBEIRO OSPINA PENAGOS",
    horasTitulada: 36,
    horasComplementaria: 4,
    horasNovedades: 0
  },
];

// ========================================
// AMBIENTES
// ========================================
export const mockSedes = [
  { id: 1, nombre: "CESGE", direccion: "Calle 51 # 57-70" },
  { id: 2, nombre: "VIRTUAL", direccion: "Plataforma Virtual" },
  { id: 3, nombre: "IUSH", direccion: "Carrera 70 # 52-49" },
  { id: 4, nombre: "CENTRO DE COMERCIO", direccion: "Calle 48 # 50-10" },
];

export const mockAmbientes = [
  { id: 1, numero: "401", sede: "CESGE", capacidad: 40, tipo: "Aula", horasProgramadas: 32 },
  { id: 2, numero: "402", sede: "CESGE", capacidad: 35, tipo: "Aula", horasProgramadas: 28 },
  { id: 3, numero: "501", sede: "CESGE", capacidad: 30, tipo: "Laboratorio", horasProgramadas: 40 },
  { id: 4, numero: "502", sede: "CESGE", capacidad: 25, tipo: "Laboratorio", horasProgramadas: 36 },
  { id: 5, numero: "V-01", sede: "VIRTUAL", capacidad: 100, tipo: "Virtual", horasProgramadas: 24 },
  { id: 6, numero: "301", sede: "IUSH", capacidad: 45, tipo: "Aula", horasProgramadas: 20 },
];

// ========================================
// EVENTOS DE CALENDARIO
// ========================================
export const mockEvents = [
  {
    id: 1,
    title: "ESTRATEGIA DOCUMENTAL",
    ficha: "2818588",
    programa: "Gestión Administrativa",
    instructor: "CLAUDIA CAMPUZANO ESTRADA",
    ambiente: "401",
    day: 1, // Lunes
    startHour: 6,
    endHour: 8,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "ELABORAR RECURSOS DIGITALES",
    ficha: "2821641",
    programa: "Contabilización de Operaciones",
    instructor: "ADOLFO LEON LOPEZ GOMEZ",
    ambiente: "402",
    day: 2, // Martes
    startHour: 7,
    endHour: 10,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "DESARROLLO DE SOFTWARE",
    ficha: "2821658",
    programa: "Análisis y Desarrollo de Software",
    instructor: "CARLOS ANDRES MEJIA VALENCIA",
    ambiente: "501",
    day: 3, // Miércoles
    startHour: 6,
    endHour: 12,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "GESTIÓN DEL TALENTO",
    ficha: "2847221",
    programa: "Talento Humano",
    instructor: "ALBEIRO OSPINA PENAGOS",
    ambiente: "301",
    day: 4, // Jueves
    startHour: 14,
    endHour: 18,
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "EMPRENDIMIENTO",
    ficha: "2818588",
    programa: "Gestión Administrativa",
    instructor: "MARIA FERNANDA RIOS CARDONA",
    ambiente: "401",
    day: 5, // Viernes
    startHour: 8,
    endHour: 12,
    color: "bg-pink-500"
  },
];

// ========================================
// RAPs (Resultados de Aprendizaje)
// ========================================
export const mockRAPs = [
  {
    id: 1,
    ficha: "2818588",
    trimestre: "2024-4",
    programa: "GESTIÓN ADMINISTRATIVA",
    palabraClave: "Gestión documental",
    normaCompetencia: "210601006",
    competencia: "Organizar eventos que promuevan las relaciones empresariales",
    rap: "Divulgar el evento teniendo en cuenta el plan de promoción"
  },
  {
    id: 2,
    ficha: "2821641",
    trimestre: "2024-4",
    programa: "CONTABILIZACIÓN DE OPERACIONES",
    palabraClave: "Registros contables",
    normaCompetencia: "210303001",
    competencia: "Contabilizar operaciones de acuerdo con las normas",
    rap: "Registrar hechos económicos según normas contables vigentes"
  },
  {
    id: 3,
    ficha: "2821658",
    trimestre: "2024-4",
    programa: "ANÁLISIS Y DESARROLLO DE SOFTWARE",
    palabraClave: "Desarrollo web",
    normaCompetencia: "220501001",
    competencia: "Analizar los requerimientos del cliente",
    rap: "Diseñar la arquitectura del sistema de información"
  },
];

// ========================================
// PERIODOS
// ========================================
export const mockPeriodos = [
  { id: 1, nombre: "2025 - 1", fechaInicio: "2025-01-01", fechaFin: "2025-03-31" },
  { id: 2, nombre: "2025 - 2", fechaInicio: "2025-04-01", fechaFin: "2025-06-30" },
  { id: 3, nombre: "2025 - 3", fechaInicio: "2025-07-01", fechaFin: "2025-09-30" },
  { id: 4, nombre: "2024 - 4", fechaInicio: "2024-10-01", fechaFin: "2024-12-31" },
];

// ========================================
// ITINERARIOS (Para palabras clave)
// ========================================
export const mockItinerarios = [
  "ASISTENCIA ADMINISTRATIVA",
  "CONTABILIZACIÓN DE OPERACIONES COMERCIALES",
  "CONTROL DE MOVILIDAD",
  "GESTIÓN DE PROPIEDAD HORIZONTAL",
  "TALENTO HUMANO",
  "GESTIÓN EMPRESARIAL",
  "ANÁLISIS Y DESARROLLO DE SOFTWARE",
  "PRODUCCIÓN MULTIMEDIA",
  "GESTIÓN LOGÍSTICA",
  "MERCADEO",
];

// ========================================
// RENDIMIENTO ACADÉMICO
// ========================================
export const mockRendimientoAcademico = {
  ficha: "2818588",
  programa: "GESTIÓN ADMINISTRATIVA",
  totalAprendices: 28,
  aprobados: 22,
  reprobados: 3,
  enProceso: 3,
  promedioGeneral: 4.2,
  asistenciaPromedio: 87,
  competenciasEvaluadas: [
    { nombre: "Gestión Documental", promedio: 4.3, aprobados: 24 },
    { nombre: "Comunicación Empresarial", promedio: 4.1, aprobados: 22 },
    { nombre: "Servicio al Cliente", promedio: 4.5, aprobados: 26 },
  ],
  historialNotas: [
    { trimestre: "2024-1", promedio: 3.8 },
    { trimestre: "2024-2", promedio: 4.0 },
    { trimestre: "2024-3", promedio: 4.1 },
    { trimestre: "2024-4", promedio: 4.2 },
  ]
};
