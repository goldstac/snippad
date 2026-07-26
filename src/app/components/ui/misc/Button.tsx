import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";
  const variants = {
    primary:
      "bg-[--accent-color] text-[--background-primary] hover:bg-[--background-elevated] hover:text-[--text-primary] hover:border-[--accent-color] border border-transparent",
    secondary:
      "bg-transparent border border-[--accent-color] text-[--text-primary] hover:bg-[--background-elevated]",
    ghost:
      "text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--background-tertiary]",
    danger: "bg-[--danger] text-[--text-primary] hover:bg-[--danger-hover]",
  };
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
