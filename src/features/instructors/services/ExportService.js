import jsPDF from 'jspdf';

/**
 * Servicio unificado para exportar información de múltiples módulos
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

  // ==========================================
  // INSTRUCTORES
  // ==========================================

  /**
   * Exportar información del instructor a PDF
   * @param {Object} instructor - Datos del instructor
   * @param {Array} fichas - Fichas asignadas
   */
  async exportInstructorPDF(instructor, fichas = []) {
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
      pdf.text('INFORMACIÓN DEL INSTRUCTOR', margin, 15);
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generado: ${this._formatDateTime()}`, pageWidth - margin, 20, { align: 'right' });

      yPosition = 45;

      // Información personal
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFORMACIÓN PERSONAL', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 60, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const infoPersonal = [
        [`Nombre:`, `${instructor.nombre} ${instructor.apellidos}`],
        [`Documento:`, `${instructor.tipoDocumento} - ${instructor.documento}`],
        [`Email:`, instructor.email],
        [`Celular:`, instructor.celular],
        [`Estado:`, instructor.estado.toUpperCase()],
        [`Área:`, instructor.area?.nombre || 'N/A'],
      ];

      infoPersonal.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(value || 'N/A', margin + 35, yPosition);
        yPosition += 10;
      });

      yPosition += 5;

      // Información laboral
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFORMACIÓN LABORAL', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 50, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const infoLaboral = [
        [`Tipo de Vinculación:`, instructor.tipoVinculacion?.toUpperCase() || 'N/A'],
        [`Rol:`, instructor.rol?.toUpperCase() || 'N/A'],
        [`Fecha de Ingreso:`, this._formatDate(instructor.fechaIngreso)],
        [`Sede:`, instructor.sede?.nombre || 'N/A'],
        [`Carga Horaria:`, `${instructor.cargaHoraria?.asignada || 0} horas`],
      ];

      infoLaboral.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, margin + 35, yPosition);
        yPosition += 10;
      });

      yPosition += 5;

      // Formación académica
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('FORMACIÓN ACADÉMICA', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 20, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const educacion = instructor.formacionAcademica || 'No especificada';
      const educacionLines = pdf.splitTextToSize(educacion, pageWidth - 2 * margin - 10);
      pdf.text(educacionLines, margin + 5, yPosition);
      yPosition += educacionLines.length * 6 + 5;

      // Certificaciones
      if (instructor.certificaciones && instructor.certificaciones.length > 0) {
        pdf.setTextColor(...primaryColor);
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.text('CERTIFICACIONES', margin, yPosition);
        yPosition += 8;

        pdf.setTextColor(...grayColor);
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        instructor.certificaciones.forEach((cert) => {
          pdf.text(`• ${cert}`, margin + 5, yPosition);
          yPosition += 6;
        });
        yPosition += 3;
      }

      // Fichas asignadas
      if (fichas && fichas.length > 0) {
        // Nueva página si no hay espacio
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setTextColor(...primaryColor);
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.text('FICHAS ASIGNADAS', margin, yPosition);
        yPosition += 8;

        fichas.forEach((ficha) => {
          pdf.setFillColor(...lightGray);
          pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, 18, 'F');

          pdf.setTextColor(...grayColor);
          pdf.setFontSize(9);
          pdf.setFont(undefined, 'bold');
          pdf.text(`Ficha: ${ficha.numero}`, margin + 5, yPosition);
          
          pdf.setFont(undefined, 'normal');
          pdf.text(`Programa: ${ficha.programa}`, margin + 5, yPosition + 6);
          pdf.text(`Rol: ${ficha.rol.toUpperCase()}`, margin + 5, yPosition + 12);

          yPosition += 22;

          // Nueva página si es necesario
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = margin;
          }
        });
      }

      // Guardar PDF
      pdf.save(`Instructor_${instructor.documento}.pdf`);

      return {
        success: true,
        message: 'PDF exportado correctamente'
      };
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      throw new Error('Error al exportar el archivo');
    }
  },

  /**
   * Exportar información del instructor a CSV
   * @param {Object} instructor - Datos del instructor
   */
  async exportInstructorCSV(instructor) {
    try {
      const csv = this._generateInstructorCSV(instructor);
      this._downloadCSV(csv, `Instructor_${instructor.documento}.csv`);

      return {
        success: true,
        message: 'CSV exportado correctamente'
      };
    } catch (error) {
      console.error('Error al exportar CSV:', error);
      throw new Error('Error al exportar el archivo');
    }
  },

  // ==========================================
  // HORARIOS
  // ==========================================

  /**
   * Exportar horario a Excel
   * @param {string} tipo - Tipo de exportación (instructor/ficha/ambiente)
   * @param {Object} datos - Datos a exportar
   */
  async exportScheduleExcel(tipo, datos) {
    try {
      const csv = this._generateScheduleCSV(tipo, datos);
      this._downloadCSV(csv, `Horario_${tipo}_${this._getDateForFilename()}.csv`);

      return {
        success: true,
        message: 'Horario exportado correctamente'
      };
    } catch (error) {
      console.error('Error al exportar horario:', error);
      throw new Error('Error al exportar el archivo');
    }
  },

  /**
   * Exportar lista de aprendices a Excel
   * @param {Array} aprendices - Lista de aprendices
   * @param {string} fichaNumero - Número de ficha
   */
  async exportAprendicesList(aprendices, fichaNumero = '') {
    try {
      const csv = this._generateAprendicesCSV(aprendices, fichaNumero);
      this._downloadCSV(csv, `Aprendices_${fichaNumero}_${this._getDateForFilename()}.csv`);

      return {
        success: true,
        message: 'Lista de aprendices exportada correctamente'
      };
    } catch (error) {
      console.error('Error al exportar aprendices:', error);
      throw new Error('Error al exportar el archivo');
    }
  },

  /**
   * Exportar plan de trabajo a PDF
   * @param {Object} plan - Datos del plan de trabajo
   */
  async exportPlanTrabajoPDF(plan) {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      let yPosition = margin;

      // Colores
      const primaryColor = [41, 128, 185];
      const grayColor = [108, 117, 125];
      const lightGray = [240, 240, 240];

      // Header
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('PLAN DE TRABAJO', margin, 15);
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generado: ${this._formatDateTime()}`, pageWidth - margin, 20, { align: 'right' });

      yPosition = 45;

      // Contenido del plan
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFORMACIÓN DEL PLAN', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 45, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const planInfo = [
        [`Competencia:`, plan.competencia || 'N/A'],
        [`Ambiente:`, plan.ambiente || 'N/A'],
        [`Hora Inicio:`, plan.horaInicio || 'N/A'],
        [`Hora Fin:`, plan.horaFin || 'N/A'],
        [`Total Actividades:`, (plan.actividades || []).length],
      ];

      planInfo.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(String(value), margin + 35, yPosition);
        yPosition += 9;
      });

      yPosition += 5;

      // Actividades
      if (plan.actividades && plan.actividades.length > 0) {
        pdf.setTextColor(...primaryColor);
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.text('ACTIVIDADES', margin, yPosition);
        yPosition += 8;

        pdf.setTextColor(...grayColor);
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');
        plan.actividades.forEach((actividad, idx) => {
          if (actividad.trim()) {
            pdf.text(`${idx + 1}. ${actividad}`, margin + 5, yPosition);
            yPosition += 6;
          }
        });
      }

      pdf.save(`Plan_Trabajo_${this._getDateForFilename()}.pdf`);

      return {
        success: true,
        message: 'Plan de trabajo exportado correctamente'
      };
    } catch (error) {
      console.error('Error al exportar plan de trabajo:', error);
      throw new Error('Error al exportar el archivo');
    }
  },

  // ==========================================
  // HELPERS PRIVADOS
  // ==========================================

  /**
   * Obtener fecha para nombre de archivo
   */
  _getDateForFilename() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  /**
   * Generar contenido CSV para instructor
   */
  _generateInstructorCSV(instructor) {
    const headers = [
      'Campo',
      'Valor'
    ];

    const data = [
      ['Nombre', `${instructor.nombre} ${instructor.apellidos}`],
      ['Documento', `${instructor.tipoDocumento} - ${instructor.documento}`],
      ['Email', instructor.email],
      ['Celular', instructor.celular],
      ['Estado', instructor.estado],
      ['Área', instructor.area?.nombre || 'N/A'],
      ['Tipo de Vinculación', instructor.tipoVinculacion],
      ['Rol', instructor.rol],
      ['Fecha de Ingreso', this._formatDate(instructor.fechaIngreso)],
      ['Sede', instructor.sede?.nombre || 'N/A'],
      ['Carga Horaria', instructor.cargaHoraria?.asignada || 0],
      ['Formación Académica', instructor.formacionAcademica || 'N/A'],
      ['Certificaciones', (instructor.certificaciones || []).join('; ')],
    ];

    const rows = [
      headers.join(';'),
      ...data.map(row => row.map(cell => `"${cell}"`).join(';'))
    ];

    return rows.join('\r\n');
  },

  /**
   * Generar contenido CSV para horario
   */
  _generateScheduleCSV(tipo, datos) {
    const headers = tipo === 'instructor' 
      ? ['Instructor', 'Dia', 'Hora Inicio', 'Hora Fin', 'Competencia', 'Ambiente']
      : ['Ficha', 'Dia', 'Hora Inicio', 'Hora Fin', 'Competencia', 'Instructor'];

    const mapKey = tipo === 'instructor' 
      ? { 'Instructor': 'instructor', 'Dia': 'dia', 'Hora Inicio': 'horaInicio', 'Hora Fin': 'horaFin', 'Competencia': 'competencia', 'Ambiente': 'ambiente' }
      : { 'Ficha': 'ficha', 'Dia': 'dia', 'Hora Inicio': 'horaInicio', 'Hora Fin': 'horaFin', 'Competencia': 'competencia', 'Instructor': 'instructor' };

    const rows = [
      headers.join(';'),
      ...(datos || []).map(item => 
        headers.map(h => {
          const key = mapKey[h];
          const value = (item[key] || '').toString().trim();
          return value.includes(';') || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(';')
      )
    ];

    return rows.join('\r\n');
  },

  /**
   * Generar contenido CSV para aprendices
   */
  _generateAprendicesCSV(aprendices) {
    const headers = ['Documento', 'Nombre', 'Apellidos', 'Email', 'Teléfono', 'Estado'];
    const mapKey = {
      'Documento': 'documento',
      'Nombre': 'nombre',
      'Apellidos': 'apellidos',
      'Email': 'email',
      'Teléfono': 'telefono',
      'Estado': 'estado'
    };

    const rows = [
      headers.join(';'),
      ...(aprendices || []).map(aprendiz => 
        headers.map(h => {
          const key = mapKey[h];
          const value = (aprendiz[key] || '').toString().trim();
          return value.includes(';') || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(';')
      )
    ];

    return rows.join('\r\n');
  },

  /**
   * Exportar dashboard a PDF
   */
  async exportDashboardPDF(data, filename = "dashboard-report") {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      let yPosition = margin;

      // Colores
      const primaryColor = [41, 128, 185]; // Azul
      const grayColor = [108, 117, 125]; // Gris
      const lightGray = [240, 240, 240]; // Gris claro

      // Header
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 30, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('REPORTE DEL DASHBOARD', margin, 15);
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generado: ${this._formatDateTime()}`, pageWidth - margin, 20, { align: 'right' });

      yPosition = 40;

      // Resumen de datos
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('RESUMEN DE DATOS', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 50, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const dashboardData = [
        ['Fichas:', data?.fichas || '0'],
        ['Instructores:', data?.instructores || '0'],
        ['RAP No Aprobado:', data?.rapNoAprobado || '0'],
        ['Resultados Por Evaluar:', data?.resultadosPorEvaluar || '0'],
      ];

      dashboardData.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(String(value), margin + 60, yPosition);
        yPosition += 10;
      });

      yPosition += 10;

      // Footer
      pdf.setTextColor(...grayColor);
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.text('Este documento fue generado automáticamente por el sistema SARA', margin, pageWidth - 10, { align: 'left' });

      pdf.save(`${filename}.pdf`);
    } catch (error) {
      throw new Error(`Error al exportar PDF: ${error.message}`);
    }
  },

  /**
   * Exportar dashboard a Excel
   */
  async exportDashboardExcel(data, filename = "dashboard-report") {
    try {
      // Crear CSV con formato compatible con Excel
      const headers = ['Métrica', 'Valor'];
      const rows = [
        headers.join(','),
        ['Fichas', data?.fichas || '0'].join(','),
        ['Instructores', data?.instructores || '0'].join(','),
        ['RAP No Aprobado', data?.rapNoAprobado || '0'].join(','),
        ['Resultados Por Evaluar', data?.resultadosPorEvaluar || '0'].join(','),
        ['Fecha Generación', this._formatDateTime()].join(','),
      ];

      const csv = rows.join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.xlsx`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error(`Error al exportar Excel: ${error.message}`);
    }
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

  // ==========================================
  // FICHAS (RECORDS)
  // ==========================================

  /**
   * Exportar lista de fichas a PDF
   */
  async exportFichasPDF(fichas = [], filename = "fichas-export") {
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      let yPosition = margin;

      // Colores
      const primaryColor = [41, 128, 185];
      const grayColor = [108, 117, 125];
      const lightGray = [240, 240, 240];
      const rowHeight = 6;

      // Header
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('LISTADO DE FICHAS', margin, 12);
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generado: ${this._formatDateTime()}`, pageWidth - margin, 12, { align: 'right' });

      yPosition = 30;

      // Definir columnas y anchos
      const cols = ['Código', 'Nombre', 'Instructor', 'Aprend.', 'Estado', 'Inicio', 'Cierre'];
      const colWidths = [22, 45, 35, 15, 25, 25, 25];
      const colX = [margin];
      for (let i = 0; i < cols.length - 1; i++) {
        colX.push(colX[i] + colWidths[i]);
      }

      // Header de tabla
      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, rowHeight, 'F');
      
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'bold');

      cols.forEach((col, i) => {
        pdf.text(col, colX[i] + 1, yPosition, { maxWidth: colWidths[i] - 2 });
      });

      yPosition += rowHeight + 1;

      // Datos
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(...grayColor);
      pdf.setFontSize(8);

      fichas.forEach((ficha, idx) => {
        if (yPosition > pageHeight - 15) {
          pdf.addPage();
          yPosition = margin;
        }

        // Fondo alternado para legibilidad
        if (idx % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, rowHeight, 'F');
        }

        const data = [
          ficha.codigo || 'N/A',
          ficha.nombre || 'N/A',
          ficha.instructor?.nombre || 'N/A',
          String(ficha.aprendices?.length || 0),
          ficha.estado || 'N/A',
          this._formatDate(ficha.fechaInicio) || 'N/A',
          this._formatDate(ficha.fechaCierre) || 'N/A'
        ];

        data.forEach((cell, i) => {
          const text = String(cell).substring(0, 20);
          pdf.text(text, colX[i] + 1, yPosition, { maxWidth: colWidths[i] - 2 });
        });

        yPosition += rowHeight + 0.5;
      });

      pdf.save(`${filename}.pdf`);
    } catch (error) {
      throw new Error(`Error al exportar PDF: ${error.message}`);
    }
  },

  /**
   * Exportar lista de fichas a Excel
   */
  async exportFichasExcel(fichas = [], filename = "fichas-export") {
    try {
      const headers = ['Código', 'Nombre', 'Instructor', 'Aprendices', 'Estado', 'Inicio', 'Cierre'];
      const rows = [
        headers.join(';'),
        ...(fichas || []).map(ficha => {
          const values = [
            ficha.codigo || 'N/A',
            ficha.nombre || 'N/A',
            ficha.instructor?.nombre || 'N/A',
            (ficha.aprendices?.length || 0).toString(),
            ficha.estado || 'N/A',
            this._formatDate(ficha.fechaInicio),
            this._formatDate(ficha.fechaCierre)
          ];
          
          return values.map(v => {
            const val = v.toString().trim();
            return val.includes(';') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
          }).join(';');
        })
      ];

      const csv = rows.join('\r\n');
      // Agregar BOM para UTF-8 (necesario para Excel interprete acentos)
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error(`Error al exportar Excel: ${error.message}`);
    }
  },

  /**
   * Exportar detalle de ficha a PDF
   */
  async exportFichaDetailPDF(ficha = {}, filename = "ficha-detail") {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      let yPosition = margin;

      // Colores
      const primaryColor = [41, 128, 185];
      const grayColor = [108, 117, 125];
      const lightGray = [240, 240, 240];

      // Header
      pdf.setFillColor(...primaryColor);
      pdf.rect(0, 0, pageWidth, 30, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('DETALLE DE FICHA', margin, 15);
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generado: ${this._formatDateTime()}`, pageWidth - margin, 20, { align: 'right' });

      yPosition = 45;

      // Información básica
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('INFORMACIÓN BÁSICA', margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(...lightGray);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 50, 'F');

      pdf.setTextColor(...grayColor);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const basicInfo = [
        ['Código:', ficha.codigo || 'N/A'],
        ['Nombre:', ficha.nombre || 'N/A'],
        ['Instructor:', ficha.instructor?.nombre || 'N/A'],
        ['Estado:', ficha.estado || 'N/A'],
        ['Inicio:', this._formatDate(ficha.fechaInicio)],
      ];

      basicInfo.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, margin + 5, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, margin + 35, yPosition);
        yPosition += 10;
      });

      yPosition += 10;

      // Aprendices
      pdf.setTextColor(...primaryColor);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('APRENDICES', margin, yPosition);
      yPosition += 5;

      const aprendices = ficha.aprendices || [];
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(...grayColor);
      
      if (aprendices.length > 0) {
        aprendices.slice(0, 10).forEach((aprendiz) => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(`• ${aprendiz.nombre} ${aprendiz.apellidos}`, margin + 5, yPosition);
          yPosition += 5;
        });
        
        if (aprendices.length > 10) {
          pdf.text(`... y ${aprendices.length - 10} más`, margin + 5, yPosition);
        }
      } else {
        pdf.text('No hay aprendices asignados', margin + 5, yPosition);
      }

      pdf.save(`${filename}.pdf`);
    } catch (error) {
      throw new Error(`Error al exportar PDF: ${error.message}`);
    }
  },

  /**
   * Exportar detalle de ficha a Excel
   */
  async exportFichaDetailExcel(ficha = {}, filename = "ficha-detail") {
    try {
      const formatValue = (v) => {
        const val = v.toString().trim();
        return val.includes(';') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
      };

      const rows = [
        ['Campo', 'Valor'].map(v => formatValue(v)).join(';'),
        ['Código', formatValue(ficha.codigo || 'N/A')].join(';'),
        ['Nombre', formatValue(ficha.nombre || 'N/A')].join(';'),
        ['Instructor', formatValue(ficha.instructor?.nombre || 'N/A')].join(';'),
        ['Estado', formatValue(ficha.estado || 'N/A')].join(';'),
        ['Inicio', formatValue(this._formatDate(ficha.fechaInicio))].join(';'),
        ['Cierre', formatValue(this._formatDate(ficha.fechaCierre))].join(';'),
        ['Total Aprendices', formatValue((ficha.aprendices?.length || 0).toString())].join(';'),
        ['', ''].join(';'),
        ['Aprendices', ''].join(';'),
        ...((ficha.aprendices || []).map(a => 
          [
            formatValue(`${a.nombre} ${a.apellidos}`),
            formatValue(a.email || '')
          ].join(';')
        ))
      ];

      const csv = rows.join('\r\n');
      // Agregar BOM para UTF-8
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error(`Error al exportar Excel: ${error.message}`);
    }
  }
};
