'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useCategoryBreakdown } from '@/context/AppContext';
import { CATEGORY_COLORS } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="glass-card rounded-xl p-3 text-xs shadow-xl border-mid">
      <p className="text-body font-medium">{d.name}</p>
      <p className="text-heading font-bold mt-0.5">{formatCurrency(d.value)}</p>
      <p className="text-caption">{d.payload.percent}% of spending</p>
    </div>
  );
};

export function SpendingBreakdownChart() {
  const raw = useCategoryBreakdown();
  const total = raw.reduce((s, d) => s + d.value, 0);
  const data = raw.map((d) => ({
    ...d,
    percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0',
  }));

  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-heading">Spending Breakdown</h2>
        <p className="text-xs text-label mt-0.5">By category — all time</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={CATEGORY_COLORS[entry.name] ?? '#94a3b8'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {data.slice(0, 6).map((entry) => (
            <div key={entry.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: CATEGORY_COLORS[entry.name] ?? '#94a3b8' }}
                />
                <span className="text-xs text-label truncate">{entry.name}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-heading">
                  {formatCurrency(entry.value)}
                </span>
                <span className="text-xs text-caption ml-1">({entry.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
