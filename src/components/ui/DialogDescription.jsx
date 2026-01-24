import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as React from "react"
import { cn } from "./lib/cn"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export { DialogDescription }
export default DialogDescription
