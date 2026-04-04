'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import { Button } from '@/components/ui/Button';

export function TransactionFilters() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const hasActiveFilters =
    filters.search ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.dateFrom ||
    filters.dateTo;

  const inputClass =
    'bg-surface border border-mid rounded-xl px-3 py-2 text-sm text-heading placeholder:text-caption focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all';

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="flex-1 min-w-[180px] relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-caption" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { search: e.target.value } })}
          className={inputClass + ' w-full pl-9 pr-3'}
        />
      </div>

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) =>
          dispatch({
            type: 'SET_FILTER',
            payload: { type: e.target.value as 'all' | 'income' | 'expense' },
          })
        }
        className={inputClass + ' cursor-pointer'}
      >
        <option value="all" style={{ background: 'var(--option-bg)' }}>All Types</option>
        <option value="income" style={{ background: 'var(--option-bg)' }}>Income</option>
        <option value="expense" style={{ background: 'var(--option-bg)' }}>Expense</option>
      </select>

      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) =>
          dispatch({ type: 'SET_FILTER', payload: { category: e.target.value as typeof filters.category } })
        }
        className={inputClass + ' cursor-pointer'}
      >
        <option value="all" style={{ background: 'var(--option-bg)' }}>All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c} style={{ background: 'var(--option-bg)' }}>{c}</option>
        ))}
      </select>

      {/* Date From */}
      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { dateFrom: e.target.value } })}
        className={inputClass + ' cursor-pointer'}
        title="From date"
      />

      {/* Date To */}
      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { dateTo: e.target.value } })}
        className={inputClass + ' cursor-pointer'}
        title="To date"
      />

      {/* Reset */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          className="!text-rose-400 hover:!text-rose-300"
        >
          <X size={14} />
          Clear
        </Button>
      )}

      <div className="flex items-center gap-1.5 ml-auto text-xs text-caption">
        <SlidersHorizontal size={13} />
        Filters
      </div>
    </div>
  );
}
