'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { AddTransactionModal } from '@/components/transactions/AddTransactionModal';
import { Button } from '@/components/ui/Button';
import { useApp, useFilteredTransactions } from '@/context/AppContext';
import { motion } from 'framer-motion';

function TransactionsContent() {
  const { state } = useApp();
  const { role } = state;
  const [addOpen, setAddOpen] = useState(false);
  const filtered = useFilteredTransactions();

  const totalFiltered = filtered.length;
  const incomeCount = filtered.filter((t) => t.type === 'income').length;
  const expenseCount = filtered.filter((t) => t.type === 'expense').length;

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Page header row */}
      <motion.div
        className="flex flex-wrap items-center gap-3 justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="glass-card rounded-xl px-3 py-1.5 text-xs text-label">
            <span className="text-heading font-semibold">{totalFiltered}</span> transactions
          </span>
          <span className="glass-card rounded-xl px-3 py-1.5 text-xs text-emerald-500">
            <span className="font-semibold">{incomeCount}</span> income
          </span>
          <span className="glass-card rounded-xl px-3 py-1.5 text-xs text-rose-500">
            <span className="font-semibold">{expenseCount}</span> expenses
          </span>
        </div>

        {role === 'admin' && (
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={16} />
            Add Transaction
          </Button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <TransactionFilters />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <TransactionTable transactions={filtered} />
      </motion.div>

      {/* Add modal */}
      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <AppShell title="Transactions">
      <TransactionsContent />
    </AppShell>
  );
}
