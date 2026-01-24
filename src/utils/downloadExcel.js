/**
 * Utilidad para generar y descargar archivos Excel formateados
 * Proporciona una función reutilizable para todas las descargas del proyecto
 */

/**
 * Descarga datos en formato Excel HTML con estilos
 * @param {Array} data - Array de objetos con los datos a descargar
 * @param {Array} columns - Array de objetos {key: 'nombre_propiedad', label: 'Nombre Columna'}
 * @param {string} titulo - Título del reporte
 * @param {string} filename - Nombre del archivo a descargar
 * @param {Object} options - Opciones adicionales {subtitulo, fecha, estilos}
 */
export const downloadExcel = (data, columns, titulo, filename, options = {}) => {
  const {
    subtitulo = '',
    fecha = new Date().toLocaleDateString('es-CO'),
    coloresEstadisticas = {},
    rowClassName = null
  } = options

  try {
    // Generar filas de datos
    const rowsHTML = data.map((row, idx) => {
      let rowClass = 'bg-white'
      if (rowClassName) {
        rowClass = rowClassName(row, idx)
      } else if (idx % 2 === 0) {
        rowClass = 'bg-white'
      } else {
        rowClass = 'bg-gray-50'
      }

      const cells = columns
        .map(col => {
          let value = row[col.key]
          
          // Aplicar estilos personalizados si existen
          if (coloresEstadisticas[col.key] && coloresEstadisticas[col.key][value]) {
            const style = coloresEstadisticas[col.key][value]
            return `<td class="border border-gray-300 px-4 py-3 text-sm" style="${style.color ? `color: ${style.color};` : ''} ${style.bgColor ? `background-color: ${style.bgColor};` : ''} ${style.fontWeight ? `font-weight: ${style.fontWeight};` : ''}">${value}</td>`
          }
          
          return `<td class="border border-gray-300 px-4 py-3 text-sm">${value || '-'}</td>`
        })
        .join('')

      return `<tr class="${rowClass}">${cells}</tr>`
    }).join('')

    // Generar encabezados
    const headersHTML = columns
      .map(col => `<th class="border border-gray-300 px-4 py-3 bg-blue-600 text-white font-bold text-left">${col.label}</th>`)
      .join('')

    // Generar contenido HTML completo
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${titulo}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
          }
          h1 {
            color: #1f2937;
            margin: 0 0 5px 0;
            font-size: 24px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
          }
          .subtitle {
            color: #6b7280;
            margin: 10px 0;
            font-size: 14px;
          }
          .metadata {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            padding: 10px;
            background-color: #f9fafb;
            border-left: 4px solid #2563eb;
          }
          .metadata-item {
            font-size: 13px;
            color: #374151;
          }
          .metadata-label {
            font-weight: bold;
            color: #1f2937;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          th {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
            font-weight: bold;
            background-color: #2563eb;
            color: white;
          }
          td {
            border: 1px solid #d1d5db;
            padding: 10px;
            font-size: 13px;
          }
          tr:nth-child(even) {
            background-color: #f9fafb;
          }
          tr:hover {
            background-color: #eff6ff;
          }
          .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #d1d5db;
            font-size: 12px;
            color: #6b7280;
            text-align: right;
          }
          .status-presente {
            color: #059669;
            font-weight: bold;
          }
          .status-ausente {
            color: #dc2626;
            font-weight: bold;
          }
          .status-pendiente {
            color: #d97706;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${titulo}</h1>
          ${subtitulo ? `<p class="subtitle">${subtitulo}</p>` : ''}
          
          <div class="metadata">
            <div class="metadata-item">
              <span class="metadata-label">Total de registros:</span> ${data.length}
            </div>
            <div class="metadata-item">
              <span class="metadata-label">Fecha de generación:</span> ${fecha}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                ${headersHTML}
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>

          <div class="footer">
            <p>Reporte generado automáticamente por SARA - Sistema de Gestión Académica</p>
            <p>© ${new Date().getFullYear()} - Todos los derechos reservados</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Crear el blob con codificación UTF-8
    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })

    // Descargar el archivo
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.xls`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error('Error al descargar Excel:', error)
    throw error
  }
}

/**
 * Función simplificada para descargar CSV como Excel
 * @param {string} csvContent - Contenido CSV
 * @param {string} filename - Nombre del archivo
 */
export const downloadCSVAsExcel = (csvContent, filename) => {
  const blob = new Blob(['\ufeff' + csvContent], {
    type: 'application/vnd.ms-excel;charset=utf-8'
  })
  
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.xls`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export default downloadExcel
