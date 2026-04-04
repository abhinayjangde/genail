# FinTrack — Finance Dashboard UI

A modern, interactive personal finance dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, and **Framer Motion**.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install   # or npm install / yarn

# Start development server
pnpm dev

# Open in browser
http://localhost:3000
```

---

## ✨ Features

### 1. Dashboard Overview
- **4 Summary Cards** — Total Balance, Total Income, Total Expenses, Savings Rate
- **Balance Trend Chart** — Area chart showing income vs expenses over 6 months (Recharts)
- **Spending Breakdown** — Donut pie chart by category with color-coded legend
- **Recent Transactions** — Quick preview of the 5 latest transactions

### 2. Transactions Section
- Full **sortable table** — click Date or Amount column headers to sort
- **Search** by description or category (live filtering)
- **Filter** by type (income/expense), category dropdown, and date range
- **Admin only** — Add Transaction button with modal form + Edit/Delete per row
- **Empty state** — graceful message when filters return no results

### 3. Role-Based UI (RBAC Simulation)
Switch roles using the dropdown in the top-right header:

| Feature | Viewer | Admin |
|---|---|---|
| View all pages & charts | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Add transactions | ❌ | ✅ |
| Edit / Delete transactions | ❌ | ✅ |
| Export CSV | ❌ | ✅ |

### 4. Insights Section
- **Smart observation banner** — auto-detects significant M/M spending changes
- **Top Spending Category** card
- **Expense Ratio** and **Savings Rate** insight cards
- **Month-over-Month** income and expense comparison
- **Monthly Bar Chart** — grouped bar chart by month (Recharts)
- **Category Ranking** — animated progress bars for top 5 expense categories

### 5. State Management
Single `AppContext` using React `useReducer`:
- Transactions data (53 mock entries across 10 categories, 6 months)
- Active filters (search, type, category, date range, sort)
- Selected role (admin/viewer)
- Theme preference (dark/light)
- **Persisted to `localStorage`** — state survives page refresh

---

## 🎨 Design System

| Token | Value |
|---|---|
| Font | Inter (Google Fonts) |
| Dark background | `#0b0f1a` |
| Accent | Violet `#7c3aed` → Indigo `#6366f1` |
| Glass cards | `rgba(255,255,255,0.04)` + `backdrop-blur` |
| Income color | Emerald `#10b981` |
| Expense color | Rose `#f43f5e` |

---

## ⚙️ Optional Enhancements Implemented

- ✅ **Dark mode** (full coverage, toggle in header, persisted)
- ✅ **Local storage persistence** (transactions, role, theme)
- ✅ **CSV export** (Admin only — exports filtered transactions)
- ✅ **Animations** (Framer Motion for card entrances, modal, sidebar drawer)
- ✅ **Responsive design** (mobile sidebar drawer, collapsible table columns)

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── dashboard/page.tsx     # Overview
│   ├── transactions/page.tsx  # Transaction list
│   ├── insights/page.tsx      # Analytics
│   ├── layout.tsx             # Root layout + providers
│   └── globals.css            # Design tokens
├── components/
│   ├── layout/                # Sidebar, Header, AppShell
│   ├── dashboard/             # SummaryCard, charts
│   ├── transactions/          # Table, Filters, Modal
│   ├── insights/              # InsightCard, MonthlyChart
│   └── ui/                    # Badge, Button, Modal, EmptyState
├── context/
│   └── AppContext.tsx          # State + reducer + selector hooks
├── data/
│   └── mockData.ts            # 53 mock transactions + category colors
├── lib/
│   └── utils.ts               # cn, formatCurrency, formatDate, exportToCSV
└── types/
    └── index.ts               # TypeScript interfaces
```

---

## 🛠️ Tech Stack

| Dependency | Purpose |
|---|---|
| Next.js 16 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Recharts | Charts (Area, Pie, Bar) |
| Framer Motion | Animations |
| Lucide React | Icons |
| clsx + tailwind-merge | Class utility |

---

## 📋 Assignment Requirements Coverage

| Requirement | Status |
|---|---|
| Dashboard — summary cards | ✅ |
| Time-based visualization | ✅ Area chart (6 months) |
| Categorical visualization | ✅ Donut pie chart |
| Transaction list with date/amount/category/type | ✅ |
| Filtering & search | ✅ |
| Role-based UI (Admin/Viewer) | ✅ |
| Insights section | ✅ |
| State management | ✅ Context + useReducer |
| Responsive design | ✅ |
| Empty state handling | ✅ |
| Dark mode | ✅ |
| Local storage persistence | ✅ |
| CSV export | ✅ |
| Animations | ✅ |
