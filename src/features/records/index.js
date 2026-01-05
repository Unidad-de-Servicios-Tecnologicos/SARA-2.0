// Páginas
export { default as RecordsListPage } from "./pages/RecordsListPage";
export { default as RecordDetailPage } from "./pages/RecordDetailPage";

// Componentes
export { default as RecordKpis, RecordStatusSummary } from "./components/RecordKpis";
export { default as RecordSearch } from "./components/RecordSearch";
export { default as RecordsTable } from "./components/RecordsTable";
export { default as RecordInfo } from "./components/RecordInfo";
export { default as RecordDetailModal } from "./components/RecordDetailModal";
export { default as RecordAprendicesTab } from "./components/RecordAprendicesTab";
export { default as RecordRAPsTab } from "./components/RecordRAPsTab";
export { default as RecordNovedadesTab } from "./components/RecordNovedadesTab";
export { default as AddAprendizModal } from "./components/AddAprendizModal";
export { default as CreateFichaModal } from "./components/CreateFichaModal";
export { default as EditFichaModal } from "./components/EditFichaModal";

// Hooks
export {
  useFichas,
  useFichaDetail,
  useAprendicesFicha,
  useRAPsFicha,
  useNovedadesFicha,
  useRecordsKPIs,
  useCatalogos,
  useRecordsMutations,
} from "./hooks/UseRecords";

// Servicios
export { RecordsService, ApiRequest } from "./services/RecordsService";

// Mock data (para desarrollo)
export * from "./mock/records.mock";
