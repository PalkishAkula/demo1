import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";

type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp" | "accent";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon. Sits before the label at the same optical weight. */
  icon?: IconName;
  /** Trailing icon that nudges forward on hover. */
  trailingIcon?: IconName;
  external?: boolean;
};

const styles: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] hover:shadow-[var(--shadow-card)]",
  secondary:
    "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
  ghost: "text-[var(--color-text)] hover:bg-[var(--color-text)]/6",
  whatsapp: "bg-[var(--color-whatsapp)] text-white hover:brightness-110 hover:shadow-[var(--shadow-card)]",
  accent: "bg-[var(--color-accent)] text-[var(--color-text)] hover:brightness-105 hover:shadow-[var(--shadow-card)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3.5 py-1.5 text-[0.8rem]",
  md: "min-h-11 px-5 py-2 text-sm",
  lg: "min-h-13 px-6 py-3 text-base",
};

export function Button({
  children,
  className = "",
  href,
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  external,
  ...props
}: ButtonProps) {
  const classes = `nudge inline-flex items-center justify-center gap-2 rounded-[8px] font-bold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && <Icon className="size-4 shrink-0" name={icon} />}
      {children}
      {trailingIcon && <Icon className="size-4 shrink-0" name={trailingIcon} />}
    </>
  );

  if (href) {
    return (
      <Link
        className={classes}
        href={href}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
