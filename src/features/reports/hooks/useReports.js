import { useState, useCallback } from 'react';
import { reportService } from '../services/reportService';

export const useReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = useCallback(async (reportType, filters = {}) => {
    setLoading(true);
    try {
      let data;
      switch (reportType) {
        case 'student-performance':
          data = await reportService.getStudentPerformanceReport(filters);
          break;
        case 'attendance':
          data = await reportService.getAttendanceReport(filters);
          break;
        case 'competencies':
          data = await reportService.getCompetenciesReport(filters);
          break;
        case 'practices':
          data = await reportService.getPracticesReport(filters);
          break;
        case 'courses':
          data = await reportService.getCourseReport(filters);
          break;
        case 'schedule':
          data = await reportService.getScheduleReport(filters);
          break;
        case 'instructors':
          data = await reportService.getInstructorReport(filters);
          break;
        case 'instructor-activity':
          data = await reportService.getInstructorActivityReport(filters);
          break;
        default:
          throw new Error('Unknown report type');
      }
      setReport(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportReport = useCallback(async (reportType, format = 'excel', filters = {}) => {
    setLoading(true);
    try {
      let blob;
      switch (format) {
        case 'excel':
          blob = await reportService.exportToExcel(reportType, filters);
          break;
        case 'word':
          blob = await reportService.exportToWord(reportType, filters);
          break;
        case 'pdf':
          blob = await reportService.exportToPdf(reportType, filters);
          break;
        default:
          throw new Error('Unknown format');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report.${format === 'word' ? 'docx' : format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    report,
    loading,
    error,
    fetchReport,
    exportReport,
  };
};
