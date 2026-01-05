import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuth";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
