'use client';

import { AppShell } from '@/components/layout/AppShell';
import { InsightCard } from '@/components/insights/InsightCard';
import { MonthlyComparisonChart } from '@/components/insights/MonthlyComparisonChart';
import { useInsights, useSummary, useCategoryBreakdown } from '@/context/AppContext';
import { CATEGORY_COLORS } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

function InsightsContent() {
  const { topCategory, topCategories, expenseDiff, currentMonth, prevMonth } = useInsights();
  const { totalIncome, totalExpenses, savingsRate } = useSummary();
  const breakdown = useCategoryBreakdown();
  const totalExpenseAmount = breakdown.reduce((s, d) => s + d.value, 0);

  const expenseDiffNum = expenseDiff ? parseFloat(expenseDiff) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Smart observation banner */}
      {expenseDiff && Math.abs(expenseDiffNum) > 5 && (
        <motion.div
          className="glass-card rounded-2xl p-4 border border-violet-500/20 flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle size={18} className="text-violet-500 shrink-0 mt-0.5" />
          <p className="text-sm text-body">
            <span className="font-semibold text-heading">Spending {expenseDiffNum > 0 ? 'increased' : 'decreased'}</span> by{' '}
            <span className={expenseDiffNum > 0 ? 'text-rose-500 font-semibold' : 'text-emerald-500 font-semibold'}>
              {Math.abs(expenseDiffNum)}%
            </span>{' '}
            this month compared to last month.{' '}
            {expenseDiffNum > 10 && (
              <span className="text-label">Consider reviewing your spending habits.</span>
            )}
            {expenseDiffNum < -5 && (
              <span className="text-label">Great job cutting back on expenses!</span>
            )}
          </p>
        </motion.div>
      )}

      {/* Top insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Highest spending category */}
        <InsightCard
          title="Top Spending Category"
          value={topCategory?.name ?? 'N/A'}
          subtitle={topCategory ? formatCurrency(topCategory.value) : undefined}
          icon={<Trophy size={18} />}
          iconBg="bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30"
          delay={0}
        />

        {/* Expense vs income */}
        <InsightCard
          title="Expense Ratio"
          value={totalIncome > 0 ? `${((totalExpenses / totalIncome) * 100).toFixed(1)}%` : 'N/A'}
          subtitle="of income spent"
          icon={<BarChart3 size={18} />}
          iconBg="bg-gradient-to-br from-violet-500 to-indigo-600 shadow-violet-500/30"
          trend={parseFloat(savingsRate) >= 20 ? 'Healthy' : parseFloat(savingsRate) >= 10 ? 'Moderate' : 'Low'}
          trendType={parseFloat(savingsRate) >= 20 ? 'positive' : parseFloat(savingsRate) >= 10 ? 'neutral' : 'negative'}
          delay={0.06}
        />

        {/* Savings rate */}
        <InsightCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle="of total income saved"
          icon={<PiggyBank size={18} />}
          iconBg="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30"
          trend={parseFloat(savingsRate) >= 0 ? '+' + formatCurrency(totalIncome - totalExpenses) : formatCurrency(totalIncome - totalExpenses)}
          trendType={parseFloat(savingsRate) >= 0 ? 'positive' : 'negative'}
          delay={0.12}
        />

        {/* Month over month */}
        {currentMonth && prevMonth && (
          <>
            <InsightCard
              title="This Month Expenses"
              value={formatCurrency(currentMonth.expenses)}
              subtitle={`vs ${formatCurrency(prevMonth.expenses)} last month`}
              icon={expenseDiffNum > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              iconBg={expenseDiffNum > 0
                ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/30'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30'}
              trend={expenseDiff ? `${expenseDiffNum > 0 ? '+' : ''}${expenseDiff}%` : undefined}
              trendType={expenseDiffNum > 0 ? 'negative' : 'positive'}
              delay={0.18}
            />

            <InsightCard
              title="This Month Income"
              value={formatCurrency(currentMonth.income)}
              subtitle={`vs ${formatCurrency(prevMonth.income)} last month`}
              icon={<TrendingUp size={18} />}
              iconBg="bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/30"
              delay={0.24}
            />
          </>
        )}
      </div>

      {/* Monthly Comparison Chart */}
      <MonthlyComparisonChart />

      {/* Top categories breakdown */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-heading">Top Spending Categories</h2>
          <p className="text-xs text-label mt-0.5">Ranked by total amount spent</p>
        </div>

        <div className="space-y-3">
          {topCategories.map((cat, i) => {
            const pct = totalExpenseAmount > 0 ? (cat.value / totalExpenseAmount) * 100 : 0;
            return (
              <motion.div
                key={cat.name}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
              >
                <span className="text-xs text-caption w-4 shrink-0 font-mono">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: CATEGORY_COLORS[cat.name] ?? '#94a3b8' }}
                      />
                      <span className="text-sm text-heading font-medium">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-heading">{formatCurrency(cat.value)}</span>
                      <span className="text-xs text-caption ml-2">{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: CATEGORY_COLORS[cat.name] ?? '#94a3b8' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.05, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <AppShell title="Insights">
      <InsightsContent />
    </AppShell>
  );
}
