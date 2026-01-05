import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cn from "./lib/cn";

export function Dialog({ open, onOpenChange, children, hideCloseButton = false }) {
  // Función para manejar el cierre del dialog, evitando cerrar si hay un SweetAlert2 activo
  const handleOpenChange = (newOpen) => {
    // Si se está intentando cerrar, verificar si hay un SweetAlert2 activo
    if (!newOpen) {
      const swalContainer = document.querySelector('.swal2-container');
      if (swalContainer) {
        // No cerrar el dialog si hay un SweetAlert2 activo
        return;
      }
    }
    onOpenChange(newOpen);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content 
          className={cn(
            "fixed left-1/2 top-1/2 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl",
            "bg-white dark:bg-gray-800 p-6 shadow-2xl",
            "border border-gray-200 dark:border-gray-700"
          )}
          onPointerDownOutside={(e) => {
            // Prevenir cierre si el clic fue en un SweetAlert2
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer && swalContainer.contains(e.target)) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            // Prevenir cierre si hay un SweetAlert2 activo
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              e.preventDefault();
            }
          }}
        >
          {children}
          {!hideCloseButton && (
            <DialogPrimitive.Close className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
