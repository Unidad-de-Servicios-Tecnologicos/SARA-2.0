/**
 * Mock data para el módulo de Instructores
 * Basado en el documento de especificaciones SARA
 * TODO: Reemplazar con datos reales del backend
 */

// Tipos de vinculación
export const mockTiposVinculacion = [
  { id: "planta", label: "Planta", color: "green" },
  { id: "contratista", label: "Contratista", color: "blue" },
];

// Roles de instructor
export const mockRolesInstructor = [
  { id: "tecnico", label: "Técnico", description: "Instructor de competencias técnicas" },
  { id: "transversal", label: "Transversal", description: "Instructor de competencias transversales" },
  { id: "lider", label: "Líder", description: "Instructor líder de programa" },
];

// Estados de instructor
export const mockEstadosInstructor = [
  { id: "activo", label: "Activo", color: "green" },
  { id: "inactivo", label: "Inactivo", color: "gray" },
  { id: "licencia", label: "En Licencia", color: "yellow" },
  { id: "vacaciones", label: "Vacaciones", color: "blue" },
  { id: "incapacidad", label: "Incapacidad", color: "orange" },
  { id: "comision", label: "En Comisión", color: "purple" },
];

// Áreas de formación
export const mockAreasFormacion = [
  { id: 1, nombre: "Tecnologías de la Información" },
  { id: 2, nombre: "Gestión Administrativa" },
  { id: 3, nombre: "Industria" },
  { id: 4, nombre: "Construcción" },
  { id: 5, nombre: "Comercio y Servicios" },
  { id: 6, nombre: "Salud" },
  { id: 7, nombre: "Agroindustria" },
];

// Programas que puede orientar un instructor
export const mockProgramasInstructor = [
  { id: 1, codigo: "228106", nombre: "Análisis y Desarrollo de Software" },
  { id: 2, codigo: "228118", nombre: "Gestión de Redes de Datos" },
  { id: 3, codigo: "228185", nombre: "Producción de Multimedia" },
  { id: 4, codigo: "122115", nombre: "Gestión Empresarial" },
  { id: 5, codigo: "122320", nombre: "Contabilidad y Finanzas" },
];

// Instructores mock
export const mockInstructores = [
  {
    id: 1,
    documento: "79123456",
    tipoDocumento: "CC",
    nombre: "Juan Carlos",
    apellidos: "Méndez Rodríguez",
    email: "jmendez@sena.edu.co",
    celular: "3101234567",
    tipoVinculacion: "planta",
    rol: "tecnico",
    estado: "activo",
    area: { id: 1, nombre: "Tecnologías de la Información" },
    sede: { id: 1, nombre: "Centro de Comercio" },
    cargaHoraria: {
      asignada: 40,
      disponible: 8,
      porcentajeOcupacion: 80,
    },
    fichasAsignadas: [
      { id: 1, numero: "2889927", programa: "Análisis y Desarrollo de Software", rol: "titular", jornada: "Matutina", horasAsignadas: 8 },
      { id: 3, numero: "2891234", programa: "Análisis y Desarrollo de Software", rol: "apoyo", jornada: "Vespertina", horasAsignadas: 6 },
    ],
    competencias: [
      "Análisis de requerimientos",
      "Desarrollo de software",
      "Bases de datos",
      "Metodologías ágiles",
    ],
    fechaIngreso: "2018-03-15",
    fechaFinContrato: null,
    formacionAcademica: "Ingeniero de Sistemas - Universidad Nacional",
    certificaciones: ["Scrum Master", "AWS Cloud Practitioner"],
  },
  {
    id: 2,
    documento: "79123457",
    tipoDocumento: "CC",
    nombre: "María",
    apellidos: "López Herrera",
    email: "mlopez@sena.edu.co",
    celular: "3101234568",
    tipoVinculacion: "planta",
    rol: "transversal",
    estado: "activo",
    area: { id: 2, nombre: "Gestión Administrativa" },
    sede: { id: 1, nombre: "Centro de Comercio" },
    cargaHoraria: {
      asignada: 40,
      disponible: 12,
      porcentajeOcupacion: 70,
    },
    fichasAsignadas: [
      { id: 2, numero: "2890543", programa: "Gestión Empresarial", rol: "titular", jornada: "Matutina", horasAsignadas: 8 },
    ],
    competencias: [
      "Comunicación asertiva",
      "Ética profesional",
      "Emprendimiento",
    ],
    fechaIngreso: "2015-08-01",
    fechaFinContrato: null,
    formacionAcademica: "Administradora de Empresas - Universidad del Valle",
    certificaciones: ["Coach Empresarial"],
  },
  {
    id: 3,
    documento: "79123458",
    tipoDocumento: "CC",
    nombre: "Pedro",
    apellidos: "Gómez Castro",
    email: "pgomez@sena.edu.co",
    celular: "3101234569",
    tipoVinculacion: "contratista",
    rol: "tecnico",
    estado: "activo",
    area: { id: 1, nombre: "Tecnologías de la Información" },
    sede: { id: 2, nombre: "Centro de Servicios Financieros" },
    cargaHoraria: {
      asignada: 36,
      disponible: 4,
      porcentajeOcupacion: 89,
    },
    fichasAsignadas: [
      { id: 4, numero: "2892001", programa: "Gestión de Redes de Datos", rol: "titular", jornada: "Vespertina", horasAsignadas: 8 },
      { id: 5, numero: "2892345", programa: "Gestión de Redes de Datos", rol: "titular", jornada: "Nocturna", horasAsignadas: 8 },
    ],
    competencias: [
      "Redes de datos",
      "Seguridad informática",
      "Administración de servidores",
    ],
    fechaIngreso: "2022-02-01",
    fechaFinContrato: "2025-01-31",
    formacionAcademica: "Ingeniero Electrónico - Universidad Javeriana",
    certificaciones: ["CCNA", "CompTIA Security+"],
  },
  {
    id: 4,
    documento: "79123459",
    tipoDocumento: "CC",
    nombre: "Luz Marina",
    apellidos: "Torres Peña",
    email: "ltorres@sena.edu.co",
    celular: "3101234570",
    tipoVinculacion: "planta",
    rol: "lider",
    estado: "activo",
    area: { id: 1, nombre: "Tecnologías de la Información" },
    sede: { id: 1, nombre: "Centro de Comercio" },
    cargaHoraria: {
      asignada: 40,
      disponible: 16,
      porcentajeOcupacion: 60,
    },
    fichasAsignadas: [
      { id: 1, numero: "2889927", programa: "Análisis y Desarrollo de Software", rol: "lider", jornada: "Matutina", horasAsignadas: 10 },
    ],
    competencias: [
      "Gestión de proyectos",
      "Liderazgo",
      "Desarrollo de software",
    ],
    fechaIngreso: "2010-06-15",
    fechaFinContrato: null,
    formacionAcademica: "Magíster en Gestión de TI - Universidad de los Andes",
    certificaciones: ["PMP", "ITIL Foundation"],
  },
  {
    id: 5,
    documento: "79123460",
    tipoDocumento: "CC",
    nombre: "Carlos Alberto",
    apellidos: "Ruiz Vargas",
    email: "cruiz@sena.edu.co",
    celular: "3101234571",
    tipoVinculacion: "contratista",
    rol: "tecnico",
    estado: "vacaciones",
    area: { id: 3, nombre: "Industria" },
    sede: { id: 3, nombre: "Centro de Manufactura" },
    cargaHoraria: {
      asignada: 32,
      disponible: 0,
      porcentajeOcupacion: 100,
    },
    fichasAsignadas: [
      { id: 6, numero: "2893456", programa: "Mantenimiento Industrial", rol: "titular", jornada: "Vespertina", horasAsignadas: 12 },
    ],
    competencias: [
      "Automatización industrial",
      "PLC",
      "Mantenimiento preventivo",
    ],
    fechaIngreso: "2021-03-01",
    fechaFinContrato: "2024-12-31",
    formacionAcademica: "Tecnólogo en Automatización Industrial - SENA",
    certificaciones: ["Siemens S7"],
  },
  {
    id: 6,
    documento: "79123461",
    tipoDocumento: "CC",
    nombre: "Sandra Patricia",
    apellidos: "Moreno Díaz",
    email: "smoreno@sena.edu.co",
    celular: "3101234572",
    tipoVinculacion: "planta",
    rol: "transversal",
    estado: "activo",
    area: { id: 2, nombre: "Gestión Administrativa" },
    sede: { id: 1, nombre: "Centro de Comercio" },
    cargaHoraria: {
      asignada: 40,
      disponible: 20,
      porcentajeOcupacion: 50,
    },
    fichasAsignadas: [
      { id: 2, numero: "2890543", programa: "Gestión Empresarial", rol: "apoyo", jornada: "Matutina", horasAsignadas: 6 },
      { id: 7, numero: "2894567", programa: "Contabilidad y Finanzas", rol: "titular", jornada: "Nocturna", horasAsignadas: 8 },
    ],
    competencias: [
      "Inglés técnico",
      "Comunicación empresarial",
      "Cultura física",
    ],
    fechaIngreso: "2019-01-15",
    fechaFinContrato: null,
    formacionAcademica: "Licenciada en Idiomas - Universidad Pedagógica",
    certificaciones: ["TOEFL", "Cambridge C1"],
  },
  {
    id: 7,
    documento: "79123462",
    tipoDocumento: "CC",
    nombre: "Andrés Felipe",
    apellidos: "Martínez Ríos",
    email: "amartinez@sena.edu.co",
    celular: "3101234573",
    tipoVinculacion: "contratista",
    rol: "tecnico",
    estado: "incapacidad",
    area: { id: 1, nombre: "Tecnologías de la Información" },
    sede: { id: 2, nombre: "Centro de Servicios Financieros" },
    cargaHoraria: {
      asignada: 36,
      disponible: 36,
      porcentajeOcupacion: 0,
    },
    fichasAsignadas: [],
    competencias: [
      "Producción multimedia",
      "Diseño gráfico",
      "Animación 3D",
    ],
    fechaIngreso: "2023-06-01",
    fechaFinContrato: "2025-05-31",
    formacionAcademica: "Diseñador Gráfico - Universidad Jorge Tadeo Lozano",
    certificaciones: ["Adobe Certified Expert"],
  },
  {
    id: 8,
    documento: "79123463",
    tipoDocumento: "CC",
    nombre: "Diana Carolina",
    apellidos: "Hernández Gil",
    email: "dhernandez@sena.edu.co",
    celular: "3101234574",
    tipoVinculacion: "planta",
    rol: "tecnico",
    estado: "activo",
    area: { id: 6, nombre: "Salud" },
    sede: { id: 4, nombre: "Centro de Servicios de Salud" },
    cargaHoraria: {
      asignada: 40,
      disponible: 8,
      porcentajeOcupacion: 80,
    },
    fichasAsignadas: [
      { id: 8, numero: "2895678", programa: "Enfermería", rol: "titular" },
    ],
    competencias: [
      "Atención al paciente",
      "Primeros auxilios",
      "Farmacología",
    ],
    fechaIngreso: "2016-02-01",
    fechaFinContrato: null,
    formacionAcademica: "Enfermera Profesional - Universidad Nacional",
    certificaciones: ["BLS", "ACLS"],
  },
];

// KPIs de instructores
export const mockInstructoresKPIs = {
  totalInstructores: 8,
  instructoresActivos: 6,
  instructoresPlanta: 5,
  instructoresContratistas: 3,
  promedioOcupacion: 66.1,
  instructoresSobrecarga: 2, // > 85% ocupación
  instructoresDisponibles: 3, // < 70% ocupación
  totalFichasAsignadas: 12,
  promedioCargaHoraria: 38,
};

// Historial de asignaciones
export const mockHistorialAsignaciones = [
  { id: 1, instructorId: 1, fichaId: 1, fechaInicio: "2024-02-15", fechaFin: null, rol: "titular", estado: "activa" },
  { id: 2, instructorId: 1, fichaId: 3, fechaInicio: "2024-06-01", fechaFin: null, rol: "apoyo", estado: "activa" },
  { id: 3, instructorId: 2, fichaId: 2, fechaInicio: "2024-02-15", fechaFin: null, rol: "titular", estado: "activa" },
  { id: 4, instructorId: 3, fichaId: 4, fechaInicio: "2024-02-15", fechaFin: null, rol: "titular", estado: "activa" },
];

// Novedades de instructores
export const mockNovedadesInstructor = [
  { id: 1, instructorId: 5, tipo: "vacaciones", fechaInicio: "2024-12-20", fechaFin: "2025-01-10", descripcion: "Vacaciones de fin de año", aprobadoPor: "Coordinador" },
  { id: 2, instructorId: 7, tipo: "incapacidad", fechaInicio: "2024-12-15", fechaFin: "2025-01-15", descripcion: "Incapacidad médica", aprobadoPor: "Recursos Humanos" },
  { id: 3, instructorId: 3, tipo: "renovacion_contrato", fechaInicio: "2025-02-01", fechaFin: "2026-01-31", descripcion: "Renovación de contrato por 1 año", aprobadoPor: "Subdirector" },
];

// Sedes disponibles
export const mockSedes = [
  { id: 1, nombre: "Centro de Comercio" },
  { id: 2, nombre: "Centro de Servicios Financieros" },
  { id: 3, nombre: "Centro de Manufactura" },
  { id: 4, nombre: "Centro de Servicios de Salud" },
];

// Tipos de actividades
export const mockTiposActividades = [
  { id: "clase", label: "Clase" },
  { id: "practica", label: "Práctica" },
  { id: "proyecto", label: "Proyecto" },
  { id: "evaluacion", label: "Evaluación" },
  { id: "taller", label: "Taller" },
  { id: "consulta", label: "Consulta" },
];

// Actividades estructuradas de instructores con fecha, ficha, competencia, RAP, tipo, horas
export const mockActividadesInstructor = {
  1: [ // Juan Carlos Méndez
    { 
      id: 1, 
      fecha: "2025-01-15", 
      ficha: "2889927", 
      programa: "Análisis y Desarrollo de Software",
      competencia: "Desarrollar soluciones de software", 
      rap: "RAP 1 - Análisis de requerimientos",
      tipo: "clase",
      horas: 2,
      descripcion: "Introducción a análisis de requerimientos"
    },
    { 
      id: 2, 
      fecha: "2025-01-16", 
      ficha: "2891234", 
      programa: "Análisis y Desarrollo de Software",
      competencia: "Diseñar bases de datos", 
      rap: "RAP 2 - Diseño de BD",
      tipo: "practica",
      horas: 3,
      descripcion: "Práctica de diseño en MySQL"
    },
    { 
      id: 3, 
      fecha: "2025-01-17", 
      ficha: "2889927", 
      programa: "Análisis y Desarrollo de Software",
      competencia: "Desarrollar soluciones de software", 
      rap: "RAP 3 - Desarrollo en Java",
      tipo: "proyecto",
      horas: 4,
      descripcion: "Desarrollo de aplicación backend"
    },
    { 
      id: 4, 
      fecha: "2025-01-20", 
      ficha: "2889927", 
      programa: "Análisis y Desarrollo de Software",
      competencia: "Desarrollar soluciones de software", 
      rap: "RAP 1 - Análisis de requerimientos",
      tipo: "evaluacion",
      horas: 1,
      descripcion: "Quiz de análisis de requerimientos"
    },
  ],
  2: [ // María López
    { 
      id: 5, 
      fecha: "2025-01-14", 
      ficha: "2890543", 
      programa: "Gestión Empresarial",
      competencia: "Emprendimiento e innovación", 
      rap: "RAP 1 - Plan de negocio",
      tipo: "taller",
      horas: 2,
      descripcion: "Taller de formulación de planes de negocio"
    },
    { 
      id: 6, 
      fecha: "2025-01-18", 
      ficha: "2890543", 
      programa: "Gestión Empresarial",
      competencia: "Ética y responsabilidad social", 
      rap: "RAP 2 - Ética profesional",
      tipo: "clase",
      horas: 1.5,
      descripcion: "Valores y ética en el trabajo"
    },
  ],
  3: [ // Pedro Gómez
    { 
      id: 7, 
      fecha: "2025-01-15", 
      ficha: "2892001", 
      programa: "Gestión de Redes de Datos",
      competencia: "Administrar redes de datos", 
      rap: "RAP 1 - Configuración de routers",
      tipo: "practica",
      horas: 3,
      descripcion: "Configuración de OSPF"
    },
    { 
      id: 8, 
      fecha: "2025-01-17", 
      ficha: "2892345", 
      programa: "Gestión de Redes de Datos",
      competencia: "Implementar seguridad en redes", 
      rap: "RAP 2 - Firewalls y VPN",
      tipo: "taller",
      horas: 2.5,
      descripcion: "Implementación de firewalls"
    },
    { 
      id: 9, 
      fecha: "2025-01-19", 
      ficha: "2892001", 
      programa: "Gestión de Redes de Datos",
      competencia: "Administrar redes de datos", 
      rap: "RAP 1 - Configuración de routers",
      tipo: "evaluacion",
      horas: 1,
      descripcion: "Examen de configuración de redes"
    },
  ],
  4: [ // Luz Marina Torres
    { 
      id: 10, 
      fecha: "2025-01-16", 
      ficha: "2889927", 
      programa: "Análisis y Desarrollo de Software",
      competencia: "Gestionar proyectos de software", 
      rap: "RAP 1 - Planificación de proyectos",
      tipo: "clase",
      horas: 2,
      descripcion: "Introducción a metodologías ágiles"
    },
  ],
  5: [ // Carlos Alberto Ruiz
    { 
      id: 11, 
      fecha: "2025-01-15", 
      ficha: "2893456", 
      programa: "Mantenimiento de Equipos",
      competencia: "Realizar mantenimiento preventivo", 
      rap: "RAP 1 - Planificación de mantenimiento",
      tipo: "practica",
      horas: 4,
      descripcion: "Práctica de mantenimiento de equipos"
    },
    { 
      id: 12, 
      fecha: "2025-01-18", 
      ficha: "2893456", 
      programa: "Mantenimiento de Equipos",
      competencia: "Realizar mantenimiento preventivo", 
      rap: "RAP 2 - Ejecución de mantenimiento",
      tipo: "proyecto",
      horas: 3,
      descripcion: "Proyecto de mantenimiento integral"
    },
  ],
  6: [ // Sandra Patricia Moreno
    { 
      id: 13, 
      fecha: "2025-01-14", 
      ficha: "2890543", 
      programa: "Gestión Empresarial",
      competencia: "Comunicación empresarial", 
      rap: "RAP 1 - Comunicación en inglés",
      tipo: "clase",
      horas: 2,
      descripcion: "Inglés de negocios nivel intermediate"
    },
    { 
      id: 14, 
      fecha: "2025-01-16", 
      ficha: "2894567", 
      programa: "Educación Física",
      competencia: "Promover bienestar físico", 
      rap: "RAP 1 - Ejercicio y salud",
      tipo: "practica",
      horas: 1.5,
      descripcion: "Sesión de entrenamiento funcional"
    },
  ],
  7: [ // Andrés Felipe Martínez (sin actividades por incapacidad)
  ],
  8: [ // Diana Carolina Hernández
    { 
      id: 15, 
      fecha: "2025-01-15", 
      ficha: "2895678", 
      programa: "Salud Ocupacional",
      competencia: "Atención al paciente", 
      rap: "RAP 1 - Comunicación efectiva",
      tipo: "clase",
      horas: 2,
      descripcion: "Comunicación con pacientes"
    },
    { 
      id: 16, 
      fecha: "2025-01-17", 
      ficha: "2895678", 
      programa: "Salud Ocupacional",
      competencia: "Atención en emergencias", 
      rap: "RAP 2 - Primeros auxilios",
      tipo: "taller",
      horas: 3,
      descripcion: "Taller de primeros auxilios avanzados"
    },
    { 
      id: 17, 
      fecha: "2025-01-19", 
      ficha: "2895678", 
      programa: "Salud Ocupacional",
      competencia: "Atención al paciente", 
      rap: "RAP 1 - Comunicación efectiva",
      tipo: "evaluacion",
      horas: 1,
      descripcion: "Evaluación de protocolos"
    },
  ],
};
