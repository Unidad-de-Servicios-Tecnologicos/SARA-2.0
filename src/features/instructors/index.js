// Pages
export { default as InstructorsListPage } from "./pages/InstructorsListPage";

// Components
export { default as InstructorKPIs } from "./components/InstructorKPIs";
export { default as InstructorTable } from "./components/InstructorTable";
export { default as CreateInstructorModal } from "./components/CreateInstructorModal";
export { default as EditInstructorModal } from "./components/EditInstructorModal";
export { default as InstructorDetailModal } from "./components/InstructorDetailModal";
export { default as InstructorSidePanel } from "./components/InstructorSidePanel";
export { default as InstructorFichasModal } from "./components/InstructorFichasModal";
export { default as InstructorActivitiesModal } from "./components/InstructorActivitiesModal";

// Hooks
export {
  useInstructores,
  useInstructorDetail,
  useFichasInstructor,
  useNovedadesInstructor,
  useInstructoresKPIs,
  useInstructoresCatalogos,
  useInstructoresMutations,
} from "./hooks/UseInstructors";

// Services
export { default as InstructorsService } from "./services/InstructorsService";
