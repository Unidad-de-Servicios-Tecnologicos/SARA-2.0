import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";
import { usePermissionStore } from "@/features/auth/store/usePermissionStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/card";
import { showToast, showAlert } from "@/shared/notifications";
import Sidebar from "@/features/dashboard/shared/Sidebar";
import DashboardHeader from "@/features/dashboard/shared/DashboardHeader";
import InternalFooter from "@/features/dashboard/shared/InternalFooter";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  LogOut, 
  Eye, 
  EyeOff,
  User,
  Lock,
  Shield,
  CheckCircle,
  Edit2,
  X,
  Camera
} from "lucide-react";
import { ROLE_METADATA } from "@/config/permissions";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const updateAvatar = useAuthStore((s) => s.updateAvatar);
  const userRole = usePermissionStore((s) => s.userRole);
  
  // Estados para sidebar
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estados para edición
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Datos del perfil
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    city: user?.city || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Si no hay usuario, redirigir a login
  if (!user) {
    navigate("/auth/login", { replace: true });
    return null;
  }

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSavePersonalInfo = async () => {
    // Validación de campos requeridos
    if (!formData.phone.trim() || !formData.city.trim()) {
      showAlert.warning("Teléfono y ciudad son campos requeridos");
      return;
    }

    setIsSaving(true);
    try {
      // Simular guardado (en producción, hacer llamada a API)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      showToast.success("Información personal actualizada correctamente");
      setIsEditingInfo(false);
    } catch {
      showToast.error("Error al actualizar información personal");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    // Validaciones
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      showAlert.warning("Por favor completa todos los campos de contraseña");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showAlert.warning("Las contraseñas nuevas no coinciden");
      return;
    }

    if (formData.newPassword.length < 6) {
      showAlert.warning("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    const confirmed = await showAlert.confirm(
      "¿Estás seguro de que deseas cambiar tu contraseña?"
    );

    if (!confirmed) return;

    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      showToast.success("Contraseña cambiada correctamente");
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch {
      showToast.error("Error al cambiar la contraseña");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const confirmed = await showAlert.confirm(
      "¿Deseas cerrar sesión?"
    );

    if (confirmed) {
      logout();
      navigate("/auth/login", { replace: true });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      showAlert.warning('Por favor selecciona un archivo de imagen');
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert.warning('La imagen debe ser menor a 5MB');
      return;
    }

    // Crear preview y actualizar en store global
    const reader = new FileReader();
    reader.onloadend = () => {
      const avatarDataUrl = reader.result;
      updateAvatar(avatarDataUrl);
      showToast.success('Foto de perfil actualizada en todos los módulos');
      // En producción, aquí harías una llamada a API para guardar
    };
    reader.readAsDataURL(file);
  };

  // Obtener metadata del rol
  const roleData = ROLE_METADATA[userRole];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Overlay para móvil - click para cerrar */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Oculto en móvil, visible en desktop */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar isExpanded={sidebarExpanded} onCloseMobile={() => setMobileMenuOpen(false)} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader 
          onMenuToggle={toggleSidebar} 
          onMobileMenuToggle={toggleMobileMenu}
        />
        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          <div className="max-w-2xl mx-auto">
          
          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mi Perfil
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Administra tu información personal y seguridad de cuenta
            </p>
          </div>

          {/* ========== SECCIÓN 1: IDENTIDAD DEL USUARIO (SOLO LECTURA) ========== */}
          <Card className="p-8 mb-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-blue-200 dark:border-blue-900/30">
            
            {/* Encabezado de sección */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Identidad
              </h2>
              <span className="ml-auto px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                Solo lectura
              </span>
            </div>

            {/* Contenido */}
            <div className="space-y-6">
              
              {/* Avatar + Nombre + Rol */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 bg-linear-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  
                  {/* Overlay de cámara */}
                  <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  
                  {/* Rol con información */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${roleData?.badge || 'bg-gray-400'}`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {roleData?.label || userRole}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Este rol es asignado por un administrador
                    </p>
                  </div>
                </div>
              </div>

              {/* Información de identidad en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Correo Electrónico
                  </label>
                  <div className="mt-2 flex items-center gap-2 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user?.email}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Contacta con administrador para cambiar
                  </p>
                </div>

              </div>

            </div>
          </Card>

          {/* ========== SECCIÓN 2: INFORMACIÓN PERSONAL (EDITABLE) ========== */}
          <Card className="p-8 mb-6">
            
            {/* Encabezado de sección */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Información Personal
                </h2>
              </div>
              
              {!isEditingInfo && (
                <button
                  onClick={() => setIsEditingInfo(true)}
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
              )}
            </div>

            {/* Campos */}
            <div className="space-y-4">
              
              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditingInfo}
                    placeholder="+57 (1) 1234567"
                    className="w-full pl-10 bg-gray-50 dark:bg-gray-800 disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Ciudad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ciudad
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditingInfo}
                    placeholder="Tu ciudad"
                    className="w-full pl-10 bg-gray-50 dark:bg-gray-800 disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dirección (Opcional)
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditingInfo}
                  placeholder="Tu dirección completa"
                  className="w-full bg-gray-50 dark:bg-gray-800 disabled:opacity-70"
                />
              </div>

            </div>

            {/* Botones de acción */}
            {isEditingInfo && (
              <div className="mt-6 flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditingInfo(false);
                    setFormData(prev => ({
                      ...prev,
                      phone: user?.phone || "",
                      city: user?.city || "",
                      address: user?.address || ""
                    }));
                  }}
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSavePersonalInfo}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            )}
          </Card>

          {/* ========== SECCIÓN 3: SEGURIDAD (ZONA CRÍTICA) ========== */}
          <Card className="p-8 border-red-200 dark:border-red-900/30">
            
            {/* Encabezado de sección */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-200 dark:border-red-900/30">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Seguridad de la Cuenta
              </h2>
              <div className="ml-auto flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3" />
                Zona crítica
              </div>
            </div>

            <div className="space-y-6">
              
              {/* SUBSECCIÓN: Cambiar Contraseña */}
              <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Cambiar Contraseña
                </h3>

                <div className="space-y-4">
                  
                  {/* Contraseña Actual */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contraseña Actual <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu contraseña actual"
                        className="w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Contraseña Nueva */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nueva Contraseña <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu nueva contraseña"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Mínimo 6 caracteres. Usa mayúsculas, números y símbolos
                    </p>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirmar Nueva Contraseña <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirma tu nueva contraseña"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Botón Cambiar Contraseña */}
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleChangePassword}
                    disabled={isSaving}
                    className="gap-2"
                  >
                    {isSaving ? "Procesando..." : "Cambiar Contraseña"}
                  </Button>
                </div>
              </div>

              {/* SUBSECCIÓN: Cerrar Sesión */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Cerrar Sesión
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Al cerrar sesión, serás desconectado de todos tus dispositivos.
                </p>

                <Button
                  onClick={handleLogout}
                  className="gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </Button>
              </div>

            </div>
          </Card>

          {/* Espaciado final */}
          <div className="h-8" />

          </div>
          <InternalFooter />
        </main>
      </div>
    </div>
  );
}
