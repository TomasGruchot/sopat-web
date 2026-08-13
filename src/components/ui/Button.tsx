import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
};

export function Button({ href, children, variant = "solid", className, onClick }: ButtonProps) {
  const base = "mono-label inline-flex items-center justify-center gap-3 px-6 py-3.5 transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-oxide"
      : "border border-ink text-ink hover:bg-ink hover:text-paper";

  return (
    <Link href={href} onClick={onClick} className={clsx(base, styles, className)}>
      {children}
    </Link>
  );
}
