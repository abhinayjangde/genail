'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { AddTransactionModal } from './AddTransactionModal';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_COLORS } from '@/data/mockData';

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { state, dispatch } = useApp();
  const { role, filters } = state;
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const isAdmin = role === 'admin';

  const handleDelete = (id: string) => {
    if (confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const toggleSort = (col: 'date' | 'amount') => {
    if (filters.sortBy === col) {
      dispatch({
        type: 'SET_FILTER',
        payload: { sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' },
      });
    } else {
      dispatch({ type: 'SET_FILTER', payload: { sortBy: col, sortDir: 'desc' } });
    }
  };

  const SortIcon = ({ col }: { col: 'date' | 'amount' }) => {
    if (filters.sortBy !== col)
      return <ChevronUp size={13} className="text-caption" />;
    return filters.sortDir === 'asc' ? (
      <ChevronUp size={13} className="text-violet-400" />
    ) : (
      <ChevronDown size={13} className="text-violet-400" />
    );
  };

  if (!transactions.length) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or search query."
      />
    );
  }

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl glass-card">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-line">
              <th
                className="text-left px-5 py-3.5 text-xs font-medium text-label uppercase tracking-wider cursor-pointer hover:text-heading transition-colors select-none"
                onClick={() => toggleSort('date')}
              >
                <span className="flex items-center gap-1">
                  Date <SortIcon col="date" />
                </span>
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-label uppercase tracking-wider">
                Description
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-label uppercase tracking-wider hidden sm:table-cell">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-label uppercase tracking-wider hidden md:table-cell">
                Type
              </th>
              <th
                className="text-right px-5 py-3.5 text-xs font-medium text-label uppercase tracking-wider cursor-pointer hover:text-heading transition-colors select-none"
                onClick={() => toggleSort('amount')}
              >
                <span className="flex items-center justify-end gap-1">
                  Amount <SortIcon col="amount" />
                </span>
              </th>
              {isAdmin && (
                <th className="text-right px-5 py-3.5 text-xs font-medium text-label uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {transactions.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  className="border-b border-line hover:bg-[var(--row-hover)] transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15, delay: i * 0.015 }}
                >
                  <td className="px-5 py-3.5 text-sm text-label whitespace-nowrap">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-heading font-medium">{tx.description}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: CATEGORY_COLORS[tx.category] ?? '#94a3b8' }}
                      />
                      <span className="text-xs text-body">{tx.category}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <Badge variant={tx.type}>{tx.type}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditTx(tx)}
                          className="p-1.5 rounded-lg text-label hover:text-heading hover:bg-[var(--surface-10)] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 rounded-lg text-label hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {editTx && (
        <AddTransactionModal
          open={true}
          onClose={() => setEditTx(null)}
          editTransaction={editTx}
        />
      )}
    </>
  );
}
