// KPIs - Estos valores vendrán del backend
export const subdirectorKPIs = [
  { label: "Fichas", value: 97 },
  { label: "Instructores", value: 106 },
  { label: "RAP con No Aprobado", value: 3951 },
  { label: "Resultados por evaluar", value: 0 },
]

// Instructores por contrato - Datos mock para desarrollo
export const instructorsByContract = [
  { name: "Contratista", value: 67 },
  { name: "Planta", value: 36 },
]

// Instructores por género - Datos mock para desarrollo
export const instructorsByGender = [
  { name: "Femenino", value: 53.3, color: "#ec4899" },
  { name: "Masculino", value: 46.7, color: "#3b82f6" },
]

// Aprendices por estado - Datos mock para desarrollo
export const apprenticesByStatus = [
  { name: "Aplazado", value: 120 },
  { name: "Cancelado", value: 300 },
  { name: "Certificado", value: 2100 },
  { name: "Condicionado", value: 800 },
  { name: "En Formación", value: 3500 },
  { name: "Inducción", value: 90 },
  { name: "Retiro Voluntario", value: 45 },
  { name: "Trasladado", value: 30 },
]

// Aprendices activos por programa
export const apprenticesByProgram = [
  { name: "Administración Empresarial", value: 656 },
  { name: "Gestión Logística", value: 401 },
  { name: "Contabilización de Operaciones", value: 374 },
  { name: "Gestión Administrativa", value: 320 },
  { name: "Análisis y Desarrollo de Software", value: 267 },
]

// Fichas por programa
export const groupsByProgram = [
  { name: "Gestión Empresarial", value: 40 },
  { name: "Gestión Integrada", value: 32 },
  { name: "Asistencia Administrativa", value: 24 },
  { name: "Contabilización de Operaciones", value: 16 },
]

// Fichas por Programa
export const fichasByProgram = [
  { programa: "ASISTENCIA ADMINS.", fichas: 28 },
  { programa: "CONTABILIZACION", fichas: 15 },
  { programa: "CONTROL DE MOVIL.", fichas: 18 },
  { programa: "ELABORACION DE A.", fichas: 12 },
  { programa: "EMPRENDIMIENTO Y F.", fichas: 8 },
  { programa: "GESTION INTEGRAL", fichas: 35 },
  { programa: "GESTION BANCARIA", fichas: 22 },
  { programa: "GESTION DE LA PROP.", fichas: 10 },
  { programa: "GESTION DEL TALENT.", fichas: 16 },
  { programa: "GESTION EMPRESARIAL", fichas: 40 },
  { programa: "GESTION INTEGRADA", fichas: 5 },
  { programa: "GESTION LABORAL", fichas: 14 },
  { programa: "INFORMACION Y SER.", fichas: 2 },
  { programa: "INTEGRACION DE O.", fichas: 6 },
  { programa: "MANEJO DE MONTAÑA", fichas: 18 },
  { programa: "PROMOCION DE PROD.", fichas: 10 },
  { programa: "RECURSOS HUMANOS", fichas: 10 },
  { programa: "SERVICIOS COMERC.", fichas: 15 },
  { programa: "TRANSPORTE MASI.", fichas: 8 },
]
