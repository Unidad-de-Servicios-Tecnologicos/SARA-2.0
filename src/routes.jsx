import { createBrowserRouter, Navigate } from "react-router-dom"

import LandingPage from "@/features/landing/pages/LandingPage"
import LoginPage from "@/features/auth/pages/LoginPage"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"

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
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <h1>404 | Página no encontrada</h1>,
  },
])
