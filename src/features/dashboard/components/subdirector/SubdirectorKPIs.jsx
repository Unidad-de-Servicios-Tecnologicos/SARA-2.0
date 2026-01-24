import KPIBox from "../common/KPIBox"
import { useAuthStore } from "@/features/auth/store/useAuth";
import { usePermissionStore } from "@/features/auth/store/usePermissionStore";
import { ROLE_METADATA } from "@/config/permissions";

const kpiData = [
  { label: "Fichas", value: 97 },
  { label: "Instructores", value: 106 },
  { label: "RAP con No Aprobado", value: 3951 },
  { label: "Resultados por evaluar", value: 0 },
];

export default function SubdirectorKPIs() {
  const user = useAuthStore((s) => s.user);
  const userRole = usePermissionStore((s) => s.userRole);
  const roleInfo = ROLE_METADATA[userRole];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* Card de Bienvenida - Avatar a la derecha */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bienvenido</h2>
          <p className="text-gray-600 dark:text-gray-300 uppercase text-sm">
            <span>{roleInfo?.icon || "❓"}</span> {roleInfo?.label || userRole}
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Avatar SVG por defecto */}
              <circle cx="50" cy="35" r="20" fill="#3b82f6" />
              <circle cx="50" cy="35" r="16" fill="#60a5fa" />
              <ellipse cx="50" cy="85" rx="30" ry="20" fill="#9ca3af" />
              <circle cx="50" cy="42" r="12" fill="#fbbf24" />
            </svg>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPIBox
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
          />
        ))}
      </div>
    </div>
  )
}
