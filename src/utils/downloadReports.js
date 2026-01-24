import ExcelJS from 'exceljs'
import jsPDF from 'jspdf'
import 'jspdf/dist/jspdf.umd.min.js'

/**
 * Utilidad Unificada para Descargas Profesionales
 * Soporta múltiples formatos: Excel y PDF
 * Mantiene consistencia de diseño en todos los módulos
 */

/**
 * Función principal de descarga multi-formato
 * @param {Array} data - Array de objetos con los datos
 * @param {Array} columns - Array de {key, label}
 * @param {string} titulo - Título del reporte
 * @param {string} filename - Nombre del archivo
 * @param {string} format - Formato: 'excel', 'pdf'
 * @param {Object} options - Opciones adicionales
 */
export const downloadReport = async (data, columns, titulo, filename, format = 'excel', options = {}) => {
  const {
    subtitulo = '',
    fecha = new Date().toLocaleDateString('es-CO')
  } = options

  if (!data || data.length === 0) {
    throw new Error('No hay datos para descargar')
  }

  switch (format.toLowerCase()) {
    case 'excel':
    case 'xls':
    case 'xlsx':
      return await downloadExcel(data, columns, titulo, filename, { subtitulo, fecha })
    case 'pdf':
      return downloadPDF(data, columns, titulo, filename, { subtitulo, fecha })
    default:
      throw new Error(`Formato no soportado: ${format}`)
  }
}

/**
 * Descarga datos en formato Excel usando ExcelJS
 * Genera un verdadero archivo XLSX con estilos profesionales
 */
const downloadExcel = async (data, columns, titulo, filename, options = {}) => {
  const { subtitulo = '', fecha = new Date().toLocaleDateString('es-CO') } = options

  try {
    // Crear workbook
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Datos')

    // Estilos
    const headerStyle = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } },
      font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      border: {
        top: { style: 'thin', color: { argb: 'FF1E40AF' } },
        left: { style: 'thin', color: { argb: 'FF1E40AF' } },
        bottom: { style: 'thin', color: { argb: 'FF1E40AF' } },
        right: { style: 'thin', color: { argb: 'FF1E40AF' } }
      }
    }

    const dataStyle = {
      alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
      border: {
        top: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        left: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        right: { style: 'thin', color: { argb: 'FFD1D5DB' } }
      },
      font: { size: 11 }
    }

    // Agregar título y subtítulo
    let currentRow = 1
    const titleCell = worksheet.getCell(`A${currentRow}`)
    titleCell.value = titulo
    titleCell.font = { bold: true, size: 16, color: { argb: 'FF1F2937' } }
    worksheet.mergeCells(`A${currentRow}:${String.fromCharCode(64 + columns.length)}${currentRow}`)
    currentRow++

    if (subtitulo) {
      const subtitleCell = worksheet.getCell(`A${currentRow}`)
      subtitleCell.value = subtitulo
      subtitleCell.font = { size: 12, color: { argb: 'FF6B7280' } }
      worksheet.mergeCells(`A${currentRow}:${String.fromCharCode(64 + columns.length)}${currentRow}`)
      currentRow++
    }

    // Agregar información
    currentRow++
    const infoCell = worksheet.getCell(`A${currentRow}`)
    infoCell.value = `Total de registros: ${data.length} | Fecha: ${fecha}`
    infoCell.font = { size: 11, color: { argb: 'FF374151' } }
    infoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9FAFB' } }
    worksheet.mergeCells(`A${currentRow}:${String.fromCharCode(64 + columns.length)}${currentRow}`)
    currentRow += 2

    // Agregar encabezados
    const headerRow = currentRow
    columns.forEach((col, idx) => {
      const cell = worksheet.getCell(headerRow, idx + 1)
      cell.value = col.label
      Object.assign(cell, headerStyle)
    })
    currentRow++

    // Agregar datos
    data.forEach((row, idx) => {
      columns.forEach((col, colIdx) => {
        const cell = worksheet.getCell(currentRow, colIdx + 1)
        cell.value = row[col.key] || '-'
        Object.assign(cell, dataStyle)

        // Colorear filas alternadas
        if (idx % 2 === 0) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } }
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } }
        }
      })
      currentRow++
    })

    // Ajustar ancho de columnas
    columns.forEach((col, idx) => {
      const column = worksheet.getColumn(idx + 1)
      column.width = Math.min(25, Math.max(15, col.label.length + 5))
    })

    // Descargar
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    triggerDownload(blob, `${filename}.xlsx`)
    return true
  } catch (error) {
    console.error('Error al descargar Excel:', error)
    throw error
  }
}

/**
 * Descarga datos en formato PDF usando jsPDF y html2canvas
 * Genera un PDF profesional con la tabla formateada
 */
const downloadPDF = (data, columns, titulo, filename, options = {}) => {
  const { subtitulo = '', fecha = new Date().toLocaleDateString('es-CO') } = options

  try {
    // Crear PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    // Variables para posicionamiento
    let yPosition = 15
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10

    // Agregar título
    pdf.setFontSize(16)
    pdf.setTextColor(31, 41, 55) // #1f2937
    pdf.text(titulo, margin, yPosition)
    yPosition += 10

    // Agregar subtítulo
    if (subtitulo) {
      pdf.setFontSize(11)
      pdf.setTextColor(107, 114, 128) // #6b7280
      pdf.text(subtitulo, margin, yPosition)
      yPosition += 8
    }

    // Agregar información de fecha y total
    pdf.setFontSize(10)
    pdf.setTextColor(55, 65, 81) // #374151
    pdf.text(`Total de registros: ${data.length}`, margin, yPosition)
    pdf.text(`Fecha: ${fecha}`, pageWidth - margin - 40, yPosition)
    yPosition += 12

    // Configurar tabla
    const tableData = [
      columns.map(col => col.label), // Encabezados
      ...data.map(row => 
        columns.map(col => String(row[col.key] || '-'))
      )
    ]

    // Agregar tabla con autoTable
    const tableOptions = {
      startY: yPosition,
      margin: margin,
      head: [tableData[0]],
      body: tableData.slice(1),
      headStyles: {
        fillColor: [37, 99, 235], // #2563eb
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle',
        fontSize: 11,
        border: 1
      },
      bodyStyles: {
        textColor: [31, 41, 55],
        fontSize: 10,
        border: 1
      },
      alternateRowStyles: {
        fillColor: [243, 244, 246] // #f3f4f6
      },
      columnStyles: columns.reduce((acc, col, idx) => {
        acc[idx] = { halign: 'left', valign: 'middle' }
        return acc
      }, {}),
      didDrawPage: function() {
        // Footer
        const footerText = `© ${new Date().getFullYear()} - SARA Sistema de Gestión Académica`
        pdf.setFontSize(9)
        pdf.setTextColor(107, 114, 128)
        pdf.text(
          footerText,
          pageWidth / 2,
          pageHeight - 8,
          { align: 'center' }
        )
      }
    }

    // Usar autoTable si está disponible en jsPDF
    if (pdf.autoTable) {
      pdf.autoTable(tableOptions)
    } else {
      // Fallback: crear tabla manual si no está disponible autoTable
      createManualTable(pdf, tableData, columns, margin, yPosition)
    }

    // Descargar
    pdf.save(`${filename}.pdf`)
    return true
  } catch (error) {
    console.error('Error al descargar PDF:', error)
    throw error
  }
}

/**
 * Función auxiliar para crear tabla manualmente en PDF
 */
const createManualTable = (pdf, tableData, columns, margin, yPosition) => {
  const pageHeight = pdf.internal.pageSize.getHeight()
  const colWidth = (pdf.internal.pageSize.getWidth() - 2 * margin) / columns.length
  let currentY = yPosition
  const rowHeight = 8

  // Encabezados
  pdf.setFillColor(37, 99, 235)
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(11)
  pdf.setFont(undefined, 'bold')

  columns.forEach((col, idx) => {
    pdf.rect(margin + idx * colWidth, currentY, colWidth, rowHeight, 'FD')
    pdf.text(
      col.label.substring(0, 20),
      margin + idx * colWidth + 2,
      currentY + rowHeight - 2
    )
  })
  currentY += rowHeight

  // Datos
  pdf.setTextColor(31, 41, 55)
  pdf.setFont(undefined, 'normal')
  pdf.setFontSize(10)

  tableData.slice(1).forEach((row, rowIdx) => {
    if (currentY > pageHeight - 20) {
      pdf.addPage()
      currentY = margin
    }

    const bgColor = rowIdx % 2 === 0 ? [255, 255, 255] : [243, 244, 246]
    pdf.setFillColor(...bgColor)

    row.forEach((cell, colIdx) => {
      pdf.rect(margin + colIdx * colWidth, currentY, colWidth, rowHeight, 'FD')
      pdf.text(
        String(cell).substring(0, 20),
        margin + colIdx * colWidth + 2,
        currentY + rowHeight - 2
      )
    })
    currentY += rowHeight
  })
}

/**
 * Función auxiliar para trigger descarga
 */
const triggerDownload = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Exportar funciones individuales para compatibilidad
 */
export const downloadExcelReport = (data, columns, titulo, filename, options = {}) => {
  return downloadReport(data, columns, titulo, filename, 'excel', options)
}

export const downloadPDFReport = (data, columns, titulo, filename, options = {}) => {
  return downloadReport(data, columns, titulo, filename, 'pdf', options)
}

export default downloadReport
