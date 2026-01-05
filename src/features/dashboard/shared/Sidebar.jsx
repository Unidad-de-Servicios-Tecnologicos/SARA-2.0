import { NavLink, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  ClipboardList,
  Calendar,
  CalendarCheck,
  FileText,
  LogOut,
  Settings,
  Diamond,
  Moon,
  Sun,
} from "lucide-react"
import { useAuthStore } from "@/features/auth/store/useAuth"
import { useThemeStore } from "../store/useTheme"
import { useDashboardNav } from "../store/useDashboardNav"

export default function Sidebar({ isExpanded = false, onCloseMobile }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  
  // Usar store de tema
  const darkMode = useThemeStore((s) => s.darkMode)
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode)
  const initTheme = useThemeStore((s) => s.init)
  
  // Usar store de navegación del dashboard
  const currentModule = useDashboardNav((s) => s.currentModule)
  const setCurrentModule = useDashboardNav((s) => s.setCurrentModule)

  // Inicializar tema al montar
  useEffect(() => {
    initTheme()
  }, [initTheme])

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, module: "dashboard" },
    { label: "Ambientes", icon: Building2, module: "ambientes" },
    { label: "Instructores", icon: Users, module: "instructores" },
    { label: "Aprendices", icon: UserCheck, module: "aprendices" },
    { label: "Fichas", icon: ClipboardList, module: "fichas" },
    { label: "Horarios", icon: Calendar, module: "horarios" },
    { label: "Reservas", icon: CalendarCheck, module: "reservas" },
    { label: "Documentos", icon: FileText, module: "documentos" },
    { label: "Prácticas", icon: Diamond, module: "practicas" },
    { label: "Configuración", icon: Settings, module: "configuracion" },
  ]

  const handleMenuClick = (module) => {
    setCurrentModule(module)
    navigate('/dashboard')
    onCloseMobile?.()
  }

  return (
    <aside className={`${isExpanded ? 'w-64' : 'w-16'} h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col items-center py-4 transition-all duration-300 overflow-y-auto`}>
      {/* Avatar de Perfil - Sincronizado con useAuthStore */}
      <div className="mb-4 shrink-0">
        <button 
          onClick={() => navigate('/perfil')}
          className="w-10 h-10 bg-linear-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-green-400 transition-all"
          title="Mi Perfil"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="35" r="20" fill="#3b82f6" />
              <circle cx="50" cy="35" r="16" fill="#60a5fa" />
              <ellipse cx="50" cy="85" rx="30" ry="20" fill="#9ca3af" />
              <circle cx="50" cy="42" r="12" fill="#fbbf24" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Icons */}
      <nav className="flex-1 flex flex-col items-center gap-1 w-full px-2 min-h-0 overflow-y-auto">
        {menu.map(({ label, icon, module }) => {
          const Icon = icon
          const isActive = currentModule === module
          return (
            <button
              key={label}
              onClick={() => handleMenuClick(module)}
              title={label}
              className={`${isExpanded ? 'w-full px-4' : 'w-10'} h-10 flex items-center ${isExpanded ? 'justify-start gap-3' : 'justify-center'} rounded-lg transition-colors
                ${isActive 
                  ? "bg-green-500 text-white" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"}`}
            >
              <Icon size={20} />
              {isExpanded && <span className="text-sm">{label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Luna/Sol para modo oscuro y Cerrar Sesión */}
      <div className="pt-2 shrink-0 flex flex-col items-center gap-1 border-t dark:border-gray-700 mt-2 w-full px-2">
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
        </button>

        {/* Cerrar Sesión */}
        <button 
          onClick={() => {
            logout()
            navigate('/auth/login')
          }}
          className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  )
}
