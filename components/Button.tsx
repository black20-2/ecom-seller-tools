import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-navy text-white hover:bg-navy-light"
      : "border border-line bg-surface text-ink hover:bg-paper";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
