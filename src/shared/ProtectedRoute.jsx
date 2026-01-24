import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuth";
import { usePermissionStore } from "@/features/auth/store/usePermissionStore";

export default function ProtectedRoute({ children, requiredRole, requiredModule }) {
  const user = useAuthStore((s) => s.user);
  const canAccessModule = usePermissionStore((s) => s.canAccessModule);
  const userRole = usePermissionStore((s) => s.userRole);

  // 1️⃣ Si no hay usuario logueado → Ir a login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2️⃣ Si se requiere un rol específico y no lo tiene
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // 3️⃣ Si se requiere acceso a un módulo específico
  if (requiredModule && !canAccessModule(requiredModule)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // ✅ Todo bien, mostrar componente
  return children;
}
