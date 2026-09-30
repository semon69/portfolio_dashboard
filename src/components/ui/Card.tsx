import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`rounded-xl border border-line bg-surface ${className}`}>
    {children}
  </div>
);

export const PageHeader = ({
  title,
  description,
  actions,
  backTo,
  backLabel = "Back",
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  /** Shows a back link above the title. Used by every add/edit form. */
  backTo?: string;
  backLabel?: string;
}) => (
  <header className="mb-8">
    {backTo && (
      <Link
        to={backTo}
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <FiArrowLeft aria-hidden="true" />
        {backLabel}
      </Link>
    )}

    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  </header>
);

export default Card;
