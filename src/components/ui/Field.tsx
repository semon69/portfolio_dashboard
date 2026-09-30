import { ReactNode } from "react";

export const inputClass =
  "w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-60";

type Props = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

/** Label + control + hint/error, so every form field looks the same. */
const Field = ({ label, htmlFor, hint, error, required, children }: Props) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-1.5 text-sm font-medium text-ink"
    >
      {label}
      {required && (
        <span className="text-accent" aria-hidden="true">
          *
        </span>
      )}
      {!required && <span className="text-xs text-faint">(optional)</span>}
    </label>

    {children}

    {hint && !error && <p className="mt-1.5 text-xs text-faint">{hint}</p>}
    {error && (
      <p role="alert" className="mt-1.5 text-xs text-danger">
        {error}
      </p>
    )}
  </div>
);

export default Field;
