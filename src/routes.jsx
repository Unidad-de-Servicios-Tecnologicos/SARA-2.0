import { createBrowserRouter, Navigate } from "react-router-dom"

import LandingPage from "@/features/landing/pages/LandingPage"
import LoginPage from "@/features/auth/pages/LoginPage"
import ProfilePage from "@/features/auth/pages/ProfilePage"
import AccessDeniedPage from "@/features/auth/pages/AccessDeniedPage"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import DashboardModulePage from "@/features/dashboard/pages/DashboardModulePage"
import { RecordsListPage, RecordDetailPage } from "@/features/records"
import { SchedulesRecordPage } from "@/features/schedules"
import AttendancePage from "@/features/attendance/pages/AttendancePage"
import LearnerDetailPage from "@/features/learners/pages/LearnerDetailPage"
import RendimientoPage from "@/features/learners/pages/RendimientoPage"
import RecordsPracticesPage from "@/features/practices/pages/RecordsPracticesPage"
import DocumentsPage from "@/features/documents/pages/DocumentsPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/landing" replace />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/perfil",
    element: <ProfilePage />,
  },
  {
    path: "/acceso-denegado",
    element: <AccessDeniedPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/horarios",
    element: <DashboardModulePage />,
  },
  {
    path: "/instructores",
    element: <DashboardModulePage />,
  },
  {
    path: "/fichas",
    element: <DashboardModulePage />,
  },
  {
    path: "/aprendices",
    element: <DashboardModulePage />,
  },
  {
    path: "/rendimiento",
    element: <DashboardModulePage />,
  },
  {
    path: "/asistencia",
    element: <DashboardModulePage />,
  },
  {
    path: "/ambientes",
    element: <DashboardModulePage />,
  },
  {
    path: "/reservas",
    element: <DashboardModulePage />,
  },
  {
    path: "/documentos",
    element: <DashboardModulePage />,
  },
  {
    path: "/practicas",
    element: <DashboardModulePage />,
  },
  {
    path: "/empresas",
    element: <DashboardModulePage />,
  },
  {
    path: "/seguimiento",
    element: <DashboardModulePage />,
  },
  {
    path: "/analytics",
    element: <DashboardModulePage />,
  },
  {
    path: "/configuracion",
    element: <DashboardModulePage />,
  },
  {
    path: "/records",
    element: <DashboardPage />,
  },
  {
    path: "/attendance/:fichaId",
    element: <AttendancePage />,
  },
  {
    path: "/schedules/ficha/:fichaNumero",
    element: <SchedulesRecordPage />,
  },
  {
    path: "/documents/:fichaId",
    element: <DocumentsPage />,
  },
  {
    path: "/learners/:fichaId",
    element: <LearnerDetailPage />,
  },
  {
    path: "/learners/rendimiento/:fichaId",
    element: <RendimientoPage />,
  },
  {
    path: "/practices/ficha/:fichaId",
    element: <RecordsPracticesPage />,
  },
  {
    path: "*",
    element: <h1>404 | Página no encontrada</h1>,
  },
])

