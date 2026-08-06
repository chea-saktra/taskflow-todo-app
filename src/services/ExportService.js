class ExportService {
  exportJSON(data, filename = "tasks.json") {}

  exportCSV(data, filename = "tasks.csv") {}
}

export const exportService = new ExportService();
