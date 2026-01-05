import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export function DialogTitle({ children, className = "" }) {
  return (
    <DialogPrimitive.Title className={`text-lg font-bold text-gray-900 dark:text-white mb-2 ${className}`}>
      {children}
    </DialogPrimitive.Title>
  );
}
