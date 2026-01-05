export default function InternalFooter() {
  return (
    <footer className="mt-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-3 text-center text-xs text-gray-500 dark:text-gray-400 rounded-lg">
      <p className="font-medium text-gray-600 dark:text-gray-300">
        SARA – Sistema de Gestión Educativa
      </p>
      <p>
        Centro de Servicios y Gestión Empresarial · SENA
      </p>
      <p>
        © {new Date().getFullYear()} Todos los derechos reservados
      </p>
    </footer>
  );
}
