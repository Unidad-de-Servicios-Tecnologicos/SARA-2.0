// Servicio mock para Gestión de Reserva de Ambientes en SARA.
// Centraliza datos de ambientes y reservas para que, cuando exista backend real,
// solo sea necesario reemplazar este archivo por llamadas HTTP.

import { mockInstructores } from "@/features/instructors/mock/instructors.mock";
import { mockRAPs } from "@/features/schedules/mock/schedules.mock";

// Ambientes de ejemplo (cada uno debería tener su QR fijo por ambiente)
export const ambientesMock = [
  { id: "15", codigo: "LAB-301", nombre: "LAB-301 - Software", centroId: 3, tipo: "LABORATORIO", activo: true },
  { id: "16", codigo: "AULA-201", nombre: "Aula 201", centroId: 3, tipo: "AULA", activo: true },
];

// Tomar algunas combinaciones reales de instructor + ficha desde el módulo de Instructores
const instructor1 = mockInstructores[0];
const instructor2 = mockInstructores[1];
const ficha1 = instructor1?.fichasAsignadas?.[0];
const ficha2 = instructor2?.fichasAsignadas?.[0];

// Usar también competencias/RAP desde Horarios como referencia
const rap1 = mockRAPs[2];
const rap2 = mockRAPs[0];

// Reservas académicas de ejemplo (unificadas para EnvironmentReservationsPage y EnvironmentQRPage)
export const environmentReservationsMock = [
  {
    id: 1,
    ambienteId: "15",
    ficha: ficha1?.numero || "2818588",
    programa: ficha1?.programa || rap1?.programa || "ANÁLISIS Y DESARROLLO DE SOFTWARE",
    jornada: ficha1?.jornada || "Matutina",
    instructor: instructor1 ? `${instructor1.nombre} ${instructor1.apellidos}` : "Instructor 1",
    competencia: rap1?.competencia || "Desarrollo de software",
    rap: rap1?.rap || "RAP 1",
    ambiente: "LAB-301 - Software",
    fecha: "2025-01-22",
    horaInicio: "08:00",
    horaFin: "10:00",
    estado: "CONFIRMADA",
  },
  {
    id: 2,
    ambienteId: "16",
    ficha: ficha2?.numero || "2890543",
    programa: ficha2?.programa || rap2?.programa || "GESTIÓN ADMINISTRATIVA",
    jornada: ficha2?.jornada || "Matutina",
    instructor: instructor2 ? `${instructor2.nombre} ${instructor2.apellidos}` : "Instructor 2",
    competencia: rap2?.competencia || "Gestión administrativa",
    rap: rap2?.rap || "RAP 2",
    ambiente: "Aula 210 - Gestión",
    fecha: "2025-01-22",
    horaInicio: "14:00",
    horaFin: "16:00",
    estado: "PENDIENTE",
  },
];

// Interfaz mínima pensada para ser reemplazada luego por llamadas HTTP reales
export const EnvironmentReservationsService = {
  // En versión real, esto sería un GET /ambientes
  getEnvironments: () => ambientesMock,

  // En versión real, esto sería un GET /reservas-ambiente
  getReservations: () => environmentReservationsMock,
};
