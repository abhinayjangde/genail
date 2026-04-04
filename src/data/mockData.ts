import { Transaction, Category } from '@/types';

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  // Income
  { id: 't1', date: dateStr(1), description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 't2', date: dateStr(32), description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 't3', date: dateStr(62), description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 't4', date: dateStr(92), description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 't5', date: dateStr(122), description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 't6', date: dateStr(152), description: 'Monthly Salary', category: 'Salary', amount: 80000, type: 'income' },
  { id: 't7', date: dateStr(15), description: 'Freelance Design Project', category: 'Freelance', amount: 22000, type: 'income' },
  { id: 't8', date: dateStr(45), description: 'Freelance Web Dev', category: 'Freelance', amount: 18500, type: 'income' },
  { id: 't9', date: dateStr(78), description: 'Consulting Fee', category: 'Freelance', amount: 12000, type: 'income' },
  { id: 't10', date: dateStr(110), description: 'Investment Returns', category: 'Investment', amount: 9500, type: 'income' },
  { id: 't11', date: dateStr(140), description: 'Stock Dividends', category: 'Investment', amount: 4200, type: 'income' },

  // Expenses — Food
  { id: 't12', date: dateStr(2), description: 'Grocery Shopping', category: 'Food', amount: 3200, type: 'expense' },
  { id: 't13', date: dateStr(8), description: 'Restaurant Dinner', category: 'Food', amount: 1800, type: 'expense' },
  { id: 't14', date: dateStr(14), description: 'Swiggy Order', category: 'Food', amount: 650, type: 'expense' },
  { id: 't15', date: dateStr(35), description: 'Grocery Shopping', category: 'Food', amount: 2900, type: 'expense' },
  { id: 't16', date: dateStr(42), description: 'Team Lunch', category: 'Food', amount: 2100, type: 'expense' },
  { id: 't17', date: dateStr(65), description: 'Grocery Shopping', category: 'Food', amount: 3400, type: 'expense' },
  { id: 't18', date: dateStr(70), description: 'Coffee & Snacks', category: 'Food', amount: 480, type: 'expense' },
  { id: 't19', date: dateStr(95), description: 'Grocery Shopping', category: 'Food', amount: 3100, type: 'expense' },
  { id: 't20', date: dateStr(125), description: 'Grocery Shopping', category: 'Food', amount: 2800, type: 'expense' },
  { id: 't21', date: dateStr(155), description: 'Grocery Shopping', category: 'Food', amount: 2600, type: 'expense' },

  // Expenses — Transport
  { id: 't22', date: dateStr(3), description: 'Fuel', category: 'Transport', amount: 2400, type: 'expense' },
  { id: 't23', date: dateStr(25), description: 'Uber Rides', category: 'Transport', amount: 1200, type: 'expense' },
  { id: 't24', date: dateStr(55), description: 'Monthly Metro Pass', category: 'Transport', amount: 800, type: 'expense' },
  { id: 't25', date: dateStr(85), description: 'Fuel', category: 'Transport', amount: 2200, type: 'expense' },
  { id: 't26', date: dateStr(115), description: 'Cab to Airport', category: 'Transport', amount: 1500, type: 'expense' },
  { id: 't27', date: dateStr(145), description: 'Fuel', category: 'Transport', amount: 2000, type: 'expense' },

  // Expenses — Entertainment
  { id: 't28', date: dateStr(5), description: 'Netflix Subscription', category: 'Entertainment', amount: 649, type: 'expense' },
  { id: 't29', date: dateStr(18), description: 'Movie Tickets', category: 'Entertainment', amount: 1200, type: 'expense' },
  { id: 't30', date: dateStr(48), description: 'Spotify Premium', category: 'Entertainment', amount: 119, type: 'expense' },
  { id: 't31', date: dateStr(60), description: 'Gaming Purchase', category: 'Entertainment', amount: 2499, type: 'expense' },
  { id: 't32', date: dateStr(90), description: 'Concert Tickets', category: 'Entertainment', amount: 3000, type: 'expense' },
  { id: 't33', date: dateStr(120), description: 'OTT Subscription Bundle', category: 'Entertainment', amount: 1299, type: 'expense' },
  { id: 't34', date: dateStr(150), description: 'Movie Tickets', category: 'Entertainment', amount: 950, type: 'expense' },

  // Expenses — Shopping
  { id: 't35', date: dateStr(9), description: 'Amazon Purchase', category: 'Shopping', amount: 4200, type: 'expense' },
  { id: 't36', date: dateStr(28), description: 'Clothing — ZARA', category: 'Shopping', amount: 5800, type: 'expense' },
  { id: 't37', date: dateStr(58), description: 'Electronics Accessories', category: 'Shopping', amount: 3100, type: 'expense' },
  { id: 't38', date: dateStr(88), description: 'Furniture', category: 'Shopping', amount: 12000, type: 'expense' },
  { id: 't39', date: dateStr(118), description: 'Home Décor', category: 'Shopping', amount: 2800, type: 'expense' },
  { id: 't40', date: dateStr(148), description: 'Books & Stationery', category: 'Shopping', amount: 1400, type: 'expense' },

  // Expenses — Bills
  { id: 't41', date: dateStr(4), description: 'Electricity Bill', category: 'Bills', amount: 2800, type: 'expense' },
  { id: 't42', date: dateStr(6), description: 'Internet Plan', category: 'Bills', amount: 999, type: 'expense' },
  { id: 't43', date: dateStr(7), description: 'Mobile Recharge', category: 'Bills', amount: 599, type: 'expense' },
  { id: 't44', date: dateStr(36), description: 'Electricity Bill', category: 'Bills', amount: 2600, type: 'expense' },
  { id: 't45', date: dateStr(38), description: 'Internet Plan', category: 'Bills', amount: 999, type: 'expense' },
  { id: 't46', date: dateStr(66), description: 'Electricity Bill', category: 'Bills', amount: 3100, type: 'expense' },
  { id: 't47', date: dateStr(68), description: 'Internet Plan', category: 'Bills', amount: 999, type: 'expense' },
  { id: 't48', date: dateStr(96), description: 'Electricity Bill', category: 'Bills', amount: 2900, type: 'expense' },
  { id: 't49', date: dateStr(126), description: 'Electricity Bill', category: 'Bills', amount: 2700, type: 'expense' },

  // Expenses — Healthcare
  { id: 't50', date: dateStr(20), description: 'Doctor Consultation', category: 'Healthcare', amount: 1000, type: 'expense' },
  { id: 't51', date: dateStr(22), description: 'Medicines', category: 'Healthcare', amount: 650, type: 'expense' },
  { id: 't52', date: dateStr(80), description: 'Lab Tests', category: 'Healthcare', amount: 2200, type: 'expense' },
  { id: 't53', date: dateStr(130), description: 'Gym Membership', category: 'Healthcare', amount: 2500, type: 'expense' },
];

export const CATEGORIES: Category[] = [
  'Salary',
  'Freelance',
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Investment',
  'Other',
];

export const CATEGORY_COLORS: Record<string, string> = {
  Salary: '#7c3aed',
  Freelance: '#6366f1',
  Food: '#f59e0b',
  Transport: '#10b981',
  Entertainment: '#ec4899',
  Shopping: '#f97316',
  Bills: '#06b6d4',
  Healthcare: '#84cc16',
  Investment: '#8b5cf6',
  Other: '#94a3b8',
};
