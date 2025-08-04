import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform perspective-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-3d-medium hover:shadow-3d-strong hover:-translate-y-1 hover:rotate-x-3 active:shadow-3d-pressed active:translate-y-0 active:rotate-x-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-3d-medium hover:shadow-3d-strong hover:-translate-y-1 hover:rotate-x-3 active:shadow-3d-pressed active:translate-y-0",
        outline:
          "border border-input bg-background shadow-3d-soft hover:shadow-3d-medium hover:bg-accent hover:text-accent-foreground hover:-translate-y-1 hover:rotate-x-3 active:shadow-3d-inset active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground shadow-3d-soft hover:shadow-3d-medium hover:-translate-y-1 hover:rotate-x-3 active:shadow-3d-pressed active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-3d-soft hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline hover:-translate-y-0.5",
        success: "bg-gradient-success text-success-foreground shadow-3d-medium hover:shadow-3d-strong hover:-translate-y-1 hover:rotate-x-3 active:shadow-3d-pressed",
        warning: "bg-warning text-warning-foreground shadow-3d-medium hover:shadow-3d-strong hover:-translate-y-1 hover:rotate-x-3 active:shadow-3d-pressed",
        professional: "bg-gradient-card border border-border text-foreground shadow-3d-soft hover:shadow-3d-medium hover:bg-accent hover:-translate-y-1 hover:rotate-x-3",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
