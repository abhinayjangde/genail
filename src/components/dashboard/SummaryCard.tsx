'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  gradient: string;
  delay?: number;
}

export function SummaryCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  gradient,
  delay = 0,
}: SummaryCardProps) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-5 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300 cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-label font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-heading mt-1 tracking-tight">{value}</p>
        </div>
        <div
          className={cn(
            'w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg',
            gradient
          )}
        >
          {icon}
        </div>
      </div>

      {change && (
        <div
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium',
            changeType === 'positive' && 'text-emerald-400',
            changeType === 'negative' && 'text-rose-400',
            changeType === 'neutral' && 'text-label'
          )}
        >
          {changeType === 'positive' && <TrendingUp size={13} />}
          {changeType === 'negative' && <TrendingDown size={13} />}
          {change}
        </div>
      )}
    </motion.div>
  );
}
