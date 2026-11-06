import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    rounded-xl text-[13px] font-medium
    transition-all duration-200
    disabled:pointer-events-none disabled:opacity-50
    active:scale-[0.98]
    cursor-pointer
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-(--color-primary) text-white
          hover:opacity-90
        `,

        secondary: `
          bg-violet-500 text-white
          hover:bg-violet-400
        `,

        success: `
          bg-emerald-500 text-white
          hover:bg-emerald-400
        `,

        warning: `
          bg-amber-400 text-slate-900
          hover:bg-amber-300
        `,

        danger: `
          bg-red-500 text-white
          hover:bg-red-400
        `,

        outline: `
          border border-slate-200 bg-white
          text-slate-700 hover:bg-slate-50
        `,

        ghost: `
          bg-transparent text-slate-700
          hover:bg-slate-100
        `,
      },

      size: {
        xs: "h-7 px-2",
        sm: "h-8 px-3",
        md: "h-9 px-3.5",
        lg: "h-10 px-4",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };