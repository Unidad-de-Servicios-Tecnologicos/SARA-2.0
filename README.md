# 📚 SARA - Sistema de Administración de Recursos Académicos

Aplicación web moderna para la administración integral de recursos académicos, desarrollada con **React 19**, **Vite** y **Tailwind CSS v4**.

## 📋 Tabla de Contenidos

1. [Características Principales](#características-principales)
2. [Instalación](#instalación)
3. [Configuración Inicial](#configuración-inicial)
4. [Cómo Iniciar el Desarrollo](#cómo-iniciar-el-desarrollo)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Scripts Disponibles](#scripts-disponibles)
8. [Guía de Desarrollo](#guía-de-desarrollo)

---

## ✨ Características Principales

### 🎓 Gestión Académica
- **Administración de Aprendices**: Registro, seguimiento y gestión de estudiantes
- **Gestión de Instructores**: Control de docentes y asignaciones
- **Registros Académicos**: Historial completo de calificaciones y desempeño
- **Prácticas**: Administración de actividades prácticas y proyectos

### 📊 Análisis y Reportes
- **Dashboards Interactivos**: Visualización de datos en tiempo real
- **Gráficos Avanzados**: Múltiples tipos de gráficos (barras, pastel, líneas)
- **Exportación de Datos**: Generación de reportes en Excel y PDF
- **Analytics**: Seguimiento de métricas académicas

### 📅 Programación y Reservas
- **Gestión de Horarios**: Creación y visualización de programaciones
- **Reserva de Ambientes**: Sistema de reserva de espacios disponibles
- **Programación de Ambientes**: Asignación de recursos
- **Seguimiento de Asistencia**: Control de asistencia en tiempo real

### 📄 Gestión Documental
- **Almacenamiento de Documentos**: Gestión centralizada de archivos
- **Seguimiento de Documentos**: Historial y estado de trámites

### 🔐 Sistema de Autenticación
- **Login Seguro**: Autenticación con JWT
- **Control de Acceso**: Protección de rutas según rol
- **Gestión de Sesiones**: Control de tokens

---

## 📦 Instalación

### Requisitos Previos
- **Node.js**: v16.0.0 o superior
- **npm** o **yarn**: Gestor de paquetes

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Unidad-de-Servicios-Tecnologicos/SARA-2.0.git
cd sara-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar instalación**
```bash
npm list
```

### Dependencias Principales Instaladas

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **React** | 19.2.0 | Framework principal |
| **React Router DOM** | 7.10.1 | Enrutamiento |
| **Vite** | 7.2.5 (rolldown) | Build tool |
| **Tailwind CSS** | 4.1.17 | Estilos CSS |
| **Chart.js & Recharts** | Latest | Gráficos |
| **Axios** | 1.13.2 | Peticiones HTTP |
| **React Query** | 5.90.12 | Gestión de estado |
| **Zustand** | 5.0.9 | State management |
| **Radix UI** | Latest | Componentes accesibles |
| **ExcelJS & XLSX** | Latest | Exportación a Excel |
| **jsPDF** | 3.0.4 | Generación de PDF |

---

## ⚙️ Configuración Inicial

### Estructura de Carpetas

```
sara-frontend/
├── src/
│   ├── features/              # Módulos por funcionalidad
│   │   ├── auth/             # Autenticación y login
│   │   ├── dashboard/        # Paneles de control
│   │   ├── learners/         # Gestión de aprendices
│   │   ├── instructors/      # Gestión de instructores
│   │   ├── schedules/        # Horarios
│   │   ├── attendance/       # Asistencia
│   │   ├── documents/        # Documentos
│   │   ├── practices/        # Prácticas
│   │   ├── analytics/        # Análisis y reportes
│   │   └── ...otros módulos
│   ├── components/           # Componentes reutilizables
│   │   ├── ui/              # Componentes base (botones, inputs, etc.)
│   │   └── charts/          # Componentes de gráficos
│   ├── shared/              # Recursos compartidos
│   ├── config/              # Configuraciones
│   ├── data/                # Datos mockeados
│   ├── assets/              # Imágenes y recursos
│   └── App.jsx              # Componente raíz
├── vite.config.js           # Configuración de Vite
├── tailwind.config.cjs      # Configuración de Tailwind
├── eslint.config.js         # Configuración de ESLint
└── package.json             # Dependencias del proyecto
```

### Configuración de Tailwind CSS v4

El proyecto usa **Tailwind CSS v4** con soporte completo para:
- ✅ Estilos utilities completos
- ✅ Modo dark
- ✅ Animaciones personalizadas
- ✅ Componentes accesibles

**Archivo**: [tailwind.config.cjs](tailwind.config.cjs)

### Configuración de Vite

El proyecto está configurado con:
- 🚀 **Fast Refresh** para desarrollo rápido
- 📦 **Alias de rutas** (@ → src)
- ⚡ **Optimización automática**

**Archivo**: [vite.config.js](vite.config.js)

---

## 🚀 Cómo Iniciar el Desarrollo

### Iniciar Servidor de Desarrollo

```bash
npm run dev
```

**Resultado**: La aplicación estará disponible en `http://localhost:5173`

Características del modo desarrollo:
- ♻️ Hot Module Replacement (HMR) - Recarga automática de cambios
- 🐛 DevTools mejoradas
- ⚡ Build rápido

### Compilar para Producción

```bash
npm run build
```

Este comando:
- ✅ Optimiza y minimiza el código
- ✅ Genera carpeta `dist/` lista para deploy
- ✅ Crea source maps para debugging

### Previsualizar Build

```bash
npm run preview
```

Visualiza la versión de producción localmente antes de desplegar.

### Verificar Código (Linting)

```bash
npm run lint
```

Valida el código según las reglas de ESLint configuradas.

---

## 🏗️ Estructura del Proyecto Detallada

### Módulos (Features)

Cada módulo en `src/features/` contiene:

```
módulo/
├── index.js              # Exportaciones principales
├── pages/               # Páginas del módulo
├── components/          # Componentes específicos
├── hooks/              # Hooks personalizados
├── services/           # Llamadas a API
├── store/              # Estado local (Zustand)
└── mock/               # Datos de prueba
```

#### 📚 Módulos Implementados

| Módulo | Descripción | Componentes |
|--------|-------------|------------|
| **auth** | 🔐 Autenticación y login | LoginPage, AuthService, AuthStore |
| **dashboard** | 📊 Paneles principales | DashboardPage, RoleResolver, Gráficos |
| **learners** | 👨‍🎓 Gestión de aprendices | LearnerDetailPage, RendimientoPage, Perfil |
| **instructors** | 👨‍🏫 Gestión de instructores | InstructorsList, InstructorDetail, Asignaciones |
| **attendance** | ✅ Control de asistencia | AttendancePage, Registro, Reportes |
| **schedules** | 📅 Gestión de horarios | SchedulesPage, SchedulesRecordPage, Vista Calendario |
| **records** | 📄 Registros académicos | RecordsListPage, RecordDetailPage, Historial |
| **practices** | 🔧 Prácticas y proyectos | RecordsPracticesPage, Evaluación, Seguimiento |
| **documents** | 📋 Gestión de documentos | DocumentsPage, Almacenamiento, Descarga |
| **analytics** | 📈 Análisis y reportes | Analytics, Gráficos avanzados, Exportación |
| **activities** | 🎯 Actividades académicas | ActividadesList, Detalles, Participación |
| **reservations** | 🏢 Reserva de espacios | ReservationsPage, Disponibilidad, Gestión |
| **environment-reservations** | 🏛️ Reserva de ambientes | Espacios, Recursos, Programación |
| **environment-schedules** | 📍 Programación de ambientes | Horarios de espacios, Calendario |
| **academic-management** | 🎓 Administración académica | Config académica, Parámetros |
| **companies** | 🏢 Gestión de empresas | EmpresasPage, Convenios, Contactos |
| **landing** | 🏠 Página de inicio | LandingPage, Presentación |
| **monitoring** | 👁️ Monitoreo y seguimiento | MonitoringPage, Alertas, Métricas |

#### 🔧 Estructura Interna de Módulos

**Ejemplo: `auth/`**
```
auth/
├── pages/
│   └── LoginPage.jsx          # Página de login
├── components/
│   ├── LoginForm.jsx          # Formulario de login
│   └── ...otros componentes
├── services/
│   └── authService.js         # Llamadas API de autenticación
├── store/
│   └── authStore.js           # Estado global con Zustand
├── hooks/
│   ├── useAuth.js             # Hook para acceder al estado
│   └── useLogin.js            # Hook para el proceso de login
├── index.js                   # Exportaciones principales
└── ...
```

**Ejemplo: `dashboard/`**
```
dashboard/
├── pages/
│   ├── DashboardPage.jsx      # Dashboard principal
│   └── DashboardModulePage.jsx # Dashboard por módulo
├── components/
│   ├── StatCard.jsx           # Tarjeta de estadísticas
│   ├── ChartWidget.jsx        # Widget de gráficos
│   └── ...otros componentes
├── layout/
│   └── DashboardLayout.jsx    # Layout del dashboard
├── services/
│   └── dashboardService.js    # Datos del dashboard
├── store/
│   └── dashboardStore.js      # Estado del dashboard
├── RoleResolver.jsx           # Componente para resolver roles
├── shared/                    # Componentes compartidos
└── index.js
```

---

## 📌 Características por Módulo

### 🔐 **auth** - Autenticación
- Sistema de login seguro con JWT
- Validación de credenciales
- Gestión de sesiones
- Protección de rutas

### 📊 **dashboard**
- Vista consolidada de información
- Widgets personalizables
- Gráficos en tiempo real
- Resolución de roles (diferente vista por rol)
- Acceso rápido a módulos principales

### 👨‍🎓 **learners** - Aprendices
- Listado de estudiantes
- Perfil detallado del aprendiz
- Seguimiento de rendimiento
- Historial académico
- Evaluaciones y calificaciones

### 👨‍🏫 **instructors** - Instructores
- Directorio de docentes
- Información profesional
- Asignación de clases
- Horarios y disponibilidad

### ✅ **attendance** - Asistencia
- Registro diario de asistencia
- Control por clase/grupo
- Reportes de inasistencia
- Justificaciones
- Seguimiento de patrones

### 📅 **schedules** - Horarios
- Programación de clases
- Vista de calendario
- Asignación de docentes
- Grupos y salones
- Sincronización de cambios

### 📄 **records** - Registros Académicos
- Historial completo de calificaciones
- Transcripciones académicas
- Seguimiento de cursos
- Documentación de logros

### 🔧 **practices** - Prácticas
- Proyectos y prácticas propuestas
- Evaluación de actividades
- Seguimiento de grupos
- Entregas y retroalimentación

### 📋 **documents** - Documentación
- Almacenamiento centralizado
- Gestión de archivos
- Versionado de documentos
- Descarga y compartir

### 📈 **analytics** - Análisis
- Reportes avanzados
- Gráficos comparativos
- Análisis de desempeño
- Exportación a Excel/PDF
- Métricas académicas

### 🎯 **activities** - Actividades
- Actividades propuestas
- Participación de estudiantes
- Seguimiento de progreso
- Calificación automática

### 🏢 **reservations** - Reservas
- Solicitud de espacios
- Calendario de disponibilidad
- Aprobación de solicitudes
- Historial de reservas

### 🏛️ **environment-reservations** - Ambientes
- Reserva de espacios específicos
- Gestión de recursos
- Control de ocupación
- Reportes de uso

### 📍 **environment-schedules** - Programación
- Horarios de espacios
- Asignación de ambientes
- Calendario de uso
- Conflictos y optimización

### 🎓 **academic-management** - Administración
- Parámetros académicos
- Configuración del sistema
- Políticas institucionales

### 🏢 **companies** - Empresas
- Directorio de empresas asociadas
- Convenios y acuerdos
- Información de contacto
- Historial de colaboración

### 🏠 **landing** - Página de Inicio
- Presentación del sistema
- Información introductoria
- Acceso al login
- Promoción de funcionalidades

### 👁️ **monitoring** - Monitoreo
- Seguimiento en tiempo real
- Alertas del sistema
- Métricas de rendimiento
- Reportes de actividad

### Componentes Reutilizables

**UI Base** (`components/ui/`):
- Botones, inputs, tarjetas
- Diálogos y modales
- Tabs, scroll areas
- Componentes accesibles basados en Radix UI

**Gráficos** (`components/charts/`):
- `ChartBarDefault.jsx` - Gráficos de barras
- `ChartPieDonut.jsx` - Gráficos de pastel
- `ChartBarHorizontal.jsx` - Gráficos horizontales

### Servicios API

**Archivo**: [config/api.config.js](config/api.config.js)

Configuración centralizada para:
- URL base de la API
- Interceptores de Axios
- Gestión de tokens JWT

---

## 🛠️ Tecnologías Utilizadas

### Framework & Build
- **React 19** - Framework UI
- **Vite 7** - Build tool ultrarrápido
- **React Router v7** - Enrutamiento

### Estilos & UI
- **Tailwind CSS v4** - CSS utilities
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos SVG
- **React Icons** - Más iconos

### Gestión de Estado
- **Zustand** - State management ligero
- **React Query** - Gestión de datos del servidor
- **React Context** - Estado local

### Gráficos & Visualización
- **Chart.js** - Librería de gráficos
- **Recharts** - Gráficos React
- **chartjs-plugin-datalabels** - Etiquetas en gráficos

### HTTP & API
- **Axios** - Cliente HTTP
- **jwt-decode** - Decodificación de JWT

### Exportación de Datos
- **ExcelJS** - Generación de archivos Excel
- **XLSX** - Lectura/escritura de Excel
- **jsPDF** - Generación de PDF

### Notificaciones
- **React Hot Toast** - Notificaciones elegantes
- **SweetAlert2** - Modales personalizadas

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Autoprefixer** - Prefijos CSS automáticos
- **Babel React Compiler** - Optimización de compilación

---

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Inicia servidor de desarrollo en puerto 5173 |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Visualiza la build de producción localmente |
| `npm run lint` | Valida el código con ESLint |

---

## 👨‍💻 Guía de Desarrollo

### Crear un Nuevo Componente

```jsx
// components/ui/MyComponent.jsx
export default function MyComponent({ className, ...props }) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      Contenido
    </div>
  )
}
```

### Crear un Nuevo Feature/Módulo

1. Crear carpeta en `src/features/nombre-modulo/`
2. Estructura básica:
```
nombre-modulo/
├── index.js
├── pages/
│   └── ModulePage.jsx
├── components/
├── services/
├── hooks/
└── store/
```

3. Crear página principal en `pages/ModulePage.jsx`
4. Exportar desde `index.js`

### Usar Zustand para Estado Global

```javascript
// store/miStore.js
import { create } from 'zustand';

export const useMiStore = create((set) => ({
  contador: 0,
  incrementar: () => set(state => ({ contador: state.contador + 1 }))
}));

// En un componente
import { useMiStore } from '@/features/modulo/store/miStore';

function MiComponente() {
  const { contador, incrementar } = useMiStore();
  return <button onClick={incrementar}>{contador}</button>
}
```

### Llamadas a API con Axios

```javascript
// services/miService.js
import axios from 'axios';
import { API_BASE_URL } from '@/config/api.config';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

export const miService = {
  obtenerDatos: async () => {
    const response = await apiClient.get('/endpoint');
    return response.data;
  }
};
```

### Exportar a Excel

```javascript
import ExcelJS from 'exceljs';

async function exportarExcel(datos) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Hoja1');
  
  // Agregar datos
  worksheet.addRows(datos);
  
  // Descargar
  await workbook.xlsx.writeFile('reporte.xlsx');
}
```

### Generar PDF

```javascript
import jsPDF from 'jspdf';

function generarPDF() {
  const doc = new jsPDF();
  doc.text('Título', 10, 10);
  doc.save('documento.pdf');
}
```

---

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Token)** para autenticación segura.

**Flujo de Login**:
1. Usuario ingresa credenciales
2. Servidor valida y devuelve JWT
3. Token se almacena en localStorage
4. Se incluye en headers de peticiones siguientes
5. ProtectedRoute valida el token

**Archivo**: [shared/ProtectedRoute.jsx](shared/ProtectedRoute.jsx)

---

## 📱 Características por Rol

El sistema tiene diferentes vistas según el rol del usuario:
- **Admin**: Acceso a toda la administración
- **Instructor**: Gestión de sus clases y estudiantes
- **Aprendiz**: Visualización de su información académica

---

## 🐛 Solución de Problemas

### Puerto 5173 ya está en uso
```bash
# Usar puerto diferente
npm run dev -- --port 3000
```

### Error de módulos no encontrados
```bash
# Limpiar e reinstalar
rm -rf node_modules
npm install
```

### Problemas con Tailwind
```bash
# Reconstruir Tailwind
npm install -D tailwindcss@latest
```

---

## 📚 Documentación Útil

- [React Docs](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Radix UI](https://www.radix-ui.com)

---

## 📝 Notas Importantes

- ✅ El proyecto usa **ES Modules** (import/export)
- ✅ Alias de ruta configurado: `@` apunta a `src/`
- ✅ Tailwind v4 con soporte completo
- ✅ ESLint habilitado para código limpio
- ✅ React Compiler habilitado para optimizaciones

---

---

## 📌 Historial de Cambios

### 📅 19 - 21 de Enero 2026

#### ✅ Módulos Trabajados

**1. 📋 Records (Registros Académicos)**
- ✨ Modal detallado de fichas (`RecordDetailModal`)
- 📊 Gestión de pestaña de información general
- 👥 Pestaña de gestión de aprendices (`RecordAprendicesTab`)
- 📚 Pestaña de RAPs (Resultados de Aprendizaje Planeados)
- 🔔 Sistema de novedades (`RecordNovedadesTab`)
  - Registro de cambios de estado
  - Deserción, cambio de instructor, suspensión, etc.
- 📥 Exportación a Excel y PDF
- 🎨 Interfaz con tabs y componentes reutilizables

**2. 📊 Dashboard**
- 👑 Dashboard para Subdirector
  - KPIs avanzados (Instructores, Aprendices, Fichas)
  - Gráficos por tipo de contrato, género, estado
  - Modal de Drill-Down para análisis detallado
- 👨‍🏫 Dashboard para Instructor
  - Vista personalizada de actividades
  - Métricas de desempeño
  - Gráficos de participación
- 🎨 Componentes compartidos
  - `KPIBox` - Tarjetas de estadísticas
  - `DashboardFilters` - Filtros avanzados
  - `DrillDownModal` - Exploración de datos
  - `ChartOptionsMenu` - Opciones de visualización

**3. 📅 Schedules (Horarios)**
- 📆 Vista de calendario con múltiples vistas
- 👨‍🏫 Gestión de horarios por instructor
- 📋 Gestión de horarios por ficha
- 🏛️ Gestión de horarios por ambiente
- 🔗 Búsqueda y filtros avanzados
- 📊 Exportación de programaciones

**4. 👨‍🏫 Instructors (Instructores)**
- 📋 Listado completo de instructores
- 👤 Modal detallado con información profesional
- 📌 Fichas asignadas y horarios
- 📝 Novedades y cambios de estado
- ✏️ Edición de información

**5. 👨‍🎓 Learners (Aprendices)**
- 📚 Gestión completa de estudiantes
- 📊 Página de rendimiento académico
- 🎯 Seguimiento de progreso
- 📈 Calificaciones y evaluaciones

**6. ✅ Attendance (Asistencia)**
- 📝 Registro diario de asistencia
- 📊 Reportes de ausencias
- 🔍 Búsqueda y filtros
- 📥 Exportación de datos

**7. 🔧 Practices (Prácticas)**
- 📋 Gestión de proyectos y prácticas
- 👥 Seguimiento de grupos
- 🎯 Evaluación de actividades
- 📤 Entregas y retroalimentación

#### 🛠️ Tecnologías & Herramientas

**Componentes UI Utilizados**:
- Dialog & DialogTitle (Radix UI)
- Tabs para navegación
- Modales personalizados
- Badges y estados visuales
- Lucide Icons para visualización

**Estado & Datos**:
- Zustand para estado global
- React Query para datos del servidor
- Custom hooks para lógica reutilizable
- Mock data para desarrollo

**Exportación**:
- ExcelJS para generación de Excel
- jsPDF para generación de PDF
- Formateo de datos automático

**Notificaciones**:
- React Hot Toast para alertas
- SweetAlert2 para confirmaciones
- Mensajes de éxito/error contextualizados

#### 📝 Commits Recomendados

```
feat(records): implementar modal detallado de fichas con tabs y gestión de novedades
feat(dashboard): agregar dashboards específicos por rol (subdirector, instructor)
feat(schedules): implementar vista de calendario con gestión de horarios
feat(instructors): completar módulo con modal detallado y novedades
feat(learners): integrar seguimiento de rendimiento académico
feat(attendance): implementar registro y reportes de asistencia
feat(practices): agregar gestión de prácticas y evaluaciones
docs: documentación completa del proyecto SARA
```

---

**Última actualización**: 21 de Enero 2026  
**Versión**: 0.0.0  
**Desarrollador Principal**: Paola C.  
**Rama**: PaolaC
