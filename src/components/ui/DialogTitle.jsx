import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as React from "react"
import { cn } from "./lib/cn"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export { DialogTitle }
export default DialogTitle
