import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "./Dialog"
import { DialogDescription } from "./DialogDescription"
import { Button } from "./button"
import { cn } from "./lib/cn"
import { Input } from "./Input"

const FormModal = React.forwardRef(
  (
    {
      isOpen,
      onClose,
      title,
      onSubmit,
      onSave,
      children,
      fields = [],
      record,
      submitText = "Guardar",
      cancelText = "Cancelar",
      submitButtonText,
      isLoading = false,
      className
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState({})

    React.useEffect(() => {
      if (record) {
        setFormData(record)
      } else {
        setFormData({})
      }
    }, [record, isOpen])

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if (onSave) {
        onSave(formData)
      } else {
        onSubmit?.()
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          ref={ref}
          className={cn("max-w-lg", className)}
        >
          <DialogTitle className="flex flex-col space-y-1.5 text-center sm:text-left text-lg font-semibold leading-none tracking-tight">{title}</DialogTitle>
          <DialogDescription />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-h-[60vh] overflow-y-auto space-y-4">
              {fields.length > 0 ? (
                fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || field.defaultValue || ""}
                        onChange={handleChange}
                        disabled={field.disabled}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        required={field.required}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        disabled={field.disabled}
                        required={field.required}
                      />
                    )}
                    {field.helperText && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{field.helperText}</p>
                    )}
                  </div>
                ))
              ) : (
                children
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : (submitButtonText || submitText)}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
)

FormModal.displayName = "FormModal"

export { FormModal }
export default FormModal

