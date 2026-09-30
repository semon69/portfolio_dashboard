import { ReactNode } from "react";
import { FiAlertCircle, FiInbox } from "react-icons/fi";

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`relative overflow-hidden rounded-md bg-raised ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-ink/[0.07] to-transparent" />
  </div>
);

export const TableSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 bg-surface px-5 py-4">
        <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-7 w-20 shrink-0 rounded-md" />
      </div>
    ))}
  </div>
);

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) => (
  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line px-6 py-16 text-center">
    <FiInbox className="text-2xl text-faint" aria-hidden="true" />
    <p className="font-medium text-ink">{title}</p>
    {description && (
      <p className="max-w-sm text-sm text-muted">{description}</p>
    )}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export const ErrorState = ({
  message = "Something went wrong.",
}: {
  message?: string;
}) => (
  <div
    role="alert"
    className="flex flex-col items-center gap-3 rounded-xl border border-danger/30 bg-danger/5 px-6 py-14 text-center"
  >
    <FiAlertCircle className="text-2xl text-danger" aria-hidden="true" />
    <p className="font-medium text-ink">{message}</p>
    <p className="text-sm text-muted">
      Check your connection, then reload the page.
    </p>
  </div>
);
