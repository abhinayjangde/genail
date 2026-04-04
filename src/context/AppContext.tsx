'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { AppState, AppAction, FilterState, Transaction } from '@/types';
import { MOCK_TRANSACTIONS } from '@/data/mockData';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortDir: 'desc',
  dateFrom: '',
  dateTo: '',
};

const INITIAL_STATE: AppState = {
  transactions: MOCK_TRANSACTIONS,
  filters: DEFAULT_FILTERS,
  role: 'admin',
  theme: 'dark',
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: DEFAULT_FILTERS };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'finance_dashboard_state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, (init) => {
    if (typeof window === 'undefined') return init;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved transactions only if they exist, otherwise use mock
        return {
          ...init,
          theme: parsed.theme ?? init.theme,
          role: parsed.role ?? init.role,
          transactions:
            parsed.transactions?.length > 0
              ? parsed.transactions
              : init.transactions,
        };
      }
    } catch {
      // ignore
    }
    return init;
  });

  // Apply theme class on html element
  useEffect(() => {
    const html = document.documentElement;
    if (state.theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [state.theme]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme: state.theme,
          role: state.role,
          transactions: state.transactions,
        })
      );
    } catch {
      // ignore
    }
  }, [state.theme, state.role, state.transactions]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

// Derived selector hooks
export function useFilteredTransactions() {
  const { state } = useApp();
  const { transactions, filters } = state;

  let result = [...transactions];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  // Type filter
  if (filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }

  // Category filter
  if (filters.category !== 'all') {
    result = result.filter((t) => t.category === filters.category);
  }

  // Date range
  if (filters.dateFrom) {
    result = result.filter((t) => t.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    result = result.filter((t) => t.date <= filters.dateTo);
  }

  // Sort
  result.sort((a, b) => {
    const dir = filters.sortDir === 'asc' ? 1 : -1;
    if (filters.sortBy === 'date') {
      return a.date < b.date ? -dir : dir;
    }
    return (a.amount - b.amount) * dir;
  });

  return result;
}

export function useSummary() {
  const { state } = useApp();
  const txns = state.transactions;

  const totalIncome = txns
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  const totalExpenses = txns
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0';

  return { totalIncome, totalExpenses, balance, savingsRate };
}

export function useMonthlyData() {
  const { state } = useApp();
  const txns = state.transactions;

  const months: Record<string, { income: number; expenses: number; label: string }> = {};

  txns.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[key]) {
      months[key] = {
        income: 0,
        expenses: 0,
        label: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
      };
    }
    if (t.type === 'income') months[key].income += t.amount;
    else months[key].expenses += t.amount;
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([, v]) => ({ ...v, balance: v.income - v.expenses }));
}

export function useCategoryBreakdown() {
  const { state } = useApp();

  const expenses = state.transactions.filter((t) => t.type === 'expense');
  const map: Record<string, number> = {};

  expenses.forEach((t) => {
    map[t.category] = (map[t.category] ?? 0) + t.amount;
  });

  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function useInsights() {
  const categoryBreakdown = useCategoryBreakdown();
  const monthlyData = useMonthlyData();
  const { state } = useApp();

  const topCategory = categoryBreakdown[0] ?? null;
  const topCategories = categoryBreakdown.slice(0, 5);

  // Month over month comparison (last 2 months)
  const lastTwo = monthlyData.slice(-2);
  const currentMonth = lastTwo[1] ?? null;
  const prevMonth = lastTwo[0] ?? null;

  const expenseDiff =
    currentMonth && prevMonth
      ? (((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100).toFixed(1)
      : null;

  // Find category with biggest increase this month vs last month
  const currentMonthStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  })();

  const prevMonthTxns = state.transactions.filter((t) => {
    const d = new Date(t.date);
    const prev = new Date();
    prev.setMonth(prev.getMonth() - 1);
    return (
      d.getFullYear() === prev.getFullYear() &&
      d.getMonth() === prev.getMonth() &&
      t.type === 'expense'
    );
  });

  const currentMonthTxns = state.transactions.filter((t) => {
    return t.date.startsWith(currentMonthStr) && t.type === 'expense';
  });

  const prevCatMap: Record<string, number> = {};
  prevMonthTxns.forEach((t) => {
    prevCatMap[t.category] = (prevCatMap[t.category] ?? 0) + t.amount;
  });

  const currCatMap: Record<string, number> = {};
  currentMonthTxns.forEach((t) => {
    currCatMap[t.category] = (currCatMap[t.category] ?? 0) + t.amount;
  });

  return {
    topCategory,
    topCategories,
    expenseDiff,
    currentMonth,
    prevMonth,
    prevCatMap,
    currCatMap,
  };
}
