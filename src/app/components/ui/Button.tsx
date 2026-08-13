import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { IconComponent } from "reicon-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  icon?: IconComponent;
  children: ReactNode;
}

export function Button({
  variant = "secondary",
  icon,
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent/40";
  const variants = {
    primary:
      "bg-[--accent-color] text-[--bg-primary] hover:bg-[--accent-color-hover]",
    secondary:
      "bg-[--bg-tertiary] text-[--text-primary] hover:bg-[--border-color] border border-[--border-color-subtle]",
    ghost:
      "text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-tertiary]",
    danger: "bg-[--danger] text-white hover:bg-[--danger-hover]",
  };
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const Icon = icon;

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
