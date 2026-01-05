// Función para descargar fichas asignadas de los instructores
export function descargarFichasAsignadas(instructores) {
  // Función para escapar valores CSV correctamente
  const formatValue = (v) => {
    const val = v.toString().trim();
    return val.includes(';') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
  };

  // Construir CSV con formato correcto
  const rows = [
    ["Instructor", "Documento", "Ficha", "Programa", "Rol"],
  ];
  
  instructores.forEach(inst => {
    (inst.fichasAsignadas || []).forEach(ficha => {
      rows.push([
        `${inst.nombre} ${inst.apellidos}`,
        inst.documento,
        ficha.numero,
        ficha.programa,
        ficha.rol
      ]);
    });
  });

  // Mapear valores con escaping correcto (solo si es necesario) - Punto y coma como delimitador
  const csv = rows.map(r => r.map(v => formatValue(v)).join(";")).join("\r\n");
  
  // Agregar BOM UTF-8 para que Excel interprete caracteres acentuados correctamente
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fichas_asignadas.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
