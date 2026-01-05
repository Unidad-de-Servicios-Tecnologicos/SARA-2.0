/**
 * Datos mock para el módulo de Gestión de Fichas
 * TODO: Reemplazar con llamadas al backend cuando esté disponible
 */

// Estados de fichas
export const mockEstadosFicha = [
  { id: "activa", label: "Activa", color: "green" },
  { id: "en_formacion", label: "En Formación", color: "blue" },
  { id: "en_etapa_productiva", label: "Etapa Productiva", color: "purple" },
  { id: "suspendida", label: "Suspendida", color: "yellow" },
  { id: "finalizada", label: "Finalizada", color: "gray" },
  { id: "cancelada", label: "Cancelada", color: "red" },
];

// Jornadas
export const mockJornadas = [
  { id: "diurna", label: "Diurna" },
  { id: "nocturna", label: "Nocturna" },
  { id: "mixta", label: "Mixta" },
  { id: "fines_semana", label: "Fines de Semana" },
];

// Modalidades
export const mockModalidades = [
  { id: "presencial", label: "Presencial" },
  { id: "virtual", label: "Virtual" },
  { id: "mixta", label: "Mixta" },
];

// Fases de formación
export const mockFases = [
  { id: "induccion", label: "Inducción" },
  { id: "lectiva", label: "Lectiva" },
  { id: "productiva", label: "Productiva" },
];

// Niveles de formación
export const mockNiveles = [
  { id: "tecnico", label: "Técnico" },
  { id: "tecnologo", label: "Tecnólogo" },
  { id: "operario", label: "Operario" },
  { id: "especializacion", label: "Especialización" },
  { id: "complementaria", label: "Formación Complementaria" },
];

// Tipos de vinculación de instructor
export const mockTiposVinculacion = [
  { id: "planta", label: "Planta" },
  { id: "contratista", label: "Contratista" },
];

// Roles de instructor
export const mockRolesInstructor = [
  { id: "tecnico", label: "Técnico" },
  { id: "transversal", label: "Transversal" },
  { id: "lider", label: "Líder de Ficha" },
];

// Trimestres
export const mockTrimestres = [
  { id: 1, label: "Trimestre 1" },
  { id: 2, label: "Trimestre 2" },
  { id: 3, label: "Trimestre 3" },
  { id: 4, label: "Trimestre 4" },
  { id: 5, label: "Trimestre 5" },
  { id: 6, label: "Trimestre 6" },
  { id: 7, label: "Trimestre 7" },
  { id: 8, label: "Trimestre 8" },
];

// Estados de etapa productiva
export const mockEstadosEtapaProductiva = [
  { id: "pendiente", label: "Pendiente", color: "gray" },
  { id: "en_proceso", label: "En Proceso", color: "blue" },
  { id: "finalizada", label: "Finalizada", color: "green" },
];

// Tipos de etapa productiva
export const mockTiposEtapaProductiva = [
  { id: "contrato_aprendizaje", label: "Contrato de Aprendizaje" },
  { id: "pasantia", label: "Pasantía" },
  { id: "proyecto_productivo", label: "Proyecto Productivo" },
  { id: "monitorias", label: "Monitorías" },
];

// Centros de formación
export const mockCentros = [
  { id: 1, nombre: "Centro de Servicios y Gestión Empresarial", codigo: "CSGE" },
  { id: 2, nombre: "Centro de Comercio", codigo: "CC" },
  { id: 3, nombre: "Centro de Tecnologías de la Información", codigo: "CTI" },
  { id: 4, nombre: "Centro para la Industria de la Comunicación Gráfica", codigo: "CICG" },
];

// Programas de formación
export const mockProgramas = [
  { id: 1, codigo: "228106", nombre: "Análisis y Desarrollo de Software", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 2, codigo: "228110", nombre: "Producción Multimedia", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 3, codigo: "122115", nombre: "Gestión Administrativa", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 4, codigo: "123112", nombre: "Contabilidad y Finanzas", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 5, codigo: "621113", nombre: "Gestión del Talento Humano", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 6, codigo: "524201", nombre: "Mercadeo", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 7, codigo: "132120", nombre: "Logística Empresarial", nivel: "tecnologo", duracionMeses: 24, duracionHoras: 2200 },
  { id: 8, codigo: "217219", nombre: "Gestión Documental", nivel: "tecnologo", duracionMeses: 18, duracionHoras: 1760 },
  { id: 9, codigo: "228185", nombre: "Mantenimiento de Equipos de Cómputo", nivel: "tecnico", duracionMeses: 12, duracionHoras: 1320 },
  { id: 10, codigo: "135401", nombre: "Cocina", nivel: "tecnico", duracionMeses: 18, duracionHoras: 1760 },
];

// Sedes
export const mockSedes = [
  { id: 1, nombre: "Centro de Comercio", codigo: "CC" },
  { id: 2, nombre: "Centro de Tecnologías", codigo: "CT" },
  { id: 3, nombre: "Centro Industrial", codigo: "CI" },
];

// Fichas
export const mockFichas = [
  {
    id: 1,
    numero: "2889927",
    programa: mockProgramas[0],
    centro: mockCentros[0],
    sede: mockSedes[0],
    jornada: "diurna",
    modalidad: "presencial",
    estado: "en_formacion",
    motivoEstado: "",
    fase: "lectiva",
    trimestreActual: 4,
    fechaInicio: "2024-02-15",
    fechaFinLectiva: "2025-08-15",
    fechaFinProductiva: "2026-02-15",
    instructorTitular: {
      id: 1,
      nombre: "Juan Carlos Méndez",
      documento: "79543210",
      email: "jcmendez@sena.edu.co",
      tipoVinculacion: "planta",
      rol: "tecnico",
      cargaHoraria: 40
    },
    ambiente: "Ambiente 401",
    aprendicesActivos: 28,
    aprendicesDesertados: 2,
    aprendicesTotal: 30,
    horasProgramadas: 1200,
    horasEjecutadas: 680,
    avanceRAPs: 65,
    etapaProductiva: {
      estado: "pendiente",
      tipo: null,
      empresa: null,
      seguimiento: []
    },
    observaciones: "Ficha con buen desempeño académico"
  },
  {
    id: 2,
    numero: "2889928",
    programa: mockProgramas[1],
    centro: mockCentros[0],
    sede: mockSedes[1],
    jornada: "nocturna",
    modalidad: "presencial",
    estado: "en_formacion",
    motivoEstado: "",
    fase: "lectiva",
    trimestreActual: 3,
    fechaInicio: "2024-03-01",
    fechaFinLectiva: "2025-09-01",
    fechaFinProductiva: "2026-03-01",
    instructorTitular: {
      id: 2,
      nombre: "María Fernanda López",
      documento: "31987654",
      email: "mflopez@sena.edu.co",
      tipoVinculacion: "contratista",
      rol: "tecnico",
      cargaHoraria: 36
    },
    ambiente: "Laboratorio Multimedia",
    aprendicesActivos: 25,
    aprendicesDesertados: 5,
    aprendicesTotal: 30,
    horasProgramadas: 1100,
    horasEjecutadas: 520,
    avanceRAPs: 48,
    etapaProductiva: {
      estado: "pendiente",
      tipo: null,
      empresa: null,
      seguimiento: []
    },
    observaciones: ""
  },
  {
    id: 3,
    numero: "2889929",
    programa: mockProgramas[2],
    centro: mockCentros[0],
    sede: mockSedes[0],
    jornada: "mixta",
    modalidad: "mixta",
    estado: "en_etapa_productiva",
    motivoEstado: "",
    fase: "productiva",
    trimestreActual: 7,
    fechaInicio: "2023-08-15",
    fechaFinLectiva: "2025-02-15",
    fechaFinProductiva: "2025-08-15",
    instructorTitular: {
      id: 3,
      nombre: "Claudia Campuzano Estrada",
      documento: "42876543",
      email: "ccampuzano@sena.edu.co",
      tipoVinculacion: "planta",
      rol: "lider",
      cargaHoraria: 40
    },
    ambiente: "Ambiente 205",
    aprendicesActivos: 22,
    aprendicesDesertados: 3,
    aprendicesTotal: 25,
    horasProgramadas: 2200,
    horasEjecutadas: 2200,
    avanceRAPs: 100,
    etapaProductiva: {
      estado: "en_proceso",
      tipo: "contrato_aprendizaje",
      empresa: {
        id: 1,
        nombre: "Bancolombia S.A.",
        nit: "890903938-8",
        contacto: "recursos.humanos@bancolombia.com.co"
      },
      seguimiento: [
        { fecha: "2025-03-15", observacion: "Inicio de etapa productiva", instructor: "Claudia Campuzano" },
        { fecha: "2025-04-15", observacion: "Primera visita de seguimiento", instructor: "Claudia Campuzano" }
      ]
    },
    observaciones: "Ficha en etapa productiva, seguimiento activo"
  },
  {
    id: 4,
    numero: "2889930",
    programa: mockProgramas[3],
    centro: mockCentros[0],
    sede: mockSedes[0],
    jornada: "diurna",
    modalidad: "presencial",
    estado: "en_formacion",
    motivoEstado: "",
    fase: "lectiva",
    trimestreActual: 3,
    fechaInicio: "2024-04-01",
    fechaFinLectiva: "2025-10-01",
    fechaFinProductiva: "2026-04-01",
    instructorTitular: {
      id: 4,
      nombre: "Adolfo León López Gómez",
      documento: "15432876",
      email: "alopez@sena.edu.co",
      tipoVinculacion: "contratista",
      rol: "tecnico",
      cargaHoraria: 32
    },
    ambiente: "Ambiente 302",
    aprendicesActivos: 30,
    aprendicesDesertados: 0,
    aprendicesTotal: 30,
    horasProgramadas: 1000,
    horasEjecutadas: 420,
    avanceRAPs: 42,
    etapaProductiva: {
      estado: "pendiente",
      tipo: null,
      empresa: null,
      seguimiento: []
    },
    observaciones: "Excelente asistencia y participación"
  },
  {
    id: 5,
    numero: "2889931",
    programa: mockProgramas[4],
    centro: mockCentros[0],
    sede: mockSedes[0],
    jornada: "nocturna",
    modalidad: "presencial",
    estado: "activa",
    motivoEstado: "",
    fase: "induccion",
    trimestreActual: 1,
    fechaInicio: "2024-11-01",
    fechaFinLectiva: "2026-05-01",
    fechaFinProductiva: "2026-11-01",
    instructorTitular: {
      id: 5,
      nombre: "Sandra Milena Torres",
      documento: "52987654",
      email: "storres@sena.edu.co",
      tipoVinculacion: "planta",
      rol: "tecnico",
      cargaHoraria: 40
    },
    ambiente: "Ambiente 108",
    aprendicesActivos: 32,
    aprendicesDesertados: 0,
    aprendicesTotal: 32,
    horasProgramadas: 200,
    horasEjecutadas: 40,
    avanceRAPs: 5,
    etapaProductiva: {
      estado: "pendiente",
      tipo: null,
      empresa: null,
      seguimiento: []
    },
    observaciones: "Ficha recién iniciada"
  },
  {
    id: 6,
    numero: "2775432",
    programa: mockProgramas[5],
    centro: mockCentros[0],
    sede: mockSedes[0],
    jornada: "diurna",
    modalidad: "presencial",
    estado: "finalizada",
    motivoEstado: "Programa completado exitosamente",
    fase: "productiva",
    trimestreActual: 8,
    fechaInicio: "2022-02-15",
    fechaFinLectiva: "2023-08-15",
    fechaFinProductiva: "2024-02-15",
    instructorTitular: {
      id: 6,
      nombre: "Carlos Andrés Mejía",
      documento: "79876543",
      email: "camejia@sena.edu.co",
      tipoVinculacion: "planta",
      rol: "lider",
      cargaHoraria: 40
    },
    ambiente: "Ambiente 210",
    aprendicesActivos: 0,
    aprendicesDesertados: 4,
    aprendicesTotal: 28,
    horasProgramadas: 2640,
    horasEjecutadas: 2640,
    avanceRAPs: 100,
    etapaProductiva: {
      estado: "finalizada",
      tipo: "contrato_aprendizaje",
      empresa: {
        id: 2,
        nombre: "Grupo Éxito S.A.",
        nit: "890900608-9",
        contacto: "talento.humano@exito.com.co"
      },
      seguimiento: [
        { fecha: "2023-09-01", observacion: "Inicio de etapa productiva", instructor: "Carlos Mejía" },
        { fecha: "2024-01-15", observacion: "Finalización exitosa", instructor: "Carlos Mejía" }
      ]
    },
    observaciones: "Ficha graduada exitosamente"
  },
  {
    id: 7,
    numero: "2889932",
    programa: mockProgramas[6],
    centro: mockCentros[0],
    sede: mockSedes[2],
    jornada: "mixta",
    modalidad: "mixta",
    estado: "suspendida",
    motivoEstado: "Reestructuración de horarios institucional",
    fase: "lectiva",
    trimestreActual: 3,
    fechaInicio: "2024-01-15",
    fechaFinLectiva: "2025-07-15",
    fechaFinProductiva: "2026-01-15",
    instructorTitular: {
      id: 7,
      nombre: "Laura Valentina Díaz",
      documento: "43765432",
      email: "lvdiaz@sena.edu.co",
      tipoVinculacion: "contratista",
      rol: "transversal",
      cargaHoraria: 24
    },
    ambiente: "Ambiente 115",
    aprendicesActivos: 18,
    aprendicesDesertados: 7,
    aprendicesTotal: 25,
    horasProgramadas: 900,
    horasEjecutadas: 450,
    avanceRAPs: 35,
    etapaProductiva: {
      estado: "pendiente",
      tipo: null,
      empresa: null,
      seguimiento: []
    },
    observaciones: "Suspendida por reestructuración de horarios"
  },
  {
    id: 8,
    numero: "2889933",
    programa: mockProgramas[8],
    centro: mockCentros[2],
    sede: mockSedes[1],
    jornada: "fines_semana",
    modalidad: "presencial",
    estado: "en_formacion",
    motivoEstado: "",
    fase: "lectiva",
    trimestreActual: 2,
    fechaInicio: "2024-06-01",
    fechaFinLectiva: "2025-06-01",
    fechaFinProductiva: "2025-12-01",
    instructorTitular: {
      id: 8,
      nombre: "Pedro José Ramírez",
      documento: "10543876",
      email: "pjramirez@sena.edu.co",
      tipoVinculacion: "planta",
      rol: "tecnico",
      cargaHoraria: 20
    },
    ambiente: "Laboratorio TIC 2",
    aprendicesActivos: 20,
    aprendicesDesertados: 2,
    aprendicesTotal: 22,
    horasProgramadas: 600,
    horasEjecutadas: 280,
    avanceRAPs: 55,
    etapaProductiva: {
      estado: "pendiente",
      tipo: null,
      empresa: null,
      seguimiento: []
    },
    observaciones: ""
  },
];

// Estados de aprendices según documento SARA
export const mockEstadosAprendiz = [
  { id: "activo", label: "En Formación", color: "green" },
  { id: "certificado", label: "Certificado", color: "blue" },
  { id: "condicionado", label: "Condicionado", color: "yellow" },
  { id: "cancelado", label: "Cancelado", color: "red" },
  { id: "aplazado", label: "Aplazado", color: "orange" },
  { id: "retirado", label: "Retiro", color: "gray" },
  { id: "traslado", label: "Traslado", color: "purple" },
  { id: "induccion", label: "Inducción", color: "cyan" },
  { id: "desertado", label: "Desertado", color: "red" },
];

// Lista de instructores
export const mockInstructores = [
  { id: 1, documento: "79123456", nombre: "Juan Carlos Méndez", email: "jmendez@sena.edu.co", celular: "3101234567", tipoVinculacion: "planta", rol: "tecnico", cargaHoraria: 40, activo: true },
  { id: 2, documento: "79123457", nombre: "María López Herrera", email: "mlopez@sena.edu.co", celular: "3101234568", tipoVinculacion: "planta", rol: "transversal", cargaHoraria: 40, activo: true },
  { id: 3, documento: "79123458", nombre: "Pedro Gómez Castro", email: "pgomez@sena.edu.co", celular: "3101234569", tipoVinculacion: "contratista", rol: "tecnico", cargaHoraria: 36, activo: true },
  { id: 4, documento: "79123459", nombre: "Luz Marina Torres", email: "ltorres@sena.edu.co", celular: "3101234570", tipoVinculacion: "planta", rol: "lider", cargaHoraria: 40, activo: true },
  { id: 5, documento: "79123460", nombre: "Carlos Alberto Ruiz", email: "cruiz@sena.edu.co", celular: "3101234571", tipoVinculacion: "contratista", rol: "tecnico", cargaHoraria: 32, activo: true },
  { id: 6, documento: "79123461", nombre: "Sandra Patricia Moreno", email: "smoreno@sena.edu.co", celular: "3101234572", tipoVinculacion: "planta", rol: "transversal", cargaHoraria: 40, activo: true },
];

// Aprendices de ejemplo (para el detalle de ficha)
export const mockAprendices = [
  { id: 1, documento: "1234567890", nombre: "Ana María García", email: "agarcia@misena.edu.co", celular: "3001234567", estado: "activo", asistencia: 95, historialEstados: [{ fecha: "2024-02-15", estado: "induccion", motivo: "Ingreso a formación" }, { fecha: "2024-03-01", estado: "activo", motivo: "Inicio etapa lectiva" }] },
  { id: 2, documento: "1234567891", nombre: "Carlos Eduardo Pérez", email: "cperez@misena.edu.co", celular: "3001234568", estado: "activo", asistencia: 88, historialEstados: [{ fecha: "2024-02-15", estado: "induccion", motivo: "Ingreso a formación" }, { fecha: "2024-03-01", estado: "activo", motivo: "Inicio etapa lectiva" }] },
  { id: 3, documento: "1234567892", nombre: "Diana Marcela López", email: "dlopez@misena.edu.co", celular: "3001234569", estado: "activo", asistencia: 92, historialEstados: [{ fecha: "2024-02-15", estado: "activo", motivo: "Ingreso" }] },
  { id: 4, documento: "1234567893", nombre: "Eduardo José Martínez", email: "emartinez@misena.edu.co", celular: "3001234570", estado: "activo", asistencia: 78, historialEstados: [{ fecha: "2024-02-15", estado: "activo", motivo: "Ingreso" }] },
  { id: 5, documento: "1234567894", nombre: "Fernanda Isabel Torres", email: "ftorres@misena.edu.co", celular: "3001234571", estado: "desertado", asistencia: 45, historialEstados: [{ fecha: "2024-02-15", estado: "activo", motivo: "Ingreso" }, { fecha: "2024-12-15", estado: "desertado", motivo: "Motivos laborales" }] },
  { id: 6, documento: "1234567895", nombre: "Gustavo Adolfo Ramírez", email: "gramirez@misena.edu.co", celular: "3001234572", estado: "activo", asistencia: 97, historialEstados: [{ fecha: "2024-02-15", estado: "activo", motivo: "Ingreso" }] },
  { id: 7, documento: "1234567896", nombre: "Helena Patricia Sánchez", email: "hsanchez@misena.edu.co", celular: "3001234573", estado: "activo", asistencia: 85, historialEstados: [{ fecha: "2024-02-15", estado: "activo", motivo: "Ingreso" }] },
  { id: 8, documento: "1234567897", nombre: "Iván Darío González", email: "igonzalez@misena.edu.co", celular: "3001234574", estado: "condicionado", asistencia: 68, historialEstados: [{ fecha: "2024-02-15", estado: "activo", motivo: "Ingreso" }, { fecha: "2024-10-01", estado: "condicionado", motivo: "Bajo rendimiento académico" }] },
];

// RAPs de ejemplo con instructor evaluador y trimestre según documento SARA
export const mockRAPs = [
  { id: 1, codigo: "RA1", nombre: "Interpretar la arquitectura del software", competencia: "Analizar los requerimientos", horasAsignadas: 120, horasEjecutadas: 120, estado: "completado", trimestre: 1, instructorEvaluador: { id: 1, nombre: "Juan Carlos Méndez" }, observaciones: "Excelente desempeño general" },
  { id: 2, codigo: "RA2", nombre: "Diseñar la solución de software", competencia: "Analizar los requerimientos", horasAsignadas: 150, horasEjecutadas: 150, estado: "completado", trimestre: 2, instructorEvaluador: { id: 1, nombre: "Juan Carlos Méndez" }, observaciones: "" },
  { id: 3, codigo: "RA3", nombre: "Desarrollar el sistema de información", competencia: "Construir el sistema de información", horasAsignadas: 200, horasEjecutadas: 120, estado: "en_progreso", trimestre: 3, instructorEvaluador: { id: 1, nombre: "Juan Carlos Méndez" }, observaciones: "En desarrollo, avance satisfactorio" },
  { id: 4, codigo: "RA4", nombre: "Aplicar buenas prácticas de calidad", competencia: "Construir el sistema de información", horasAsignadas: 100, horasEjecutadas: 40, estado: "en_progreso", trimestre: 4, instructorEvaluador: { id: 2, nombre: "María López" }, observaciones: "Iniciando módulo" },
  { id: 5, codigo: "RA5", nombre: "Implementar la solución de software", competencia: "Implantar la solución", horasAsignadas: 180, horasEjecutadas: 0, estado: "pendiente", trimestre: 5, instructorEvaluador: null, observaciones: "" },
];

// Historial de novedades
export const mockNovedades = [
  { id: 1, fecha: "2024-12-15", tipo: "desercion", descripcion: "Aprendiz Fernanda Torres desertó por motivos laborales", usuario: "Instructor Titular" },
  { id: 2, fecha: "2024-11-20", tipo: "cambio_instructor", descripcion: "Cambio de instructor titular", usuario: "Coordinador" },
  { id: 3, fecha: "2024-10-05", tipo: "suspension", descripcion: "Suspensión temporal por mantenimiento de ambiente", usuario: "Subdirector" },
  { id: 4, fecha: "2024-09-15", tipo: "inicio_fase", descripcion: "Inicio de fase lectiva", usuario: "Sistema" },
];

// KPIs para el resumen
export const mockKPIs = {
  totalFichas: 8,
  fichasActivas: 5,
  fichasEnFormacion: 4,
  fichasProductiva: 1,
  fichasFinalizadas: 1,
  fichasSuspendidas: 1,
  totalAprendices: 222,
  aprendicesActivos: 175,
  tasaDesercion: 8.5,
  promedioAvanceRAP: 56.25,
};
