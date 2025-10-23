import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-black text-white hover:opacity-90",
  secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
  outline: "border border-neutral-300 hover:bg-neutral-50",
  ghost: "hover:bg-neutral-100",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm h-9",
  md: "text-base h-10",
  lg: "text-base h-12",
};

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, any>>;
    const mergedProps: Record<string, any> = {
      ...child.props,
      ...props,
      className: cn(child.props?.className, cls),
    };
    return React.cloneElement<Record<string, any>>(child, mergedProps);
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
