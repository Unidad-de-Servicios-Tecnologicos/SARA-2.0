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
      { id: 1, numero: "2889927", programa: "Análisis y Desarrollo de Software", rol: "titular" },
      { id: 3, numero: "2891234", programa: "Análisis y Desarrollo de Software", rol: "apoyo" },
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
      { id: 2, numero: "2890543", programa: "Gestión Empresarial", rol: "titular" },
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
      { id: 4, numero: "2892001", programa: "Gestión de Redes de Datos", rol: "titular" },
      { id: 5, numero: "2892345", programa: "Gestión de Redes de Datos", rol: "titular" },
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
      { id: 1, numero: "2889927", programa: "Análisis y Desarrollo de Software", rol: "lider" },
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
      { id: 6, numero: "2893456", programa: "Mantenimiento Industrial", rol: "titular" },
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
      { id: 2, numero: "2890543", programa: "Gestión Empresarial", rol: "apoyo" },
      { id: 7, numero: "2894567", programa: "Contabilidad y Finanzas", rol: "titular" },
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

// Actividades de instructores
export const mockActividadesInstructor = {
  1: [ // Juan Carlos Méndez
    { id: 1, titulo: "Programación en Java", descripcion: "Desarrollo de aplicaciones backend", ficha: "2889927", horasSemana: 12, estado: "en curso", fecha: "2024-09-15" },
    { id: 2, titulo: "Bases de Datos SQL", descripcion: "Diseño e implementación de bases de datos relacionales", ficha: "2891234", horasSemana: 8, estado: "en curso", fecha: "2024-10-01" },
    { id: 3, titulo: "React avanzado", descripcion: "Desarrollo frontend con React y TypeScript", ficha: "2889927", horasSemana: 10, estado: "completado", fecha: "2024-08-30" },
  ],
  2: [ // María López
    { id: 4, titulo: "Emprendimiento empresarial", descripcion: "Formación en plan de negocios", ficha: "2890543", horasSemana: 6, estado: "en curso", fecha: "2024-09-10" },
    { id: 5, titulo: "Ética profesional", descripcion: "Valores y ética en el trabajo", ficha: "2890543", horasSemana: 4, estado: "en curso", fecha: "2024-11-05" },
  ],
  3: [ // Pedro Gómez
    { id: 6, titulo: "Configuración de Redes", descripcion: "Configuración de routers y switches", ficha: "2892001", horasSemana: 14, estado: "en curso", fecha: "2024-09-20" },
    { id: 7, titulo: "Seguridad en Redes", descripcion: "Implementación de firewalls y VPN", ficha: "2892345", horasSemana: 10, estado: "en curso", fecha: "2024-10-15" },
    { id: 8, titulo: "Soporte Técnico", descripcion: "Soporte y mantenimiento de infraestructura", ficha: "2892001", horasSemana: 12, estado: "completado", fecha: "2024-07-30" },
  ],
  4: [ // Luz Marina Torres
    { id: 9, titulo: "Gestión de Proyectos", descripcion: "Dirección y coordinación de proyectos de TI", ficha: "2889927", horasSemana: 8, estado: "en curso", fecha: "2024-09-01" },
  ],
  5: [ // Carlos Alberto Ruiz
    { id: 10, titulo: "Mantenimiento Preventivo", descripcion: "Planificación y ejecución de mantenimiento", ficha: "2893456", horasSemana: 16, estado: "en curso", fecha: "2024-09-05" },
  ],
  6: [ // Sandra Patricia Moreno
    { id: 11, titulo: "Inglés de Negocios", descripcion: "Comunicación empresarial en inglés", ficha: "2890543", horasSemana: 6, estado: "en curso", fecha: "2024-10-10" },
    { id: 12, titulo: "Cultura Física", descripcion: "Ejercicio y bienestar laboral", ficha: "2894567", horasSemana: 4, estado: "en curso", fecha: "2024-11-01" },
  ],
  7: [ // Andrés Felipe Martínez (sin actividades activas por incapacidad)
  ],
  8: [ // Diana Carolina Hernández
    { id: 13, titulo: "Atención al Paciente", descripcion: "Comunicación efectiva con pacientes", ficha: "2895678", horasSemana: 10, estado: "en curso", fecha: "2024-09-15" },
    { id: 14, titulo: "Primeros Auxilios", descripcion: "Técnicas de emergencia médica", ficha: "2895678", horasSemana: 8, estado: "en curso", fecha: "2024-10-20" },
  ],
};
