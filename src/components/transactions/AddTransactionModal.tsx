'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import { Transaction, Category, TransactionType } from '@/types';
import { generateId } from '@/lib/utils';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  editTransaction?: Transaction;
}

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  category: 'Food' as Category,
  type: 'expense' as TransactionType,
  amount: '',
};

export function AddTransactionModal({
  open,
  onClose,
  editTransaction,
}: AddTransactionModalProps) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editTransaction) {
      setForm({
        date: editTransaction.date,
        description: editTransaction.description,
        category: editTransaction.category,
        type: editTransaction.type,
        amount: String(editTransaction.amount),
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editTransaction, open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tx: Transaction = {
      id: editTransaction?.id ?? generateId(),
      date: form.date,
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      amount: Number(form.amount),
    };

    if (editTransaction) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: tx });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: tx });
    }
    onClose();
  };

  const inputClass =
    'w-full bg-surface border border-mid rounded-xl px-3 py-2.5 text-sm text-heading placeholder:text-caption focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editTransaction ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-2 p-1 bg-surface rounded-xl">
          {(['expense', 'income'] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((f) => ({ ...f, type: t }))}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                form.type === t
                  ? t === 'income'
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                  : 'text-label hover:text-heading'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs text-label mb-1.5 font-medium">Description</label>
          <input
            type="text"
            placeholder="e.g. Monthly Salary"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={inputClass}
          />
          {errors.description && (
            <p className="text-xs text-rose-400 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs text-label mb-1.5 font-medium">Amount (₹)</label>
          <input
            type="number"
            placeholder="0"
            min="1"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            className={inputClass}
          />
          {errors.amount && <p className="text-xs text-rose-400 mt-1">{errors.amount}</p>}
        </div>

        {/* Category & Date row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-label mb-1.5 font-medium">Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value as Category }))
              }
              className={inputClass + ' cursor-pointer'}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: 'var(--option-bg)' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-label mb-1.5 font-medium">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className={inputClass + ' cursor-pointer'}
            />
            {errors.date && <p className="text-xs text-rose-400 mt-1">{errors.date}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            {editTransaction ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
