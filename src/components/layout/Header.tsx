'use client';

import { Menu, Moon, Sun, Shield, Eye, Download } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useFilteredTransactions } from '@/context/AppContext';
import { exportToCSV, formatDate } from '@/lib/utils';

interface HeaderProps {
  title: string;
  onMobileMenuOpen: () => void;
}

export function Header({ title, onMobileMenuOpen }: HeaderProps) {
  const { state, dispatch } = useApp();
  const { role, theme } = state;
  const transactions = useFilteredTransactions();

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: theme === 'dark' ? 'light' : 'dark' });
  };

  const handleExport = () => {
    exportToCSV(
      transactions.map((t) => ({
        Date: formatDate(t.date),
        Description: t.description,
        Category: t.category,
        Type: t.type,
        Amount: t.amount,
      })),
      'transactions'
    );
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-4 header-glass border-b border-line">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-xl text-label hover:text-heading hover:bg-[var(--surface-10)] transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-heading leading-tight">{title}</h1>
          <p className="text-xs text-caption hidden sm:block">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-label hover:text-heading hover:bg-[var(--surface-10)] transition-colors"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Role switcher */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-mid">
          {role === 'admin' ? (
            <Shield size={14} className="text-amber-400" />
          ) : (
            <Eye size={14} className="text-sky-400" />
          )}
          <select
            value={role}
            onChange={(e) =>
              dispatch({ type: 'SET_ROLE', payload: e.target.value as 'admin' | 'viewer' })
            }
            className="bg-transparent text-xs font-medium text-body focus:outline-none cursor-pointer pr-1"
          >
            <option value="admin" style={{ background: 'var(--option-bg)' }}>Admin</option>
            <option value="viewer" style={{ background: 'var(--option-bg)' }}>Viewer</option>
          </select>
          <Badge variant={role === 'admin' ? 'admin' : 'viewer'} className="hidden sm:inline-flex">
            {role}
          </Badge>
        </div>

        {/* Export — Admin only */}
        {role === 'admin' && (
          <Button variant="outline" size="sm" onClick={handleExport} className="hidden sm:flex">
            <Download size={14} />
            Export
          </Button>
        )}
      </div>
    </header>
  );
}
