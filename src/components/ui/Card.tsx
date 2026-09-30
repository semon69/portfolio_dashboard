import { ReactNode } from "react";

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
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) => (
  <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>
      )}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </header>
);

export default Card;
