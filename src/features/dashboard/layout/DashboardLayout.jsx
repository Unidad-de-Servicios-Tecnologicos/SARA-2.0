import { useState } from "react";
import Sidebar from "../shared/Sidebar";
import DashboardHeader from "../shared/DashboardHeader";
import InternalFooter from "../shared/InternalFooter";
import RoleResolver from "../RoleResolver";

export default function DashboardLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader 
          onMenuToggle={toggleSidebar} 
          onMobileMenuToggle={toggleMobileMenu}
        />
        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          <RoleResolver />
          <InternalFooter />
        </main>
      </div>
    </div>
  );
}
