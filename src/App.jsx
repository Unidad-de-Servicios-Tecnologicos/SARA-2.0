

// Si no necesitas proveer contextos globales (Auth, Tema, etc.), 
// este archivo puede ser simple. El RouterProvider ahora está en main.jsx.

export default function App() {
  // Puedes añadir proveedores de contexto aquí si los necesitas.
  return (
    // <AuthProvider>
    //   <ThemeProvider>
          <div className="app-container">
            {/* El RouterProvider lo renderiza en main.jsx. 
                Aquí ya no se pone nada relacionado con rutas. */}
            <h1>Cargando la aplicación...</h1> 
          </div>
    //   </ThemeProvider>
    // </AuthProvider>
  );
}

