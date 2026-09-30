import { useId } from "react";

/** The same "E" monogram the public site and favicon use. */
export const LogoMark = ({ className = "h-8 w-8" }: { className?: string }) => {
  const id = useId();

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${id})`} />
      <g fill="#ffffff">
        <rect x="19" y="18" width="7.5" height="28" rx="3.75" />
        <rect x="19" y="18" width="26" height="7.5" rx="3.75" />
        <rect x="19" y="28.25" width="18" height="7.5" rx="3.75" />
        <rect x="19" y="38.5" width="26" height="7.5" rx="3.75" />
      </g>
    </svg>
  );
};

const Logo = () => (
  <span className="inline-flex items-center gap-2.5">
    <LogoMark className="h-8 w-8" />
    <span className="font-display text-base font-bold tracking-tighter text-ink">
      Emon<span className="text-accent">.</span>
    </span>
    <span className="sr-only">Portfolio dashboard</span>
  </span>
);

export default Logo;
