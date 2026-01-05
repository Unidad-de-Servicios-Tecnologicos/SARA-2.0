import Swal from "sweetalert2";
import toast from "react-hot-toast";

// ============================================
// TOAST NOTIFICATIONS (Para acciones rápidas)
// ============================================

// Configuración base de SweetAlert2 con z-index alto para evitar conflictos con modales
const SwalWithZIndex = Swal.mixin({
  customClass: {
    container: 'swal-high-zindex',
    popup: 'swal-popup-zindex',
  },
  target: document.body,
  backdrop: true,
  allowOutsideClick: true,
  didOpen: (popup) => {
    // Asegurar que SweetAlert2 esté sobre cualquier otro modal
    const container = Swal.getContainer();
    if (container) {
      container.style.zIndex = '99999';
      container.style.position = 'fixed';
    }
    // Asegurar que los botones sean clickeables
    const confirmBtn = popup.querySelector('.swal2-confirm');
    if (confirmBtn) {
      confirmBtn.style.pointerEvents = 'auto';
    }
  },
});

export const showToast = {
  success: (message) => {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: 500,
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#10B981",
      },
    });
  },

  error: (message) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
        fontWeight: 500,
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#EF4444",
      },
    });
  },

  info: (message) => {
    toast(message, {
      duration: 3000,
      position: "top-right",
      icon: "ℹ️",
      style: {
        background: "#3B82F6",
        color: "#fff",
        fontWeight: 500,
      },
    });
  },

  warning: (message) => {
    toast(message, {
      duration: 3500,
      position: "top-right",
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#fff",
        fontWeight: 500,
      },
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      position: "top-right",
      style: {
        background: "#6366F1",
        color: "#fff",
        fontWeight: 500,
      },
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  // Para exportaciones
  export: (format) => {
    toast.success(`Exportación en formato ${format.toUpperCase()} iniciada`, {
      duration: 3000,
      position: "top-right",
      icon: "📥",
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: 500,
      },
    });
  },
};

// ============================================
// SWEETALERT2 (Para confirmaciones y alertas importantes)
// ============================================

// Tema oscuro personalizado
const getDarkModeStyles = () => {
  const isDark = document.documentElement.classList.contains("dark");
  return isDark
    ? {
        background: "#1F2937",
        color: "#F9FAFB",
        confirmButtonColor: "#4F46E5",
        cancelButtonColor: "#6B7280",
      }
    : {
        background: "#FFFFFF",
        color: "#1F2937",
        confirmButtonColor: "#4F46E5",
        cancelButtonColor: "#6B7280",
      };
};

export const showAlert = {
  // Confirmación de eliminación
  confirmDelete: async (itemName = "este elemento") => {
    const styles = getDarkModeStyles();
    const result = await SwalWithZIndex.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará ${itemName}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: styles.cancelButtonColor,
      background: styles.background,
      color: styles.color,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },

  // Confirmación de guardado
  confirmSave: async (message = "¿Desea guardar los cambios?") => {
    const styles = getDarkModeStyles();
    const result = await SwalWithZIndex.fire({
      title: "Guardar cambios",
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: styles.confirmButtonColor,
      cancelButtonColor: styles.cancelButtonColor,
      background: styles.background,
      color: styles.color,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },

  // Confirmación de edición
  confirmEdit: async (itemName = "este registro") => {
    const styles = getDarkModeStyles();
    const result = await SwalWithZIndex.fire({
      title: "Confirmar edición",
      text: `¿Desea guardar los cambios en ${itemName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      confirmButtonColor: styles.confirmButtonColor,
      cancelButtonColor: styles.cancelButtonColor,
      background: styles.background,
      color: styles.color,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },

  // Éxito
  success: (title, message = "") => {
    const styles = getDarkModeStyles();
    return SwalWithZIndex.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: styles.confirmButtonColor,
      background: styles.background,
      color: styles.color,
      timer: 2500,
      timerProgressBar: true,
    });
  },

  // Error
  error: (title, message = "") => {
    const styles = getDarkModeStyles();
    return SwalWithZIndex.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#EF4444",
      background: styles.background,
      color: styles.color,
    });
  },

  // Info
  info: (title, message = "") => {
    const styles = getDarkModeStyles();
    return SwalWithZIndex.fire({
      title,
      text: message,
      icon: "info",
      confirmButtonText: "Entendido",
      confirmButtonColor: styles.confirmButtonColor,
      background: styles.background,
      color: styles.color,
      allowOutsideClick: true,
      focusConfirm: true,
    });
  },

  // Warning
  warning: (title, message = "") => {
    const styles = getDarkModeStyles();
    return SwalWithZIndex.fire({
      title,
      text: message,
      icon: "warning",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#F59E0B",
      background: styles.background,
      color: styles.color,
      allowOutsideClick: true,
      focusConfirm: true,
    });
  },

  // Confirmación genérica
  confirm: async (title, message, confirmText = "Confirmar") => {
    const styles = getDarkModeStyles();
    const result = await SwalWithZIndex.fire({
      title,
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: "Cancelar",
      confirmButtonColor: styles.confirmButtonColor,
      cancelButtonColor: styles.cancelButtonColor,
      background: styles.background,
      color: styles.color,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },

  // Input dialog
  input: async (title, inputLabel, inputPlaceholder = "") => {
    const styles = getDarkModeStyles();
    const result = await SwalWithZIndex.fire({
      title,
      input: "text",
      inputLabel,
      inputPlaceholder,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: styles.confirmButtonColor,
      cancelButtonColor: styles.cancelButtonColor,
      background: styles.background,
      color: styles.color,
      inputValidator: (value) => {
        if (!value) {
          return "Este campo es requerido";
        }
      },
    });
    return result.value;
  },
};

export default { showToast, showAlert };
