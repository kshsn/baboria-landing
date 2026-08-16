import type { ReactNode } from "react";

export default function GlassBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-block border-l-2 border-signal-orange bg-white/15 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
