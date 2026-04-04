import { ReactNode } from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({
  title = 'No data found',
  description = 'Try adjusting your filters or search query.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="p-4 rounded-full bg-surface text-caption">
        {icon ?? <PackageOpen size={32} />}
      </div>
      <h3 className="text-base font-semibold text-body">{title}</h3>
      <p className="text-sm text-caption max-w-xs">{description}</p>
    </div>
  );
}
