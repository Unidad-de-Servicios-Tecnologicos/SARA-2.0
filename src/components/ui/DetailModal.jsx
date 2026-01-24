import * as React from "react"
import { Dialog, DialogContent } from "./Dialog"
import { cn } from "./lib/cn"

const DetailModal = React.forwardRef(
  ({ isOpen, onClose, title, children, className, ...props }, ref) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={ref}
        className={cn("max-w-2xl max-h-[90vh] overflow-y-auto", className)}
        {...props}
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </DialogContent>
    </Dialog>
  )
)

DetailModal.displayName = "DetailModal"

export { DetailModal }
export default DetailModal
