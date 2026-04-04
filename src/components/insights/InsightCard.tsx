'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  iconBg: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  delay?: number;
  children?: ReactNode;
}

export function InsightCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  trend,
  trendType = 'neutral',
  delay = 0,
  children,
}: InsightCardProps) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0',
              iconBg
            )}
          >
            {icon}
          </div>
          <div>
            <p className="text-xs text-label font-medium">{title}</p>
            <p className="text-lg font-bold text-heading leading-tight mt-0.5">{value}</p>
            {subtitle && <p className="text-xs text-caption mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {trend && (
          <span
            className={cn(
              'text-xs font-semibold px-2 py-1 rounded-lg',
              trendType === 'positive' && 'bg-emerald-500/15 text-emerald-500',
              trendType === 'negative' && 'bg-rose-500/15 text-rose-500',
              trendType === 'neutral' && 'bg-[var(--surface-5)] text-label'
            )}
          >
            {trend}
          </span>
        )}
      </div>

      {children}
    </motion.div>
  );
}
