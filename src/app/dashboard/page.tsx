'use client';

import { AppShell } from '@/components/layout/AppShell';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { BalanceTrendChart } from '@/components/dashboard/BalanceTrendChart';
import { SpendingBreakdownChart } from '@/components/dashboard/SpendingBreakdownChart';
import { useSummary, useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react';
import { motion } from 'framer-motion';

function DashboardContent() {
  const { totalIncome, totalExpenses, balance, savingsRate } = useSummary();
  const { state } = useApp();
  const txCount = state.transactions.length;

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      change: `Across ${txCount} transactions`,
      changeType: 'neutral' as const,
      icon: <Wallet size={20} />,
      gradient: 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-violet-500/30',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      change: 'All income sources',
      changeType: 'positive' as const,
      icon: <TrendingUp size={20} />,
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: 'All expense categories',
      changeType: 'negative' as const,
      icon: <TrendingDown size={20} />,
      gradient: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/30',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      change: balance >= 0 ? 'Positive balance — great!' : 'Negative balance',
      changeType: balance >= 0 ? ('positive' as const) : ('negative' as const),
      icon: <PiggyBank size={20} />,
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome banner */}
      <motion.div
        className="glass-card rounded-2xl p-5 flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1">
          <h2 className="text-base font-semibold text-heading">
            Welcome back 👋
          </h2>
          <p className="text-sm text-label mt-0.5">
            Here&apos;s an overview of your financial health. You have{' '}
            <span className={balance >= 0 ? 'text-emerald-500 font-medium' : 'text-rose-500 font-medium'}>
              {balance >= 0 ? 'a positive' : 'a negative'} balance
            </span>{' '}
            with a savings rate of <span className="text-violet-500 font-medium">{savingsRate}%</span>.
          </p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <SummaryCard key={card.title} {...card} delay={i * 0.06} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2">
          <SpendingBreakdownChart />
        </div>
      </div>

      {/* Recent Transactions preview */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-heading">Recent Transactions</h2>
          <a
            href="/transactions"
            className="text-xs text-violet-500 hover:text-violet-400 transition-colors font-medium"
          >
            View all →
          </a>
        </div>
        <div className="space-y-2">
          {state.transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-2 border-b border-line last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-xs text-label shrink-0">
                  {tx.category.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-heading font-medium leading-tight">{tx.description}</p>
                  <p className="text-xs text-caption">{tx.category} · {tx.date}</p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <DashboardContent />
    </AppShell>
  );
}
