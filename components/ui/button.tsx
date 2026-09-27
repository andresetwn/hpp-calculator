import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-emerald-600 text-white shadow-sm",
    "hover:bg-emerald-700 focus-visible:ring-emerald-500/50",
    "dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950",
  ].join(" "),
  secondary: [
    "border border-zinc-300 bg-white text-zinc-800 shadow-sm",
    "hover:bg-zinc-50 focus-visible:ring-zinc-400/50",
    "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800/80",
  ].join(" "),
  danger: [
    "border border-red-200 bg-white text-red-600",
    "hover:bg-red-50 focus-visible:ring-red-400/50",
    "dark:border-red-500/40 dark:bg-zinc-900 dark:text-red-400 dark:hover:bg-red-500/10",
  ].join(" "),
  ghost: [
    "text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-400/50",
    "dark:text-zinc-300 dark:hover:bg-zinc-800",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex select-none items-center justify-center rounded-lg font-medium",
        "transition-colors focus:outline-none focus-visible:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
