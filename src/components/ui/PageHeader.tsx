import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary-900">
            {eyebrow}
          </span>
        )}

        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>

        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>

      {actions && (
        <div className="w-full min-w-0 md:w-80 md:shrink-0">{actions}</div>
      )}
    </div>
  );
}
