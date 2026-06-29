import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:     "bg-brand-600 text-white hover:bg-brand-700 shadow",
        outline:     "border border-brand-600 text-brand-700 bg-transparent hover:bg-brand-50",
        secondary:   "bg-brand-100 text-brand-900 hover:bg-brand-200",
        ghost:       "text-brand-700 hover:bg-brand-50",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link:        "text-brand-600 underline-offset-4 hover:underline p-0 h-auto",
        white:       "bg-white text-brand-800 hover:bg-brand-50 shadow",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-9 rounded-md px-3",
        lg:      "h-12 rounded-md px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
