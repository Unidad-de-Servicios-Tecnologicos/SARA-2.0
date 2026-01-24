import jsPDF from 'jspdf';

/**
 * Servicio para exportar horarios y reportes de ambientes
 */
export const ExportService = {
  /**
   * Formato de fecha
   */
  _formatDate(date) {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  },

  /**
   * Formato de fecha y hora
   */
  _formatDateTime(date = new Date()) {
    const d = new Date(date);
    const dateStr = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    return `${dateStr} ${timeStr}`;
  },

  /**
   * Obtener fecha para nombre de archivo
   */
  _getDateForFilename() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  },

  /**
   * Descargar archivo CSV
   */
  _downloadCSV(csv, filename) {
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Exportar horario a Excel (CSV)
   * @param {string} ambienteName - Nombre del ambiente
   * @param {string} sedeId - ID de la sede
   * @param {number} capacity - Capacidad del ambiente
   * @param {string} type - Tipo de ambiente
   * @param {number} hoursScheduled - Horas programadas
   * @param {Array} schedule - Datos del horario semanal
   */
  async exportScheduleExcel(ambienteName, sedeId, capacity, type, hoursScheduled, schedule = []) {
    try {
      const csv = this._generateScheduleCSV(ambienteName, sedeId, capacity, type, hoursScheduled, schedule);
      this._downloadCSV(csv, `Horario_${sedeId}_${this._getDateForFilename()}.csv`);

      return {
        success: true,
        message: 'Horario exportado a Excel correctamente'
      };
    } catch (error) {
      console.error('Error al exportar horario:', error);
      throw new Error('Error al exportar el archivo Excel');
    }
  },

  /**
   * Exportar informe de ocupación a PDF
   * @param {string} ambienteName - Nombre del ambiente
   * @param {string} sedeId - ID de la sede
   * @param {string} sedeName - Nombre de la sede
   * @param {string} type - Tipo de ambiente
   * @param {number} capacity - Capacidad del ambiente
   * @param {number} hoursScheduled - Horas programadas
   */
  async exportReportPDF(ambienteName, sedeId, sedeName, type, capacity, hoursScheduled) {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      // Colores
      const primaryColor = [41, 128, 185]; // Azul
      const grayColor = [108, 117, 125]; // Gris
      const lightGray = [240, 240, 240]; // Gris claro

      // Header
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFORME DE OCUPACIÓN - AMBIENTE', margin, 15);
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generado: ${this._formatDateTime()}`, pageWidth - margin, 20, { align: 'right' });

      yPosition = 45;

      // Sección: Información del Ambiente
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFORMACIÓN DEL AMBIENTE', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 60, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const ambientInfo = [
        [`Nombre:`, ambienteName],
        [`ID Ambiente:`, sedeId],
        [`Sede:`, sedeName],
        [`Tipo:`, type],
        [`Capacidad:`, `${capacity} personas`],
      ];

      ambientInfo.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(String(value), margin + 35, yPosition);
        yPosition += 10;
      });

      yPosition += 5;

      // Sección: Reporte de Ocupación
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('REPORTE DE OCUPACIÓN', margin, yPosition);
      yPosition += 8;

      // Datos de ocupación
      const totalHours = 168; // Horas en una semana
      const occupancyPercentage = ((hoursScheduled / totalHours) * 100).toFixed(2);
      const freeHours = totalHours - hoursScheduled;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 50, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const occupancyData = [
        [`Período:`, '1-7 Septiembre 2025'],
        [`Total Horas Programadas:`, `${hoursScheduled}h`],
        [`Total Horas Disponibles:`, `${totalHours}h`],
        [`Porcentaje de Ocupación:`, `${occupancyPercentage}%`],
        [`Horas Libres:`, `${freeHours}h`],
      ];

      occupancyData.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(String(value), margin + 35, yPosition);
        yPosition += 10;
      });

      yPosition += 5;

      // Sección: Resumen por Día
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('RESUMEN POR DÍA', margin, yPosition);
      yPosition += 8;

      const dailyData = [
        { day: 'Lunes', hours: 4, status: 'En uso' },
        { day: 'Martes', hours: 0, status: 'Disponible' },
        { day: 'Miércoles', hours: 4, status: 'En uso' },
        { day: 'Jueves', hours: 0, status: 'Disponible' },
        { day: 'Viernes', hours: 4, status: 'En uso' },
        { day: 'Sábado', hours: 0, status: 'Cerrado' },
        { day: 'Domingo', hours: 0, status: 'Cerrado' }
      ];

      // Tabla de días
      pdf.setFillColor(41, 128, 185);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'bold');

      // Headers
      pdf.rect(margin, yPosition - 5, 30, 7, 'F');
      pdf.text('DÍA', margin + 2, yPosition);
      
      pdf.rect(margin + 30, yPosition - 5, 30, 7, 'F');
      pdf.text('HORAS', margin + 32, yPosition);
      
      pdf.rect(margin + 60, yPosition - 5, pageWidth - 2 * margin - 60, 7, 'F');
      pdf.text('ESTADO', margin + 62, yPosition);

      yPosition += 7;

      // Filas
      pdf.setTextColor(...grayColor);
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(8);

      dailyData.forEach((item, index) => {
        const bgColor = index % 2 === 0 ? [245, 245, 245] : [255, 255, 255];
        pdf.setFillColor(...bgColor);
        pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 6, 'F');

        pdf.text(item.day, margin + 2, yPosition);
        pdf.text(`${item.hours}h`, margin + 32, yPosition);
        pdf.text(item.status, margin + 62, yPosition);

        yPosition += 6;
      });

      yPosition += 5;

      // Recomendaciones
      if (occupancyPercentage < 50) {
        pdf.setTextColor(200, 100, 0);
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(10);
        pdf.text('⚠ RECOMENDACIÓN', margin, yPosition);
        yPosition += 5;
        pdf.setTextColor(...grayColor);
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        pdf.text(`El ambiente presenta baja ocupación (${occupancyPercentage}%). Considere aumentar el uso del espacio.`, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
      }

      // Footer
      yPosition = pageHeight - 20;
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(8);
      pdf.text('© 2025 Sistema SARA - Reporte Generado Automáticamente', margin, yPosition);
      pdf.text(`Página 1 de 1`, pageWidth - margin, yPosition, { align: 'right' });

      pdf.save(`Informe_Ocupacion_${sedeId}_${this._getDateForFilename()}.pdf`);

      return {
        success: true,
        message: 'Informe exportado a PDF correctamente'
      };
    } catch (error) {
      console.error('Error al exportar informe:', error);
      throw new Error('Error al exportar el archivo PDF');
    }
  },

  /**
   * Generar contenido CSV para horario
   */
  _generateScheduleCSV(ambienteName, sedeId, capacity, type, hoursScheduled, schedule) {
    const headers = ['Día', 'Hora Inicio', 'Hora Fin', 'Competencia', 'Estado'];
    
    const defaultSchedule = [
      { day: 'Lunes', startTime: '08:00', endTime: '12:00', competence: 'Desarrollo', status: 'En uso' },
      { day: 'Martes', startTime: '-', endTime: '-', competence: '-', status: 'Disponible' },
      { day: 'Miércoles', startTime: '08:00', endTime: '12:00', competence: 'Desarrollo', status: 'En uso' },
      { day: 'Jueves', startTime: '-', endTime: '-', competence: '-', status: 'Disponible' },
      { day: 'Viernes', startTime: '08:00', endTime: '12:00', competence: 'Desarrollo', status: 'En uso' },
      { day: 'Sábado', startTime: '-', endTime: '-', competence: '-', status: 'Cerrado' },
      { day: 'Domingo', startTime: '-', endTime: '-', competence: '-', status: 'Cerrado' }
    ];

    const scheduleData = schedule.length > 0 ? schedule : defaultSchedule;

    const rows = [
      `Ambiente: ${ambienteName}`,
      `Sede: ${sedeId}`,
      `Capacidad: ${capacity}`,
      `Tipo: ${type}`,
      `Horas Programadas: ${hoursScheduled}h`,
      `Generado: ${this._formatDateTime()}`,
      '',
      headers.join(';'),
      ...scheduleData.map(item => 
        [
          item.day || '',
          item.startTime || '',
          item.endTime || '',
          item.competence || '',
          item.status || ''
        ].map(val => {
          const value = String(val).trim();
          return value.includes(';') || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(';')
      )
    ];

    return rows.join('\r\n');
  }
};

export default ExportService;
