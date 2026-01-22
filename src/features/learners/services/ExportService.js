import * as XLSX from "xlsx";

export const ExportService = {
  exportToExcel: (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Aprendices");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  },
};
