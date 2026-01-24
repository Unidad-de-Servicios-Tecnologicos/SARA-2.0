/**
 * ========================================
 * EJEMPLOS DE USO - SISTEMA DE PERMISOS
 * ========================================
 * 
 * 📌 Cómo usar el sistema de permisos en toda la aplicación
 * 📌 Ejemplos prácticos para cada caso de uso
 * 📌 Patrones seguros y escalables
 */

/**
 * ========================================
 * 1️⃣ USO BÁSICO - Verificar permiso
 * ========================================
 */

// OPCIÓN A: Hook usePermissions() - RECOMENDADO
import { usePermissions } from '@/hooks/usePermissions';

function MiComponente() {
  const { can, isAdmin } = usePermissions();

  return (
    <div>
      {/* Solo si puede ver usuarios */}
      {can("usuarios", "view") && <UsersList />}

      {/* Solo si puede editar usuarios */}
      {can("usuarios", "edit") && <EditUserButton />}

      {/* Solo administrador */}
      {isAdmin() && <AdminPanel />}

      {/* Solo si puede exportar reportes */}
      {can("reportes", "export") && <ExportButton />}
    </div>
  );
}

// OPCIÓN B: Función can() directa - Para lógica
import { can } from '@/security/can';

function verificarAcceso(roles) {
  if (can(roles, "usuarios", "delete")) {
    // Usuario puede eliminar
  }
}

/**
 * ========================================
 * 2️⃣ MENÚ DINÁMICO - Solo módulos accesibles
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function MainMenu() {
  const { can, getModules } = usePermissions();

  // Definir todos los módulos disponibles
  const allMenuItems = [
    { id: "usuarios", label: "Usuarios", icon: "👥" },
    { id: "reportes", label: "Reportes", icon: "📊" },
    { id: "configuracion", label: "Configuración", icon: "⚙️" },
    { id: "fichas", label: "Fichas", icon: "📋" },
  ];

  // Filtrar solo los que tiene acceso
  const accessibleItems = allMenuItems.filter((item) =>
    can(item.id)
  );

  return (
    <nav>
      {accessibleItems.map((item) => (
        <a key={item.id} href={`/${item.id}`}>
          {item.icon} {item.label}
        </a>
      ))}
    </nav>
  );
}

/**
 * ========================================
 * 3️⃣ RUTAS PROTEGIDAS - Solo usuarios autorizados
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const { isAdmin } = usePermissions();

  if (!isAdmin()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

// Uso en rutas
<Routes>
  <Route path="/admin/users" element={
    <AdminRoute>
      <UsersManagement />
    </AdminRoute>
  } />
</Routes>

/**
 * ========================================
 * 4️⃣ BOTONES CONDICIONALES - CRUD Operations
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function UserCard({ user }) {
  const { can } = usePermissions();

  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>

      {/* Botones solo si tiene permiso */}
      <div className="actions">
        {can("usuarios", "view") && (
          <button onClick={() => viewUser(user.id)}>Ver</button>
        )}

        {can("usuarios", "edit") && (
          <button onClick={() => editUser(user.id)}>Editar</button>
        )}

        {can("usuarios", "delete") && (
          <button onClick={() => deleteUser(user.id)} className="danger">
            Eliminar
          </button>
        )}

        {can("usuarios", "export") && (
          <button onClick={() => exportUser(user.id)}>Descargar</button>
        )}
      </div>
    </div>
  );
}

/**
 * ========================================
 * 5️⃣ FORMULARIOS CONDICIONALES
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function UserForm({ user }) {
  const { can } = usePermissions();

  return (
    <form>
      {/* Campo siempre visible */}
      <input type="text" placeholder="Nombre" defaultValue={user.name} />

      {/* Campo solo para coordinadores y admins */}
      {can(["COORDINADOR", "ADMINISTRADOR"], "usuarios", "edit") && (
        <input type="email" placeholder="Email" defaultValue={user.email} />
      )}

      {/* Campo solo para admins */}
      {can("ADMINISTRADOR", "usuarios", "edit") && (
        <select>
          <option>ADMINISTRADOR</option>
          <option>COORDINADOR</option>
          <option>INSTRUCTOR</option>
        </select>
      )}

      {/* Botón solo si puede editar */}
      {can("usuarios", "edit") && (
        <button type="submit">Guardar</button>
      )}
    </form>
  );
}

/**
 * ========================================
 * 6️⃣ MULTI-ROL - Verificar varios roles
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function Dashboard() {
  const { can, hasAnyRole, hasAllRoles } = usePermissions();

  // Basta que tenga UNO de estos roles
  if (hasAnyRole(["COORDINADOR", "ADMINISTRADOR"])) {
    return <CoordinatorDashboard />;
  }

  // Debe tener TODOS estos roles
  if (hasAllRoles(["INSTRUCTOR", "COORDINADOR"])) {
    return <SpecialAccess />;
  }

  return <StudentDashboard />;
}

/**
 * ========================================
 * 7️⃣ TABLA CON ACCIONES DINÁMICAS
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function UsersTable({ users }) {
  const { can } = usePermissions();

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          {(can("usuarios", "edit") || can("usuarios", "delete")) && (
            <th>Acciones</th>
          )}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {(can("usuarios", "edit") || can("usuarios", "delete")) && (
              <td>
                {can("usuarios", "edit") && (
                  <button onClick={() => edit(user.id)}>Editar</button>
                )}
                {can("usuarios", "delete") && (
                  <button onClick={() => delete(user.id)}>Eliminar</button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * ========================================
 * 8️⃣ EXPORTACIÓN CONDICIONAL
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function ReportsSection() {
  const { can, isAdmin } = usePermissions();

  const handleExport = (format) => {
    if (!can("reportes", "export")) {
      showAlert.warning("Sin permiso", "No puedes exportar reportes");
      return;
    }

    // Proceder con exportación
    downloadReport(format);
  };

  return (
    <div>
      <h2>Reportes</h2>

      {/* Solo mostrar botones de exportación si tiene permiso */}
      {can("reportes", "export") && (
        <div className="export-buttons">
          <button onClick={() => handleExport("excel")}>📊 Excel</button>
          <button onClick={() => handleExport("pdf")}>📄 PDF</button>
          {isAdmin() && (
            <button onClick={() => handleExport("json")}>📦 JSON</button>
          )}
        </div>
      )}

      {/* Si no tiene permiso, mostrar mensaje */}
      {!can("reportes", "export") && (
        <p className="text-gray-500">No tienes permiso para exportar</p>
      )}
    </div>
  );
}

/**
 * ========================================
 * 9️⃣ MODALES CONDICIONALES
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function UserActions({ user }) {
  const { can } = usePermissions();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {/* Botón que abre modal de editar */}
      {can("usuarios", "edit") && (
        <button onClick={() => setShowEditModal(true)}>Editar</button>
      )}

      {/* Modal solo si tiene permiso */}
      {can("usuarios", "edit") && showEditModal && (
        <EditUserModal user={user} onClose={() => setShowEditModal(false)} />
      )}

      {/* Botón que abre modal de eliminar */}
      {can("usuarios", "delete") && (
        <button onClick={() => setShowDeleteModal(true)} className="danger">
          Eliminar
        </button>
      )}

      {/* Modal de confirmación */}
      {can("usuarios", "delete") && showDeleteModal && (
        <DeleteConfirmModal
          user={user}
          onConfirm={() => deleteUser(user.id)}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

/**
 * ========================================
 * 🔟 TABS CONDICIONALES
 * ========================================
 */

import { usePermissions } from '@/hooks/usePermissions';

function AdminPanel() {
  const { can } = usePermissions();

  const tabs = [
    { id: "usuarios", label: "Usuarios", accessible: can("usuarios") },
    { id: "reportes", label: "Reportes", accessible: can("reportes") },
    { id: "config", label: "Configuración", accessible: can("configuracion") },
  ];

  const accessibleTabs = tabs.filter((t) => t.accessible);

  return (
    <div>
      <div className="tabs">
        {accessibleTabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de cada tab */}
      {activeTab === "usuarios" && <UsersTab />}
      {activeTab === "reportes" && <ReportsTab />}
      {activeTab === "config" && <ConfigTab />}
    </div>
  );
}

/**
 * ========================================
 * 🔵 LÓGICA EN SERVICIOS/UTILS
 * ========================================
 */

import { can } from '@/security/can';

// En un servicio
export const reportService = {
  canExport: (roles) => can(roles, "reportes", "export"),

  canSchedule: (roles) => can(roles, "reportes", "schedule"),

  async exportReport(reportId, roles, format) {
    if (!this.canExport(roles)) {
      throw new Error("No tienes permiso para exportar");
    }

    return downloadReport(reportId, format);
  },
};

/**
 * ========================================
 * 📋 CHECKLIST - IMPLEMENTAR EN TU CÓDIGO
 * ========================================
 * 
 * ✅ Menús dinámicos basados en permisos
 * ✅ Botones de acción condicionales
 * ✅ Rutas protegidas por rol
 * ✅ Campos de formulario condicionales
 * ✅ Tabs visibles según permisos
 * ✅ Modales solo para usuarios autorizados
 * ✅ Mensajes de "sin permiso"
 * ✅ Exportaciones protegidas
 * ✅ Validación en servicios/utils
 * ✅ Logging de intentos de acceso no permitido
 */

/**
 * ========================================
 * 🚀 FLUJO COMPLETO: LO QUE OCURRE HOY
 * ========================================
 * 
 * 1. Usuario llena login
 * 2. mockLogin retorna usuario CON su rol
 * 3. useAuthStore guarda usuario con rol
 * 4. usePermissions() lee ese rol
 * 5. can() verifica permisos basado en PERMISSION_MATRIX
 * 6. UI se renderiza o oculta según permisos
 * 
 * 🎯 MAÑANA CON BACKEND:
 * 
 * 1. Usuario llena login
 * 2. Backend retorna usuario CON sus roles
 * 3. useAuthStore guarda usuario con roles (IGUAL)
 * 4. usePermissions() lee esos roles (IGUAL)
 * 5. can() verifica permisos (IGUAL)
 * 6. UI se renderiza (IGUAL)
 * 
 * ✅ CERO cambios necesarios en la lógica
 */

/**
 * ========================================
 * 📞 SOPORTE FUTURO CON BACKEND
 * ========================================
 * 
 * Cuando conectes con el backend, solo cambia:
 * src/features/auth/services/authService.js
 * 
 * De:
 *   const user = await mockLogin(username, password);
 * 
 * A:
 *   const response = await axios.post("/api/auth/login", { username, password });
 *   const user = response.data;
 * 
 * Todo lo demás sigue igual ✅
 */

export default {};
