// Indicadores Clave de Rendimiento (KPIs)
export const kpis = [
  {
    title: "Fichas Activas",
    value: 97,
    icon: 'List',
    color: 'bg-green-600', // Color primario
    description: 'Total de fichas de formación activas',
  },
  {
    title: "Instructores",
    value: 106,
    icon: 'Users',
    color: 'bg-blue-600',
    description: 'Número total de instructores registrados',
  },
  {
    title: "RAP no Aprobado",
    value: 3951,
    icon: 'AlertTriangle',
    color: 'bg-red-600', // Indicador de ALERTA
    description: 'Resultados de Aprendizaje Pendientes sin aprobar (ATENCIÓN)',
  },
  {
    title: "Resultados por Evaluar",
    value: 0,
    icon: 'CheckCircle',
    color: 'bg-yellow-600',
    description: 'Evaluaciones pendientes de calificación',
  },
];

// Datos para Gráficos (Análisis de Instructores)
export const contratoData = {
  labels: ['Contratista', 'Planta'],
  datasets: [
    {
      label: 'Instructores',
      data: [67, 36],
      backgroundColor: ['rgba(52, 211, 163, 0.8)', 'rgba(59, 130, 246, 0.8)'], // Verde y Azul
      borderWidth: 1,
    },
  ],
};

export const Data = {
  labels: ['Femenino (53.3%)', 'Masculino (46.7%)'],
  datasets: [
    {
      label: 'Porcentaje',
      data: [53.3, 46.7],
      backgroundColor: ['#EC4899', '#3B82F6'], // Rosa y Azul (Colores para Género)
      hoverOffset: 4,
    },
  ],
};