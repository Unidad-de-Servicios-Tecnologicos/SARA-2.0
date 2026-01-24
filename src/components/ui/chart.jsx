import * as React from "react"

const ChartContainer = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      {...props}
    />
  )
)
ChartContainer.displayName = "ChartContainer"

export { ChartContainer }
