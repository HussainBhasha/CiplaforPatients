import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function Button({ className, variant = "primary", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all active:translate-y-[1px]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-sky-600 to-sky-400 text-white shadow-button hover:brightness-110",
    secondary:
      "bg-white/70 text-slate-900 ring-1 ring-sky-200/70 hover:bg-white shadow-soft-xl",
    ghost:
      "text-slate-700 hover:text-slate-950 hover:bg-white/50",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}

