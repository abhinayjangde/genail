'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'income' | 'expense' | 'category' | 'admin' | 'viewer' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variantClasses = {
    income: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    expense: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    category: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    admin: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    viewer: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    default: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
