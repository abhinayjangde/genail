export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Healthcare'
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  category: Category;
  amount: number;
  type: TransactionType;
}

export type Role = 'admin' | 'viewer';
export type Theme = 'light' | 'dark';

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: 'date' | 'amount';
  sortDir: 'asc' | 'desc';
  dateFrom: string;
  dateTo: string;
}

export interface AppState {
  transactions: Transaction[];
  filters: FilterState;
  role: Role;
  theme: Theme;
}

export type AppAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };
